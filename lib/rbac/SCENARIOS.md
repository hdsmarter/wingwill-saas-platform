# RBAC System Usage Scenarios (BDD Approach)

## Overview
This document describes the usage scenarios for each role in the WingWill SaaS Platform, following Behavior-Driven Development (BDD) principles.

---

## Role: CUSTOMER (客戶) - Column H

### Scenario 1: 客戶查看訂單
**Given** 我是一個已登入的客戶
**When** 我訪問首頁
**Then** 我應該看到我的訂單列表
**And** 訂單應該包含狀態、金額、產品資訊

**Implementation:**
- Permission: `VIEW_OWN_ORDERS`
- Route: `/dashboard`, `/orders`
- Component: Dashboard shows order list filtered by customer ID

### Scenario 2: 客戶瀏覽產品並下單
**Given** 我是一個已登入的客戶
**When** 我點擊「產品目錄」
**Then** 我應該看到所有可用的雲端服務產品
**And** 每個產品應該顯示詳細方案和價格
**When** 我選擇一個方案並點擊「加入購物車」
**Then** 產品應該被加入購物車
**And** 我可以繼續選購或前往結帳

**Implementation:**
- Permissions: `VIEW_PRODUCTS`, `CREATE_ORDER`
- Routes: `/products`, `/cart`, `/orders/create`
- Components: Product catalog, shopping cart, order creation

### Scenario 3: 客戶管理訂閱服務
**Given** 我是一個已登入的客戶
**When** 我訪問「訂閱管理」頁面
**Then** 我應該看到我的所有活躍訂閱
**And** 每個訂閱應該顯示到期日、續約狀態

**Implementation:**
- Permission: `VIEW_OWN_SUBSCRIPTIONS`
- Route: `/subscriptions`
- Component: Subscription list filtered by customer ID

### Scenario 4: 客戶查看發票和帳單
**Given** 我是一個已登入的客戶
**When** 我訪問「財務管理」頁面
**Then** 我應該看到我的所有發票
**And** 我可以下載發票 PDF

**Implementation:**
- Permission: `VIEW_OWN_INVOICES`
- Route: `/finance`
- Component: Invoice list with download functionality

---

## Role: YUSHENG_SALES (羽昇業務) - Column I

### Scenario 1: 業務審核訂單
**Given** 我是一個羽昇業務人員
**When** 我登入系統
**Then** 首頁應該顯示「待審核訂單」數量
**And** 顯示待審核訂單列表
**When** 我點擊某個訂單
**Then** 我應該看到訂單詳情
**And** 我可以選擇「核准」或「駁回」
**When** 我點擊「核准」並填寫審核意見
**Then** 訂單狀態應該更新為「業務已審核」
**And** 訂單應該進入技術審核流程

**Implementation:**
- Permissions: `VIEW_ALL_ORDERS`, `REVIEW_ORDER_SALES`
- Route: `/orders`, `/orders/review`
- Components: Order review interface, approval/rejection dialogs

### Scenario 2: 業務新增客戶
**Given** 我是一個羽昇業務人員
**When** 我訪問「客戶管理」頁面
**And** 點擊「新增客戶」按鈕
**Then** 應該顯示客戶新增表單
**When** 我填寫客戶資訊（統編、公司名稱、聯絡人等）
**And** 點擊「儲存」
**Then** 新客戶應該被建立
**And** 我應該在客戶列表中看到新客戶

**Implementation:**
- Permissions: `VIEW_ALL_CUSTOMERS`, `MANAGE_CUSTOMERS`
- Route: `/customers`
- Components: Customer list, customer creation form

### Scenario 3: 業務查看銷售報表
**Given** 我是一個羽昇業務人員
**When** 我訪問「報表分析」頁面
**Then** 我應該看到我的銷售業績
**And** 報表應該包含本月成交訂單數、營收

**Implementation:**
- Permission: `VIEW_ALL_REPORTS`
- Route: `/reports`
- Component: Sales reports dashboard

---

## Role: YUSHENG_TECH (羽昇技術) - Column I

### Scenario 1: 技術審核訂單
**Given** 我是一個羽昇技術人員
**When** 我登入系統
**Then** 首頁應該顯示「待技術審核」數量
**When** 我訪問「訂單管理」頁面
**Then** 我應該看到「待技術審核」的訂單列表
**When** 我選擇一個訂單進行審核
**Then** 我可以檢查技術可行性
**And** 我可以核准或駁回訂單

**Implementation:**
- Permissions: `VIEW_ALL_ORDERS`, `REVIEW_ORDER_TECH`
- Route: `/orders`, `/orders/review`
- Components: Technical review interface

### Scenario 2: 技術管理訂閱設定
**Given** 我是一個羽昇技術人員
**When** 我訪問「訂閱管理」頁面
**Then** 我應該看到所有客戶的訂閱
**When** 我點擊某個訂閱
**Then** 我可以設定技術參數（API 金鑰、配額等）

**Implementation:**
- Permissions: `VIEW_ALL_SUBSCRIPTIONS`, `MANAGE_SUBSCRIPTIONS`
- Route: `/subscriptions`
- Components: Subscription management with technical settings

### Scenario 3: 技術查看系統日誌
**Given** 我是一個羽昇技術人員
**When** 我訪問「系統設定」頁面
**Then** 我應該能夠查看系統日誌
**And** 日誌應該包含操作記錄、錯誤訊息

**Implementation:**
- Permissions: `VIEW_SYSTEM_SETTINGS`, `VIEW_SYSTEM_LOGS`
- Route: `/settings/logs`
- Component: System logs viewer

---

## Role: YUSHENG_FINANCE (羽昇財務) - Column I

