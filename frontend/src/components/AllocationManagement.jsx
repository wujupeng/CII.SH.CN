import React, { useState } from 'react';
import './AllocationManagement.css';

const AllocationManagement = () => {
  const [activeTab, setActiveTab] = useState('allocate'); // allocate, return, history
  const [scanResult, setScanResult] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [allocationReason, setAllocationReason] = useState('');
  const [returnRemark, setReturnRemark] = useState('');

  // 模拟资产数据
  const assets = [
    { id: 1, code: 'AST-2025-0001', name: '联想ThinkPad T14', status: 'in_stock' },
    { id: 2, code: 'AST-2025-0002', name: 'Dell显示器', status: 'in_stock' },
    { id: 3, code: 'AST-2025-0003', name: 'HP激光打印机', status: 'repairing' },
    { id: 4, code: 'AST-2025-0004', name: 'MacBook Pro', status: 'in_use' },
    { id: 5, code: 'AST-2025-0005', name: 'iPad Pro', status: 'in_use' }
  ];

  // 模拟用户数据
  const users = [
    { id: 1, name: '张三', department: '研发部' },
    { id: 2, name: '李四', department: '市场部' },
    { id: 3, name: '王五', department: '财务部' },
    { id: 4, name: '赵六', department: '人力资源部' }
  ];

  // 模拟分配历史
  const allocationHistory = [
    { id: 1, assetCode: 'AST-2025-0001', assetName: '联想ThinkPad T14', operation: 'allocate', userName: '张三', date: '2025-11-01 14:30', remark: '新员工入职' },
    { id: 2, assetCode: 'AST-2025-0005', assetName: 'iPad Pro', operation: 'return', userName: '王五', date: '2025-10-28 16:45', remark: '项目结束' },
    { id: 3, assetCode: 'AST-2025-0004', assetName: 'MacBook Pro', operation: 'allocate', userName: '李四', date: '2025-10-25 09:15', remark: '升级设备' }
  ];

  // 处理扫码
  const handleScan = () => {
    // 模拟扫码结果
    const mockScanResult = 'ast:AST-2025-0001:aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==';
    setScanResult(mockScanResult);
    
    // 解析资产编码
    const assetCode = mockScanResult.split(':')[1];
    const asset = assets.find(a => a.code === assetCode);
    setSelectedAsset(asset);
  };

  // 处理领用
  const handleAllocate = () => {
    if (!selectedAsset || !selectedUser || !allocationReason) {
      alert('请填写完整信息');
      return;
    }
    
    alert(`资产 ${selectedAsset.code} - ${selectedAsset.name} 已成功分配给 ${users.find(u => u.id.toString() === selectedUser)?.name}`);
    // 重置表单
    setSelectedAsset(null);
    setSelectedUser('');
    setAllocationReason('');
    setScanResult('');
  };

  // 处理归还
  const handleReturn = () => {
    if (!selectedAsset) {
      alert('请先扫码选择资产');
      return;
    }
    
    alert(`资产 ${selectedAsset.code} - ${selectedAsset.name} 已成功归还`);
    // 重置表单
    setSelectedAsset(null);
    setReturnRemark('');
    setScanResult('');
  };

  // 获取操作类型文本
  const getOperationText = (operation) => {
    return operation === 'allocate' ? '领用' : '归还';
  };

  // 获取操作类型样式
  const getOperationClass = (operation) => {
    return operation === 'allocate' ? 'operation-allocate' : 'operation-return';
  };

  return (
    <div className="allocation-management">
      <h2>领用与归还管理</h2>

      {/* 标签页切换 */}
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'allocate' ? 'active' : ''}`}
          onClick={() => setActiveTab('allocate')}
        >
          资产领用
        </button>
        <button 
          className={`tab-btn ${activeTab === 'return' ? 'active' : ''}`}
          onClick={() => setActiveTab('return')}
        >
          资产归还
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          操作历史
        </button>
      </div>

      {/* 资产领用面板 */}
      {activeTab === 'allocate' && (
        <div className="tab-content">
          <div className="scan-section">
            <h3>扫码领用</h3>
            <div className="scan-actions">
              <button className="btn-primary scan-btn" onClick={handleScan}>
                打开扫码
              </button>
              {scanResult && (
                <div className="scan-result">
                  <strong>扫描结果：</strong>{scanResult}
                </div>
              )}
            </div>
          </div>

          {selectedAsset && (
            <div className="asset-form-card">
              <h4>资产信息</h4>
              <div className="asset-info">
                <p><strong>资产编码：</strong>{selectedAsset.code}</p>
                <p><strong>资产名称：</strong>{selectedAsset.name}</p>
                <p><strong>当前状态：</strong>{selectedAsset.status === 'in_stock' ? '库存中' : '使用中'}</p>
              </div>

              <div className="form-group">
                <label>选择领用人</label>
                <select 
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">-- 请选择领用人 --</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name} - {user.department}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>领用原因</label>
                <textarea 
                  value={allocationReason}
                  onChange={(e) => setAllocationReason(e.target.value)}
                  placeholder="请输入领用原因"
                  rows="3"
                ></textarea>
              </div>

              <button className="btn-primary submit-btn" onClick={handleAllocate}>
                确认领用
              </button>
            </div>
          )}

          <div className="manual-allocation">
            <h3>手动分配</h3>
            <div className="form-group">
              <label>搜索资产</label>
              <input type="text" placeholder="输入资产编码或名称搜索" />
            </div>
            <button className="btn-secondary">查询可用资产</button>
          </div>
        </div>
      )}

      {/* 资产归还面板 */}
      {activeTab === 'return' && (
        <div className="tab-content">
          <div className="scan-section">
            <h3>扫码归还</h3>
            <div className="scan-actions">
              <button className="btn-primary scan-btn" onClick={handleScan}>
                打开扫码
              </button>
              {scanResult && (
                <div className="scan-result">
                  <strong>扫描结果：</strong>{scanResult}
                </div>
              )}
            </div>
          </div>

          {selectedAsset && (
            <div className="asset-form-card">
              <h4>资产信息</h4>
              <div className="asset-info">
                <p><strong>资产编码：</strong>{selectedAsset.code}</p>
                <p><strong>资产名称：</strong>{selectedAsset.name}</p>
                <p><strong>当前状态：</strong>{selectedAsset.status === 'in_use' ? '使用中' : '库存中'}</p>
              </div>

              <div className="form-group">
                <label>归还备注</label>
                <textarea 
                  value={returnRemark}
                  onChange={(e) => setReturnRemark(e.target.value)}
                  placeholder="请输入归还备注（可选）"
                  rows="3"
                ></textarea>
              </div>

              <button className="btn-primary submit-btn" onClick={handleReturn}>
                确认归还
              </button>
            </div>
          )}

          <div className="user-assets">
            <h3>我的借用资产</h3>
            <div className="assets-list">
              {assets.filter(a => a.status === 'in_use').map(asset => (
                <div key={asset.id} className="asset-item">
                  <div className="asset-details">
                    <strong>{asset.code}</strong>
                    <span>{asset.name}</span>
                  </div>
                  <button className="btn-action return-btn">归还</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 操作历史面板 */}
      {activeTab === 'history' && (
        <div className="tab-content">
          <div className="filter-section">
            <input type="text" placeholder="搜索资产编码或名称" className="filter-input" />
            <input type="text" placeholder="搜索用户" className="filter-input" />
            <select className="filter-select">
              <option value="all">全部操作</option>
              <option value="allocate">领用</option>
              <option value="return">归还</option>
            </select>
            <button className="btn-secondary search-btn">查询</button>
          </div>

          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>资产编码</th>
                  <th>资产名称</th>
                  <th>操作类型</th>
                  <th>操作人</th>
                  <th>操作时间</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                {allocationHistory.map(record => (
                  <tr key={record.id}>
                    <td>{record.assetCode}</td>
                    <td>{record.assetName}</td>
                    <td><span className={`operation-tag ${getOperationClass(record.operation)}`}>{getOperationText(record.operation)}</span></td>
                    <td>{record.userName}</td>
                    <td>{record.date}</td>
                    <td>{record.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button className="btn-page" disabled>上一页</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">下一页</button>
            <span className="page-info">共 {allocationHistory.length} 条记录</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllocationManagement;