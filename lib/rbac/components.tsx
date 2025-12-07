/**
 * Permission Guard Components
 *
 * Reusable components for conditional rendering based on permissions
 * Following React component best practices
 */

'use client';

import { ReactNode } from 'react';
import { Permission } from './roles';
import { usePermission, useAnyPermission, useAllPermissions, useFeature } from './hooks';

/**
 * Props for permission guard components
 */
interface PermissionGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Guard component that renders children only if user has permission
 * @example
 * <PermissionGuard permission={Permission.MANAGE_CUSTOMERS}>
 *   <button>Add Customer</button>
 * </PermissionGuard>
 */
export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps & { permission: Permission }) {
  const hasAccess = usePermission(permission);
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

/**
 * Guard component that renders children if user has ANY of the permissions
 * @example
 * <AnyPermissionGuard permissions={[Permission.REVIEW_ORDER_SALES, Permission.REVIEW_ORDER_TECH]}>
 *   <button>Review Order</button>
 * </AnyPermissionGuard>
 */
export function AnyPermissionGuard({
  permissions,
  children,
  fallback = null,
}: PermissionGuardProps & { permissions: Permission[] }) {
  const hasAccess = useAnyPermission(permissions);
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

/**
 * Guard component that renders children if user has ALL permissions
 * @example
 * <AllPermissionsGuard permissions={[Permission.MANAGE_CUSTOMERS, Permission.MANAGE_INVOICES]}>
 *   <button>Manage All</button>
 * </AllPermissionsGuard>
 */
export function AllPermissionsGuard({
  permissions,
  children,
  fallback = null,
}: PermissionGuardProps & { permissions: Permission[] }) {
  const hasAccess = useAllPermissions(permissions);
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

/**
 * Guard component that renders children if feature is enabled
 * @example
 * <FeatureGuard feature="salesReview">
 *   <ReviewPanel />
 * </FeatureGuard>
 */
export function FeatureGuard({
  feature,
  children,
  fallback = null,
}: PermissionGuardProps & { feature: string }) {
  const isEnabled = useFeature(feature);
  return isEnabled ? <>{children}</> : <>{fallback}</>;
}

/**
 * Higher-order component to protect routes
 * @example
 * export default withPermission(MyPage, Permission.VIEW_DASHBOARD);
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission,
  fallbackMessage = '您沒有權限訪問此頁面'
) {
  return function PermissionProtectedComponent(props: P) {
    const hasAccess = usePermission(permission);

    if (!hasAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#C81C11]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#212121] mb-2">權限不足</h1>
            <p className="text-[#858585] mb-6">{fallbackMessage}</p>
            <a
              href="/dashboard"
              className="inline-block px-6 py-3 bg-[#C81C11] hover:bg-[#A01108] text-white font-medium rounded-lg transition-colors"
            >
              返回首頁
            </a>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
