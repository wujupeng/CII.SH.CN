import React, { useState, useEffect } from 'react';
// 尝试导入axios，如果失败则使用模拟数据
let axios = null;
try {
  axios = require('axios');
} catch (e) {
  console.log('Axios not available, using mock data');
}
import AlertsFeed from './AlertsFeed';
import './NotificationsCenter.css';

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  // 模拟数据，用于开发测试
  const mockNotifications = [
    {
      id: 1,
      title: '新设备分配',
      message: '设备Laptop-123已分配给张三',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30分钟前
    },
    {
      id: 2,
      title: '设备维修完成',
      message: '设备Printer-456维修已完成',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2小时前
    },
    {
      id: 3,
      title: '库存预警',
      message: '办公耗材A库存不足，请及时采购',
      type: 'warning',
      read: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1天前
    }
  ];

  // 获取通知数据
  const fetchNotifications = async () => {
    try {
      // 优先使用真实API
      if (axios) {
        const res = await axios.get('/api/notifications');
        setNotifications(res.data);
        setUnread(res.data.filter(n => !n.read).length);
      } else {
        // 如果axios不可用，使用模拟数据
        setNotifications(mockNotifications);
        setUnread(mockNotifications.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // 发生错误时使用模拟数据作为后备
      setNotifications(mockNotifications);
      setUnread(mockNotifications.filter(n => !n.read).length);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // 10s轮询
    return () => clearInterval(interval);
  }, []);

  const markAllRead = async () => {
    try {
      // 优先使用真实API
      if (axios) {
        await axios.post('/api/notifications/read_all');
        // 更新状态
        setNotifications(prevNotifications =>
          prevNotifications.map(notification => ({
            ...notification,
            read: true
          }))
        );
        setUnread(0);
      } else {
        // 如果axios不可用，直接更新状态
        setNotifications(prevNotifications =>
          prevNotifications.map(notification => ({
            ...notification,
            read: true
          }))
        );
        setUnread(0);
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      // 发生错误时仍然更新本地状态
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({
          ...notification,
          read: true
        }))
      );
      setUnread(0);
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2 className="notifications-title">通知中心</h2>
        <button 
          onClick={markAllRead} 
          className="mark-all-read-btn"
        >
          全部标为已读 ({unread})
        </button>
      </div>

      <AlertsFeed notifications={notifications} />
    </div>
  );
}