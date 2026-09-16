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
        const res = await axios.get('http://localhost:5000/api/snippets');
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search snippets or tags..."
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {snippets.length === 0 ? (
        <div className="text-center py-20 bg-white border rounded-lg border-dashed">
          <Code2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No snippets yet</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first code snippet.</p>
          <Link to="/new" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Plus className="w-5 h-5" /> Create Snippet
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map((snippet) => (
            <Link to={`/edit/${snippet._id}`} key={snippet._id} className="block group">
              <div className="bg-white p-5 rounded-lg border shadow-sm hover:shadow-md transition h-full flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 mb-2 truncate">{snippet.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-xs rounded font-medium text-gray-600">{snippet.language}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {snippet.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">#{tag}</span>
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
