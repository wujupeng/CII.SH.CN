import React from 'react';
import { usePermissions } from '../context/AppContext.jsx';
import './SystemManagement.css';

const SystemManagement = () => {
  const { isAdmin } = usePermissions();

  // 如果不是管理员，重定向或显示无权限提示
  if (!isAdmin) {
    return (
      <div className="system-management-container">
        <div className="access-denied">
          <h2>权限不足</h2>
          <p>您没有访问系统管理功能的权限，请联系系统管理员。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="system-management-container">
      <div className="page-header">
        <h1>系统管理</h1>
        <p>管理系统的核心配置和维护功能</p>
      </div>
      
      <div className="system-management-cards">
        <div className="management-card">
          <h3>用户管理</h3>
          <p>添加、编辑和管理系统用户账号</p>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-value">15</span>
              <span className="stat-label">活跃用户</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">管理员</span>
            </div>
          </div>
        </div>
        
        <div className="management-card">
          <h3>部门管理</h3>
          <p>配置公司部门结构和组织架构</p>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-value">8</span>
              <span className="stat-label">部门数量</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">层级深度</span>
            </div>
          </div>
        </div>
        
        <div className="management-card">
          <h3>位置管理</h3>
          <p>管理资产存放位置信息</p>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-value">20</span>
              <span className="stat-label">位置数量</span>
            </div>
          </div>
        </div>
        
        <div className="management-card">
          <h3>资产分类管理</h3>
          <p>配置资产类型和分类标准</p>
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-value">6</span>
              <span className="stat-label">主要分类</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="system-settings-section">
        <h2>系统配置</h2>
        <div className="settings-grid">
          <div className="setting-item">
            <label>系统名称</label>
            <p>企业设备领用与位置追溯系统</p>
          </div>
          <div className="setting-item">
            <label>系统版本</label>
            <p>v1.0.0</p>
          </div>
          <div className="setting-item">
            <label>数据库状态</label>
            <p className="status-online">正常</p>
          </div>
          <div className="setting-item">
            <label>最后备份时间</label>
            <p>2024-01-15 23:00:00</p>
          </div>
        </div>
      </div>
      
      <div className="system-maintenance-section">
        <h2>系统维护</h2>
        <div className="maintenance-actions">
          <button className="maintenance-btn">
            <span className="btn-icon">📊</span>
            生成系统日志
          </button>
          <button className="maintenance-btn">
            <span className="btn-icon">💾</span>
            备份数据库
          </button>
          <button className="maintenance-btn">
            <span className="btn-icon">🔄</span>
            清理缓存
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemManagement;