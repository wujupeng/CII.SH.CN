import React, { useState, useEffect } from 'react';
import './AssetManagement.css';

const AssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    assetName: '',
    assetType: '',
    status: 'all'
  });

  // 模拟获取资产数据
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      // 模拟API请求延迟
      setTimeout(() => {
        const mockAssets = [
          { id: 1, assetCode: 'AST-2025-0001', assetName: '联想ThinkPad T14', assetType: '笔记本电脑', brand: '联想', model: 'ThinkPad T14', serialNumber: 'TP14-2025001', status: 'in_use', currentUser: '张三' },
          { id: 2, assetCode: 'AST-2025-0002', assetName: 'Dell显示器', assetType: '显示器', brand: 'Dell', model: 'U2720Q', serialNumber: 'DELL-2025002', status: 'in_stock', currentUser: '' },
          { id: 3, assetCode: 'AST-2025-0003', assetName: 'HP激光打印机', assetType: '打印机', brand: 'HP', model: 'LaserJet Pro', serialNumber: 'HP-2025003', status: 'repairing', currentUser: '' },
          { id: 4, assetCode: 'AST-2025-0004', assetName: 'MacBook Pro', assetType: '笔记本电脑', brand: 'Apple', model: 'MacBook Pro 14', serialNumber: 'MBA-2025004', status: 'in_use', currentUser: '李四' },
          { id: 5, assetCode: 'AST-2025-0005', assetName: 'iPad Pro', assetType: '平板电脑', brand: 'Apple', model: 'iPad Pro 12.9', serialNumber: 'IPD-2025005', status: 'in_use', currentUser: '王五' }
        ];
        setAssets(mockAssets);
        setLoading(false);
      }, 800);
    };

    fetchAssets();
  }, []);

  // 过滤资产列表
  const filteredAssets = assets.filter(asset => {
    const matchesName = asset.assetName.toLowerCase().includes(filters.assetName.toLowerCase());
    const matchesType = asset.assetType.toLowerCase().includes(filters.assetType.toLowerCase());
    const matchesStatus = filters.status === 'all' || asset.status === filters.status;
    return matchesName && matchesType && matchesStatus;
  });

  // 获取状态中文名称
  const getStatusText = (status) => {
    const statusMap = {
      'in_stock': '库存中',
      'in_use': '使用中',
      'repairing': '维修中',
      'scrapped': '已报废'
    };
    return statusMap[status] || status;
  };

  // 获取状态样式类
  const getStatusClass = (status) => {
    const classMap = {
      'in_stock': 'status-stock',
      'in_use': 'status-use',
      'repairing': 'status-repair',
      'scrapped': 'status-scrap'
    };
    return classMap[status] || '';
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  // 操作按钮处理函数
  const handleAddAsset = () => {
    alert('新增资产功能将在未来实现');
  };

  const handleBulkImport = () => {
    alert('批量导入功能将在未来实现');
  };

  const handleExportData = () => {
    alert('导出数据功能将在未来实现');
  };

  // 资产操作处理函数
  const handleViewAsset = (assetId) => {
    alert(`查看资产 ID: ${assetId}`);
  };

  const handleEditAsset = (assetId) => {
    alert(`编辑资产 ID: ${assetId}`);
  };

  const handleQrCode = (assetId) => {
    alert(`查看资产二维码 ID: ${assetId}`);
  };

  // 分页处理函数
  const handlePageChange = (page) => {
    alert(`切换到第 ${page} 页`);
  };

  return (
    <div className="asset-management">
      <h2>资产管理</h2>
      
      {/* 操作按钮区域 */}
      <div className="action-buttons">
        <button className="btn-primary" onClick={handleAddAsset}>新增资产</button>
        <button className="btn-secondary" onClick={handleBulkImport}>批量导入</button>
        <button className="btn-secondary" onClick={handleExportData}>导出数据</button>
      </div>

      {/* 筛选条件 */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="资产名称"
          value={filters.assetName}
          onChange={(e) => setFilters({...filters, assetName: e.target.value})}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="资产类型"
          value={filters.assetType}
          onChange={(e) => setFilters({...filters, assetType: e.target.value})}
          className="filter-input"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="filter-select"
        >
          <option value="all">全部状态</option>
          <option value="in_stock">库存中</option>
          <option value="in_use">使用中</option>
          <option value="repairing">维修中</option>
          <option value="scrapped">已报废</option>
        </select>
      </div>

      {/* 资产列表 */}
      <div className="asset-table-container">
        <table className="asset-table">
          <thead>
            <tr>
              <th>资产编码</th>
              <th>资产名称</th>
              <th>类型</th>
              <th>品牌型号</th>
              <th>序列号</th>
              <th>状态</th>
              <th>当前使用人</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.assetCode}</td>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{asset.brand} {asset.model}</td>
                <td>{asset.serialNumber}</td>
                <td><span className={`status-tag ${getStatusClass(asset.status)}`}>{getStatusText(asset.status)}</span></td>
                <td>{asset.currentUser || '-'}</td>
                <td className="action-cell">
                  <button className="btn-action btn-view" onClick={() => handleViewAsset(asset.id)}>查看</button>
                  <button className="btn-action btn-edit" onClick={() => handleEditAsset(asset.id)}>编辑</button>
                  <button className="btn-action btn-qrcode" onClick={() => handleQrCode(asset.id)}>二维码</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAssets.length === 0 && (
          <div className="empty-message">暂无数据</div>
        )}
      </div>

      {/* 分页控件 */}
      <div className="pagination">
        <button className="btn-page" disabled>上一页</button>
        <button className="btn-page active">1</button>
        <button className="btn-page" onClick={() => handlePageChange(2)}>下一页</button>
        <span className="page-info">共 {filteredAssets.length} 条数据</span>
      </div>
    </div>
  );
};

export default AssetManagement;