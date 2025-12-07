'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

type UserRole = 'CUSTOMER' | 'YUSHENG_ADMIN' | 'YUSHENG_SALES' | 'YUSHENG_TECH' | 'YUSHENG_FINANCE';

export default function DashboardPage() {
  const [userRole] = useState<UserRole>('YUSHENG_ADMIN');
  const [userName] = useState('管理員');

  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'YUSHENG_ADMIN':
      default:
        return {
          title: '儀表板總覽',
          stats: [
            { label: '總訂單數', value: '24', icon: 'box', trend: '+12%', trendUp: true },
            { label: '活躍訂閱', value: '18', icon: 'refresh', trend: '+8%', trendUp: true },
            { label: '待審核', value: '3', icon: 'clock', trend: null, trendUp: null },
            { label: '本月營收', value: 'NT$ 124.5K', icon: 'currency', trend: '+23%', trendUp: true },
          ],
        };
    }
  };

  const config = getRoleConfig(userRole);

  const getIcon = (iconName: string, className = "w-5 h-5") => {
    const icons: { [key: string]: JSX.Element } = {
      'box': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      'refresh': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      'clock': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'currency': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons['box'];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GCP Style Header - Ultra Compact */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>首頁</span>
            <span>/</span>
            <span className="text-gray-900">{config.title}</span>
          </div>
          <h1 className="text-xl font-medium text-gray-900">{config.title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid - GCP Style: Ultra Compact, 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {config.stats.map((stat, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-gray-50 rounded text-gray-600">
                    {getIcon(stat.icon, "w-4 h-4")}
                  </div>
                  {stat.trend && (
                    <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {stat.trendUp ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        )}
                      </svg>
                      <span>{stat.trend}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-semibold text-gray-900">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Orders Table - 2/3 width */}
          <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-800">最近訂單</h3>
              <Link href="/orders" className="text-xs text-blue-600 hover:underline font-medium">
                查看全部 →
              </Link>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="p-3 text-xs font-semibold text-gray-600 border-b border-gray-200">訂單編號</th>
                    <th className="p-3 text-xs font-semibold text-gray-600 border-b border-gray-200">客戶</th>
                    <th className="p-3 text-xs font-semibold text-gray-600 border-b border-gray-200 text-right">金額</th>
                    <th className="p-3 text-xs font-semibold text-gray-600 border-b border-gray-200">狀態</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: 'ORD-2024-0001', customer: '測試企業', amount: 'NT$ 7,200', status: 'pending', statusLabel: '待審核' },
                    { id: 'ORD-2024-0002', customer: 'ABC 公司', amount: 'NT$ 12,000', status: 'completed', statusLabel: '已完成' },
                    { id: 'ORD-2024-0003', customer: 'XYZ 科技', amount: 'NT$ 4,800', status: 'processing', statusLabel: '處理中' },
                    { id: 'ORD-2024-0004', customer: 'DEF 集團', amount: 'NT$ 21,000', status: 'completed', statusLabel: '已完成' },
                    { id: 'ORD-2024-0005', customer: 'GHI 有限公司', amount: 'NT$ 8,900', status: 'processing', statusLabel: '處理中' },
                  ].map((order) => (
                    <tr key={order.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer">
                      <td className="p-3 font-medium text-sm text-blue-600 hover:underline">{order.id}</td>
                      <td className="p-3 text-sm text-gray-900">{order.customer}</td>
                      <td className="p-3 text-sm text-gray-900 text-right font-mono">{order.amount}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                          order.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' :
                          order.status === 'processing' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}>
                          {order.statusLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick Actions & Notifications - 1/3 width */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card className="border border-gray-200 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-800">快速操作</h3>
              </div>
              <div className="p-3 space-y-1">
                {[
                  { label: '建立新訂單', href: '/orders', icon: 'plus' },
                  { label: '新增客戶', href: '/customers', icon: 'user' },
                  { label: '查看報表', href: '/reports', icon: 'chart' },
                  { label: '系統設定', href: '/settings', icon: 'cog' },
                ].map((action, index) => (
                  <Link key={index} href={action.href}>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-sm transition-colors text-left">
                      <span className="text-gray-500">{getIcon(action.icon, "w-4 h-4")}</span>
                      <span>{action.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </Card>

            {/* System Notifications */}
            <Card className="border border-gray-200 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-800">系統通知</h3>
              </div>
              <div className="p-3 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-sm transition-colors cursor-pointer">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-900">系統更新通知 v2.4.{i}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{i} 小時前</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
