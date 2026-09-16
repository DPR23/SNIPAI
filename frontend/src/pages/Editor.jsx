import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';
import { Save, Sparkles, Trash2, ArrowLeft } from 'lucide-react';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here...');
  const [tags, setTags] = useState('');
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchSnippet = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/snippets/${id}`);
          setTitle(res.data.title);
          setLanguage(res.data.language);
          setCode(res.data.code);
          setTags(res.data.tags.join(', '));
          setAiExplanation(res.data.aiExplanation);
        } catch (err) {
          console.error(err);
        }
      };
      fetchSnippet();
    }
  }, [id]);

  const handleSave = async () => {
    const payload = {
      title,
      language,
      code,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      aiExplanation
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/snippets/${id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/snippets', payload);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        await axios.delete(`http://localhost:5000/api/snippets/${id}`);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleExplain = async () => {
    setLoadingAI(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/explain', { code, language });
      setAiExplanation(res.data.explanation);
    } catch (err) {
      console.error(err);
      alert('Failed to get AI explanation. Did you set the Gemini API key in backend/.env?');
    }
    setLoadingAI(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Snippet Title"
            className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-300 w-1/2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          {id && (
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 p-2">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded p-2 text-sm bg-white outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tags (comma separated e.g. react, hooks, api)"
          className="w-full border rounded p-2 text-sm outline-none focus:border-blue-500"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="w-2/3 border rounded overflow-hidden shadow-sm flex flex-col">
          <MonacoEditor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
        <div className="w-1/3 flex flex-col bg-white border rounded shadow-sm overflow-hidden">
          <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
            <span className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" /> AI Tutor
            </span>
            <button 
              onClick={handleExplain}
              disabled={loadingAI}
              className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200 transition"
            >
              {loadingAI ? 'Thinking...' : 'Explain Code'}
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
            {aiExplanation ? (
              <div className="prose prose-sm text-gray-700 whitespace-pre-wrap">
                {aiExplanation}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm text-center px-4">
                <Sparkles className="w-8 h-8 mb-2 opacity-50" />
                <p>Click "Explain Code" to get a detailed breakdown of your snippet using Google Gemini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
