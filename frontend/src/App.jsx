import React, { useState, useEffect, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAuth, usePermissions } from './context/AppContext.jsx'
// 懒加载组件
const Login = React.lazy(() => import('./components/Login'))
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const AssetManagement = React.lazy(() => import('./components/AssetManagement'))
const QrcodeManagement = React.lazy(() => import('./components/QrcodeManagement'))
const AllocationManagement = React.lazy(() => import('./components/AllocationManagement'))
const InventoryManagement = React.lazy(() => import('./components/InventoryManagement'))
const RepairManagement = React.lazy(() => import('./components/RepairManagement'))
const SystemManagement = React.lazy(() => import('./components/SystemManagement'))
const ReportStatistics = React.lazy(() => import('./components/ReportStatistics'))
const SystemSettings = React.lazy(() => import('./components/SystemSettings'))
const NotificationsCenter = React.lazy(() => import('./components/NotificationsCenter'))
const Layout = React.lazy(() => import('./components/Layout'))

// 路由组件
const AppRoutes = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { isAdmin } = usePermissions();
  
  // 显示加载状态
  if (isLoading) {
    return (
      <div className="auth-loading-container">
        <div className="loading-spinner"></div>
        <p>正在验证登录状态...</p>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<AssetManagement />} />
          <Route path="qrcode" element={<QrcodeManagement />} />
          <Route path="allocation" element={<AllocationManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="repair" element={<RepairManagement />} />
          <Route path="report-statistics" element={<ReportStatistics />} />
          <Route path="notifications" element={<NotificationsCenter />} />
          {isAdmin && <Route path="system-settings" element={<SystemSettings />} />}
          {isAdmin && <Route path="system" element={<SystemManagement />} />}
          {/* 捕获所有未匹配的路由，重定向到首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

function App() {

  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Suspense fallback={
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>组件加载中...</p>
            </div>
          }>
            <AppRoutes />
          </Suspense>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App