import React, { useState, useEffect } from 'react';
import './SystemSettings.css';

const SystemSettings = () => {
  // 状态管理
  const [currentTab, setCurrentTab] = useState('basic'); // basic, user, department, qrcode, security, backup
  const [settings, setSettings] = useState({
    companyName: '企业设备管理系统',
    logoUrl: '',
    theme: 'light',
    language: 'zh-CN',
    assetCodePrefix: 'AST-',
    qrCodeSize: 200,
    qrCodeColor: '#000000',
    qrCodeBgColor: '#FFFFFF',
    autoBackup: true,
    backupFrequency: 'weekly',
    retentionPeriod: 30,
    maxUploadSize: 10,
    scanTimeout: 30,
    enableNotification: true,
    loginTimeout: 30
  });
  
  // 用户管理状态
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', name: '系统管理员', email: 'admin@example.com', role: 'admin', department: 'IT部门', status: 'active' },
    { id: 2, username: 'zhang.wei', name: '张伟', email: 'zhang.wei@example.com', role: 'manager', department: '研发部', status: 'active' },
    { id: 3, username: 'li.ming', name: '李明', email: 'li.ming@example.com', role: 'user', department: '财务部', status: 'active' },
    { id: 4, username: 'wang.hong', name: '王红', email: 'wang.hong@example.com', role: 'user', department: '行政部', status: 'inactive' }
  ]);
  
  // 部门管理状态
  const [departments, setDepartments] = useState([
    { id: 1, name: 'IT部门', manager: '张伟', description: '负责系统维护和技术支持' },
    { id: 2, name: '研发部', manager: '李明', description: '负责产品开发和创新' },
    { id: 3, name: '财务部', manager: '王红', description: '负责财务管理和报表' },
    { id: 4, name: '行政部', manager: '陈静', description: '负责行政事务和人事管理' },
    { id: 5, name: '销售部', manager: '赵强', description: '负责市场销售和客户关系' },
    { id: 6, name: '设计部', manager: '刘芳', description: '负责产品设计和用户体验' }
  ]);
  
  // 资产类型状态
  const [assetTypes, setAssetTypes] = useState([
    { id: 1, name: '笔记本电脑', category: '电子设备', depreciationYears: 3, unit: '台' },
    { id: 2, name: '台式电脑', category: '电子设备', depreciationYears: 5, unit: '台' },
    { id: 3, name: '显示器', category: '电子设备', depreciationYears: 5, unit: '台' },
    { id: 4, name: '打印机', category: '办公设备', depreciationYears: 5, unit: '台' },
    { id: 5, name: '扫描仪', category: '办公设备', depreciationYears: 5, unit: '台' },
    { id: 6, name: '平板设备', category: '电子设备', depreciationYears: 3, unit: '台' },
    { id: 7, name: '办公桌椅', category: '办公家具', depreciationYears: 10, unit: '套' },
    { id: 8, name: '空调', category: '电器设备', depreciationYears: 8, unit: '台' }
  ]);
  
  // 修改设置
  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // 保存设置
  const saveSettings = () => {
    // 模拟保存设置到服务器
    console.log('保存设置:', settings);
    alert('设置已保存！');
  };
  
  // 重置设置
  const resetSettings = () => {
    if (window.confirm('确定要重置所有设置吗？')) {
      // 重置为默认设置
      setSettings({
        companyName: '企业设备管理系统',
        logoUrl: '',
        theme: 'light',
        language: 'zh-CN',
        assetCodePrefix: 'AST-',
        qrCodeSize: 200,
        qrCodeColor: '#000000',
        qrCodeBgColor: '#FFFFFF',
        autoBackup: true,
        backupFrequency: 'weekly',
        retentionPeriod: 30,
        maxUploadSize: 10,
        scanTimeout: 30,
        enableNotification: true,
        loginTimeout: 30
      });
      alert('设置已重置！');
    }
  };
  
  // 渲染基础设置
  const renderBasicSettings = () => {
    return (
      <div className="settings-section">
        <h3>系统基础设置</h3>
        
        <div className="setting-group">
          <label className="setting-label">公司名称</label>
          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleSettingChange}
            className="setting-input"
            placeholder="请输入公司名称"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">公司Logo</label>
          <div className="logo-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                // 模拟上传Logo
                if (e.target.files && e.target.files[0]) {
                  // 在实际应用中，这里会上传文件并获取URL
                  alert('Logo上传成功！');
                }
              }}
              className="logo-input"
            />
            <button className="upload-btn">上传Logo</button>
            {settings.logoUrl && (
              <div className="logo-preview">
                <img src={settings.logoUrl} alt="公司Logo" />
                <button 
                  className="remove-btn"
                  onClick={() => setSettings(prev => ({ ...prev, logoUrl: '' }))}
                >
                  移除
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">系统主题</label>
          <div className="theme-selector">
            <label className="theme-option">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={settings.theme === 'light'}
                onChange={handleSettingChange}
              />
              <span className="theme-label">浅色主题</span>
            </label>
            <label className="theme-option">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={settings.theme === 'dark'}
                onChange={handleSettingChange}
              />
              <span className="theme-label">深色主题</span>
            </label>
          </div>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">系统语言</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleSettingChange}
            className="setting-select"
          >
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">资产编码前缀</label>
          <input
            type="text"
            name="assetCodePrefix"
            value={settings.assetCodePrefix}
            onChange={handleSettingChange}
            className="setting-input"
            placeholder="例如: AST-"
          />
        </div>
        
        <div className="setting-actions">
          <button className="save-btn" onClick={saveSettings}>保存设置</button>
          <button className="reset-btn" onClick={resetSettings}>重置设置</button>
        </div>
      </div>
    );
  };
  
  // 渲染用户管理
  const renderUserManagement = () => {
    return (
      <div className="settings-section">
        <div className="section-header">
          <h3>用户管理</h3>
          <button className="add-btn">添加用户</button>
        </div>
        
        <div className="user-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>用户ID</th>
                <th>用户名</th>
                <th>姓名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>所属部门</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-tag ${user.role}`}>
                      {user.role === 'admin' ? '管理员' : user.role === 'manager' ? '部门主管' : '普通用户'}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td>
                    <span className={`status-tag ${user.status}`}>
                      {user.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn">编辑</button>
                      <button className="delete-btn">删除</button>
                      <button className={`status-toggle ${user.status}`}>
                        {user.status === 'active' ? '禁用' : '启用'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <button className="page-btn">上一页</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">下一页</button>
        </div>
      </div>
    );
  };
  
  // 渲染部门管理
  const renderDepartmentManagement = () => {
    return (
      <div className="settings-section">
        <div className="section-header">
          <h3>部门管理</h3>
          <button className="add-btn">添加部门</button>
        </div>
        
        <div className="department-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>部门ID</th>
                <th>部门名称</th>
                <th>部门经理</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => (
                <tr key={dept.id}>
                  <td>{dept.id}</td>
                  <td>{dept.name}</td>
                  <td>{dept.manager}</td>
                  <td>{dept.description}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn">编辑</button>
                      <button className="delete-btn">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <button className="page-btn">上一页</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">下一页</button>
        </div>
      </div>
    );
  };
  
  // 渲染二维码设置
  const renderQrcodeSettings = () => {
    return (
      <div className="settings-section">
        <h3>二维码设置</h3>
        
        <div className="setting-group">
          <label className="setting-label">二维码大小 (px)</label>
          <input
            type="number"
            name="qrCodeSize"
            value={settings.qrCodeSize}
            onChange={handleSettingChange}
            className="setting-input"
            min="100"
            max="500"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">二维码颜色</label>
          <input
            type="color"
            name="qrCodeColor"
            value={settings.qrCodeColor}
            onChange={handleSettingChange}
            className="color-input"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">二维码背景颜色</label>
          <input
            type="color"
            name="qrCodeBgColor"
            value={settings.qrCodeBgColor}
            onChange={handleSettingChange}
            className="color-input"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">二维码内容格式</label>
          <select className="setting-select">
            <option value="assetCode">资产编码</option>
            <option value="assetCode+url">资产编码+系统URL</option>
            <option value="custom">自定义格式</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">标签模板</label>
          <div className="template-selector">
            <div className="template-option">
              <div className="template-preview small"></div>
              <span>小型标签</span>
              <input type="radio" name="template" checked />
            </div>
            <div className="template-option">
              <div className="template-preview medium"></div>
              <span>中型标签</span>
              <input type="radio" name="template" />
            </div>
            <div className="template-option">
              <div className="template-preview large"></div>
              <span>大型标签</span>
              <input type="radio" name="template" />
            </div>
          </div>
        </div>
        
        <div className="qrcode-preview-section">
          <h4>二维码预览</h4>
          <div className="qrcode-preview-container">
            <div className="qrcode-placeholder">
              <svg width={settings.qrCodeSize} height={settings.qrCodeSize} style={{ background: settings.qrCodeBgColor }}>
                <rect width={settings.qrCodeSize} height={settings.qrCodeSize} fill={settings.qrCodeBgColor} />
                <text x="50%" y="50%" textAnchor="middle" fill={settings.qrCodeColor} fontSize="20">二维码预览</text>
              </svg>
            </div>
            <div className="preview-info">
              <p>大小: {settings.qrCodeSize} x {settings.qrCodeSize} px</p>
              <p>颜色: {settings.qrCodeColor}</p>
              <p>背景: {settings.qrCodeBgColor}</p>
            </div>
          </div>
        </div>
        
        <div className="setting-actions">
          <button className="save-btn" onClick={saveSettings}>保存设置</button>
        </div>
      </div>
    );
  };
  
  // 渲染安全设置
  const renderSecuritySettings = () => {
    return (
      <div className="settings-section">
        <h3>安全设置</h3>
        
        <div className="setting-group">
          <label className="setting-label">启用登录超时</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="loginTimeoutEnabled"
              checked={true}
              onChange={handleSettingChange}
            />
            <span>自动登出用户</span>
          </div>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">登录超时时间 (分钟)</label>
          <input
            type="number"
            name="loginTimeout"
            value={settings.loginTimeout}
            onChange={handleSettingChange}
            className="setting-input"
            min="5"
            max="120"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">启用密码强度要求</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="passwordStrengthEnabled"
              checked={true}
              onChange={handleSettingChange}
            />
            <span>要求密码包含大小写字母、数字和特殊字符</span>
          </div>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">密码过期时间 (天)</label>
          <select className="setting-select">
            <option value="0">永不</option>
            <option value="30">30天</option>
            <option value="60" selected>60天</option>
            <option value="90">90天</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">启用双因素认证</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="twoFactorAuthEnabled"
              checked={false}
              onChange={handleSettingChange}
            />
            <span>登录时需要额外验证</span>
          </div>
        </div>
        
        <div className="setting-actions">
          <button className="save-btn" onClick={saveSettings}>保存设置</button>
        </div>
      </div>
    );
  };
  
  // 渲染备份设置
  const renderBackupSettings = () => {
    return (
      <div className="settings-section">
        <h3>数据备份设置</h3>
        
        <div className="setting-group">
          <label className="setting-label">自动备份</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="autoBackup"
              checked={settings.autoBackup}
              onChange={handleSettingChange}
            />
            <span>定期自动备份系统数据</span>
          </div>
        </div>
        
        <div className={`setting-group ${!settings.autoBackup ? 'disabled' : ''}`}>
          <label className="setting-label">备份频率</label>
          <select
            name="backupFrequency"
            value={settings.backupFrequency}
            onChange={handleSettingChange}
            className="setting-select"
            disabled={!settings.autoBackup}
          >
            <option value="daily">每天</option>
            <option value="weekly">每周</option>
            <option value="monthly">每月</option>
          </select>
        </div>
        
        <div className={`setting-group ${!settings.autoBackup ? 'disabled' : ''}`}>
          <label className="setting-label">备份保留期 (天)</label>
          <input
            type="number"
            name="retentionPeriod"
            value={settings.retentionPeriod}
            onChange={handleSettingChange}
            className="setting-input"
            min="1"
            max="365"
            disabled={!settings.autoBackup}
          />
        </div>
        
        <div className="backup-section">
          <h4>手动备份</h4>
          <button className="backup-btn">立即备份数据</button>
        </div>
        
        <div className="backup-history">
          <h4>备份历史</h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>备份时间</th>
                <th>文件大小</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-01-15 03:00:00</td>
                <td>12.5 MB</td>
                <td><span className="status-tag success">成功</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="download-btn">下载</button>
                    <button className="restore-btn">恢复</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2024-01-14 03:00:00</td>
                <td>12.3 MB</td>
                <td><span className="status-tag success">成功</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="download-btn">下载</button>
                    <button className="restore-btn">恢复</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2024-01-13 03:00:00</td>
                <td>12.1 MB</td>
                <td><span className="status-tag success">成功</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="download-btn">下载</button>
                    <button className="restore-btn">恢复</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="setting-actions">
          <button className="save-btn" onClick={saveSettings}>保存设置</button>
        </div>
      </div>
    );
  };
  
  // 渲染资产类型管理
  const renderAssetTypeManagement = () => {
    return (
      <div className="settings-section">
        <div className="section-header">
          <h3>资产类型管理</h3>
          <button className="add-btn">添加资产类型</button>
        </div>
        
        <div className="asset-type-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>类型ID</th>
                <th>类型名称</th>
                <th>分类</th>
                <th>折旧年限</th>
                <th>单位</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {assetTypes.map(type => (
                <tr key={type.id}>
                  <td>{type.id}</td>
                  <td>{type.name}</td>
                  <td>{type.category}</td>
                  <td>{type.depreciationYears}年</td>
                  <td>{type.unit}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn">编辑</button>
                      <button className="delete-btn">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="setting-actions">
          <button className="save-btn">保存更改</button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="system-settings">
      <h2>系统设置</h2>
      
      <div className="settings-sidebar">
        <nav className="settings-nav">
          <ul>
            <li>
              <button 
                className={`nav-item ${currentTab === 'basic' ? 'active' : ''}`}
                onClick={() => setCurrentTab('basic')}
              >
                <span className="nav-icon">⚙️</span>
                <span>基础设置</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${currentTab === 'user' ? 'active' : ''}`}
                onClick={() => setCurrentTab('user')}
              >
                <span className="nav-icon">👥</span>
                <span>用户管理</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${currentTab === 'department' ? 'active' : ''}`}
                onClick={() => setCurrentTab('department')}
              >
                <span className="nav-icon">🏢</span>
                <span>部门管理</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${currentTab === 'assetType' ? 'active' : ''}`}
                onClick={() => setCurrentTab('assetType')}
              >
                <span className="nav-icon">📋</span>
                <span>资产类型</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${currentTab === 'qrcode' ? 'active' : ''}`}
                onClick={() => setCurrentTab('qrcode')}
              >
                <span className="nav-icon">📱</span>
                <span>二维码设置</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${currentTab === 'security' ? 'active' : ''}`}
                onClick={() => setCurrentTab('security')}
              >
                <span className="nav-icon">🔒</span>
                <span>安全设置</span>
              </button>
            </li>
            <li>
              <button 
                className={`nav-item ${currentTab === 'backup' ? 'active' : ''}`}
                onClick={() => setCurrentTab('backup')}
              >
                <span className="nav-icon">💾</span>
                <span>备份设置</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="settings-content">
        {currentTab === 'basic' && renderBasicSettings()}
        {currentTab === 'user' && renderUserManagement()}
        {currentTab === 'department' && renderDepartmentManagement()}
        {currentTab === 'assetType' && renderAssetTypeManagement()}
        {currentTab === 'qrcode' && renderQrcodeSettings()}
        {currentTab === 'security' && renderSecuritySettings()}
        {currentTab === 'backup' && renderBackupSettings()}
      </div>
    </div>
  );
};

export default SystemSettings;