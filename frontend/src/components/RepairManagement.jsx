import React, { useState, useEffect } from 'react';
import './RepairManagement.css';

const RepairManagement = () => {
  // 状态管理
  const [currentTab, setCurrentTab] = useState('list'); // list, add, detail
  const [repairs, setRepairs] = useState([]);
  const [assets, setAssets] = useState([]);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [newRepair, setNewRepair] = useState({
    assetId: '',
    repairType: '',
    description: '',
    repairCost: '',
    repairDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  });
  const [filter, setFilter] = useState({
    status: '',
    assetId: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // 维修类型选项
  const repairTypes = [
    { id: 'hardware', name: '硬件故障' },
    { id: 'software', name: '软件故障' },
    { id: 'maintenance', name: '定期维护' },
    { id: 'upgrade', name: '升级改造' },
    { id: 'other', name: '其他' }
  ];
  
  // 维修状态选项
  const statusOptions = [
    { id: 'pending', name: '待处理' },
    { id: 'processing', name: '维修中' },
    { id: 'completed', name: '已完成' },
    { id: 'canceled', name: '已取消' }
  ];
  
  // 模拟资产数据
  useEffect(() => {
    setAssets([
      { id: 'AST001', name: 'ThinkPad X1 Carbon', model: 'X1C Gen 9', serialNumber: 'SN123456', location: '研发部-3楼', status: '在用' },
      { id: 'AST002', name: 'Dell OptiPlex 7090', model: 'OptiPlex 7090', serialNumber: 'SN654321', location: '财务部-2楼', status: '在用' },
      { id: 'AST003', name: 'HP LaserJet Pro', model: 'M404n', serialNumber: 'SN987654', location: '行政部-1楼', status: '在用' },
      { id: 'AST004', name: 'MacBook Pro 14', model: 'M2 Pro', serialNumber: 'SN321654', location: '设计部-4楼', status: '在用' },
      { id: 'AST005', name: 'iPad Pro 12.9', model: '5th Gen', serialNumber: 'SN456987', location: '销售部-3楼', status: '在用' },
    ]);
    
    // 模拟维修记录数据
    setRepairs([
      { id: 'RP001', assetId: 'AST001', assetName: 'ThinkPad X1 Carbon', repairType: '硬件故障', description: '屏幕闪烁，需要更换屏幕', repairCost: 1200, repairDate: '2024-01-15', status: 'completed', completionDate: '2024-01-18', notes: '更换了全新的屏幕组件' },
      { id: 'RP002', assetId: 'AST002', assetName: 'Dell OptiPlex 7090', repairType: '硬件故障', description: '硬盘损坏，无法启动', repairCost: 800, repairDate: '2024-01-14', status: 'processing', notes: '已订购新硬盘，等待到货' },
      { id: 'RP003', assetId: 'AST003', assetName: 'HP LaserJet Pro', repairType: '定期维护', description: '清理内部灰尘，更换墨盒', repairCost: 200, repairDate: '2024-01-12', status: 'completed', completionDate: '2024-01-12', notes: '维护后打印质量良好' },
      { id: 'RP004', assetId: 'AST004', assetName: 'MacBook Pro 14', repairType: '软件故障', description: '系统崩溃，需要重装系统', repairCost: 300, repairDate: '2024-01-10', status: 'pending', notes: '' },
      { id: 'RP005', assetId: 'AST005', assetName: 'iPad Pro 12.9', repairType: '升级改造', description: '更换电池，提升续航', repairCost: 500, repairDate: '2024-01-09', status: 'completed', completionDate: '2024-01-11', notes: '更换电池后续航提升约40%' },
    ]);
  }, []);
  
  // 获取筛选后的维修记录
  const getFilteredRepairs = () => {
    return repairs.filter(repair => {
      // 按状态筛选
      if (filter.status && repair.status !== filter.status) return false;
      // 按资产编号筛选
      if (filter.assetId && !repair.assetId.toLowerCase().includes(filter.assetId.toLowerCase())) return false;
      // 按日期范围筛选
      if (filter.dateFrom && repair.repairDate < filter.dateFrom) return false;
      if (filter.dateTo && repair.repairDate > filter.dateTo) return false;
      return true;
    });
  };
  
  // 获取资产信息
  const getAssetInfo = (assetId) => {
    return assets.find(asset => asset.id === assetId);
  };
  
  // 获取状态名称
  const getStatusName = (statusId) => {
    return statusOptions.find(option => option.id === statusId)?.name || statusId;
  };
  
  // 获取维修类型名称
  const getRepairTypeName = (typeId) => {
    return repairTypes.find(type => type.id === typeId)?.name || typeId;
  };
  
  // 处理筛选条件变化
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };
  
  // 重置筛选条件
  const resetFilter = () => {
    setFilter({
      status: '',
      assetId: '',
      dateFrom: '',
      dateTo: ''
    });
  };
  
  // 添加新维修记录
  const handleAddRepair = () => {
    // 验证表单
    if (!newRepair.assetId || !newRepair.repairType || !newRepair.description) {
      alert('请填写必填字段');
      return;
    }
    
    const asset = getAssetInfo(newRepair.assetId);
    if (!asset) {
      alert('找不到对应的资产信息');
      return;
    }
    
    const repair = {
      id: `RP${String(repairs.length + 1).padStart(3, '0')}`,
      assetId: newRepair.assetId,
      assetName: asset.name,
      repairType: newRepair.repairType,
      description: newRepair.description,
      repairCost: parseFloat(newRepair.repairCost) || 0,
      repairDate: newRepair.repairDate,
      status: newRepair.status,
      completionDate: newRepair.status === 'completed' ? newRepair.repairDate : null,
      notes: ''
    };
    
    setRepairs(prev => [repair, ...prev]);
    setCurrentTab('list');
    
    // 重置表单
    setNewRepair({
      assetId: '',
      repairType: '',
      description: '',
      repairCost: '',
      repairDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
    
    alert('维修记录添加成功！');
  };
  
  // 更新维修记录状态
  const updateRepairStatus = (id, status) => {
    const updatedRepairs = repairs.map(repair => {
      if (repair.id === id) {
        return {
          ...repair,
          status,
          completionDate: status === 'completed' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return repair;
    });
    
    setRepairs(updatedRepairs);
    
    if (selectedRepair && selectedRepair.id === id) {
      const updatedSelected = updatedRepairs.find(r => r.id === id);
      setSelectedRepair(updatedSelected);
    }
    
    alert('维修状态更新成功！');
  };
  
  // 查看维修详情
  const viewRepairDetail = (repair) => {
    setSelectedRepair(repair);
    setCurrentTab('detail');
  };
  
  // 编辑维修记录
  const handleEditRepair = () => {
    if (!selectedRepair) return;
    
    const updatedRepairs = repairs.map(repair => {
      if (repair.id === selectedRepair.id) {
        return {
          ...repair,
          description: selectedRepair.description,
          repairCost: parseFloat(selectedRepair.repairCost) || 0,
          notes: selectedRepair.notes
        };
      }
      return repair;
    });
    
    setRepairs(updatedRepairs);
    alert('维修记录更新成功！');
  };
  
  // 计算维修统计
  const getRepairStats = () => {
    const total = repairs.length;
    const completed = repairs.filter(r => r.status === 'completed').length;
    const processing = repairs.filter(r => r.status === 'processing').length;
    const pending = repairs.filter(r => r.status === 'pending').length;
    const totalCost = repairs.reduce((sum, r) => sum + (r.repairCost || 0), 0);
    
    return { total, completed, processing, pending, totalCost };
  };
  
  const stats = getRepairStats();
  
  // 获取状态对应的样式类
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'completed': return 'status-completed';
      case 'canceled': return 'status-canceled';
      default: return '';
    }
  };
  
  return (
    <div className="repair-management">
      <h2>维修管理</h2>
      
      {/* 标签页 */}
      <div className="tabs">
        <button 
          className={`tab-btn ${currentTab === 'list' ? 'active' : ''}`}
          onClick={() => setCurrentTab('list')}
        >
          维修记录列表
        </button>
        <button 
          className={`tab-btn ${currentTab === 'add' ? 'active' : ''}`}
          onClick={() => setCurrentTab('add')}
        >
          添加维修记录
        </button>
        {currentTab === 'detail' && (
          <button 
            className={`tab-btn ${currentTab === 'detail' ? 'active' : ''}`}
          >
            维修详情
          </button>
        )}
      </div>
      
      {/* 维修记录列表 */}
      {currentTab === 'list' && (
        <div className="tab-content">
          {/* 统计卡片 */}
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">总维修次数</div>
              </div>
              <div className="stat-card">
                <div className="stat-value completed">{stats.completed}</div>
                <div className="stat-label">已完成</div>
              </div>
              <div className="stat-card">
                <div className="stat-value processing">{stats.processing}</div>
                <div className="stat-label">维修中</div>
              </div>
              <div className="stat-card">
                <div className="stat-value pending">{stats.pending}</div>
                <div className="stat-label">待处理</div>
              </div>
              <div className="stat-card">
                <div className="stat-value cost">¥{stats.totalCost.toLocaleString()}</div>
                <div className="stat-label">维修总成本</div>
              </div>
            </div>
          </div>
          
          {/* 筛选条件 */}
          <div className="filter-section">
            <div className="filter-row">
              <div className="filter-group">
                <label>状态</label>
                <select name="status" value={filter.status} onChange={handleFilterChange}>
                  <option value="">全部</option>
                  {statusOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>资产编号</label>
                <input 
                  type="text" 
                  name="assetId" 
                  value={filter.assetId} 
                  onChange={handleFilterChange}
                  placeholder="请输入资产编号"
                />
              </div>
              <div className="filter-group">
                <label>维修日期从</label>
                <input 
                  type="date" 
                  name="dateFrom" 
                  value={filter.dateFrom} 
                  onChange={handleFilterChange}
                />
              </div>
              <div className="filter-group">
                <label>维修日期至</label>
                <input 
                  type="date" 
                  name="dateTo" 
                  value={filter.dateTo} 
                  onChange={handleFilterChange}
                />
              </div>
              <div className="filter-actions">
                <button className="primary-btn search-btn">搜索</button>
                <button className="secondary-btn reset-btn" onClick={resetFilter}>重置</button>
              </div>
            </div>
          </div>
          
          {/* 维修记录表格 */}
          <div className="repair-table-container">
            <table className="repair-table">
              <thead>
                <tr>
                  <th>维修编号</th>
                  <th>资产编号</th>
                  <th>资产名称</th>
                  <th>维修类型</th>
                  <th>维修日期</th>
                  <th>维修费用</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredRepairs().length > 0 ? (
                  getFilteredRepairs().map(repair => (
                    <tr key={repair.id}>
                      <td>{repair.id}</td>
                      <td>{repair.assetId}</td>
                      <td>{repair.assetName}</td>
                      <td>{getRepairTypeName(repair.repairType)}</td>
                      <td>{repair.repairDate}</td>
                      <td>¥{repair.repairCost}</td>
                      <td>
                        <span className={`status-tag ${getStatusClass(repair.status)}`}>
                          {getStatusName(repair.status)}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="action-btn view-btn"
                          onClick={() => viewRepairDetail(repair)}
                        >
                          查看
                        </button>
                        {repair.status !== 'completed' && repair.status !== 'canceled' && (
                          <button 
                            className="action-btn status-btn"
                            onClick={() => updateRepairStatus(repair.id, 'processing')}
                          >
                            开始维修
                          </button>
                        )}
                        {repair.status === 'processing' && (
                          <button 
                            className="action-btn status-btn"
                            onClick={() => updateRepairStatus(repair.id, 'completed')}
                          >
                            完成维修
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="empty-row">暂无维修记录</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* 添加维修记录 */}
      {currentTab === 'add' && (
        <div className="tab-content">
          <div className="add-repair-form">
            <h3>添加维修记录</h3>
            
            <div className="form-section">
              <h4>选择资产</h4>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>资产编号/名称</label>
                  <select 
                    value={newRepair.assetId} 
                    onChange={(e) => setNewRepair(prev => ({ ...prev, assetId: e.target.value }))}
                  >
                    <option value="">请选择资产</option>
                    {assets.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.id} - {asset.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>维修信息</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>维修类型</label>
                  <select 
                    value={newRepair.repairType} 
                    onChange={(e) => setNewRepair(prev => ({ ...prev, repairType: e.target.value }))}
                  >
                    <option value="">请选择维修类型</option>
                    {repairTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>维修日期</label>
                  <input 
                    type="date" 
                    value={newRepair.repairDate} 
                    onChange={(e) => setNewRepair(prev => ({ ...prev, repairDate: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>维修费用</label>
                  <input 
                    type="number" 
                    value={newRepair.repairCost} 
                    onChange={(e) => setNewRepair(prev => ({ ...prev, repairCost: e.target.value }))}
                    placeholder="请输入维修费用"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>故障描述</label>
                <textarea 
                  value={newRepair.description} 
                  onChange={(e) => setNewRepair(prev => ({ ...prev, description: e.target.value }))}
                  rows="4" 
                  placeholder="请详细描述故障情况"
                />
              </div>
              
              <div className="form-group">
                <label>初始状态</label>
                <select 
                  value={newRepair.status} 
                  onChange={(e) => setNewRepair(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="pending">待处理</option>
                  <option value="processing">维修中</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="primary-btn" onClick={handleAddRepair}>添加记录</button>
              <button className="secondary-btn" onClick={() => setCurrentTab('list')}>取消</button>
            </div>
          </div>
        </div>
      )}
      
      {/* 维修详情 */}
      {currentTab === 'detail' && selectedRepair && (
        <div className="tab-content">
          <div className="repair-detail">
            <h3>维修详情</h3>
            
            <div className="detail-header">
              <div className="repair-basic-info">
                <p><strong>维修编号:</strong> {selectedRepair.id}</p>
                <p><strong>状态:</strong> 
                  <span className={`status-tag ${getStatusClass(selectedRepair.status)}`}>
                    {getStatusName(selectedRepair.status)}
                  </span>
                </p>
              </div>
              <div className="detail-actions">
                <button 
                  className="secondary-btn"
                  onClick={() => setCurrentTab('list')}
                >
                  返回列表
                </button>
              </div>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <h4>资产信息</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">资产编号:</span>
                    <span className="info-value">{selectedRepair.assetId}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">资产名称:</span>
                    <span className="info-value">{selectedRepair.assetName}</span>
                  </div>
                  {getAssetInfo(selectedRepair.assetId) && (
                    <>
                      <div className="info-item">
                        <span className="info-label">序列号:</span>
                        <span className="info-value">{getAssetInfo(selectedRepair.assetId).serialNumber}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">型号:</span>
                        <span className="info-value">{getAssetInfo(selectedRepair.assetId).model}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">位置:</span>
                        <span className="info-value">{getAssetInfo(selectedRepair.assetId).location}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>维修信息</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">维修类型:</span>
                    <span className="info-value">{getRepairTypeName(selectedRepair.repairType)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">维修日期:</span>
                    <span className="info-value">{selectedRepair.repairDate}</span>
                  </div>
                  {selectedRepair.completionDate && (
                    <div className="info-item">
                      <span className="info-label">完成日期:</span>
                      <span className="info-value">{selectedRepair.completionDate}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">维修费用:</span>
                    <span className="info-value cost">¥{selectedRepair.repairCost}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>详细说明</h4>
                <div className="description-box">
                  <p><strong>故障描述:</strong></p>
                  <p>{selectedRepair.description}</p>
                </div>
                
                <div className="notes-box">
                  <label>维修备注:</label>
                  <textarea 
                    value={selectedRepair.notes} 
                    onChange={(e) => setSelectedRepair(prev => ({ ...prev, notes: e.target.value }))}
                    rows="3" 
                  />
                </div>
              </div>
              
              <div className="detail-actions-bottom">
                <button 
                  className="primary-btn"
                  onClick={handleEditRepair}
                >
                  保存修改
                </button>
                
                {selectedRepair.status !== 'completed' && selectedRepair.status !== 'canceled' && (
                  <>
                    <button 
                      className="secondary-btn"
                      onClick={() => updateRepairStatus(selectedRepair.id, 'processing')}
                    >
                      开始维修
                    </button>
                    <button 
                      className="secondary-btn"
                      onClick={() => updateRepairStatus(selectedRepair.id, 'canceled')}
                    >
                      取消维修
                    </button>
                  </>
                )}
                
                {selectedRepair.status === 'processing' && (
                  <button 
                    className="secondary-btn"
                    onClick={() => updateRepairStatus(selectedRepair.id, 'completed')}
                  >
                    完成维修
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairManagement;