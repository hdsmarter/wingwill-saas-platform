'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from '@/components/ui/dialog';

type ViewMode = 'grid' | 'table';

// Mock 客戶數據 (擴充)
const mockCustomers = [
  {
    id: '1',
    organizationName: '測試企業',
    contactName: '王大明',
    email: 'customer@example.com',
    phone: '02-2345-6789',
    taxId: '12345678',
    address: '台北市信義區信義路五段7號',
    activeSubscriptions: 2,
    totalOrders: 5,
    totalSpent: 45000,
    status: 'ACTIVE',
    createdAt: '2024-01-15',
    lastOrderDate: '2024-11-20',
    recentOrders: [
      { id: 'ORD-2024-0001', product: 'Google Workspace', amount: 7200, date: '2024-11-20' },
      { id: 'ORD-2024-0015', product: 'Microsoft 365', amount: 12000, date: '2024-10-15' },
    ],
    subscriptions: [
      { product: 'Google Workspace Business', licenses: 10, monthlyFee: 3600 },
      { product: 'Microsoft 365 E3', licenses: 5, monthlyFee: 8250 },
    ],
  },
  {
    id: '2',
    organizationName: 'ABC 科技公司',
    contactName: '李小華',
    email: 'it@abc.com',
    phone: '02-8765-4321',
    taxId: '87654321',
    address: '新北市板橋區文化路一段188號',
    activeSubscriptions: 3,
    totalOrders: 12,
    totalSpent: 128000,
    status: 'ACTIVE',
    createdAt: '2023-08-20',
    lastOrderDate: '2024-11-25',
    recentOrders: [
      { id: 'ORD-2024-0012', product: 'Google Cloud', amount: 45000, date: '2024-11-25' },
    ],
    subscriptions: [
      { product: 'Google Workspace Enterprise', licenses: 25, monthlyFee: 18750 },
      { product: 'Microsoft 365 E5', licenses: 15, monthlyFee: 24750 },
      { product: 'Adobe Creative Cloud', licenses: 8, monthlyFee: 15200 },
    ],
  },
  {
    id: '3',
    organizationName: 'XYZ 設計工作室',
    contactName: '陳美玲',
    email: 'admin@xyz.design',
    phone: '04-2234-5678',
    taxId: '23456789',
    address: '台中市西屯區台灣大道三段99號',
    activeSubscriptions: 1,
    totalOrders: 3,
    totalSpent: 18000,
    status: 'ACTIVE',
    createdAt: '2024-06-10',
    lastOrderDate: '2024-10-05',
    recentOrders: [
      { id: 'ORD-2024-0003', product: 'Adobe CC', amount: 6000, date: '2024-10-05' },
    ],
    subscriptions: [
      { product: 'Adobe Creative Cloud All Apps', licenses: 5, monthlyFee: 9500 },
    ],
  },
  {
    id: '4',
    organizationName: '創新股份有限公司',
    contactName: '張志明',
    email: 'procurement@innovation.com',
    phone: '07-345-6789',
    taxId: '34567890',
    address: '高雄市前鎮區中山三路132號',
    activeSubscriptions: 4,
    totalOrders: 18,
    totalSpent: 256000,
    status: 'ACTIVE',
    createdAt: '2023-03-05',
    lastOrderDate: '2024-11-28',
    recentOrders: [
      { id: 'ORD-2024-0020', product: 'Enterprise Suite', amount: 85000, date: '2024-11-28' },
    ],
    subscriptions: [
      { product: 'Google Workspace Enterprise Plus', licenses: 50, monthlyFee: 45000 },
      { product: 'Microsoft 365 E5', licenses: 30, monthlyFee: 49500 },
      { product: 'Salesforce Enterprise', licenses: 20, monthlyFee: 60000 },
      { product: 'Slack Enterprise Grid', licenses: 50, monthlyFee: 22500 },
    ],
  },
  {
    id: '5',
    organizationName: '暫停服務公司',
    contactName: '劉小明',
    email: 'contact@suspended.com',
    phone: '03-456-7890',
    taxId: '45678901',
    address: '桃園市中壢區中央西路二段11號',
    activeSubscriptions: 0,
    totalOrders: 2,
    totalSpent: 12000,
    status: 'SUSPENDED',
    createdAt: '2024-02-28',
    lastOrderDate: '2024-08-10',
    recentOrders: [],
    subscriptions: [],
  },
];

