import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AppContext.jsx';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAssets: 0,
    inUseAssets: 0,
    inStockAssets: 0,
    repairingAssets: 0,
    monthlyNewAssets: []
  });

  // 获取统计数据
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 尝试从API获取数据
        const statsData = await api.reports.getAssetStats();
        setStats(statsData);
      } catch (error) {
        console.log('使用模拟数据:', error);
        // 使用模拟数据作为fallback
        setStats({
          totalAssets: 1245,
          inUseAssets: 892,
          inStockAssets: 231,
          repairingAssets: 122,
          monthlyNewAssets: [
            { month: '1月', count: 89 },
            { month: '2月', count: 123 },
            { month: '3月', count: 98 },
            { month: '4月', count: 156 },
            { month: '5月', count: 102 },
            { month: '6月', count: 134 }
          ]
        });
      }
    };

    fetchStats();
  }, []);

  // 简化的图表渲染函数
  const renderChart = () => {
    const maxCount = Math.max(...stats.monthlyNewAssets.map(item => item.count));
    const barWidth = 40;
    const chartHeight = 200;
    const padding = 20;

    return (
      <div className="chart-container">
        <div className="chart-bars">
          {stats.monthlyNewAssets.map((item, index) => {
            const barHeight = (item.count / maxCount) * (chartHeight - padding * 2);
            return (
              <div key={index} className="chart-bar-group">
                <div 
                  className="chart-bar" 
                  style={{ height: barHeight }}
                ></div>
                <span className="chart-label">{item.month}</span>
                <span className="chart-value">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h2>欢迎回来，{user?.fullName}</h2>
      <p className="dashboard-subtitle">这是您的资产管理仪表盘</p>

      {/* 统计卡片区域 */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{stats.totalAssets}</div>
          <div className="stat-label">资产总数</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.inUseAssets}</div>
          <div className="stat-label">使用中</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.inStockAssets}</div>
          <div className="stat-label">库存中</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.repairingAssets}</div>
          <div className="stat-label">维修中</div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="chart-section">
        <h3>月度新增资产统计</h3>
        {renderChart()}
      </div>

      {/* 快捷操作区域 */}
      <div className="quick-actions">
        <h3>快捷操作</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <span className="action-icon">📋</span>
            <span>新增资产</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📱</span>
            <span>扫码操作</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📦</span>
            <span>开始盘点</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span>生成报表</span>
          </button>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="recent-activities">
        <h3>最近活动</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">今天 14:30</span>
            <span className="activity-action">张三领用了ThinkPad T14笔记本电脑</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">今天 11:20</span>
            <span className="activity-action">李四归还了Dell显示器</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">昨天 16:45</span>
            <span className="activity-action">新购入20台HP激光打印机</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">昨天 09:15</span>
            <span className="activity-action">王五提交了MacBook Pro维修申请</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;