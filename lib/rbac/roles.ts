/**
 * Role-Based Access Control (RBAC) System
 *
 * Based on CSV specifications (Columns H, I, J)
 * - Column H: Customer (客戶) roles and permissions
 * - Column I: YuSheng (羽昇) internal roles and permissions
 * - Column J: Future vendor roles (reserved)
 *
 * Principles:
 * - SOLID: Single Responsibility - Each role has clear responsibilities
 * - DRY: Don't Repeat Yourself - Reusable permission checks
 * - BDD: Behavior-Driven Development - Clear scenario-based permissions
 */

export enum UserRole {
  // Customer Roles (Column H)
  CUSTOMER = 'CUSTOMER',

  // YuSheng Internal Roles (Column I)
  YUSHENG_ADMIN = 'YUSHENG_ADMIN',
  YUSHENG_SALES = 'YUSHENG_SALES',
  YUSHENG_TECH = 'YUSHENG_TECH',
  YUSHENG_FINANCE = 'YUSHENG_FINANCE',

  // Future Vendor Roles (Column J) - Reserved
  VENDOR_ADMIN = 'VENDOR_ADMIN',
  VENDOR_SALES = 'VENDOR_SALES',
}

export enum Permission {
  // Dashboard & Home
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  VIEW_NOTIFICATIONS = 'VIEW_NOTIFICATIONS',

  // Product Management
  VIEW_PRODUCTS = 'VIEW_PRODUCTS',
  MANAGE_PRODUCTS = 'MANAGE_PRODUCTS',

  // Order Management
  VIEW_OWN_ORDERS = 'VIEW_OWN_ORDERS',
  VIEW_ALL_ORDERS = 'VIEW_ALL_ORDERS',
  CREATE_ORDER = 'CREATE_ORDER',
  REVIEW_ORDER_SALES = 'REVIEW_ORDER_SALES',
  REVIEW_ORDER_TECH = 'REVIEW_ORDER_TECH',
  CANCEL_ORDER = 'CANCEL_ORDER',

  // Customer Management
  VIEW_OWN_PROFILE = 'VIEW_OWN_PROFILE',
  VIEW_ALL_CUSTOMERS = 'VIEW_ALL_CUSTOMERS',
  MANAGE_CUSTOMERS = 'MANAGE_CUSTOMERS',

  // Subscription Management
  VIEW_OWN_SUBSCRIPTIONS = 'VIEW_OWN_SUBSCRIPTIONS',
  VIEW_ALL_SUBSCRIPTIONS = 'VIEW_ALL_SUBSCRIPTIONS',
  MANAGE_SUBSCRIPTIONS = 'MANAGE_SUBSCRIPTIONS',

  // Finance & Billing
  VIEW_OWN_INVOICES = 'VIEW_OWN_INVOICES',
  VIEW_ALL_INVOICES = 'VIEW_ALL_INVOICES',
  MANAGE_INVOICES = 'MANAGE_INVOICES',
  VIEW_FINANCIAL_REPORTS = 'VIEW_FINANCIAL_REPORTS',

  // System Management
  VIEW_SYSTEM_SETTINGS = 'VIEW_SYSTEM_SETTINGS',
  MANAGE_SYSTEM_SETTINGS = 'MANAGE_SYSTEM_SETTINGS',
  VIEW_SYSTEM_LOGS = 'VIEW_SYSTEM_LOGS',
  MANAGE_USERS = 'MANAGE_USERS',

  // Reports & Analytics
  VIEW_OWN_REPORTS = 'VIEW_OWN_REPORTS',
  VIEW_ALL_REPORTS = 'VIEW_ALL_REPORTS',
}

