import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth, useUI, usePermissions } from '../context/AppContext.jsx';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isAdmin, userRole } = usePermissions();
  const { toggleSidebar, sidebarCollapsed } = useUI();

  const handleLogout = () => {
    logout();
  };

  // 角色文本映射
  const roleTextMap = {
    admin: '管理员',
    department_manager: '部门主管',
    employee: '普通员工'
  };

  return (
    <div className="layout-container">
      {/* 顶部导航栏 */}
      <header className="header">
        <div className="header-left">
          <h1>企业设备领用与位置追溯系统</h1>
        </div>
        <div className="header-right">
          <span className="user-info">欢迎, {user?.fullName}</span>
          <span className="user-role">[{roleTextMap[userRole] || '用户'}]</span>
          <button className="logout-btn" onClick={handleLogout}>退出登录</button>
        </div>
      </header>

      {/* 主体内容 */}
      <div className="main-content">
        {/* 左侧菜单栏 */}
        <aside className="sidebar">
          <nav className="nav-menu">
            <ul>
              <li><Link to="/" className="nav-item">首页仪表盘</Link></li>
              <li><Link to="/assets" className="nav-item">资产管理</Link></li>
              <li><Link to="/qrcode" className="nav-item">二维码管理</Link></li>
              <li><Link to="/allocation" className="nav-item">领用与归还</Link></li>
              <li><Link to="/inventory" className="nav-item">盘点管理</Link></li>
              <li><Link to="/repair" className="nav-item">维修管理</Link></li>
              <li><Link to="/report-statistics" className="nav-item">报表统计</Link></li>
              <li><Link to="/notifications" className="nav-item">通知中心</Link></li>
            {isAdmin && (
              <li><Link to="/system-settings" className="nav-item">系统设置</Link></li>
            )}
            </ul>
          </nav>
        </aside>

        {/* 右侧内容区 */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;