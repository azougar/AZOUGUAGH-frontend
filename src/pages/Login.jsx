import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://azouguaghapi-43zktnq5.b4a.run/api/login', {
        email: email,
        password: password
      });
      
      setMessage("✅ تم تسجيل الدخول بنجاح!");
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);
      
      setTimeout(() => {
        navigate('/rooms');
      }, 1000);
      
    } catch (error) {
      setMessage(error.response?.data?.error || "❌ وقع مشكل، تأكد من المعلومات ديالك");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-discord_black p-4 font-sans" dir="rtl">
      <div className="bg-discord_grey p-8 rounded-lg shadow-2xl w-full max-w-[480px] border border-[#202225]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">مرحباً بعودتك!</h2>
          <p className="text-[#b9bbbe] text-base">حنا فرحانين حيت رجعتي لعندنا!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 text-right">
          <div>
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2 tracking-wide">
              الإيميل
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full bg-[#202225] border-none text-[#dcddde] p-3 rounded focus:outline-none focus:ring-2 focus:ring-discord_blue transition-all"
            />
          </div>

          <div>
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2 tracking-wide">
              كلمة السر
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full bg-[#202225] border-none text-[#dcddde] p-3 rounded focus:outline-none focus:ring-2 focus:ring-discord_blue transition-all"
            />
            <button type="button" className="text-[#00aff4] text-xs mt-1 hover:underline">نسيتي كلمة السر؟</button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-discord_blue hover:bg-[#4752c4] text-white font-medium py-3 rounded transition-colors text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded text-sm text-center ${message.includes('✅') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message}
          </div>
        )}
        
        <div className="mt-4 text-sm text-right">
          <span className="text-[#72767d]">محتاج كونط؟ </span>
          <button 
            onClick={() => navigate('/register')}
            className="text-[#00aff4] hover:underline font-medium"
          >
            تسجل دابا
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;