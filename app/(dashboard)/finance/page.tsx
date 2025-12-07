'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock 財務數據
const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    orderNumber: 'ORD-2024-0001',
    customer: '測試企業',
    amount: 7200,
    currency: 'TWD',
    status: 'PAID',
    issueDate: '2024-11-01',
    dueDate: '2024-11-15',
    paidDate: '2024-11-10',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    orderNumber: 'ORD-2024-0002',
    customer: 'ABC 科技公司',
    amount: 41250,
    currency: 'TWD',
    status: 'PAID',
    issueDate: '2024-11-05',
    dueDate: '2024-11-20',
    paidDate: '2024-11-18',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    orderNumber: 'ORD-2024-0003',
    customer: 'XYZ 設計工作室',
    amount: 5400,
    currency: 'TWD',
    status: 'PENDING',
    issueDate: '2024-12-01',
    dueDate: '2024-12-15',
    paidDate: null,
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    orderNumber: 'ORD-2024-0004',
    customer: '創新股份有限公司',
    amount: 150000,
    currency: 'TWD',
    status: 'OVERDUE',
    issueDate: '2024-11-15',
    dueDate: '2024-11-30',
    paidDate: null,
  },
];

const statusConfig = {
  PAID: { label: '已付款', color: 'bg-green-100 text-green-800' },
  PENDING: { label: '待付款', color: 'bg-yellow-100 text-yellow-800' },
  OVERDUE: { label: '逾期', color: 'bg-red-100 text-red-800' },
  CANCELLED: { label: '已取消', color: 'bg-gray-100 text-gray-800' },
};

const monthlyRevenue = [
  { month: '1月', revenue: 45000, growth: '+12%' },
  { month: '2月', revenue: 52000, growth: '+15%' },
  { month: '3月', revenue: 48000, growth: '-8%' },
  { month: '4月', revenue: 61000, growth: '+27%' },
  { month: '5月', revenue: 58000, growth: '-5%' },
  { month: '6月', revenue: 72000, growth: '+24%' },
];

export default function FinancePage() {
  const totalRevenue = mockInvoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = mockInvoices.filter(i => i.status === 'PENDING' || i.status === 'OVERDUE').reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = mockInvoices.filter(i => i.status === 'OVERDUE').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-8 py-7">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#1F2937]">財務管理</h1>
              <p className="mt-1.5 text-sm text-[#6B7280]">
                管理發票、收款與財務報表
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                匯出報表
              </Button>
              <Button variant="primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                開立發票
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-7">
          <Card className="shadow-sm hover:shadow-md transition-shadow border-[#E5E7EB]">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">本月營收</p>
                  <p className="text-2xl font-semibold text-[#1F2937]">
                    ${(totalRevenue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-green-600 mt-2 font-medium">+18% 較上月</p>
                </div>
                <div className="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow border-[#E5E7EB]">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">待收款</p>
                  <p className="text-2xl font-semibold text-yellow-600">
                    ${(pendingAmount / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-[#6B7280] mt-2">{mockInvoices.filter(i => i.status === 'PENDING').length} 張發票</p>
                </div>
                <div className="w-11 h-11 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow border-[#E5E7EB]">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">逾期帳款</p>
                  <p className="text-2xl font-semibold text-red-600">
                    ${(overdueAmount / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-[#6B7280] mt-2">{mockInvoices.filter(i => i.status === 'OVERDUE').length} 張發票</p>
                </div>
                <div className="w-11 h-11 bg-red-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow border-[#E5E7EB]">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">總發票</p>
                  <p className="text-2xl font-semibold text-[#1F2937]">{mockInvoices.length}</p>
                  <p className="text-xs text-[#6B7280] mt-2">本月</p>
                </div>
                <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Invoices List */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-[#E5E7EB]">
              <CardHeader className="border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-[#1F2937]">發票列表</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">全部</Button>
                    <Button variant="ghost" size="sm">待付款</Button>
                    <Button variant="ghost" size="sm">逾期</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                      <tr>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                          發票編號
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                          客戶
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                          金額
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                          到期日
                        </th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                          狀態
                        </th>
                        <th className="px-6 py-3.5 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E5E7EB]">
                      {mockInvoices.map((invoice) => {
                        const config = statusConfig[invoice.status as keyof typeof statusConfig];
                        return (
                          <tr key={invoice.id} className="hover:bg-[#F9FAFB] transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-[#1F2937]">{invoice.invoiceNumber}</p>
                                <p className="text-xs text-[#6B7280] mt-0.5">{invoice.orderNumber}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-[#1F2937]">{invoice.customer}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-semibold text-[#1F2937]">${invoice.amount.toLocaleString()}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-[#1F2937]">{invoice.dueDate}</p>
                              {invoice.paidDate && (
                                <p className="text-xs text-green-600 mt-0.5">已付: {invoice.paidDate}</p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${config.color}`}>
                                {config.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">查看</Button>
                                {invoice.status !== 'PAID' && (
                                  <Button variant="primary" size="sm">收款</Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <div>
            <Card className="shadow-sm border-[#E5E7EB]">
              <CardHeader className="border-b border-[#E5E7EB]">
                <CardTitle className="text-lg font-semibold text-[#1F2937]">月營收趨勢</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  {monthlyRevenue.map((data, index) => {
                    const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
                    const percentage = (data.revenue / maxRevenue) * 100;
                    const isPositive = data.growth.startsWith('+');

                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#1F2937]">{data.month}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#1F2937]">
                              ${(data.revenue / 1000).toFixed(0)}K
                            </span>
                            <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {data.growth}
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#C81C11] transition-all rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-5 shadow-sm border-[#E5E7EB]">
              <CardHeader className="border-b border-[#E5E7EB]">
                <CardTitle className="text-lg font-semibold text-[#1F2937]">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  開立新發票
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  批次收款
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  匯出財務報表
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
