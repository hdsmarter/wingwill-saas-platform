'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: '管理員帳號',
    email: 'admin@wingwill.com',
    title: '',
    phone: '',
    bio: ''
  });

  // Organization form state
  const [orgForm, setOrgForm] = useState({
    name: '羽昇國際',
    taxId: '12345678',
    phone: '02-2345-6789',
    email: 'contact@wingwill.com',
    address: '台北市信義區信義路五段7號'
  });

  // Billing form state
  const [billingForm, setBillingForm] = useState({
    invoiceTitle: '羽昇國際股份有限公司',
    invoiceTaxId: '12345678',
    invoiceAddress: '台北市信義區信義路五段7號'
  });

  const tabs = [
    { id: 'profile', label: '個人資料', icon: '👤' },
    { id: 'organization', label: '組織設定', icon: '🏢' },
    { id: 'notifications', label: '通知設定', icon: '🔔' },
    { id: 'security', label: '安全性', icon: '🔒' },
    { id: 'billing', label: '帳務設定', icon: '💳' },
    { id: 'api', label: 'API 金鑰', icon: '🔑' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-8 py-7">
          <h1 className="text-2xl font-semibold text-[#1F2937]">系統設定</h1>
          <p className="mt-1.5 text-sm text-[#6B7280]">
            管理您的帳號、組織與系統偏好設定
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-50 text-[#C81C11]'
                          : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>個人資料</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-[#C81C11] flex items-center justify-center text-white text-3xl font-bold">
                      管
                    </div>
                    <div>
                      <Button variant="outline">上傳大頭照</Button>
                      <p className="text-xs text-[#6B7280] mt-2">
                        JPG、PNG 或 GIF。最大 2MB。
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      label="姓名"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                    <Input
                      type="email"
                      label="Email"
                      value={profileForm.email}
                      disabled
                      readOnly
                    />
                    <Input
                      type="text"
                      label="職稱"
                      placeholder="例如：系統管理員"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    />
                    <Input
                      type="tel"
                      label="電話"
                      placeholder="02-1234-5678"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                      個人簡介
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C81C11] resize-none"
                      rows={4}
                      placeholder="簡單介紹一下自己..."
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">取消</Button>
                    <Button variant="primary">儲存變更</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'organization' && (
              <Card>
                <CardHeader>
                  <CardTitle>組織設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <Input
                      type="text"
                      label="組織名稱"
                      value={orgForm.name}
                      onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    />
                    <Input
                      type="text"
                      label="統一編號"
                      value={orgForm.taxId}
                      onChange={(e) => setOrgForm({ ...orgForm, taxId: e.target.value })}
                    />
                    <Input
                      type="text"
                      label="聯絡電話"
                      value={orgForm.phone}
                      onChange={(e) => setOrgForm({ ...orgForm, phone: e.target.value })}
                    />
                    <Input
                      type="email"
                      label="聯絡 Email"
                      value={orgForm.email}
                      onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                      公司地址
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C81C11] resize-none"
                      rows={3}
                      value={orgForm.address}
                      onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
                    />
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">網域設定</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg">
                        <div>
                          <p className="font-medium text-[#1F2937]">wingwill.com</p>
                          <p className="text-sm text-[#6B7280]">主要網域</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          已驗證
                        </span>
                      </div>
                      <Button variant="outline" className="w-full">
                        + 新增網域
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">取消</Button>
                    <Button variant="primary">儲存變更</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>通知設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Email 通知</h3>
                    <div className="space-y-4">
                      {[
                        { label: '新訂單通知', desc: '當有新訂單建立時通知我' },
                        { label: '訂單狀態更新', desc: '當訂單狀態變更時通知我' },
                        { label: '付款提醒', desc: '收到付款或逾期時通知我' },
                        { label: '系統維護通知', desc: '系統維護前通知我' },
                        { label: '每週摘要報表', desc: '每週一寄送營運摘要' },
                      ].map((item, index) => (
                        <label key={index} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] cursor-pointer">
                          <div>
                            <p className="font-medium text-[#1F2937]">{item.label}</p>
                            <p className="text-sm text-[#6B7280]">{item.desc}</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">推播通知</h3>
                    <div className="space-y-4">
                      {[
                        { label: '即時訂單通知', desc: '透過瀏覽器推播通知新訂單' },
                        { label: '緊急警示', desc: '系統異常或重要事件的即時通知' },
                      ].map((item, index) => (
                        <label key={index} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] cursor-pointer">
                          <div>
                            <p className="font-medium text-[#1F2937]">{item.label}</p>
                            <p className="text-sm text-[#6B7280]">{item.desc}</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 rounded" />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">取消</Button>
                    <Button variant="primary">儲存變更</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>安全性設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">變更密碼</h3>
                    <div className="space-y-4">
                      <Input type="password" label="目前密碼" />
                      <Input type="password" label="新密碼" />
                      <Input type="password" label="確認新密碼" />
                    </div>
                    <Button variant="primary" className="mt-4">更新密碼</Button>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">雙因素驗證</h3>
                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <div>
                          <p className="font-medium text-blue-900">雙因素驗證未啟用</p>
                          <p className="text-sm text-blue-700">增加帳號安全性</p>
                        </div>
                      </div>
                      <Button variant="primary">啟用</Button>
                    </div>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">登入紀錄</h3>
                    <div className="space-y-3">
                      {[
                        { device: 'Chrome on Windows', location: '台北, 台灣', time: '剛剛', current: true },
                        { device: 'Safari on iPhone', location: '台北, 台灣', time: '2 小時前', current: false },
                        { device: 'Chrome on MacOS', location: '新北, 台灣', time: '昨天', current: false },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg">
                          <div>
                            <p className="font-medium text-[#1F2937] flex items-center gap-2">
                              {session.device}
                              {session.current && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                  目前裝置
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-[#6B7280]">
                              {session.location} • {session.time}
                            </p>
                          </div>
                          {!session.current && (
                            <Button variant="ghost" size="sm" className="text-red-600">
                              登出
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card>
                <CardHeader>
                  <CardTitle>帳務設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">付款方式</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            VISA
                          </div>
                          <div>
                            <p className="font-medium text-[#1F2937]">•••• 4242</p>
                            <p className="text-sm text-[#6B7280]">到期日: 12/25</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">編輯</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">移除</Button>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        + 新增付款方式
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">發票資訊</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="發票抬頭"
                        value={billingForm.invoiceTitle}
                        onChange={(e) => setBillingForm({ ...billingForm, invoiceTitle: e.target.value })}
                      />
                      <Input
                        type="text"
                        label="統一編號"
                        value={billingForm.invoiceTaxId}
                        onChange={(e) => setBillingForm({ ...billingForm, invoiceTaxId: e.target.value })}
                      />
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#1F2937] mb-2">
                          發票地址
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C81C11] resize-none"
                          rows={2}
                          value={billingForm.invoiceAddress}
                          onChange={(e) => setBillingForm({ ...billingForm, invoiceAddress: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline">取消</Button>
                    <Button variant="primary">儲存變更</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'api' && (
              <Card>
                <CardHeader>
                  <CardTitle>API 金鑰管理</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-medium text-yellow-900 mb-1">請妥善保管您的 API 金鑰</p>
                        <p className="text-sm text-yellow-700">
                          API 金鑰具有完整的系統存取權限。請勿在公開場合分享，並定期更換金鑰。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">您的 API 金鑰</h3>
                    <div className="space-y-3">
                      {[
                        { name: '生產環境金鑰', key: 'ww_live_••••••••••••4a2b', created: '2024-01-15', lastUsed: '2 小時前' },
                        { name: '測試環境金鑰', key: 'ww_test_••••••••••••7c3d', created: '2024-01-15', lastUsed: '昨天' },
                      ].map((apiKey, index) => (
                        <div key={index} className="p-4 border border-[#E5E7EB] rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-medium text-[#1F2937]">{apiKey.name}</p>
                              <p className="text-sm text-[#6B7280] font-mono mt-1">{apiKey.key}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">複製</Button>
                              <Button variant="ghost" size="sm" className="text-red-600">刪除</Button>
                            </div>
                          </div>
                          <div className="flex gap-4 text-xs text-[#6B7280]">
                            <span>建立: {apiKey.created}</span>
                            <span>最後使用: {apiKey.lastUsed}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="primary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    建立新 API 金鑰
                  </Button>

                  <div className="border-t border-[#E5E7EB] pt-6">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-4">API 文件</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="#"
                        className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#C81C11] hover:shadow-md transition-all"
                      >
                        <p className="font-medium text-[#1F2937] mb-1">快速入門指南</p>
                        <p className="text-sm text-[#6B7280]">了解如何開始使用 API</p>
                      </a>
                      <a
                        href="#"
                        className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#C81C11] hover:shadow-md transition-all"
                      >
                        <p className="font-medium text-[#1F2937] mb-1">API 參考文件</p>
                        <p className="text-sm text-[#6B7280]">完整的 API 端點說明</p>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
