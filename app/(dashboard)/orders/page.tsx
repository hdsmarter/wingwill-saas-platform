'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type UserRole = 'CUSTOMER' | 'YUSHENG_ADMIN' | 'YUSHENG_SALES' | 'YUSHENG_TECH' | 'YUSHENG_FINANCE';

// Mock 訂單數據
const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-0001',
    customer: '測試企業',
    customerEmail: 'customer@example.com',
    product: 'Google Workspace Business Standard',
    quantity: 10,
    totalAmount: 7200,
    currency: 'TWD',
    status: 'PENDING_SALES',
    createdAt: '2024-12-01',
    notes: '需要協助設定網域',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-0002',
    customer: 'ABC 科技公司',
    customerEmail: 'it@abc.com',
    product: 'Microsoft 365 Business Premium',
    quantity: 25,
    totalAmount: 41250,
    currency: 'TWD',
    status: 'PENDING_TECH',
    createdAt: '2024-12-02',
    notes: '需要整合現有AD',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-0003',
    customer: 'XYZ 設計工作室',
    customerEmail: 'admin@xyz.design',
    product: 'Google Workspace Business Plus',
    quantity: 5,
    totalAmount: 5400,
    currency: 'TWD',
    status: 'PROCESSING',
    createdAt: '2024-11-28',
    notes: '',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-0004',
    customer: '創新股份有限公司',
    customerEmail: 'procurement@innovation.com',
    product: 'Google Cloud Platform',
    quantity: 1,
    totalAmount: 150000,
    currency: 'TWD',
    status: 'COMPLETED',
    createdAt: '2024-11-25',
    notes: '年度合約',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-0005',
    customer: '測試公司',
    customerEmail: 'test@test.com',
    product: 'Google Workspace Enterprise',
    quantity: 50,
    totalAmount: 90000,
    currency: 'TWD',
    status: 'REJECTED',
    createdAt: '2024-11-20',
    notes: '大量授權需求',
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-0006',
    customer: 'DEF 集團',
    customerEmail: 'it@def.com',
    product: 'Microsoft 365 Business Standard',
    quantity: 15,
    totalAmount: 22500,
    currency: 'TWD',
    status: 'COMPLETED',
    createdAt: '2024-11-18',
    notes: '',
  },
  {
    id: '7',
    orderNumber: 'ORD-2024-0007',
    customer: 'GHI 有限公司',
    customerEmail: 'admin@ghi.com',
    product: 'Google Workspace Business Starter',
    quantity: 8,
    totalAmount: 4800,
    currency: 'TWD',
    status: 'PROCESSING',
    createdAt: '2024-11-15',
    notes: '',
  },
];

