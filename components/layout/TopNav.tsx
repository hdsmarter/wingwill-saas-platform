'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <h1 className="text-xl font-bold" style={{ color: 'var(--brand-primary)' }}>
              羽昇國際
            </h1>
            <span className="text-sm text-[#6B7280]">SaaS Platform</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              產品目錄
            </Link>
            <Link
              href="/orders"
              className="text-sm font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              我的訂單
            </Link>
            <Link
              href="/subscriptions"
              className="text-sm font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              訂閱管理
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[--error] rounded-full"></span>
            </Button>

            <Button variant="primary" className="gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              購物車 (0)
            </Button>

            <div className="flex items-center gap-2 pl-3 border-l border-[#E5E7EB]">
              <div className="w-8 h-8 rounded-full bg-[#C81C11] flex items-center justify-center text-white text-sm font-semibold">
                客
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-[#1F2937]">測試企業</p>
                <p className="text-xs text-[#6B7280]">customer@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
