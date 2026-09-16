import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Code2, Plus } from 'lucide-react';

export default function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/snippets');
        setSnippets(res.data);
      } catch (err) {
        console.error('Failed to fetch snippets', err);
      }
    };
    fetchSnippets();
  }, []);

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-black">Snippets</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title or tag..."
            className="pl-12 pr-4 py-3 bg-gray-50 border-none rounded-full focus:bg-white focus:ring-1 focus:ring-black outline-none w-full sm:w-72 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {snippets.length === 0 ? (
        <div className="text-center py-32">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-black mb-2">No snippets found</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Store your most important code blocks and learn from them using AI.</p>
          <Link to="/new" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium">
            <Plus className="w-5 h-5" /> Create Snippet
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <Link to={`/edit/${snippet._id}`} key={snippet._id} className="block group">
              <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all h-full flex flex-col">
                <h3 className="font-semibold text-xl text-black mb-3 truncate group-hover:underline underline-offset-4">{snippet.title}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-xs rounded-full font-medium text-black tracking-wide uppercase">{snippet.language}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {snippet.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