const statusConfig = {
  PENDING_SALES: { label: '待業務審核', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  PENDING_TECH: { label: '待技術審核', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  PENDING_PAYMENT: { label: '待付款', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  PROCESSING: { label: '處理中', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  COMPLETED: { label: '已完成', color: 'bg-green-50 text-green-700 border-green-200' },
  CANCELLED: { label: '已取消', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  REJECTED: { label: '已拒絕', color: 'bg-red-50 text-red-700 border-red-200' },
};

export default function OrdersPage() {
  const [userRole] = useState<UserRole>('YUSHENG_ADMIN');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredOrders = selectedStatus === 'ALL'
    ? mockOrders
    : mockOrders.filter(order => order.status === selectedStatus);

  const statusCounts = {
    ALL: mockOrders.length,
    PENDING_SALES: mockOrders.filter(o => o.status === 'PENDING_SALES').length,
    PENDING_TECH: mockOrders.filter(o => o.status === 'PENDING_TECH').length,
    PROCESSING: mockOrders.filter(o => o.status === 'PROCESSING').length,
    COMPLETED: mockOrders.filter(o => o.status === 'COMPLETED').length,
    REJECTED: mockOrders.filter(o => o.status === 'REJECTED').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GCP Style Header - Ultra Compact */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>首頁</span>
            <span>/</span>
            <span className="text-gray-900">訂單管理</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium text-gray-900">訂單管理</h1>
              <p className="text-xs text-gray-600 mt-0.5">管理所有訂單與審核流程</p>
            </div>
            <button className="h-8 px-3 flex items-center gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-sm transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              建立訂單
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Status Filter Tabs - GCP Style */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { key: 'ALL', label: '全部訂單' },
            { key: 'PENDING_SALES', label: '待業務審核' },
            { key: 'PENDING_TECH', label: '待技術審核' },
            { key: 'PROCESSING', label: '處理中' },
            { key: 'COMPLETED', label: '已完成' },
            { key: 'REJECTED', label: '已拒絕' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStatus(tab.key)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                selectedStatus === tab.key
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                selectedStatus === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {statusCounts[tab.key as keyof typeof statusCounts]}
              </span>
            </button>
          ))}
        </div>

        {/* Orders Table Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0">
            {/* Table Toolbar */}
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-white border border-gray-300 rounded-sm hover:bg-gray-50 text-gray-700 shadow-sm">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  篩選
                </button>
                <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-white border border-gray-300 rounded-sm hover:bg-gray-50 text-gray-700 shadow-sm">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  分組
                </button>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <svg className="absolute left-2 top-1.5 text-gray-400 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input type="text" placeholder="搜尋訂單..." className="pl-7 pr-3 py-1 text-xs border border-gray-300 rounded-sm w-48 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                  <tr className="text-xs text-gray-500 uppercase tracking-wider">
                    <th className="py-2 px-4 font-semibold w-8">
                      <input type="checkbox" className="rounded-sm border-gray-300 w-3 h-3" />
                    </th>
                    <th className="py-2 px-4 font-semibold">訂單編號</th>
                    <th className="py-2 px-4 font-semibold">客戶</th>
                    <th className="py-2 px-4 font-semibold">產品</th>
                    <th className="py-2 px-4 font-semibold text-right">金額</th>
                    <th className="py-2 px-4 font-semibold">狀態</th>
                    <th className="py-2 px-4 font-semibold">日期</th>
                    <th className="py-2 px-4 font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => {
                    const config = statusConfig[order.status as keyof typeof statusConfig];

                    return (
                      <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="py-2 px-4">
                          <input type="checkbox" className="rounded-sm border-gray-300 w-3 h-3" />
                        </td>
                        <td className="py-2 px-4">
                          <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">{order.orderNumber}</div>
                        </td>
                        <td className="py-2 px-4">
                          <div className="text-sm text-gray-900">{order.customer}</div>
                          <div className="text-xs text-gray-500">{order.customerEmail}</div>
                        </td>
                        <td className="py-2 px-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{order.product}</div>
                          <div className="text-xs text-gray-500">數量: {order.quantity}</div>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${order.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{order.currency}</div>
                        </td>
                        <td className="py-2 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${config.color}`}>
                            {config.label}
                          </span>
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-500">
                          {order.createdAt}
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex items-center gap-2 text-xs">
                            <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                              查看
                            </Link>
                            {(order.status === 'PENDING_SALES' || order.status === 'PENDING_TECH') && (
                              <>
                                <span className="text-gray-300">|</span>
                                <button className="text-blue-600 hover:underline">核准</button>
                                <span className="text-gray-300">|</span>
                                <button className="text-red-600 hover:underline">拒絕</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-gray-500">
                  目前沒有{selectedStatus === 'ALL' ? '' : statusConfig[selectedStatus as keyof typeof statusConfig]?.label}訂單
                </p>
              </div>
            )}

            {/* Pagination Footer */}
            {filteredOrders.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                <span>顯示 1-{filteredOrders.length} 筆，共 {filteredOrders.length} 筆</span>
                <div className="flex gap-1">
                  <button className="px-2 py-1 border border-gray-300 rounded-sm bg-white hover:bg-gray-50 disabled:opacity-50 text-xs">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="px-2 py-1 border border-gray-300 rounded-sm bg-blue-50 border-blue-200 text-blue-700 text-xs font-medium">1</button>
                  <button className="px-2 py-1 border border-gray-300 rounded-sm bg-white hover:bg-gray-50 text-xs">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