/**
 * Role Permission Mapping
 * Following BDD principles - each permission represents a user scenario
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  /**
   * CUSTOMER Role Scenarios (Column H):
   * 1. 客戶登入後可查看自己的訂單列表
   * 2. 客戶可以瀏覽產品目錄並下單
   * 3. 客戶可以查看自己的訂閱服務
   * 4. 客戶可以查看自己的發票和帳單
   * 5. 客戶可以管理自己的個人資料
   */
  [UserRole.CUSTOMER]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_NOTIFICATIONS,
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_OWN_ORDERS,
    Permission.CREATE_ORDER,
    Permission.VIEW_OWN_SUBSCRIPTIONS,
    Permission.VIEW_OWN_INVOICES,
    Permission.VIEW_OWN_PROFILE,
    Permission.VIEW_OWN_REPORTS,
  ],

  /**
   * YUSHENG_ADMIN Role Scenarios (Column I):
   * 1. 管理員擁有系統所有權限
   * 2. 可以查看和管理所有客戶資料
   * 3. 可以審核所有訂單（業務+技術）
   * 4. 可以管理系統設定和用戶權限
   * 5. 可以查看所有報表和系統日誌
   */
  [UserRole.YUSHENG_ADMIN]: Object.values(Permission),

  /**
   * YUSHENG_SALES Role Scenarios (Column I):
   * 1. 業務人員登入後看到待審核訂單列表
   * 2. 業務可以審核客戶訂單（業務審核）
   * 3. 業務可以新增和管理客戶資料
   * 4. 業務可以查看銷售相關報表
   * 5. 業務可以查看產品目錄協助客戶選購
   */
  [UserRole.YUSHENG_SALES]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_NOTIFICATIONS,
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_ALL_ORDERS,
    Permission.CREATE_ORDER,
    Permission.REVIEW_ORDER_SALES,
    Permission.VIEW_ALL_CUSTOMERS,
    Permission.MANAGE_CUSTOMERS,
    Permission.VIEW_ALL_INVOICES,
    Permission.VIEW_ALL_REPORTS,
  ],

  /**
   * YUSHENG_TECH Role Scenarios (Column I):
   * 1. 技術人員登入後看到待技術審核的訂單
   * 2. 技術可以進行訂單的技術審核
   * 3. 技術可以管理訂閱服務的技術設定
   * 4. 技術可以查看技術相關的排程和任務
   * 5. 技術可以查看系統日誌進行問題排查
   */
  [UserRole.YUSHENG_TECH]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_NOTIFICATIONS,
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_ALL_ORDERS,
    Permission.REVIEW_ORDER_TECH,
    Permission.VIEW_ALL_SUBSCRIPTIONS,
    Permission.MANAGE_SUBSCRIPTIONS,
    Permission.VIEW_SYSTEM_SETTINGS,
    Permission.VIEW_SYSTEM_LOGS,
  ],

  /**
   * YUSHENG_FINANCE Role Scenarios (Column I):
   * 1. 財務人員登入後看到待開發票的訂單
   * 2. 財務可以開立和管理發票
   * 3. 財務可以查看財務報表和營收數據
   * 4. 財務可以管理應收應付帳款
   * 5. 財務可以查看所有客戶的帳務資訊
   */
  [UserRole.YUSHENG_FINANCE]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_NOTIFICATIONS,
    Permission.VIEW_ALL_ORDERS,
    Permission.VIEW_ALL_CUSTOMERS,
    Permission.VIEW_ALL_INVOICES,
    Permission.MANAGE_INVOICES,
    Permission.VIEW_FINANCIAL_REPORTS,
    Permission.VIEW_ALL_REPORTS,
  ],

  // Future Vendor Roles (Column J) - Reserved for future use
  [UserRole.VENDOR_ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_PRODUCTS,
    Permission.MANAGE_PRODUCTS,
  ],

  [UserRole.VENDOR_SALES]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_PRODUCTS,
  ],
};

/**
 * Get role display name in Chinese
 */
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    [UserRole.CUSTOMER]: '客戶',
    [UserRole.YUSHENG_ADMIN]: '羽昇管理員',
    [UserRole.YUSHENG_SALES]: '羽昇業務',
    [UserRole.YUSHENG_TECH]: '羽昇技術',
    [UserRole.YUSHENG_FINANCE]: '羽昇財務',
    [UserRole.VENDOR_ADMIN]: '廠商管理員',
    [UserRole.VENDOR_SALES]: '廠商業務',
  };
  return roleNames[role];
}

/**
 * Get role description
 */
export function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    [UserRole.CUSTOMER]: '客戶角色 - 查看訂單、訂閱、產品',
    [UserRole.YUSHENG_ADMIN]: '羽昇管理員 - 完整系統權限',
    [UserRole.YUSHENG_SALES]: '羽昇業務 - 訂單審核、客戶管理',
    [UserRole.YUSHENG_TECH]: '羽昇技術 - 技術審核、排程管理',
    [UserRole.YUSHENG_FINANCE]: '羽昇財務 - 財務管理、發票開立',
    [UserRole.VENDOR_ADMIN]: '廠商管理員 - 產品管理',
    [UserRole.VENDOR_SALES]: '廠商業務 - 產品查詢',
  };
  return descriptions[role];
}
