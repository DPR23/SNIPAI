import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto p-8 bg-white border border-gray-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <Lock className="w-8 h-8 text-black" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-8 text-black tracking-tight">Sign In</h2>
        {error && <div className="bg-black text-white p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            Continue
          </button>
        </form>
        <p className="text-center mt-8 text-sm text-gray-500">
          New here? <Link to="/register" className="text-black font-medium hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}
