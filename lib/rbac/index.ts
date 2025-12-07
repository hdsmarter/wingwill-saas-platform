/**
 * RBAC System Entry Point
 *
 * Exports all role-based access control functionality
 * Usage:
 * import { UserRole, Permission, usePermission, PermissionGuard } from '@/lib/rbac';
 */

// Core types and enums
export { UserRole, Permission, ROLE_PERMISSIONS, getRoleDisplayName, getRoleDescription } from './roles';

// Permission utilities
export {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessRoute,
  isFeatureEnabled,
  getAccessibleRoutes,
  getRolePermissions,
  ROUTE_PERMISSIONS,
  FEATURE_FLAGS,
  type FeatureFlag,
} from './permissions';

// React hooks
export {
  useUserRole,
  usePermission,
  useAnyPermission,
  useAllPermissions,
  useCanAccessRoute,
  useFeature,
  useAccessibleRoutes,
  usePermissions,
} from './hooks';

// React components
export {
  PermissionGuard,
  AnyPermissionGuard,
  AllPermissionsGuard,
  FeatureGuard,
  withPermission,
} from './components';
