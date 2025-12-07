/**
 * Permission Utility Functions
 *
 * Following SOLID Principles:
 * - Single Responsibility: Each function has one clear purpose
 * - Open/Closed: Easy to extend with new permissions
 * - Liskov Substitution: Permission checks are consistent
 * - Interface Segregation: Minimal, focused interfaces
 * - Dependency Inversion: Depends on abstractions (UserRole, Permission enums)
 */

import { UserRole, Permission, ROLE_PERMISSIONS } from './roles';

/**
 * Check if a role has a specific permission
 * @param role - User role to check
 * @param permission - Permission to verify
 * @returns boolean indicating if role has permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes(permission);
}

/**
 * Check if a role has ANY of the specified permissions
 * @param role - User role to check
 * @param permissions - Array of permissions to verify
 * @returns boolean indicating if role has at least one permission
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Check if a role has ALL of the specified permissions
 * @param role - User role to check
 * @param permissions - Array of permissions to verify
 * @returns boolean indicating if role has all permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 * @param role - User role
 * @returns Array of permissions
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role];
}

/**
 * Check if user can access a route based on required permissions
 * @param role - User role
 * @param requiredPermissions - Permissions required to access route
 * @returns boolean indicating if access is allowed
 */
export function canAccessRoute(role: UserRole, requiredPermissions: Permission[]): boolean {
  if (requiredPermissions.length === 0) {
    return true; // Public route
  }
  return hasAnyPermission(role, requiredPermissions);
}

/**
 * Route Permission Configuration
 * Maps routes to required permissions
 */
export const ROUTE_PERMISSIONS: Record<string, Permission[]> = {
  // Dashboard
  '/dashboard': [Permission.VIEW_DASHBOARD],

  // Products
  '/products': [Permission.VIEW_PRODUCTS],
  '/products/manage': [Permission.MANAGE_PRODUCTS],

  // Orders
  '/orders': [Permission.VIEW_OWN_ORDERS, Permission.VIEW_ALL_ORDERS],
  '/orders/create': [Permission.CREATE_ORDER],
  '/orders/review': [Permission.REVIEW_ORDER_SALES, Permission.REVIEW_ORDER_TECH],

  // Customers
  '/customers': [Permission.VIEW_ALL_CUSTOMERS],
  '/customers/manage': [Permission.MANAGE_CUSTOMERS],

  // Subscriptions
  '/subscriptions': [Permission.VIEW_OWN_SUBSCRIPTIONS, Permission.VIEW_ALL_SUBSCRIPTIONS],
  '/subscriptions/manage': [Permission.MANAGE_SUBSCRIPTIONS],

  // Finance
  '/finance': [Permission.VIEW_OWN_INVOICES, Permission.VIEW_ALL_INVOICES],
  '/finance/invoices': [Permission.MANAGE_INVOICES],
  '/finance/reports': [Permission.VIEW_FINANCIAL_REPORTS],

  // Reports
  '/reports': [Permission.VIEW_OWN_REPORTS, Permission.VIEW_ALL_REPORTS],

  // Settings
  '/settings': [Permission.VIEW_SYSTEM_SETTINGS],
  '/settings/system': [Permission.MANAGE_SYSTEM_SETTINGS],
  '/settings/users': [Permission.MANAGE_USERS],
  '/settings/logs': [Permission.VIEW_SYSTEM_LOGS],
};

/**
 * Get accessible routes for a role
 * @param role - User role
 * @returns Array of route paths the role can access
 */
export function getAccessibleRoutes(role: UserRole): string[] {
  return Object.entries(ROUTE_PERMISSIONS)
    .filter(([_, requiredPermissions]) => canAccessRoute(role, requiredPermissions))
    .map(([route]) => route);
}

/**
 * Feature Flag Configuration
 * Control feature visibility based on permissions
 */
export interface FeatureFlag {
  name: string;
  requiredPermissions: Permission[];
  description: string;
}

export const FEATURE_FLAGS: FeatureFlag[] = [
  {
    name: 'salesReview',
    requiredPermissions: [Permission.REVIEW_ORDER_SALES],
    description: '業務審核功能',
  },
  {
    name: 'techReview',
    requiredPermissions: [Permission.REVIEW_ORDER_TECH],
    description: '技術審核功能',
  },
  {
    name: 'customerManagement',
    requiredPermissions: [Permission.MANAGE_CUSTOMERS],
    description: '客戶管理功能',
  },
  {
    name: 'invoiceManagement',
    requiredPermissions: [Permission.MANAGE_INVOICES],
    description: '發票管理功能',
  },
  {
    name: 'systemSettings',
    requiredPermissions: [Permission.MANAGE_SYSTEM_SETTINGS],
    description: '系統設定功能',
  },
];

/**
 * Check if a feature is enabled for a role
 * @param role - User role
 * @param featureName - Feature flag name
 * @returns boolean indicating if feature is enabled
 */
export function isFeatureEnabled(role: UserRole, featureName: string): boolean {
  const feature = FEATURE_FLAGS.find(f => f.name === featureName);
  if (!feature) {
    return false;
  }
  return hasAnyPermission(role, feature.requiredPermissions);
}
