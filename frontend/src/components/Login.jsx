import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext.jsx';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }

    setError('');
    try {
      const result = await login({ username, password });
      if (result.success) {
        // 登录成功后跳转到首页
        navigate('/');
      } else {
        setError(result.error || '用户名或密码错误');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>设备资产管理系统 - 登录</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading-dots"></span>
                <span>登录中</span>
              </>
            ) : (
              '登录'
            )}
          </button>
        </form>
        
        <div className="login-tips">
          <p>提示：演示环境用户名密码可输入任意值</p>
          <p>管理员权限：使用 admin 用户名</p>
        </div>
      </div>
    </div>
  );
};

export default Login;