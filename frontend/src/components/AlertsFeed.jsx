import React from 'react';
// 由于无法安装lucide-react，我们使用内联SVG图标
import './AlertsFeed.css';

// 定义SVG图标组件
const BellIcon = ({ className, size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);

const AlertTriangleIcon = ({ className, size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const CheckCircleIcon = ({ className, size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const InfoIcon = ({ className, size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);



export default function AlertsFeed({ notifications = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangleIcon className="text-yellow-600" size={18} />;
      case 'success':
        return <CheckCircleIcon className="text-green-600" size={18} />;
      case 'info':
        return <InfoIcon className="text-blue-600" size={18} />;
      default:
        return <BellIcon className="text-gray-600" size={18} />;
    }
  };

  return (
    <div className="alerts-feed">
      {notifications.length === 0 && (
        <p className="empty-message">暂无通知</p>
      )}
      {notifications.map((n, i) => (
        <div
          key={n.id || i}
          className={`notification-item ${n.read ? 'notification-read' : 'notification-unread'}`}
        >
          <div className="notification-icon">
            {getIcon(n.type)}
          </div>
          <div className="notification-content">
            <p className="notification-title">{n.title}</p>
            <p className="notification-message">{n.message}</p>
            <p className="notification-timestamp">
              {new Date(n.timestamp).toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}