import React, { useState, useEffect } from 'react';
import './InventoryManagement.css';

const InventoryManagement = () => {
  // 状态管理
  const [currentTab, setCurrentTab] = useState('scan'); // scan, batch, report
  const [scanResult, setScanResult] = useState('');
  const [scannedAssets, setScannedAssets] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [inventoryDate, setInventoryDate] = useState(new Date().toISOString().split('T')[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [currentScan, setCurrentScan] = useState(null);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // 模拟资产数据
  const mockAssets = [
    { id: 'AST001', name: 'ThinkPad X1 Carbon', model: 'X1C Gen 9', serialNumber: 'SN123456', location: '研发部-3楼', department: '研发部', status: '在用' },
    { id: 'AST002', name: 'Dell OptiPlex 7090', model: 'OptiPlex 7090', serialNumber: 'SN654321', location: '财务部-2楼', department: '财务部', status: '在用' },
    { id: 'AST003', name: 'HP LaserJet Pro', model: 'M404n', serialNumber: 'SN987654', location: '行政部-1楼', department: '行政部', status: '在用' },
    { id: 'AST004', name: 'MacBook Pro 14', model: 'M2 Pro', serialNumber: 'SN321654', location: '设计部-4楼', department: '设计部', status: '在用' },
    { id: 'AST005', name: 'iPad Pro 12.9', model: '5th Gen', serialNumber: 'SN456987', location: '销售部-3楼', department: '销售部', status: '在用' },
  ];
  
  // 模拟部门数据
  const departments = [
    { id: 'D001', name: '研发部' },
    { id: 'D002', name: '财务部' },
    { id: 'D003', name: '行政部' },
    { id: 'D004', name: '设计部' },
    { id: 'D005', name: '销售部' },
  ];
  
  // 模拟位置数据
  const locations = [
    { id: 'L001', name: '研发部-3楼', departmentId: 'D001' },
    { id: 'L002', name: '财务部-2楼', departmentId: 'D002' },
    { id: 'L003', name: '行政部-1楼', departmentId: 'D003' },
    { id: 'L004', name: '设计部-4楼', departmentId: 'D004' },
    { id: 'L005', name: '销售部-3楼', departmentId: 'D005' },
  ];
  
  // 模拟历史盘点报告
  useEffect(() => {
    setReports([
      { id: 'R001', date: '2024-01-15', department: '研发部', location: '研发部-3楼', totalAssets: 50, found: 48, missing: 2, exception: 3, status: '已完成' },
      { id: 'R002', date: '2024-01-14', department: '财务部', location: '财务部-2楼', totalAssets: 20, found: 20, missing: 0, exception: 1, status: '已完成' },
      { id: 'R003', date: '2024-01-13', department: '行政部', location: '行政部-1楼', totalAssets: 15, found: 15, missing: 0, exception: 0, status: '已完成' },
    ]);
  }, []);
  
  // 切换部门时更新位置列表
  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    setDepartment(deptId);
    setLocation('');
  };
  
  // 开始盘点
  const startInventory = () => {
    if (!department || !location || !inventoryDate) {
      alert('请填写完整的盘点信息');
      return;
    }
    
    // 根据部门和位置筛选需要盘点的资产
    const filteredAssets = mockAssets.filter(asset => 
      asset.department === departments.find(d => d.id === department)?.name &&
      asset.location === locations.find(l => l.id === location)?.name
    );
    
    setInventoryList(filteredAssets);
    setScannedAssets([]);
    setScanResult('');
    setCurrentScan(null);
    
    alert('盘点开始！请开始扫描资产二维码');
  };
  
  // 模拟扫码
  const handleScan = () => {
    setIsScanning(true);
    
    // 模拟扫码延迟
    setTimeout(() => {
      // 随机选择一个资产或生成无效扫描
      const randomIndex = Math.floor(Math.random() * (mockAssets.length + 1));
      
      let scanResult = '';
      let scanData = null;
      
      if (randomIndex < mockAssets.length) {
        scanData = mockAssets[randomIndex];
        scanResult = `扫描成功: ${scanData.id} - ${scanData.name}`;
        
        // 检查是否已扫描过
        if (!scannedAssets.some(asset => asset.id === scanData.id)) {
          setScannedAssets(prev => [...prev, {
            ...scanData,
            scannedTime: new Date().toLocaleString('zh-CN')
          }]);
        } else {
          scanResult += ' (重复扫描)';
        }
      } else {
        scanResult = '无效二维码';
      }
      
      setScanResult(scanResult);
      setCurrentScan(scanData);
      setIsScanning(false);
    }, 1000);
  };
  
  // 批量导入扫描数据
  const handleBatchImport = () => {
    // 模拟批量导入
    const batchAssets = mockAssets.slice(0, 3).map(asset => ({
      ...asset,
      scannedTime: new Date().toLocaleString('zh-CN')
    }));
    
    setScannedAssets(batchAssets);
    alert(`成功导入 ${batchAssets.length} 条扫描记录`);
  };
  
  // 生成盘点报告
  const generateReport = () => {
    const totalAssets = inventoryList.length;
    const foundAssets = scannedAssets.filter(scan => 
      inventoryList.some(asset => asset.id === scan.id)
    ).length;
    
    const missingAssets = inventoryList.filter(asset => 
      !scannedAssets.some(scan => scan.id === asset.id)
    );
    
    const extraAssets = scannedAssets.filter(scan => 
      !inventoryList.some(asset => asset.id === scan.id)
    );
    
    const newReport = {
      id: `R${String(reports.length + 1).padStart(3, '0')}`,
      date: inventoryDate,
      department: departments.find(d => d.id === department)?.name || '全部部门',
      location: locations.find(l => l.id === location)?.name || '全部位置',
      totalAssets,
      found: foundAssets,
      missing: missingAssets.length,
      extra: extraAssets.length,
      exception: missingAssets.length + extraAssets.length,
      missingAssets,
      extraAssets,
      scannedAssets,
      status: '已完成'
    };
    
    setReports(prev => [newReport, ...prev]);
    setSelectedReport(newReport);
    setCurrentTab('report');
    
    alert('盘点报告生成成功！');
  };
  
  // 查看报告详情
  const viewReport = (report) => {
    setSelectedReport(report);
  };
  
  // 导出报告
  const exportReport = (format) => {
    alert(`报告已导出为${format.toUpperCase()}格式`);
  };
  
  // 清空扫描记录
  const clearScans = () => {
    setScannedAssets([]);
    setScanResult('');
    setCurrentScan(null);
  };
  
  // 获取当前部门的位置列表
  const getLocationsByDepartment = () => {
    if (!department) return locations;
    return locations.filter(loc => loc.departmentId === department);
  };
  
  // 获取盘点异常统计
  const getInventoryStats = () => {
    const total = inventoryList.length;
    const scanned = scannedAssets.length;
    const found = scannedAssets.filter(scan => 
      inventoryList.some(asset => asset.id === scan.id)
    ).length;
    const missing = inventoryList.filter(asset => 
      !scannedAssets.some(scan => scan.id === asset.id)
    ).length;
    const extra = scannedAssets.filter(scan => 
      !inventoryList.some(asset => asset.id === scan.id)
    ).length;
    
    return { total, scanned, found, missing, extra };
  };
  
  const stats = getInventoryStats();
  
  return (
    <div className="inventory-management">
      <h2>盘点管理</h2>
      
      {/* 标签页 */}
      <div className="tabs">
        <button 
          className={`tab-btn ${currentTab === 'scan' ? 'active' : ''}`}
          onClick={() => setCurrentTab('scan')}
        >
          扫码盘点
        </button>
        <button 
          className={`tab-btn ${currentTab === 'batch' ? 'active' : ''}`}
          onClick={() => setCurrentTab('batch')}
        >
          批量盘点
        </button>
        <button 
          className={`tab-btn ${currentTab === 'report' ? 'active' : ''}`}
          onClick={() => setCurrentTab('report')}
        >
          盘点报告
        </button>
      </div>
      
      {/* 扫码盘点 */}
      {currentTab === 'scan' && (
        <div className="tab-content">
          <div className="inventory-info">
            <h3>盘点设置</h3>
            <div className="form-row">
              <div className="form-group">
                <label>盘点日期</label>
                <input 
                  type="date" 
                  value={inventoryDate} 
                  onChange={(e) => setInventoryDate(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>选择部门</label>
                <select value={department} onChange={handleDepartmentChange}>
                  <option value="">请选择部门</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>选择位置</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">请选择位置</option>
                  {getLocationsByDepartment().map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="primary-btn start-btn" onClick={startInventory}>
              开始盘点
            </button>
          </div>
          
          <div className="scan-section">
            <h3>扫码操作</h3>
            <div className="scan-actions">
              <button 
                className="primary-btn scan-btn" 
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? '扫描中...' : '扫描二维码'}
              </button>
              
              {scanResult && (
                <div className={`scan-result ${currentScan ? 'success' : 'error'}`}>
                  {scanResult}
                </div>
              )}
              
              {currentScan && (
                <div className="scan-detail">
                  <h4>资产信息</h4>
                  <p><strong>资产编号:</strong> {currentScan.id}</p>
                  <p><strong>资产名称:</strong> {currentScan.name}</p>
                  <p><strong>型号:</strong> {currentScan.model}</p>
                  <p><strong>序列号:</strong> {currentScan.serialNumber}</p>
                  <p><strong>当前位置:</strong> {currentScan.location}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="inventory-stats">
            <h3>盘点统计</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">应盘资产</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.scanned}</div>
                <div className="stat-label">已扫数量</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.found}</div>
                <div className="stat-label">正常资产</div>
              </div>
              <div className="stat-card">
                <div className="stat-value missing">{stats.missing}</div>
                <div className="stat-label">缺失资产</div>
              </div>
              <div className="stat-card">
                <div className="stat-value extra">{stats.extra}</div>
                <div className="stat-label">多余资产</div>
              </div>
            </div>
          </div>
          
          <div className="scanned-list">
            <div className="list-header">
              <h3>扫描记录</h3>
              <div className="list-actions">
                <button className="secondary-btn" onClick={clearScans}>
                  清空记录
                </button>
                <button className="primary-btn" onClick={generateReport}>
                  生成报告
                </button>
              </div>
            </div>
            
            <div className="scanned-table-container">
              <table className="scanned-table">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>资产编号</th>
                    <th>资产名称</th>
                    <th>扫描时间</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {scannedAssets.length > 0 ? (
                    scannedAssets.map((asset, index) => {
                      const isExpected = inventoryList.some(item => item.id === asset.id);
                      const status = isExpected ? '正常' : '多余';
                      const statusClass = isExpected ? 'status-normal' : 'status-extra';
                      
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{asset.id}</td>
                          <td>{asset.name}</td>
                          <td>{asset.scannedTime}</td>
                          <td>
                            <span className={`status-tag ${statusClass}`}>
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-row">暂无扫描记录</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* 批量盘点 */}
      {currentTab === 'batch' && (
        <div className="tab-content">
          <div className="batch-import">
            <h3>批量导入</h3>
            <p className="import-tips">
              批量盘点支持通过CSV文件导入或扫码枪连续扫描的方式快速录入多个资产信息
            </p>
            
            <div className="import-options">
              <button className="primary-btn import-btn" onClick={handleBatchImport}>
                导入CSV文件
              </button>
              <button className="secondary-btn">
                下载导入模板
              </button>
            </div>
            
            <div className="batch-instructions">
              <h4>使用说明</h4>
              <ul>
                <li>1. 下载导入模板并填写资产信息</li>
                <li>2. 确保CSV文件包含必要字段：资产编号、序列号</li>
                <li>3. 文件大小不超过10MB</li>
                <li>4. 支持最大单次导入1000条记录</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* 盘点报告 */}
      {currentTab === 'report' && (
        <div className="tab-content">
          <div className="reports-section">
            <h3>历史盘点报告</h3>
            
            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>报告编号</th>
                    <th>盘点日期</th>
                    <th>部门</th>
                    <th>位置</th>
                    <th>应盘资产</th>
                    <th>正常资产</th>
                    <th>缺失资产</th>
                    <th>异常数量</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.date}</td>
                      <td>{report.department}</td>
                      <td>{report.location}</td>
                      <td>{report.totalAssets}</td>
                      <td>{report.found}</td>
                      <td>{report.missing}</td>
                      <td>{report.exception}</td>
                      <td>
                        <span className="status-tag status-completed">
                          {report.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn" onClick={() => viewReport(report)}>
                          查看
                        </button>
                        <button className="action-btn" onClick={() => exportReport('excel')}>
                          导出
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {selectedReport && (
            <div className="report-detail">
              <h3>报告详情</h3>
              
              <div className="report-header">
                <div className="report-info">
                  <p><strong>报告编号:</strong> {selectedReport.id}</p>
                  <p><strong>盘点日期:</strong> {selectedReport.date}</p>
                  <p><strong>部门:</strong> {selectedReport.department}</p>
                  <p><strong>位置:</strong> {selectedReport.location}</p>
                </div>
                <div className="report-actions">
                  <button className="secondary-btn" onClick={() => exportReport('excel')}>
                    导出Excel
                  </button>
                  <button className="secondary-btn" onClick={() => exportReport('pdf')}>
                    导出PDF
                  </button>
                </div>
              </div>
              
              <div className="report-summary">
                <h4>盘点总结</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">应盘资产:</span>
                    <span className="summary-value">{selectedReport.totalAssets}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">正常资产:</span>
                    <span className="summary-value normal">{selectedReport.found}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">缺失资产:</span>
                    <span className="summary-value missing">{selectedReport.missing}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">多余资产:</span>
                    <span className="summary-value extra">{selectedReport.extra || 0}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">异常率:</span>
                    <span className="summary-value">
                      {((selectedReport.exception / selectedReport.totalAssets) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedReport.missingAssets && selectedReport.missingAssets.length > 0 && (
                <div className="exception-section">
                  <h4>缺失资产</h4>
                  <div className="exception-table-container">
                    <table className="exception-table">
                      <thead>
                        <tr>
                          <th>资产编号</th>
                          <th>资产名称</th>
                          <th>型号</th>
                          <th>序列号</th>
                          <th>预期位置</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.missingAssets.map(asset => (
                          <tr key={asset.id}>
                            <td>{asset.id}</td>
                            <td>{asset.name}</td>
                            <td>{asset.model}</td>
                            <td>{asset.serialNumber}</td>
                            <td>{asset.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {selectedReport.extraAssets && selectedReport.extraAssets.length > 0 && (
                <div className="exception-section">
                  <h4>多余资产</h4>
                  <div className="exception-table-container">
                    <table className="exception-table">
                      <thead>
                        <tr>
                          <th>资产编号</th>
                          <th>资产名称</th>
                          <th>型号</th>
                          <th>序列号</th>
                          <th>扫描时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.extraAssets.map(asset => (
                          <tr key={asset.id}>
                            <td>{asset.id}</td>
                            <td>{asset.name}</td>
                            <td>{asset.model}</td>
                            <td>{asset.serialNumber}</td>
                            <td>{asset.scannedTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;