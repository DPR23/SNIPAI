const router = require('express').Router();
const Snippet = require('../models/Snippet');
const auth = require('../middleware/auth');

// Get all snippets for a user
router.get('/', auth, async (req, res) => {
  try {
    const snippets = await Snippet.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single snippet
router.get('/:id', auth, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, userId: req.user });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a snippet
router.post('/', auth, async (req, res) => {
  try {
    const { title, language, code, tags, aiExplanation } = req.body;
    
    if (!title || !language || !code) {
      return res.status(400).json({ message: 'Title, language, and code are required.' });
    }

    const newSnippet = new Snippet({
      userId: req.user,
      title,
      language,
      code,
      tags: tags || [],
      aiExplanation: aiExplanation || ''
    });

    const savedSnippet = await newSnippet.save();
    res.json(savedSnippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a snippet
router.put('/:id', auth, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, userId: req.user });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

    const { title, language, code, tags, aiExplanation } = req.body;

    if (title) snippet.title = title;
    if (language) snippet.language = language;
    if (code) snippet.code = code;
    if (tags) snippet.tags = tags;
    if (aiExplanation) snippet.aiExplanation = aiExplanation;

    const updatedSnippet = await snippet.save();
    res.json(updatedSnippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a snippet
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedSnippet = await Snippet.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!deletedSnippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json({ message: 'Snippet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
