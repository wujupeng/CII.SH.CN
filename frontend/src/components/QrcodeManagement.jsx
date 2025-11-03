import React, { useState } from 'react';
import './QrcodeManagement.css';

const QrcodeManagement = () => {
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [qrcodePreview, setQrcodePreview] = useState(null);
  const [generationMode, setGenerationMode] = useState('single'); // single, batch
  const [assetCode, setAssetCode] = useState('');
  const [batchRange, setBatchRange] = useState({ start: '', end: '' });

  // 模拟资产数据
  const assetOptions = [
    { id: 1, code: 'AST-2025-0001', name: '联想ThinkPad T14' },
    { id: 2, code: 'AST-2025-0002', name: 'Dell显示器' },
    { id: 3, code: 'AST-2025-0003', name: 'HP激光打印机' },
    { id: 4, code: 'AST-2025-0004', name: 'MacBook Pro' },
    { id: 5, code: 'AST-2025-0005', name: 'iPad Pro' }
  ];

  // 处理单选资产生成二维码
  const handleSingleGenerate = () => {
    if (!assetCode) {
      alert('请输入资产编码');
      return;
    }

    // 模拟生成二维码预览
    setQrcodePreview({
      assetCode,
      qrcodeContent: `ast:${assetCode}:${btoa(Math.random().toString(36).substring(2, 15))}`
    });
  };

  // 处理批量选择资产
  const handleAssetSelect = (assetId) => {
    setSelectedAssets(prev => {
      if (prev.includes(assetId)) {
        return prev.filter(id => id !== assetId);
      } else {
        return [...prev, assetId];
      }
    });
  };

  // 处理批量生成二维码
  const handleBatchGenerate = () => {
    if (selectedAssets.length === 0) {
      alert('请至少选择一个资产');
      return;
    }

    // 模拟批量生成
    alert(`已为 ${selectedAssets.length} 个资产生成二维码，准备打印`);
    // 这里可以添加实际的打印逻辑
  };

  // 处理批量打印
  const handlePrint = () => {
    if (qrcodePreview) {
      alert(`正在打印资产 ${qrcodePreview.assetCode} 的二维码标签`);
    } else if (selectedAssets.length > 0) {
      alert(`正在批量打印 ${selectedAssets.length} 个资产的二维码标签`);
    }
  };

  return (
    <div className="qrcode-management">
      <h2>二维码管理</h2>

      {/* 生成模式选择 */}
      <div className="mode-selector">
        <button 
          className={`mode-btn ${generationMode === 'single' ? 'active' : ''}`}
          onClick={() => setGenerationMode('single')}
        >
          单个生成
        </button>
        <button 
          className={`mode-btn ${generationMode === 'batch' ? 'active' : ''}`}
          onClick={() => setGenerationMode('batch')}
        >
          批量生成
        </button>
      </div>

      {/* 单个生成模式 */}
      {generationMode === 'single' && (
        <div className="single-generation-panel">
          <div className="input-group">
            <label>资产编码</label>
            <input
              type="text"
              value={assetCode}
              onChange={(e) => setAssetCode(e.target.value)}
              placeholder="请输入资产编码，如：AST-2025-0001"
            />
          </div>
          
          <div className="input-group">
            <label>或选择资产</label>
            <select 
              value={assetCode} 
              onChange={(e) => setAssetCode(e.target.value)}
            >
              <option value="">-- 请选择资产 --</option>
              {assetOptions.map(asset => (
                <option key={asset.id} value={asset.code}>{asset.code} - {asset.name}</option>
              ))}
            </select>
          </div>

          <button className="btn-primary generate-btn" onClick={handleSingleGenerate}>
            生成二维码
          </button>
        </div>
      )}

      {/* 批量生成模式 */}
      {generationMode === 'batch' && (
        <div className="batch-generation-panel">
          <h3>选择资产</h3>
          
          <div className="asset-selection-list">
            {assetOptions.map(asset => (
              <div 
                key={asset.id} 
                className={`asset-item ${selectedAssets.includes(asset.id) ? 'selected' : ''}`}
                onClick={() => handleAssetSelect(asset.id)}
              >
                <input 
                  type="checkbox" 
                  checked={selectedAssets.includes(asset.id)}
                  onChange={() => handleAssetSelect(asset.id)}
                />
                <span className="asset-info">
                  <strong>{asset.code}</strong> - {asset.name}
                </span>
              </div>
            ))}
          </div>

          <div className="batch-actions">
            <button 
              className="btn-primary generate-btn"
              onClick={handleBatchGenerate}
            >
              批量生成二维码
            </button>
            <button className="btn-secondary">
              全选
            </button>
            <button className="btn-secondary">
              取消全选
            </button>
          </div>
        </div>
      )}

      {/* 二维码预览 */}
      {qrcodePreview && (
        <div className="qrcode-preview-section">
          <h3>二维码预览</h3>
          <div className="qrcode-preview-card">
            <div className="qrcode-image">
              {/* 这里应该是实际的二维码图片，现在使用占位符 */}
              <div className="qrcode-placeholder">
                <div className="qrcode-grid"></div>
                <span>二维码图片</span>
              </div>
            </div>
            <div className="qrcode-info">
              <p><strong>资产编码：</strong>{qrcodePreview.assetCode}</p>
              <p><strong>二维码内容：</strong>{qrcodePreview.qrcodeContent}</p>
            </div>
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      {(qrcodePreview || selectedAssets.length > 0) && (
        <div className="print-section">
          <div className="print-options">
            <div className="option-group">
              <label>标签尺寸</label>
              <select defaultValue="standard">
                <option value="standard">标准 (3cm×5cm)</option>
                <option value="large">大型 (5cm×8cm)</option>
                <option value="small">小型 (2cm×3cm)</option>
              </select>
            </div>
            <div className="option-group">
              <label>打印数量</label>
              <input type="number" defaultValue="1" min="1" />
            </div>
          </div>
          <button className="btn-primary print-btn" onClick={handlePrint}>
            打印二维码标签
          </button>
        </div>
      )}

      {/* 二维码标签模板展示 */}
      <div className="template-section">
        <h3>标签模板预览</h3>
        <div className="template-preview">
          <div className="template-card">
            <div className="template-header">
              <div className="company-logo">公司Logo</div>
            </div>
            <div className="template-body">
              <div className="template-info">
                <div className="asset-code">AST-2025-0001</div>
                <div className="asset-name">联想ThinkPad T14</div>
                <div className="asset-type">笔记本电脑</div>
              </div>
              <div className="template-qrcode">
                <div className="small-qrcode"></div>
              </div>
            </div>
            <div className="template-footer">
              <div className="footer-text">请妥善保管，勿随意撕毁</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrcodeManagement;