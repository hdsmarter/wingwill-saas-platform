/**
 * React Hooks for Permission Management
 *
 * Following React best practices and DRY principles
 */

'use client';

import { useMemo } from 'react';
import { UserRole, Permission } from './roles';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessRoute,
  isFeatureEnabled,
  getAccessibleRoutes,
} from './permissions';

/**
 * Hook to get current user role
 * TODO: Replace with actual auth context
 */
export function useUserRole(): UserRole {
  // TODO: Get from authentication context
  // For now, return a default role
  return UserRole.YUSHENG_ADMIN;
}

/**
 * Hook to check if current user has a permission
 * @param permission - Permission to check
 * @returns boolean indicating if user has permission
 */
export function usePermission(permission: Permission): boolean {
  const role = useUserRole();
  return useMemo(() => hasPermission(role, permission), [role, permission]);
}

/**
 * Hook to check if current user has any of the permissions
 * @param permissions - Array of permissions to check
 * @returns boolean indicating if user has at least one permission
 */
export function useAnyPermission(permissions: Permission[]): boolean {
  const role = useUserRole();
  return useMemo(() => hasAnyPermission(role, permissions), [role, permissions]);
}

/**
 * Hook to check if current user has all permissions
 * @param permissions - Array of permissions to check
 * @returns boolean indicating if user has all permissions
 */
export function useAllPermissions(permissions: Permission[]): boolean {
  const role = useUserRole();
  return useMemo(() => hasAllPermissions(role, permissions), [role, permissions]);
}

/**
 * Hook to check if current user can access a route
 * @param route - Route path to check
 * @returns boolean indicating if user can access route
 */
export function useCanAccessRoute(route: string): boolean {
  const role = useUserRole();
  return useMemo(() => {
    // Import inline to avoid circular dependency
    const { ROUTE_PERMISSIONS } = require('./permissions');
    const requiredPermissions = ROUTE_PERMISSIONS[route] || [];
    return canAccessRoute(role, requiredPermissions);
  }, [role, route]);
}

/**
 * Hook to check if a feature is enabled for current user
 * @param featureName - Feature flag name
 * @returns boolean indicating if feature is enabled
 */
export function useFeature(featureName: string): boolean {
  const role = useUserRole();
  return useMemo(() => isFeatureEnabled(role, featureName), [role, featureName]);
}

/**
 * Hook to get all accessible routes for current user
 * @returns Array of accessible route paths
 */
export function useAccessibleRoutes(): string[] {
  const role = useUserRole();
  return useMemo(() => getAccessibleRoutes(role), [role]);
}

/**
 * Hook to get permission utilities
 * Returns an object with all permission checking functions
 */
export function usePermissions() {
  const role = useUserRole();

  return useMemo(
    () => ({
      role,
      hasPermission: (permission: Permission) => hasPermission(role, permission),
      hasAnyPermission: (permissions: Permission[]) => hasAnyPermission(role, permissions),
      hasAllPermissions: (permissions: Permission[]) => hasAllPermissions(role, permissions),
      canAccessRoute: (route: string) => {
        const { ROUTE_PERMISSIONS } = require('./permissions');
        const requiredPermissions = ROUTE_PERMISSIONS[route] || [];
        return canAccessRoute(role, requiredPermissions);
      },
      isFeatureEnabled: (featureName: string) => isFeatureEnabled(role, featureName),
      getAccessibleRoutes: () => getAccessibleRoutes(role),
    }),
    [role]
  );
}
