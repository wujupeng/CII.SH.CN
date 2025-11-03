import React, { useState, useEffect } from 'react';
import './ReportStatistics.css';

const ReportStatistics = () => {
  // 状态管理
  const [currentTab, setCurrentTab] = useState('overview'); // overview, asset, allocation, repair, inventory
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: new Date().toISOString().split('T')[0]
  });
  const [chartData, setChartData] = useState(null);
  const [exportFormat, setExportFormat] = useState('excel');
  
  // 模拟统计数据
  useEffect(() => {
    // 初始化图表数据
    const data = {
      // 资产统计数据
      assetStats: {
        total: 150,
        byDepartment: [
          { name: '研发部', value: 60 },
          { name: '财务部', value: 20 },
          { name: '行政部', value: 15 },
          { name: '设计部', value: 30 },
          { name: '销售部', value: 25 }
        ],
        byStatus: [
          { name: '在用', value: 120 },
          { name: '库存', value: 20 },
          { name: '维修', value: 8 },
          { name: '报废', value: 2 }
        ],
        monthlyAdditions: [
          { month: '1月', count: 10 },
          { month: '2月', count: 15 },
          { month: '3月', count: 8 },
          { month: '4月', count: 20 },
          { month: '5月', count: 12 },
          { month: '6月', count: 18 }
        ]
      },
      
      // 领用统计数据
      allocationStats: {
        totalAllocations: 120,
        totalReturns: 45,
        byDepartment: [
          { name: '研发部', allocated: 50, returned: 20 },
          { name: '财务部', allocated: 15, returned: 8 },
          { name: '行政部', allocated: 10, returned: 5 },
          { name: '设计部', allocated: 25, returned: 7 },
          { name: '销售部', allocated: 20, returned: 5 }
        ],
        byAssetType: [
          { name: '笔记本电脑', count: 45 },
          { name: '台式电脑', count: 30 },
          { name: '打印机', count: 15 },
          { name: '平板设备', count: 20 },
          { name: '其他', count: 10 }
        ]
      },
      
      // 维修统计数据
      repairStats: {
        totalRepairs: 35,
        completedRepairs: 28,
        repairRate: 23.3,
        averageCost: 850,
        byType: [
          { name: '硬件故障', count: 15, cost: 12000 },
          { name: '软件故障', count: 10, cost: 3000 },
          { name: '定期维护', count: 6, cost: 1200 },
          { name: '升级改造', count: 4, cost: 2000 }
        ],
        byMonth: [
          { month: '1月', count: 5 },
          { month: '2月', count: 7 },
          { month: '3月', count: 4 },
          { month: '4月', count: 8 },
          { month: '5月', count: 6 },
          { month: '6月', count: 5 }
        ]
      },
      
      // 盘点统计数据
      inventoryStats: {
        totalInventories: 8,
        averageAccuracy: 96.5,
        byDepartment: [
          { name: '研发部', accuracy: 95.0, exceptionCount: 3 },
          { name: '财务部', accuracy: 100.0, exceptionCount: 0 },
          { name: '行政部', accuracy: 98.0, exceptionCount: 1 },
          { name: '设计部', accuracy: 97.0, exceptionCount: 2 },
          { name: '销售部', accuracy: 94.0, exceptionCount: 4 }
        ],
        recentInventories: [
          { id: 'R001', date: '2024-01-15', department: '研发部', accuracy: 95.0 },
          { id: 'R002', date: '2024-01-14', department: '财务部', accuracy: 100.0 },
          { id: 'R003', date: '2024-01-13', department: '行政部', accuracy: 98.0 },
          { id: 'R004', date: '2024-01-12', department: '设计部', accuracy: 97.0 },
          { id: 'R005', date: '2024-01-10', department: '销售部', accuracy: 94.0 }
        ]
      }
    };
    
    setChartData(data);
  }, []);
  
  // 处理日期范围变化
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };
  
  // 导出报表
  const exportReport = () => {
    // 这里只是模拟导出功能
    alert(`报表已导出为${exportFormat.toUpperCase()}格式！`);
  };
  
  // 渲染概览页面
  const renderOverview = () => {
    if (!chartData) return <div>加载中...</div>;
    
    return (
      <div className="overview-content">
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon asset-icon">📱</div>
            <div className="summary-details">
              <div className="summary-number">{chartData.assetStats.total}</div>
              <div className="summary-label">资产总数</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon allocation-icon">📋</div>
            <div className="summary-details">
              <div className="summary-number">{chartData.allocationStats.totalAllocations}</div>
              <div className="summary-label">当前领用</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon repair-icon">🔧</div>
            <div className="summary-details">
              <div className="summary-number">{chartData.repairStats.totalRepairs}</div>
              <div className="summary-label">维修记录</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon inventory-icon">📊</div>
            <div className="summary-details">
              <div className="summary-number">{chartData.inventoryStats.totalInventories}</div>
              <div className="summary-label">盘点次数</div>
            </div>
          </div>
        </div>
        
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">资产准确率</span>
            <span className="stat-value">{chartData.inventoryStats.averageAccuracy.toFixed(1)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">维修完成率</span>
            <span className="stat-value">{((chartData.repairStats.completedRepairs / chartData.repairStats.totalRepairs) * 100).toFixed(1)}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">平均维修成本</span>
            <span className="stat-value">¥{chartData.repairStats.averageCost}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">资产利用率</span>
            <span className="stat-value">{((chartData.assetStats.byStatus.find(s => s.name === '在用')?.value / chartData.assetStats.total) * 100).toFixed(1)}%</span>
          </div>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h4>资产部门分布</h4>
            <div className="chart-placeholder">
              {chartData.assetStats.byDepartment.map(item => (
                <div key={item.name} className="chart-bar-item">
                  <div className="bar-label">{item.name}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${(item.value / Math.max(...chartData.assetStats.byDepartment.map(d => d.value))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="bar-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-card">
            <h4>资产状态分布</h4>
            <div className="chart-placeholder">
              {chartData.assetStats.byStatus.map(item => (
                <div key={item.name} className="chart-pie-item">
                  <div className={`pie-slice ${getStatusColor(item.name)}`}>
                    <span>{item.name}</span>
                  </div>
                  <div className="pie-info">
                    <span className="pie-value">{item.value}</span>
                    <span className="pie-percentage">
                      {((item.value / chartData.assetStats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="export-section">
          <div className="export-info">
            <p>生成时间: {new Date().toLocaleString('zh-CN')}</p>
            <p>统计周期: {dateRange.startDate} 至 {dateRange.endDate}</p>
          </div>
          <div className="export-actions">
            <select 
              value={exportFormat} 
              onChange={(e) => setExportFormat(e.target.value)}
              className="export-select"
            >
              <option value="excel">Excel格式</option>
              <option value="pdf">PDF格式</option>
              <option value="csv">CSV格式</option>
            </select>
            <button className="primary-btn export-btn" onClick={exportReport}>
              导出概览报告
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染资产统计页面
  const renderAssetStatistics = () => {
    if (!chartData) return <div>加载中...</div>;
    
    return (
      <div className="asset-stats-content">
        <div className="stats-section">
          <h4>资产概况</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{chartData.assetStats.total}</div>
              <div className="stat-label">资产总数</div>
            </div>
            {chartData.assetStats.byStatus.map(status => (
              <div key={status.name} className="stat-card">
                <div className={`stat-value ${getStatusColor(status.name)}`}>{status.value}</div>
                <div className="stat-label">{status.name}资产</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h4>部门资产分布</h4>
            <div className="chart-placeholder">
              {chartData.assetStats.byDepartment.map(item => (
                <div key={item.name} className="chart-bar-item">
                  <div className="bar-label">{item.name}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill asset-bar" 
                      style={{ width: `${(item.value / Math.max(...chartData.assetStats.byDepartment.map(d => d.value))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="bar-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-card">
            <h4>月度新增资产</h4>
            <div className="chart-placeholder">
              <div className="line-chart-container">
                <div className="line-chart">
                  {chartData.assetStats.monthlyAdditions.map((item, index) => (
                    <div 
                      key={item.month} 
                      className="line-point"
                      style={{
                        left: `${(index / (chartData.assetStats.monthlyAdditions.length - 1)) * 100}%`,
                        bottom: `${(item.count / Math.max(...chartData.assetStats.monthlyAdditions.map(d => d.count))) * 100}%`
                      }}
                    >
                      <span className="point-value">{item.count}</span>
                    </div>
                  ))}
                  <svg className="line-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline 
                      points={chartData.assetStats.monthlyAdditions.map((item, index) => {
                        const x = (index / (chartData.assetStats.monthlyAdditions.length - 1)) * 100;
                        const y = 100 - ((item.count / Math.max(...chartData.assetStats.monthlyAdditions.map(d => d.count))) * 100);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none" 
                      stroke="#1890ff" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="line-chart-labels">
                  {chartData.assetStats.monthlyAdditions.map(item => (
                    <div key={item.month} className="chart-x-label">{item.month}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="export-section">
          <button className="primary-btn export-btn" onClick={exportReport}>
            导出资产统计报表
          </button>
        </div>
      </div>
    );
  };
  
  // 渲染领用统计页面
  const renderAllocationStatistics = () => {
    if (!chartData) return <div>加载中...</div>;
    
    return (
      <div className="allocation-stats-content">
        <div className="stats-section">
          <h4>领用概况</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{chartData.allocationStats.totalAllocations}</div>
              <div className="stat-label">总领用次数</div>
            </div>
            <div className="stat-card">
              <div className="stat-value returned">{chartData.allocationStats.totalReturns}</div>
              <div className="stat-label">总归还次数</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{chartData.allocationStats.totalAllocations - chartData.allocationStats.totalReturns}</div>
              <div className="stat-label">当前借用</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{((chartData.allocationStats.totalReturns / chartData.allocationStats.totalAllocations) * 100).toFixed(1)}%</div>
              <div className="stat-label">归还率</div>
            </div>
          </div>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h4>部门领用归还对比</h4>
            <div className="chart-placeholder">
              {chartData.allocationStats.byDepartment.map(item => (
                <div key={item.name} className="chart-bar-item">
                  <div className="bar-label">{item.name}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill allocation-bar" 
                      style={{ width: `${(item.allocated / Math.max(...chartData.allocationStats.byDepartment.map(d => d.allocated))) * 100}%` }}
                      title="领用数量"
                    ></div>
                    <div 
                      className="bar-fill return-bar" 
                      style={{ width: `${(item.returned / Math.max(...chartData.allocationStats.byDepartment.map(d => d.allocated))) * 100}%` }}
                      title="归还数量"
                    ></div>
                  </div>
                  <div className="bar-comparison">
                    <span className="allocation-count">{item.allocated}</span>
                    <span className="return-count">{item.returned}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-card">
            <h4>资产类型领用分布</h4>
            <div className="chart-placeholder">
              {chartData.allocationStats.byAssetType.map(item => (
                <div key={item.name} className="chart-pie-item">
                  <div className="pie-slice allocation-pie">
                    <span>{item.name}</span>
                  </div>
                  <div className="pie-info">
                    <span className="pie-value">{item.count}</span>
                    <span className="pie-percentage">
                      {((item.count / chartData.allocationStats.totalAllocations) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="export-section">
          <button className="primary-btn export-btn" onClick={exportReport}>
            导出领用统计报表
          </button>
        </div>
      </div>
    );
  };
  
  // 渲染维修统计页面
  const renderRepairStatistics = () => {
    if (!chartData) return <div>加载中...</div>;
    
    return (
      <div className="repair-stats-content">
        <div className="stats-section">
          <h4>维修概况</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{chartData.repairStats.totalRepairs}</div>
              <div className="stat-label">总维修次数</div>
            </div>
            <div className="stat-card">
              <div className="stat-value completed">{chartData.repairStats.completedRepairs}</div>
              <div className="stat-label">已完成维修</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{chartData.repairStats.averageCost}</div>
              <div className="stat-label">平均维修成本</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{chartData.repairStats.repairRate}%</div>
              <div className="stat-label">故障率</div>
            </div>
          </div>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h4>维修类型统计</h4>
            <div className="chart-placeholder">
              {chartData.repairStats.byType.map(item => (
                <div key={item.name} className="chart-bar-item">
                  <div className="bar-label">{item.name}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill repair-bar" 
                      style={{ width: `${(item.count / Math.max(...chartData.repairStats.byType.map(d => d.count))) * 100}%` }}
                    ></div>
                  </div>
                  <div className="bar-comparison">
                    <span className="repair-count">{item.count}次</span>
                    <span className="repair-cost">¥{item.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-card">
            <h4>月度维修趋势</h4>
            <div className="chart-placeholder">
              <div className="line-chart-container">
                <div className="line-chart">
                  {chartData.repairStats.byMonth.map((item, index) => (
                    <div 
                      key={item.month} 
                      className="line-point repair-point"
                      style={{
                        left: `${(index / (chartData.repairStats.byMonth.length - 1)) * 100}%`,
                        bottom: `${(item.count / Math.max(...chartData.repairStats.byMonth.map(d => d.count))) * 100}%`
                      }}
                    >
                      <span className="point-value">{item.count}</span>
                    </div>
                  ))}
                  <svg className="line-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline 
                      points={chartData.repairStats.byMonth.map((item, index) => {
                        const x = (index / (chartData.repairStats.byMonth.length - 1)) * 100;
                        const y = 100 - ((item.count / Math.max(...chartData.repairStats.byMonth.map(d => d.count))) * 100);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none" 
                      stroke="#f5222d" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="line-chart-labels">
                  {chartData.repairStats.byMonth.map(item => (
                    <div key={item.month} className="chart-x-label">{item.month}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="export-section">
          <button className="primary-btn export-btn" onClick={exportReport}>
            导出维修统计报表
          </button>
        </div>
      </div>
    );
  };
  
  // 渲染盘点统计页面
  const renderInventoryStatistics = () => {
    if (!chartData) return <div>加载中...</div>;
    
    return (
      <div className="inventory-stats-content">
        <div className="stats-section">
          <h4>盘点概况</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{chartData.inventoryStats.totalInventories}</div>
              <div className="stat-label">总盘点次数</div>
            </div>
            <div className="stat-card">
              <div className="stat-value accuracy">{chartData.inventoryStats.averageAccuracy.toFixed(1)}%</div>
              <div className="stat-label">平均准确率</div>
            </div>
          </div>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h4>部门盘点准确率</h4>
            <div className="chart-placeholder">
              {chartData.inventoryStats.byDepartment.map(item => (
                <div key={item.name} className="chart-bar-item">
                  <div className="bar-label">{item.name}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill accuracy-bar" 
                      style={{ 
                        width: `${item.accuracy}%`,
                        backgroundColor: item.accuracy >= 95 ? '#52c41a' : item.accuracy >= 90 ? '#faad14' : '#f5222d'
                      }}
                    ></div>
                  </div>
                  <div className="bar-comparison">
                    <span className="accuracy-value">{item.accuracy}%</span>
                    <span className="exception-count">异常: {item.exceptionCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-card">
            <h4>最近盘点记录</h4>
            <div className="recent-inventories">
              {chartData.inventoryStats.recentInventories.map(inventory => (
                <div key={inventory.id} className="inventory-item">
                  <div className="inventory-info">
                    <div className="inventory-id">{inventory.id}</div>
                    <div className="inventory-department">{inventory.department}</div>
                    <div className="inventory-date">{inventory.date}</div>
                  </div>
                  <div className="inventory-accuracy">
                    <div className="accuracy-circle">
                      <span className="accuracy-number">{inventory.accuracy}</span>
                      <span className="accuracy-unit">%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="export-section">
          <button className="primary-btn export-btn" onClick={exportReport}>
            导出盘点统计报表
          </button>
        </div>
      </div>
    );
  };
  
  // 获取状态对应的颜色
  const getStatusColor = (status) => {
    switch (status) {
      case '在用': return 'status-in-use';
      case '库存': return 'status-in-stock';
      case '维修': return 'status-in-repair';
      case '报废': return 'status-scrapped';
      default: return '';
    }
  };
  
  return (
    <div className="report-statistics">
      <h2>报表统计</h2>
      
      {/* 日期筛选器 */}
      <div className="date-filter">
        <div className="filter-group">
          <label>开始日期</label>
          <input 
            type="date" 
            name="startDate" 
            value={dateRange.startDate} 
            onChange={handleDateRangeChange}
          />
        </div>
        <div className="filter-group">
          <label>结束日期</label>
          <input 
            type="date" 
            name="endDate" 
            value={dateRange.endDate} 
            onChange={handleDateRangeChange}
          />
        </div>
      </div>
      
      {/* 标签页 */}
      <div className="tabs">
        <button 
          className={`tab-btn ${currentTab === 'overview' ? 'active' : ''}`}
          onClick={() => setCurrentTab('overview')}
        >
          概览
        </button>
        <button 
          className={`tab-btn ${currentTab === 'asset' ? 'active' : ''}`}
          onClick={() => setCurrentTab('asset')}
        >
          资产统计
        </button>
        <button 
          className={`tab-btn ${currentTab === 'allocation' ? 'active' : ''}`}
          onClick={() => setCurrentTab('allocation')}
        >
          领用统计
        </button>
        <button 
          className={`tab-btn ${currentTab === 'repair' ? 'active' : ''}`}
          onClick={() => setCurrentTab('repair')}
        >
          维修统计
        </button>
        <button 
          className={`tab-btn ${currentTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setCurrentTab('inventory')}
        >
          盘点统计
        </button>
      </div>
      
      {/* 内容区域 */}
      <div className="tab-content">
        {currentTab === 'overview' && renderOverview()}
        {currentTab === 'asset' && renderAssetStatistics()}
        {currentTab === 'allocation' && renderAllocationStatistics()}
        {currentTab === 'repair' && renderRepairStatistics()}
        {currentTab === 'inventory' && renderInventoryStatistics()}
      </div>
    </div>
  );
};

export default ReportStatistics;