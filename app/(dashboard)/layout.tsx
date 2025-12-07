'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { CartProvider } from '@/contexts/CartContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: 從 session 獲取用戶角色
  const userRole = 'YUSHENG_ADMIN';
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarWidth = isSidebarCollapsed ? '64px' : '256px';

  return (
    <CartProvider>
      <div className="flex min-h-screen">
        <Sidebar
          userRole={userRole}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={setIsSidebarCollapsed}
        />
        <main
          className="flex-1 overflow-auto transition-all duration-300 bg-gray-50"
          style={{
            marginLeft: sidebarWidth,
          }}
        >
          {children}
        </main>
      </div>
    </CartProvider>
  );
}
