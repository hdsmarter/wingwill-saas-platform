'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userRole?: 'CUSTOMER' | 'YUSHENG_ADMIN' | 'YUSHENG_SALES' | 'YUSHENG_TECH' | 'YUSHENG_FINANCE';
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({
  userRole = 'YUSHENG_ADMIN',
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!isCollapsed);
    }
  };

  if (!isMounted) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200">
        <div className="h-14 flex items-center px-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">羽昇國際</h1>
        </div>
      </aside>
    );
  }

  const navigationItems = [
    {
      title: '總覽',
      href: '/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      roles: ['CUSTOMER', 'YUSHENG_ADMIN', 'YUSHENG_SALES', 'YUSHENG_TECH', 'YUSHENG_FINANCE'],
    },
    {
      title: '產品目錄',
      href: '/products',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      roles: ['CUSTOMER', 'YUSHENG_ADMIN', 'YUSHENG_SALES'],
    },
    {
      title: '訂單管理',
      href: '/orders',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      roles: ['CUSTOMER', 'YUSHENG_ADMIN', 'YUSHENG_SALES', 'YUSHENG_TECH'],
    },
    {
      title: '客戶管理',
      href: '/customers',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      roles: ['YUSHENG_ADMIN', 'YUSHENG_SALES'],
    },
    {
      title: '訂閱管理',
      href: '/subscriptions',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      roles: ['CUSTOMER', 'YUSHENG_ADMIN', 'YUSHENG_TECH'],
    },
    {
      title: '財務管理',
      href: '/finance',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      roles: ['YUSHENG_ADMIN', 'YUSHENG_FINANCE'],
    },
    {
      title: '報表分析',
      href: '/reports',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      roles: ['YUSHENG_ADMIN', 'YUSHENG_FINANCE'],
    },
    {
      title: '系統設定',
      href: '/settings',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      roles: ['YUSHENG_ADMIN'],
    },
  ];

  const filteredItems = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-60"
    )}>
      {/* Logo & Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">羽昇國際雲端平台</h1>
              <p className="text-xs text-gray-500">Enterprise Edition</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 custom-scrollbar">
        <ul className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-sm transition-colors relative group",
                    isCollapsed && "justify-center",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <span className={cn(isActive && "text-blue-600")}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.title}</span>}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.title}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        {isCollapsed ? (
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex justify-center relative group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold hover:bg-blue-200 transition-colors">
              管
            </div>
            {/* User Menu for collapsed */}
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-full ml-2 mb-2 bg-white rounded shadow-lg border border-gray-200 py-2 z-50 w-48">
                <Link href="/settings/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  個人設定
                </Link>
                <hr className="my-2 border-gray-200" />
                <button onClick={() => window.location.href = '/login'} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  登出
                </button>
              </div>
            )}
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold flex-shrink-0">
                管
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-gray-900 truncate">管理員</p>
                <p className="text-xs text-gray-500 truncate">admin@wingwill.com</p>
              </div>
              <svg className={cn("w-4 h-4 text-gray-500 transition-transform flex-shrink-0", isUserMenuOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User Menu */}
            {isUserMenuOpen && (
              <div className="mt-2 bg-white rounded border border-gray-200 shadow-lg py-2">
                <Link href="/settings/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  個人設定
                </Link>
                <Link href="/settings/organization" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  組織設定
                </Link>
                <hr className="my-2 border-gray-200" />
                <button onClick={() => window.location.href = '/login'} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  登出
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toggle Collapse Button */}
      <button
        onClick={handleToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
        title={isCollapsed ? "展開側邊欄" : "收起側邊欄"}
      >
        <svg className={cn("w-3 h-3 text-gray-600 transition-transform", isCollapsed && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>
  );
}
