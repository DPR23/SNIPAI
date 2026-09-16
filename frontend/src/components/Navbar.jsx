import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Code2, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-black text-white p-1.5 rounded-lg">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-semibold text-xl tracking-tight text-black">SnipAI</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-500 hidden sm:block">Hello, {user.username || 'User'}</span>
                <Link to="/new" className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  New Snippet
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-black transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
