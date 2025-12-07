'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock 訂閱數據
const mockSubscriptions = [
  {
    id: '1',
    organizationName: '測試企業',
    productName: 'Google Workspace Business Standard',
    planName: 'Business Standard',
    type: 'GWS',
    domain: 'testcompany.com',
    licenses: 10,
    usedLicenses: 8,
    pricePerLicense: 720,
    currency: 'TWD',
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    startDate: '2024-01-01',
    nextBillingDate: '2024-12-01',
    autoRenew: true,
  },
  {
    id: '2',
    organizationName: 'ABC 科技公司',
    productName: 'Microsoft 365 Business Premium',
    planName: 'Business Premium',
    type: 'M365',
    domain: 'abc.com',
    licenses: 25,
    usedLicenses: 25,
    pricePerLicense: 1650,
    currency: 'TWD',
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    startDate: '2023-08-01',
    nextBillingDate: '2024-12-01',
    autoRenew: true,
  },
  {
    id: '3',
    organizationName: 'XYZ 設計工作室',
    productName: 'Google Workspace Business Plus',
    planName: 'Business Plus',
    type: 'GWS',
    domain: 'xyz.design',
    licenses: 5,
    usedLicenses: 5,
    pricePerLicense: 1080,
    currency: 'TWD',
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
    startDate: '2024-06-15',
    nextBillingDate: '2024-12-15',
    autoRenew: true,
  },
  {
    id: '4',
    organizationName: '創新股份有限公司',
    productName: 'Google Cloud Platform',
    planName: 'Enterprise',
    type: 'GCP',
    domain: 'innovation.com',
    licenses: 1,
    usedLicenses: 1,
    pricePerLicense: 150000,
    currency: 'TWD',
    billingCycle: 'YEARLY',
    status: 'ACTIVE',
    startDate: '2024-01-01',
    nextBillingDate: '2025-01-01',
    autoRenew: true,
  },
  {
    id: '5',
    organizationName: '暫停服務公司',
    productName: 'Google Workspace Business Starter',
    planName: 'Business Starter',
    type: 'GWS',
    domain: 'suspended.com',
    licenses: 8,
    usedLicenses: 0,
    pricePerLicense: 480,
    currency: 'TWD',
    billingCycle: 'MONTHLY',
    status: 'SUSPENDED',
    startDate: '2024-02-01',
    nextBillingDate: null,
    autoRenew: false,
  },
];

const statusConfig = {
  ACTIVE: { label: '正常', color: 'bg-green-100 text-green-800' },
  SUSPENDED: { label: '暫停', color: 'bg-yellow-100 text-yellow-800' },
  EXPIRED: { label: '已到期', color: 'bg-red-100 text-red-800' },
  CANCELLED: { label: '已取消', color: 'bg-gray-100 text-gray-800' },
};

const typeConfig = {
  GWS: { label: 'Google Workspace', icon: '🔍', color: 'text-blue-600' },
  GCP: { label: 'Google Cloud', icon: '☁️', color: 'text-orange-600' },
  M365: { label: 'Microsoft 365', icon: '💼', color: 'text-indigo-600' },
  AKAMAI: { label: 'Akamai', icon: '🚀', color: 'text-purple-600' },
};

export default function SubscriptionsPage() {
  const activeSubscriptions = mockSubscriptions.filter(s => s.status === 'ACTIVE');
  const totalLicenses = mockSubscriptions.reduce((sum, s) => sum + s.licenses, 0);
  const usedLicenses = mockSubscriptions.reduce((sum, s) => sum + s.usedLicenses, 0);
  const monthlyRevenue = mockSubscriptions
    .filter(s => s.status === 'ACTIVE' && s.billingCycle === 'MONTHLY')
    .reduce((sum, s) => sum + (s.pricePerLicense * s.licenses), 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-8 py-7">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#1F2937]">訂閱管理</h1>
              <p className="mt-1.5 text-sm text-[#6B7280]">
                管理所有雲端服務訂閱與授權
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
                新增訂閱
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
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">活躍訂閱</p>
                  <p className="text-2xl font-semibold text-[#1F2937]">{activeSubscriptions.length}</p>
                </div>
                <div className="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow border-[#E5E7EB]">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">總授權數</p>
                  <p className="text-2xl font-semibold text-[#1F2937]">{totalLicenses}</p>
                </div>
                <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow border-[#E5E7EB]">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">使用率</p>
                  <p className="text-2xl font-semibold text-[#C81C11]">
                    {Math.round((usedLicenses / totalLicenses) * 100)}%
                  </p>
                </div>
                <div className="w-11 h-11 bg-red-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow border-[#E5E7EB]">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B7280] mb-2 font-medium">月營收</p>
                  <p className="text-2xl font-semibold text-green-600">
                    ${(monthlyRevenue / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-5">
          {mockSubscriptions.map((sub) => {
            const statusCfg = statusConfig[sub.status as keyof typeof statusConfig];
            const typeCfg = typeConfig[sub.type as keyof typeof typeConfig];
            const licenseUsage = (sub.usedLicenses / sub.licenses) * 100;

            return (
              <Card key={sub.id} className="shadow-sm hover:shadow-md transition-all border-[#E5E7EB]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      {typeCfg.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[#1F2937]">
                              {sub.productName}
                            </h3>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${statusCfg.color}`}>
                              {statusCfg.label}
                            </span>
                          </div>
                          <p className="text-sm text-[#6B7280]">{sub.organizationName}</p>
                          <p className="text-sm text-[#6B7280]">網域: {sub.domain}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-semibold text-[#C81C11]">
                            ${(sub.pricePerLicense * sub.licenses).toLocaleString()}
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            {sub.billingCycle === 'MONTHLY' ? '/ 月' : '/ 年'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-[#6B7280] mb-1.5 font-medium">授權使用情況</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all rounded-full ${
                                  licenseUsage >= 90 ? 'bg-red-500' :
                                  licenseUsage >= 70 ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${licenseUsage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-[#1F2937] whitespace-nowrap">
                              {sub.usedLicenses} / {sub.licenses}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-[#6B7280] mb-1.5 font-medium">開始日期</p>
                          <p className="text-sm font-medium text-[#1F2937]">{sub.startDate}</p>
                        </div>

                        <div>
                          <p className="text-xs text-[#6B7280] mb-1.5 font-medium">下次計費</p>
                          <p className="text-sm font-medium text-[#1F2937]">
                            {sub.nextBillingDate || '已暫停'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <input
                              type="checkbox"
                              checked={sub.autoRenew}
                              readOnly
                              className="rounded"
                            />
                            自動續約
                          </label>
                          <span className={`text-xs ${typeCfg.color} font-medium`}>
                            {typeCfg.label}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            調整授權
                          </Button>
                          <Button variant="outline" size="sm">管理</Button>
                          {sub.status === 'ACTIVE' && (
                            <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700">
                              暫停
                            </Button>
                          )}
                          {sub.status === 'SUSPENDED' && (
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                              恢復
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
