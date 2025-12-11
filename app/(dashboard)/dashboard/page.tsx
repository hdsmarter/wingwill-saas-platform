'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type UserRole = 'CUSTOMER' | 'YUSHENG_ADMIN' | 'YUSHENG_SALES' | 'YUSHENG_TECH' | 'YUSHENG_FINANCE';

export default function DashboardPage() {
  const [userRole] = useState<UserRole>('YUSHENG_ADMIN');
  const [userName] = useState('管理員');

  // 營收趨勢數據
  const revenueData = [
    { month: '1月', value: 4000 },
    { month: '2月', value: 3000 },
    { month: '3月', value: 2000 },
    { month: '4月', value: 2780 },
    { month: '5月', value: 1890 },
    { month: '6月', value: 2390 },
    { month: '7月', value: 3490 },
  ];

  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'YUSHENG_ADMIN':
      default:
        return {
          title: '儀表板總覽',
          stats: [
            {
              label: '總營收',
              labelEn: 'Total Revenue',
              value: 'NT$ 24.5M',
              icon: 'currency',
              trend: '+12.5%',
              trendLabel: '較上月',
              trendUp: true,
              color: 'blue'
            },
            {
              label: '活躍用戶',
              labelEn: 'Active Users',
              value: '1,234',
              icon: 'users',
              trend: '+5.2%',
              trendLabel: '較上月',
              trendUp: true,
              color: 'green'
            },
            {
              label: '庫存週轉',
              labelEn: 'Inventory',
              value: '85%',
              icon: 'box',
              trend: '-2.1%',
              trendLabel: '較上月',
              trendUp: false,
              color: 'purple'
            },
            {
              label: '淨利潤',
              labelEn: 'Net Profit',
              value: 'NT$ 8.2M',
              icon: 'chart',
              trend: '+8.4%',
              trendLabel: '較上月',
              trendUp: true,
              color: 'pink'
            },
          ],
        };
    }
  };

  const config = getRoleConfig(userRole);

  const getIcon = (iconName: string, className = "w-7 h-7") => {
    const icons: { [key: string]: React.ReactElement } = {
      'currency': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'users': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      'box': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      'chart': (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
    };
    return icons[iconName] || icons['currency'];
  };

  const getColorClass = (color: string) => {
    const colors: { [key: string]: { bg: string, gradient: string } } = {
      'blue': { bg: 'bg-blue-50', gradient: 'from-blue-500 to-blue-600' },
      'green': { bg: 'bg-green-50', gradient: 'from-green-500 to-green-600' },
      'purple': { bg: 'bg-purple-50', gradient: 'from-purple-500 to-purple-600' },
      'pink': { bg: 'bg-pink-50', gradient: 'from-pink-500 to-pink-600' },
    };
    return colors[color] || colors['blue'];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Search and User Profile */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>首頁</span>
            <span>/</span>
            <span className="text-gray-900">{config.title}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="搜尋 (Ctrl + K)"
                className="w-80 h-9 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {/* User Avatar */}
            <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                AB
              </div>
              <span className="text-sm font-medium text-gray-700">Admin User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid - ERPNext Style: Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {config.stats.map((stat, index) => {
            const colorClass = getColorClass(stat.color);
            return (
              <Card key={index} className="border border-gray-200 shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        {stat.label} ({stat.labelEn})
                      </p>
                      <h3 className="text-3xl font-semibold text-gray-900">{stat.value}</h3>
                      <p className={`text-sm font-medium mt-2 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trend} {stat.trendLabel}
                      </p>
                    </div>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass.gradient} flex items-center justify-center shadow-lg`}>
                      {getIcon(stat.icon, "w-7 h-7 text-white")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend Chart - 2/3 width */}
          <Card className="lg:col-span-2 border border-gray-200 shadow-md">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-900">營收趨勢分析</h3>
              <Link href="/reports" className="text-sm text-blue-600 hover:underline font-medium">
                下載報表
              </Link>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Quick Actions & Notifications - 1/3 width */}
          <div className="space-y-4">
            {/* System Notifications */}
            <Card className="border border-gray-200 shadow-md">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">系統通知</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: 'ERP 系統更新 v2.4.0 已完成', time: '2 小時前', source: '系統管理員' },
                  { title: 'ERP 系統更新 v2.4.0 已完成', time: '2 小時前', source: '系統管理員' },
                  { title: 'ERP 系統更新 v2.4.0 已完成', time: '2 小時前', source: '系統管理員' },
                  { title: 'ERP 系統更新 v2.4.0 已完成', time: '2 小時前', source: '系統管理員' },
                ].map((notification, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time} ‧ {notification.source}
                      </p>
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
