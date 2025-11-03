// API服务文件 - 用于前端与后端通信

// API基础URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// 通用请求函数
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 设置默认headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // 添加认证token
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // 检查响应状态
    if (!response.ok) {
      // 尝试解析错误信息
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // 处理空响应
    if (response.status === 204) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
}

// 导出API方法
export const api = {
  // 认证相关
  auth: {
    // 登录
    login: async (credentials) => {
      // 模拟环境下直接返回成功结果
      if (!API_BASE_URL.includes('localhost')) {
        return {
          token: 'mock-token-123456',
          user: {
            id: 1,
            username: 'admin',
            fullName: '系统管理员',
            role: 'admin',
            departmentId: 1,
            departmentName: 'IT部门'
          }
        };
      }
      return request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },
    
    // 登出
    logout: async () => {
      return request('/auth/logout', {
        method: 'POST',
      });
    },
    
    // 获取当前用户信息
    getCurrentUser: async () => {
      // 模拟环境下返回模拟用户数据
      if (!API_BASE_URL.includes('localhost')) {
        return {
          id: 1,
          username: 'admin',
          fullName: '系统管理员',
          role: 'admin',
          departmentId: 1,
          departmentName: 'IT部门',
          email: 'admin@example.com',
          phone: '13800138000'
        };
      }
      return request('/auth/me');
    },
  },
  
  // 资产相关
  assets: {
    // 获取资产列表
    getList: async (params = {}) => {
      // 构建查询字符串
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/assets?${queryParams}` : '/assets';
      
      // 模拟环境下返回模拟数据
      if (!API_BASE_URL.includes('localhost')) {
        return {
          items: [
            {
              id: 1,
              assetCode: 'AST-202401001',
              qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
              assetName: 'Dell XPS 15笔记本电脑',
              assetType: '笔记本电脑',
              brand: 'Dell',
              model: 'XPS 15 9520',
              serialNumber: 'ABC123456',
              purchaseDate: '2024-01-10',
              purchasePrice: 12999.00,
              currentValue: 11000.00,
              status: 'in_use',
              statusText: '使用中',
              currentLocationId: 1,
              currentLocationName: '研发部办公室',
              currentUserId: 2,
              currentUserName: '张伟',
              departmentId: 1,
              departmentName: '研发部',
              warrantyExpiry: '2025-01-09',
              description: '高性能开发用笔记本'
            },
            {
              id: 2,
              assetCode: 'AST-202401002',
              qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
              assetName: 'HP LaserJet Pro打印机',
              assetType: '打印机',
              brand: 'HP',
              model: 'LaserJet Pro M404n',
              serialNumber: 'XYZ789012',
              purchaseDate: '2024-01-05',
              purchasePrice: 2399.00,
              currentValue: 2200.00,
              status: 'in_stock',
              statusText: '库存中',
              currentLocationId: 2,
              currentLocationName: '仓库',
              currentUserId: null,
              currentUserName: '',
              departmentId: 3,
              departmentName: '行政部',
              warrantyExpiry: '2025-01-04',
              description: '黑白激光打印机'
            }
          ],
          total: 2,
          page: 1,
          pageSize: 10
        };
      }
      
      return request(url);
    },
    
    // 获取资产详情
    getById: async (id) => {
      return request(`/assets/${id}`);
    },
    
    // 创建资产
    create: async (assetData) => {
      return request('/assets', {
        method: 'POST',
        body: JSON.stringify(assetData),
      });
    },
    
    // 更新资产
    update: async (id, assetData) => {
      return request(`/assets/${id}`, {
        method: 'PUT',
        body: JSON.stringify(assetData),
      });
    },
    
    // 删除资产
    delete: async (id) => {
      return request(`/assets/${id}`, {
        method: 'DELETE',
      });
    },
    
    // 批量导入资产
    importAssets: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      
      return request('/assets/import', {
        method: 'POST',
        headers: {
          // 不设置Content-Type，让浏览器自动设置multipart/form-data
        },
        body: formData,
      });
    },
    
    // 获取资产类型
    getAssetTypes: async () => {
      // 模拟环境下返回模拟数据
      if (!API_BASE_URL.includes('localhost')) {
        return [
          { id: 1, name: '笔记本电脑' },
          { id: 2, name: '台式电脑' },
          { id: 3, name: '显示器' },
          { id: 4, name: '打印机' },
          { id: 5, name: '扫描仪' },
          { id: 6, name: '平板设备' },
          { id: 7, name: '办公桌椅' },
          { id: 8, name: '空调' }
        ];
      }
      return request('/assets/types');
    },
  },
  
  // 二维码相关
  qrcodes: {
    // 生成单个二维码
    generateSingle: async (assetId) => {
      return request(`/qrcodes/asset/${assetId}`);
    },
    
    // 批量生成二维码
    generateBatch: async (assetIds) => {
      return request('/qrcodes/batch', {
        method: 'POST',
        body: JSON.stringify({ assetIds }),
      });
    },
    
    // 导出二维码PDF
    exportPDF: async (assetIds, templateId) => {
      const params = new URLSearchParams({
        assetIds: assetIds.join(','),
        templateId,
      });
      const url = `/qrcodes/export/pdf?${params}`;
      
      const response = await request(url, {
        method: 'GET',
        responseType: 'blob',
      });
      
      // 处理文件下载
      const blob = new Blob([response], { type: 'application/pdf' });
      const urlObj = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlObj;
      a.download = `二维码标签_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObj);
    },
  },
  
  // 领用归还相关
  allocations: {
    // 获取领用记录
    getList: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/allocations?${queryParams}` : '/allocations';
      return request(url);
    },
    
    // 创建领用记录
    create: async (allocationData) => {
      return request('/allocations', {
        method: 'POST',
        body: JSON.stringify(allocationData),
      });
    },
    
    // 归还资产
    returnAsset: async (allocationId, returnData) => {
      return request(`/allocations/${allocationId}/return`, {
        method: 'POST',
        body: JSON.stringify(returnData),
      });
    },
  },
  
  // 盘点相关
  inventories: {
    // 获取盘点列表
    getList: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/inventories?${queryParams}` : '/inventories';
      return request(url);
    },
    
    // 创建盘点任务
    create: async (inventoryData) => {
      return request('/inventories', {
        method: 'POST',
        body: JSON.stringify(inventoryData),
      });
    },
    
    // 获取盘点详情
    getById: async (id) => {
      return request(`/inventories/${id}`);
    },
    
    // 更新盘点状态
    updateStatus: async (id, status) => {
      return request(`/inventories/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
    
    // 扫描资产
    scanAsset: async (inventoryId, scanData) => {
      return request(`/inventories/${inventoryId}/scan`, {
        method: 'POST',
        body: JSON.stringify(scanData),
      });
    },
  },
  
  // 维修相关
  repairs: {
    // 获取维修记录
    getList: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/repairs?${queryParams}` : '/repairs';
      return request(url);
    },
    
    // 创建维修记录
    create: async (repairData) => {
      return request('/repairs', {
        method: 'POST',
        body: JSON.stringify(repairData),
      });
    },
    
    // 更新维修状态
    updateStatus: async (id, status) => {
      return request(`/repairs/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
  },
  
  // 报表统计相关
  reports: {
    // 获取资产统计
    getAssetStats: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/reports/asset-stats?${queryParams}` : '/reports/asset-stats';
      
      // 模拟环境下返回模拟数据
      if (!API_BASE_URL.includes('localhost')) {
        return {
          totalAssets: 156,
          inUseAssets: 124,
          inStockAssets: 32,
          maintenanceAssets: 8,
          retiredAssets: 2,
          totalValue: 1285000.00,
          newAssetsThisMonth: 15,
          assetTypeDistribution: [
            { type: '笔记本电脑', count: 45, percentage: 28.85 },
            { type: '台式电脑', count: 32, percentage: 20.51 },
            { type: '显示器', count: 28, percentage: 17.95 },
            { type: '打印机', count: 15, percentage: 9.62 },
            { type: '平板电脑', count: 12, percentage: 7.69 },
            { type: '其他', count: 24, percentage: 15.38 }
          ],
          recentActivity: [
            { id: 1, action: '领用', assetName: 'Dell XPS 15', username: '张伟', time: '2024-01-15 14:30' },
            { id: 2, action: '归还', assetName: 'HP LaserJet Pro', username: '李娜', time: '2024-01-15 10:15' },
            { id: 3, action: '新购入', assetName: 'MacBook Pro', username: '系统管理员', time: '2024-01-14 16:45' },
            { id: 4, action: '维修', assetName: 'iPad Pro', username: '王五', time: '2024-01-14 09:20' }
          ],
          monthlyTrend: [
            { month: '2023-09', count: 12 },
            { month: '2023-10', count: 18 },
            { month: '2023-11', count: 15 },
            { month: '2023-12', count: 20 },
            { month: '2024-01', count: 15 }
          ]
        };
      }
      
      return request(url);
    },
    
    // 获取领用统计
    getAllocationStats: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/reports/allocation-stats?${queryParams}` : '/reports/allocation-stats';
      return request(url);
    },
    
    // 获取维修统计
    getRepairStats: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/reports/repair-stats?${queryParams}` : '/reports/repair-stats';
      return request(url);
    },
    
    // 获取盘点统计
    getInventoryStats: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/reports/inventory-stats?${queryParams}` : '/reports/inventory-stats';
      return request(url);
    },
    
    // 导出报表
    exportReport: async (reportType, format, params = {}) => {
      const queryParams = new URLSearchParams({ ...params, format }).toString();
      const url = `/reports/export/${reportType}?${queryParams}`;
      
      const response = await request(url, {
        method: 'GET',
        responseType: 'blob',
      });
      
      // 处理文件下载
      const blob = new Blob([response], { 
        type: format === 'pdf' ? 'application/pdf' : 
              format === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 
              'text/csv'
      });
      const urlObj = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlObj;
      a.download = `${reportType}_报表_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObj);
    },
  },
  
  // 系统设置相关
  settings: {
    // 获取系统设置
    getSystemSettings: async () => {
      return request('/settings/system');
    },
    
    // 更新系统设置
    updateSystemSettings: async (settingsData) => {
      return request('/settings/system', {
        method: 'PUT',
        body: JSON.stringify(settingsData),
      });
    },
    
    // 获取用户列表
    getUsers: async (params = {}) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = queryParams ? `/settings/users?${queryParams}` : '/settings/users';
      return request(url);
    },
    
    // 创建用户
    createUser: async (userData) => {
      return request('/settings/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
    
    // 更新用户
    updateUser: async (id, userData) => {
      return request(`/settings/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
    },
    
    // 获取部门列表
    getDepartments: async () => {
      return request('/settings/departments');
    },
    
    // 获取资产位置列表
    getLocations: async () => {
      return request('/settings/locations');
    },
  },
};

export default api;

// 工具函数：获取状态的中文文本
export const getStatusText = (status) => {
  const statusMap = {
    in_stock: '库存中',
    in_use: '使用中',
    repairing: '维修中',
    scrapped: '已报废',
    pending: '待处理',
    in_progress: '进行中',
    completed: '已完成',
    rejected: '已拒绝',
    active: '启用',
    inactive: '禁用',
    normal: '正常',
    location_mismatch: '位置不符',
    missing: '丢失',
    found: '已找到',
    purchase: '采购入库',
    allocation: '领用',
    return: '归还',
    repair: '维修',
    scrap: '报废',
    movement: '移动'
  };
  return statusMap[status] || status;
};

// 工具函数：获取状态的样式类名
export const getStatusClass = (status) => {
  const classMap = {
    in_stock: 'status-in-stock',
    in_use: 'status-in-use',
    repairing: 'status-in-repair',
    scrapped: 'status-scrapped',
    pending: 'status-pending',
    in_progress: 'status-in-progress',
    completed: 'status-completed',
    rejected: 'status-rejected',
    active: 'status-active',
    inactive: 'status-inactive',
    normal: 'status-normal',
    location_mismatch: 'status-warning',
    missing: 'status-error',
    found: 'status-success'
  };
  return classMap[status] || '';
};

// 工具函数：格式化日期
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('zh-CN');
};

// 工具函数：格式化金额
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '-';
  return `¥${parseFloat(amount).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

// 工具函数：获取角色中文名称
export const getRoleText = (role) => {
  const roleMap = {
    admin: '管理员',
    department_manager: '部门主管',
    employee: '普通员工'
  };
  return roleMap[role] || role;
};

// 工具函数：防抖
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 工具函数：节流
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 工具函数：生成资产编码
export const generateAssetCode = (prefix = 'AST') => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${prefix}-${year}${month}${day}-${random}`;
};

// 工具函数：验证邮箱格式
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// 工具函数：验证手机号格式
export const validatePhone = (phone) => {
  const re = /^1[3-9]\d{9}$/;
  return re.test(phone);
};

// 工具函数：深拷贝对象
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

// 工具函数：获取相对时间
export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 30) return `${diffDays}天前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`;
  return `${Math.floor(diffDays / 365)}年前`;
};