### Scenario 1: 財務開立發票
**Given** 我是一個羽昇財務人員
**When** 我登入系統
**Then** 首頁應該顯示「待開發票」數量
**When** 我訪問「財務管理」頁面
**Then** 我應該看到待開發票的訂單列表
**When** 我選擇一個訂單並點擊「開立發票」
**Then** 應該顯示發票資訊表單
**When** 我填寫發票資訊並儲存
**Then** 發票應該被建立並發送給客戶

**Implementation:**
- Permissions: `VIEW_ALL_INVOICES`, `MANAGE_INVOICES`
- Route: `/finance/invoices`
- Components: Invoice management, invoice creation form

### Scenario 2: 財務查看財務報表
**Given** 我是一個羽昇財務人員
**When** 我訪問「報表分析」頁面
**Then** 我應該看到財務報表
**And** 報表應該包含本月營收、應收帳款、支出

**Implementation:**
- Permissions: `VIEW_FINANCIAL_REPORTS`, `VIEW_ALL_REPORTS`
- Route: `/reports`
- Component: Financial reports dashboard

### Scenario 3: 財務管理應收帳款
**Given** 我是一個羽昇財務人員
**When** 我訪問「財務管理」頁面
**Then** 我應該看到應收帳款列表
**And** 每筆帳款應該顯示客戶、金額、到期日

**Implementation:**
- Permissions: `VIEW_ALL_CUSTOMERS`, `VIEW_ALL_INVOICES`
- Route: `/finance`
- Component: Accounts receivable management

---

## Role: YUSHENG_ADMIN (羽昇管理員) - Column I

### Scenario 1: 管理員管理系統用戶
**Given** 我是一個羽昇管理員
**When** 我訪問「系統設定 > 用戶管理」頁面
**Then** 我應該看到所有系統用戶
**When** 我點擊「新增用戶」
**Then** 我可以創建新用戶並分配角色

**Implementation:**
- Permission: `MANAGE_USERS`
- Route: `/settings/users`
- Component: User management interface

### Scenario 2: 管理員查看所有報表
**Given** 我是一個羽昇管理員
**When** 我訪問任何報表頁面
**Then** 我應該能夠查看所有類型的報表
**And** 我可以匯出報表資料

**Implementation:**
- Permissions: All permissions (full access)
- Routes: All routes
- Components: All components

### Scenario 3: 管理員配置系統設定
**Given** 我是一個羽昇管理員
**When** 我訪問「系統設定」頁面
**Then** 我可以修改系統配置
**And** 我可以管理系統整合（API 金鑰、第三方服務）

**Implementation:**
- Permission: `MANAGE_SYSTEM_SETTINGS`
- Route: `/settings/system`
- Component: System settings interface

---

## Implementation Guidelines

### 1. Using Permissions in Components

```typescript
import { usePermission, Permission, PermissionGuard } from '@/lib/rbac';

function MyComponent() {
  const canReview = usePermission(Permission.REVIEW_ORDER_SALES);

  return (
    <div>
      {/* Conditional rendering */}
      {canReview && <button>審核訂單</button>}

      {/* Using guard component */}
      <PermissionGuard permission={Permission.MANAGE_CUSTOMERS}>
        <button>新增客戶</button>
      </PermissionGuard>
    </div>
  );
}
```

### 2. Protecting Routes

```typescript
import { withPermission, Permission } from '@/lib/rbac';

function CustomersPage() {
  // Page component
}

export default withPermission(CustomersPage, Permission.VIEW_ALL_CUSTOMERS);
```

### 3. Feature Flags

```typescript
import { useFeature, FeatureGuard } from '@/lib/rbac';

function Dashboard() {
  const hasSalesReview = useFeature('salesReview');

  return (
    <div>
      <FeatureGuard feature="salesReview">
        <ReviewPanel />
      </FeatureGuard>
    </div>
  );
}
```

---

## Testing Scenarios

### Unit Tests (Jest + React Testing Library)

```typescript
import { hasPermission, UserRole, Permission } from '@/lib/rbac';

describe('RBAC Permissions', () => {
  test('CUSTOMER should have VIEW_PRODUCTS permission', () => {
    expect(hasPermission(UserRole.CUSTOMER, Permission.VIEW_PRODUCTS)).toBe(true);
  });

  test('CUSTOMER should NOT have MANAGE_CUSTOMERS permission', () => {
    expect(hasPermission(UserRole.CUSTOMER, Permission.MANAGE_CUSTOMERS)).toBe(false);
  });

  test('YUSHENG_SALES should have REVIEW_ORDER_SALES permission', () => {
    expect(hasPermission(UserRole.YUSHENG_SALES, Permission.REVIEW_ORDER_SALES)).toBe(true);
  });
});
```

### Integration Tests (Cypress/Playwright)

```typescript
describe('Customer Order Viewing', () => {
  it('should show order list to logged-in customer', () => {
    // Login as customer
    cy.login('customer@example.com', 'password');

    // Visit dashboard
    cy.visit('/dashboard');

    // Should see order list
    cy.contains('我的訂單總覽').should('be.visible');
    cy.get('[data-testid="order-list"]').should('exist');
  });

  it('should NOT show customer management to customer', () => {
    // Login as customer
    cy.login('customer@example.com', 'password');

    // Visit customers page
    cy.visit('/customers');

    // Should see permission denied
    cy.contains('權限不足').should('be.visible');
  });
});
```

---

## Summary

This RBAC system implements role-based access control following:
- **BDD**: Scenario-based permission definitions
- **SOLID**: Single responsibility, dependency inversion
- **DRY**: Reusable hooks and components
- **TDD**: Testable permission functions

All roles are based on CSV specifications (Columns H, I, J) with clear usage scenarios for each permission.
