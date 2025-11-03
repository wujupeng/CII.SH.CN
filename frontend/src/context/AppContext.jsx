// Context API文件 - 用于管理全局状态
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// 创建Context
const AppContext = createContext();

// Context Provider组件
export const AppProvider = ({ children }) => {
  // 状态定义
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState('light');

  // 初始化 - 检查用户登录状态
  useEffect(() => {
    checkAuthStatus();
    // 检查系统主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // 检查认证状态
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      // 检查是否有token
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // 模拟认证状态检查
      // 根据token判断用户角色
      if (token.includes('admin-token')) {
        // 管理员用户
        setUser({
          id: 1,
          username: 'admin',
          fullName: '系统管理员',
          role: 'admin',
          departmentId: 1,
          departmentName: 'IT部门'
        });
      } else {
        // 普通用户
        setUser({
          id: 2,
          username: 'user',
          fullName: '普通用户',
          role: 'employee',
          departmentId: 1,
          departmentName: 'IT部门'
        });
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error('检查认证状态失败:', error);
      // 清除无效的token
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 登录
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 模拟登录逻辑 - 适配后端Spring Security
      // 检查是否是管理员账号
      const isAdminLogin = credentials.username === 'admin' && credentials.password === 'admin';
      
      if (isAdminLogin) {
        // 管理员登录成功
        const mockUser = {
          id: 1,
          username: 'admin',
          fullName: '系统管理员',
          role: 'admin',
          departmentId: 1,
          departmentName: 'IT部门'
        };
        
        // 生成模拟token
        const mockToken = 'admin-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        
        // 设置用户信息
        setUser(mockUser);
        setIsAuthenticated(true);
        
        // 显示登录成功通知
        showNotification('登录成功', 'success');
        
        return { success: true };
      } else {
        // 模拟普通用户登录
        const mockUser = {
          id: 2,
          username: credentials.username,
          fullName: '普通用户',
          role: 'employee',
          departmentId: 1,
          departmentName: 'IT部门'
        };
        
        // 生成模拟token
        const mockToken = 'user-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        
        // 设置用户信息
        setUser(mockUser);
        setIsAuthenticated(true);
        
        // 显示登录成功通知
        showNotification('登录成功', 'success');
        
        return { success: true };
      }
    } catch (error) {
      setError(error.message || '登录失败，请检查用户名和密码');
      showNotification(error.message || '登录失败', 'error');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // 登出
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // 调用登出接口（可选，根据后端需求）
      try {
        await api.auth.logout();
      } catch (logoutError) {
        // 即使登出接口失败，也清除本地状态
        console.log('登出接口调用失败，继续清除本地状态', logoutError);
      }
      
      // 清除本地存储和状态
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
      setCurrentPage('dashboard');
      
      // 显示登出成功通知
      showNotification('已成功登出', 'info');
    } catch (error) {
      console.error('登出失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 检查权限
  const hasPermission = useCallback((requiredPermission) => {
    // 如果未登录，没有任何权限
    if (!isAuthenticated || !user) return false;
    
    // 管理员拥有所有权限
    if (user.role === 'admin') return true;
    
    // 部门主管的权限
    if (user.role === 'department_manager') {
      // 部门主管可以管理本部门的资产和用户
      if (['view_assets', 'allocate_assets', 'return_assets', 'request_repair', 'view_department_users'].includes(requiredPermission)) {
        return true;
      }
      return false;
    }
    
    // 普通员工的权限
    if (user.role === 'employee') {
      // 普通员工可以查看资产、申请领用和维修
      if (['view_assets', 'request_allocation', 'request_repair'].includes(requiredPermission)) {
        return true;
      }
      return false;
    }
    
    return false;
  }, [isAuthenticated, user]);

  // 检查部门权限
  const hasDepartmentPermission = useCallback((departmentId) => {
    // 管理员可以访问所有部门
    if (!user || user.role === 'admin') return true;
    
    // 部门主管只能访问自己的部门
    if (user.role === 'department_manager') {
      return user.departmentId === departmentId;
    }
    
    // 普通员工只能访问自己的部门
    return user.departmentId === departmentId;
  }, [user]);

  // 切换侧边栏
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    // 保存侧边栏状态到localStorage
    localStorage.setItem('sidebarCollapsed', !sidebarCollapsed);
  };

  // 设置当前页面
  const setPage = (pageName) => {
    setCurrentPage(pageName);
    // 记录页面访问历史
    const history = JSON.parse(localStorage.getItem('pageHistory') || '[]');
    const newHistory = [pageName, ...history.filter(item => item !== pageName)].slice(0, 10); // 只保留最近10条
    localStorage.setItem('pageHistory', JSON.stringify(newHistory));
  };

  // 显示通知
  const showNotification = (message, type = 'info', duration = 3000) => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 清除错误
  const clearError = () => {
    setError(null);
  };

  // 更新用户信息
  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  // 获取用户偏好设置
  const getUserPreferences = () => {
    try {
      const preferences = localStorage.getItem('userPreferences');
      return preferences ? JSON.parse(preferences) : {};
    } catch (error) {
      console.error('获取用户偏好设置失败:', error);
      return {};
    }
  };

  // 设置用户偏好设置
  const setUserPreferences = (preferences) => {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('保存用户偏好设置失败:', error);
    }
  };

  // Context值
  const contextValue = {
    // 认证相关
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuthStatus,
    clearError,
    updateUser,
    
    // 权限相关
    hasPermission,
    hasDepartmentPermission,
    
    // UI状态相关
    sidebarCollapsed,
    toggleSidebar,
    currentPage,
    setPage,
    notification,
    showNotification,
    theme,
    toggleTheme,
    
    // 用户偏好设置
    getUserPreferences,
    setUserPreferences,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// 自定义Hook，用于在组件中使用Context
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};

// 导出权限检查的Hook
export const usePermissions = () => {
  const { hasPermission, hasDepartmentPermission, user } = useApp();
  
  return {
    hasPermission,
    hasDepartmentPermission,
    isAdmin: user?.role === 'admin',
    isDepartmentManager: user?.role === 'department_manager',
    isEmployee: user?.role === 'employee',
    userRole: user?.role,
  };
};

// 导出认证状态的Hook
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuthStatus,
    clearError,
    updateUser
  } = useApp();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuthStatus,
    clearError,
    updateUser
  };
};

// 导出UI状态的Hook
export const useUI = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
    currentPage,
    setPage,
    notification,
    showNotification,
    theme,
    toggleTheme
  } = useApp();
  
  return {
    sidebarCollapsed,
    toggleSidebar,
    currentPage,
    setPage,
    notification,
    showNotification,
    theme,
    toggleTheme
  };
};

export default AppContext;