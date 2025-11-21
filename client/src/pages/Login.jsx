import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.success) {
        // Store token and user info
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to admin panel
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)'
    }}>
      <div className="w-full max-w-md mx-4" style={{
        background: 'rgba(31, 41, 55, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(75, 85, 99, 0.5)'
      }}>
        <h2 className="text-3xl font-bold text-white mb-6 text-center" style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Admin Login
        </h2>
        
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-white"
              style={{
                padding: '0.75rem 1rem',
                background: '#111827',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              placeholder="admin@portfolio.com"
              onFocus={(e) => e.target.style.borderColor = '#f97316'}
              onBlur={(e) => e.target.style.borderColor = '#374151'}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-white"
              style={{
                padding: '0.75rem 1rem',
                background: '#111827',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              placeholder="Enter your password"
              onFocus={(e) => e.target.style.borderColor = '#f97316'}
              onBlur={(e) => e.target.style.borderColor = '#374151'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold"
            style={{
              padding: '0.75rem 1rem',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.5 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = 'linear-gradient(135deg, #ea580c, #dc2626)')}
            onMouseLeave={(e) => !loading && (e.target.style.background = 'linear-gradient(135deg, #f97316, #ea580c)')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => navigate('/')}
            className="text-sm"
            style={{
              color: '#9ca3af',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
