'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">羽昇國際雲端平台</h1>
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-medium text-white mb-4">企業級 SaaS 管理系統</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Google Workspace、Microsoft 365、GCP 雲端服務整合管理平台。專為企業打造的訂閱管理、財務追蹤與技術支援解決方案。
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4 text-white">
            <div>
              <div className="text-2xl font-semibold mb-1">500+</div>
              <div className="text-xs text-blue-100">企業客戶</div>
            </div>
            <div>
              <div className="text-2xl font-semibold mb-1">50K+</div>
              <div className="text-xs text-blue-100">授權管理</div>
            </div>
            <div>
              <div className="text-2xl font-semibold mb-1">99.9%</div>
              <div className="text-xs text-blue-100">系統可用性</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">登入您的帳號</h2>
            <p className="text-sm text-gray-500">使用您的企業信箱登入系統</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                電子郵件
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                placeholder="your.email@company.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                  密碼
                </label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  忘記密碼？
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-9 px-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                placeholder="輸入您的密碼"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                記住我的登入狀態
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-9 px-4 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-sm shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>登入中...</span>
                </div>
              ) : (
                '登入'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">或使用企業 SSO 登入</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="h-9 px-4 flex items-center justify-center gap-2 text-sm font-medium bg-white border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="h-9 px-4 flex items-center justify-center gap-2 text-sm font-medium bg-white border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#00A4EF" d="M0 0h11.377v11.372H0z"/>
                    <path fill="#FFB900" d="M12.623 0H24v11.372H12.623z"/>
                    <path fill="#7FBA00" d="M0 12.628h11.377V24H0z"/>
                    <path fill="#F25022" d="M12.623 12.628H24V24H12.623z"/>
                  </svg>
                  Microsoft
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            還沒有帳號？{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              聯絡我們申請
            </Link>
          </p>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <Link href="/terms" className="hover:text-gray-700">使用條款</Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-gray-700">隱私權政策</Link>
              <span>•</span>
              <Link href="/help" className="hover:text-gray-700">說明中心</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
