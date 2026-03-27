import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://azouguaghapi-43zktnq5.b4a.run/api/register', {
        username: username,
        email: email,
        password: password
      });
      setMessage("✅ تم إنشاء الحساب بنجاح! تقدر تدخل دابا.");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setMessage(error.response?.data?.error || "❌ وقع مشكل، يقدر يكون هاد الحساب ديجا كاين");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-discord_black p-4 font-sans" dir="rtl">
      <div className="bg-discord_grey p-8 rounded-lg shadow-2xl w-full max-w-[480px] border border-[#202225]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">إنشاء حساب جديد</h2>
          <p className="text-[#b9bbbe] text-base">بدا التجربة ديالك معنا اليوم!</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 text-right">
          <div>
            <label className="block text-[#b9bbbe] text-xs font-bold uppercase mb-2 tracking-wide">
              إسم المستخدم
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full bg-[#202225] border-none text-[#dcddde] p-3 rounded focus:outline-none focus:ring-2 focus:ring-discord_blue transition-all"
            />
          </div>

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
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-discord_blue hover:bg-[#4752c4] text-white font-medium py-3 rounded transition-colors text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded text-sm text-center ${message.includes('✅') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message}
          </div>
        )}
        
        <div className="mt-4 text-sm text-right">
          <button 
            onClick={() => navigate('/login')}
            className="text-[#00aff4] hover:underline font-medium"
          >
            عندك ديجا كونط؟ سجل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;