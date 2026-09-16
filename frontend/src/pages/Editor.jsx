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
          const res = await axios.get(`http://localhost:5001/api/snippets/${id}`);
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
        await axios.put(`http://localhost:5001/api/snippets/${id}`, payload);
      } else {
        await axios.post('http://localhost:5001/api/snippets', payload);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        await axios.delete(`http://localhost:5001/api/snippets/${id}`);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleExplain = async () => {
    setLoadingAI(true);
    try {
      const res = await axios.post('http://localhost:5001/api/ai/explain', { code, language });
      setAiExplanation(res.data.explanation);
    } catch (err) {
      console.error(err);
      alert('Failed to get AI explanation. Did you set the Gemini API key in backend/.env?');
    }
    setLoadingAI(false);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-8rem)] py-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6 flex-1">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-black transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Snippet Title"
            className="text-4xl font-semibold tracking-tight bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-200 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          {id && (
            <button onClick={handleDelete} className="text-gray-400 hover:text-black p-2 transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 border-none rounded-full px-4 py-2 text-sm font-medium text-black outline-none focus:ring-1 focus:ring-black"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button onClick={handleSave} className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Tags (comma separated e.g. react, api)"
          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        <div className="w-2/3 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col bg-[#1e1e1e]">
          <div className="h-10 bg-[#2d2d2d] flex items-center px-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <MonacoEditor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              padding: { top: 20 }
            }}
          />
        </div>
        
        <div className="w-1/3 flex flex-col bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <span className="font-semibold text-lg text-black flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Intelligence
            </span>
            <button 
              onClick={handleExplain}
              disabled={loadingAI}
              className="text-xs bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
            >
              {loadingAI ? 'Analyzing...' : 'Explain Code'}
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            {aiExplanation ? (
              <div className="prose prose-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {aiExplanation}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm text-center px-4">
                <Sparkles className="w-10 h-10 mb-4 opacity-20" />
                <p className="max-w-[200px]">Tap analyze to generate an AI breakdown of your code structure.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
