import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto p-8 bg-white border border-gray-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <UserPlus className="w-8 h-8 text-black" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-8 text-black tracking-tight">Create Account</h2>
        {error && <div className="bg-black text-white p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-gray-50 border border-transparent p-4 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-gray-50 border border-transparent p-4 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-50 border border-transparent p-4 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-gray-800 transition-colors text-sm">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-8 text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-black font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