const statusConfig = {
  ACTIVE: { label: '正常', color: 'bg-green-100 text-green-800', icon: '✓' },
  SUSPENDED: { label: '暫停', color: 'bg-yellow-100 text-yellow-800', icon: '⏸' },
  INACTIVE: { label: '停用', color: 'bg-gray-100 text-gray-800', icon: '✕' },
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'spent' | 'orders' | 'date'>('spent');

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || customer.status === selectedStatus;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.organizationName.localeCompare(b.organizationName);
      case 'spent':
        return b.totalSpent - a.totalSpent;
      case 'orders':
        return b.totalOrders - a.totalOrders;
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const statusCounts = {
    ALL: mockCustomers.length,
    ACTIVE: mockCustomers.filter(c => c.status === 'ACTIVE').length,
    SUSPENDED: mockCustomers.filter(c => c.status === 'SUSPENDED').length,
    INACTIVE: mockCustomers.filter(c => c.status === 'INACTIVE').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GCP Style Header - Ultra Compact */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>首頁</span>
            <span>/</span>
            <span className="text-gray-900">客戶管理</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-medium text-gray-900">客戶管理</h1>
              <p className="mt-0.5 text-xs text-gray-600">
                管理企業客戶資料與訂閱狀態
              </p>
            </div>
            <button className="h-8 px-3 flex items-center gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-sm transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              新增客戶
            </button>
          </div>

          {/* GCP Compact Search & Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <svg className="absolute left-2.5 top-2 text-gray-400 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜尋客戶名稱、Email、聯絡人..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-xs border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-8 px-2.5 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="spent">依消費金額排序</option>
                <option value="orders">依訂單數量排序</option>
                <option value="name">依名稱排序</option>
                <option value="date">依建立日期排序</option>
              </select>
              <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2 py-1.5 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2 py-1.5 border-l border-gray-300 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Status Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'ALL', label: '全部客戶', icon: '📊' },
            { key: 'ACTIVE', label: '正常', icon: '✅' },
            { key: 'SUSPENDED', label: '暫停', icon: '⏸️' },
            { key: 'INACTIVE', label: '停用', icon: '❌' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedStatus === tab.key
                  ? 'bg-[#C81C11] text-white shadow-lg scale-105'
                  : 'bg-white text-[#858585] hover:bg-[#F9FAFB] border border-[#E5E7EB]'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                selectedStatus === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-[#E5E7EB] text-[#212121]'
              }`}>
                {statusCounts[tab.key as keyof typeof statusCounts]}
              </span>
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#858585] mb-2 font-medium">總客戶數</p>
                  <p className="text-4xl font-bold text-[#212121] mb-1">{mockCustomers.length}</p>
                  <p className="text-xs text-green-600 font-semibold">+2 本月新增</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all border-l-4 border-l-[#C81C11]">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#858585] mb-2 font-medium">活躍訂閱</p>
                  <p className="text-4xl font-bold text-[#C81C11] mb-1">
                    {mockCustomers.reduce((sum, c) => sum + c.activeSubscriptions, 0)}
                  </p>
                  <p className="text-xs text-[#858585]">跨 {mockCustomers.filter(c => c.activeSubscriptions > 0).length} 家企業</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C81C11] to-[#A01108] flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#858585] mb-2 font-medium">總訂單數</p>
                  <p className="text-4xl font-bold text-[#212121] mb-1">
                    {mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0)}
                  </p>
                  <p className="text-xs text-green-600 font-semibold">+8 本月</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#858585] mb-2 font-medium">總營收</p>
                  <p className="text-4xl font-bold text-green-600 mb-1">
                    ${mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 font-semibold">+18% 相比上月</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => {
              const config = statusConfig[customer.status as keyof typeof statusConfig];
              return (
                <Card
                  key={customer.id}
                  className="hover:shadow-xl transition-all cursor-pointer border-l-4 border-l-[#C81C11]"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C81C11] to-[#A01108] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {customer.organizationName.charAt(0)}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                        {config.label}
                      </span>
                    </div>

                    {/* Company Info */}
                    <h3 className="text-lg font-bold text-[#212121] mb-1">{customer.organizationName}</h3>
                    <p className="text-sm text-[#858585] mb-1">{customer.contactName}</p>
                    <p className="text-sm text-[#858585] mb-4">{customer.email}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-[#E5E7EB]">
                      <div>
                        <p className="text-xs text-[#858585] mb-1">訂閱</p>
                        <p className="text-lg font-bold text-[#C81C11]">{customer.activeSubscriptions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#858585] mb-1">訂單</p>
                        <p className="text-lg font-bold text-[#212121]">{customer.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#858585] mb-1">消費</p>
                        <p className="text-sm font-bold text-green-600">${(customer.totalSpent / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        查看
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        編輯
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9FAFB] border-b-2 border-[#E5E7EB]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#212121] uppercase tracking-wider">
                        客戶資訊
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#212121] uppercase tracking-wider">
                        聯絡方式
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#212121] uppercase tracking-wider">
                        訂閱 / 訂單
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#212121] uppercase tracking-wider">
                        總消費
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-[#212121] uppercase tracking-wider">
                        狀態
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-[#212121] uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#E5E7EB]">
                    {filteredCustomers.map((customer) => {
                      const config = statusConfig[customer.status as keyof typeof statusConfig];
                      return (
                        <tr key={customer.id} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C81C11] to-[#A01108] flex items-center justify-center text-white font-bold shadow">
                                {customer.organizationName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-[#212121]">{customer.organizationName}</p>
                                <p className="text-sm text-[#858585]">{customer.contactName}</p>
                                <p className="text-xs text-[#858585]">統編: {customer.taxId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm text-[#212121] flex items-center gap-1">
                                <svg className="w-4 h-4 text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {customer.email}
                              </p>
                              <p className="text-sm text-[#858585] flex items-center gap-1 mt-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {customer.phone}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-6">
                              <div>
                                <p className="text-xs text-[#858585] mb-1">活躍訂閱</p>
                                <p className="text-xl font-bold text-[#C81C11]">{customer.activeSubscriptions}</p>
                              </div>
                              <div>
                                <p className="text-xs text-[#858585] mb-1">總訂單</p>
                                <p className="text-xl font-bold text-[#212121]">{customer.totalOrders}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-lg font-bold text-green-600">${customer.totalSpent.toLocaleString()}</p>
                            <p className="text-xs text-[#858585]">TWD</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} flex items-center gap-1 w-fit`}>
                              <span>{config.icon}</span>
                              {config.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedCustomer(customer)}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                查看
                              </Button>
                              <Button variant="ghost" size="sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                編輯
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredCustomers.length === 0 && (
                <div className="py-16 text-center">
                  <svg className="w-16 h-16 mx-auto text-[#858585] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-lg font-medium text-[#858585]">找不到符合條件的客戶</p>
                  <p className="text-sm text-[#858585] mt-2">請嘗試調整搜尋條件或篩選器</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} size="xl">
        {selectedCustomer && (
          <>
            <DialogHeader onClose={() => setSelectedCustomer(null)}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#C81C11] to-[#A01108] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {selectedCustomer.organizationName.charAt(0)}
                </div>
                <div>
                  <DialogTitle>{selectedCustomer.organizationName}</DialogTitle>
                  <p className="text-sm text-[#858585] mt-1">
                    {statusConfig[selectedCustomer.status as keyof typeof statusConfig].label} ·
                    加入於 {selectedCustomer.createdAt}
                  </p>
                </div>
              </div>
            </DialogHeader>
            <DialogContent>
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-blue-900 mb-1">活躍訂閱</p>
                    <p className="text-3xl font-bold text-blue-600">{selectedCustomer.activeSubscriptions}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-purple-900 mb-1">總訂單</p>
                    <p className="text-3xl font-bold text-purple-600">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-green-900 mb-1">總消費</p>
                    <p className="text-2xl font-bold text-green-600">${selectedCustomer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-orange-900 mb-1">最近訂單</p>
                    <p className="text-sm font-bold text-orange-600">{selectedCustomer.lastOrderDate}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-[#E5E7EB] pt-6">
                  <h3 className="font-bold text-[#212121] mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    聯絡資訊
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                      <p className="text-sm font-semibold text-[#858585] mb-2">聯絡人</p>
                      <p className="text-[#212121] font-medium">{selectedCustomer.contactName}</p>
                    </div>
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                      <p className="text-sm font-semibold text-[#858585] mb-2">統一編號</p>
                      <p className="text-[#212121] font-medium">{selectedCustomer.taxId}</p>
                    </div>
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                      <p className="text-sm font-semibold text-[#858585] mb-2">Email</p>
                      <p className="text-[#212121] font-medium">{selectedCustomer.email}</p>
                    </div>
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                      <p className="text-sm font-semibold text-[#858585] mb-2">電話</p>
                      <p className="text-[#212121] font-medium">{selectedCustomer.phone}</p>
                    </div>
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 col-span-2">
                      <p className="text-sm font-semibold text-[#858585] mb-2">地址</p>
                      <p className="text-[#212121] font-medium">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>

                {/* Active Subscriptions */}
                {selectedCustomer.subscriptions.length > 0 && (
                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="font-bold text-[#212121] mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      活躍訂閱 ({selectedCustomer.subscriptions.length})
                    </h3>
                    <div className="space-y-3">
                      {selectedCustomer.subscriptions.map((sub, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
                              ✓
                            </div>
                            <div>
                              <p className="font-semibold text-[#212121]">{sub.product}</p>
                              <p className="text-sm text-[#858585]">{sub.licenses} 個授權</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">${sub.monthlyFee.toLocaleString()}</p>
                            <p className="text-xs text-[#858585]">每月</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Orders */}
                {selectedCustomer.recentOrders.length > 0 && (
                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="font-bold text-[#212121] mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      最近訂單
                    </h3>
                    <div className="space-y-2">
                      {selectedCustomer.recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-white transition-colors">
                          <div>
                            <p className="font-semibold text-[#212121]">{order.id}</p>
                            <p className="text-sm text-[#858585]">{order.product} · {order.date}</p>
                          </div>
                          <p className="font-bold text-[#C81C11]">${order.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                關閉
              </Button>
              <Button variant="ghost">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                編輯資料
              </Button>
              <Button variant="primary">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                建立訂單
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  );
}
