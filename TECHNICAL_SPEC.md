# WingWill SaaS Platform - Technical Specification

## 🎯 Project Overview
A B2B2C SaaS subscription management platform for cloud services (Google Workspace, GCP, etc.)

### Target Users
1. **Customers (客戶)** - Enterprise users purchasing subscriptions
2. **WingWill (羽昇)** - Platform operator managing products and orders
3. **Vendors (廠商)** - Service providers (Google, Microsoft, etc.)

---

## 🏗️ Architecture Principles

### 1. **BDD (Behavior-Driven Development)**
- Feature files define user stories and acceptance criteria
- Scenarios describe expected behavior from user perspective
- Given-When-Then format for all features

### 2. **TDD (Test-Driven Development)**
- Write tests before implementation
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows

### 3. **SOLID Principles**
- **S**ingle Responsibility: Each module has one clear purpose
- **O**pen/Closed: Extendable without modification
- **L**iskov Substitution: Interfaces are interchangeable
- **I**nterface Segregation: Small, focused interfaces
- **D**ependency Inversion: Depend on abstractions, not concretions

### 4. **DRY (Don't Repeat Yourself)**
- Shared utilities and helpers
- Reusable UI components
- Common business logic in services
- Configuration-driven behavior

---

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS
- **UI Library**: Radix UI + Custom Components
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Data Fetching**: TanStack Query
- **Charts**: Recharts

### Backend
- **API**: Next.js API Routes
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: NextAuth.js v5
- **Validation**: Zod

### Design System Colors (WingWill Brand)
```typescript
const colors = {
  primary: '#C7281C',      // WingWill Red
  secondary: '#0056A7',    // Deep Blue
  text: {
    primary: '#212121',
    secondary: '#858585',
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... gray scale
    900: '#111827',
  },
};
```

---

## 📐 Database Schema Design

### Core Entities

#### User
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?   // Hashed
  role          Role
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  organizations OrganizationMember[]
  orders        Order[]
  createdOrders Order[]   @relation("CreatedBy")
}

enum Role {
  CUSTOMER
  YUSHENG_ADMIN
  YUSHENG_SALES
  YUSHENG_TECH
  YUSHENG_FINANCE
  VENDOR_ADMIN
}
```

#### Organization (企業客戶)
```prisma
model Organization {
  id          String   @id @default(cuid())
  taxId       String   @unique  // 統編
  name        String
  address     String?
  phone       String?
  contactName String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members     OrganizationMember[]
  orders      Order[]
  subscriptions Subscription[]
}
```

#### Product (產品階層: Brand → Product → Plan)
```prisma
model Brand {
  id        String    @id @default(cuid())
  name      String    @unique
  logo      String?
  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())

  products  Product[]
}

model Product {
  id          String   @id @default(cuid())
  brandId     String
  name        String
  description String?
  sku         String   @unique
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  brand       Brand    @relation(fields: [brandId], references: [id])
  plans       Plan[]
}

model Plan {
  id          String   @id @default(cuid())
  productId   String
  name        String
  description String?
  sku         String   @unique
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  product     Product       @relation(fields: [productId], references: [id])
  pricing     PlanPricing[]
  orderItems  OrderItem[]
}

// 訂價時間軸設計
model PlanPricing {
  id        String    @id @default(cuid())
  planId    String
  price     Decimal   @db.Decimal(10, 2)
  currency  String    @default("TWD")
  startDate DateTime
  endDate   DateTime?
  createdAt DateTime  @default(now())

  plan      Plan      @relation(fields: [planId], references: [id])

  @@index([planId, startDate])
}
```

#### Order (訂單與審核流程)
```prisma
model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  organizationId  String?
  userId          String
  createdById     String?     // 人工單填寫人
  status          OrderStatus @default(PENDING_SALES)
  totalAmount     Decimal     @db.Decimal(10, 2)
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  organization    Organization? @relation(fields: [organizationId], references: [id])
  user            User          @relation(fields: [userId], references: [id])
  createdBy       User?         @relation("CreatedBy", fields: [createdById], references: [id])
  items           OrderItem[]
  reviews         OrderReview[]
  payment         Payment?
}

enum OrderStatus {
  PENDING_SALES      // 待業務審核
  PENDING_TECH       // 待技術審核
  PENDING_PAYMENT    // 等待付款
  PROCESSING         // 處理中
  COMPLETED          // 已完成
  CANCELLED          // 已取消
  REJECTED           // 已退回
}

// 訂單審核記錄
model OrderReview {
  id          String       @id @default(cuid())
  orderId     String
  reviewerId  String
  status      ReviewStatus
  comments    String?
  reviewedAt  DateTime     @default(now())

  order       Order        @relation(fields: [orderId], references: [id])
}

enum ReviewStatus {
  APPROVED
  REJECTED
}
```

#### Subscription (GWS/GCP 訂閱管理)
```prisma
model Subscription {
  id              String             @id @default(cuid())
  organizationId  String
  productType     SubscriptionType
  domain          String?            // GWS domain
  adminEmail      String?
  quantity        Int                @default(1)
  startDate       DateTime
  endDate         DateTime?
  status          SubscriptionStatus @default(ACTIVE)
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt

  organization    Organization       @relation(fields: [organizationId], references: [id])
  schedules       SubscriptionSchedule[]
}

enum SubscriptionType {
  GWS
  GCP
  AKAMAI
}

enum SubscriptionStatus {
  ACTIVE
  SUSPENDED
  CANCELLED
  EXPIRED
}

// 排程中心
model SubscriptionSchedule {
  id              String          @id @default(cuid())
  subscriptionId  String
  action          ScheduleAction
  scheduledAt     DateTime
  executedAt      DateTime?
  status          ScheduleStatus  @default(PENDING)
  errorMessage    String?

  subscription    Subscription    @relation(fields: [subscriptionId], references: [id])

  @@index([status, scheduledAt])
}

enum ScheduleAction {
  CREATE
  UPDATE
  DELETE
}

enum ScheduleStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}
```

---

## 🎨 UI/UX Design System

### Component Library Structure
```
components/
├── ui/              # Radix UI wrapped components
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   └── ...
├── layout/          # Layout components
│   ├── header.tsx
│   ├── sidebar.tsx
│   └── footer.tsx
├── forms/           # Form components
│   ├── order-form.tsx
│   ├── product-form.tsx
│   └── ...
└── features/        # Feature-specific components
    ├── order-card.tsx
    ├── product-tree.tsx
    └── ...
```

### Design Tokens
```typescript
// lib/design-tokens.ts
export const tokens = {
  colors: {
    brand: {
      primary: '#C7281C',
      secondary: '#0056A7',
    },
    text: {
      primary: '#212121',
      secondary: '#858585',
    },
  },
  fonts: {
    sans: ['Noto Sans TC', 'sans-serif'],
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
};
```

---

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)
```typescript
// Example: Product service test
describe('ProductService', () => {
  describe('createProduct', () => {
    it('should create a new product with valid data', async () => {
      const product = await ProductService.create({
        brandId: 'brand-1',
        name: 'Google Workspace',
        sku: 'GWS-001',
      });
      expect(product).toHaveProperty('id');
      expect(product.name).toBe('Google Workspace');
    });

    it('should throw error if SKU already exists', async () => {
      await expect(
        ProductService.create({
          brandId: 'brand-1',
          name: 'Duplicate',
          sku: 'EXISTING-SKU',
        })
      ).rejects.toThrow('SKU already exists');
    });
  });
});
```

### Integration Tests (API Routes)
```typescript
// Example: Order API test
describe('POST /api/orders', () => {
  it('should create order and return 201', async () => {
    const response = await POST('/api/orders', {
      organizationId: 'org-1',
      items: [
        { planId: 'plan-1', quantity: 5 },
      ],
    });
    expect(response.status).toBe(201);
    expect(response.data.status).toBe('PENDING_SALES');
  });

  it('should require authentication', async () => {
    const response = await POST('/api/orders', {}, { skipAuth: true });
    expect(response.status).toBe(401);
  });
});
```

### E2E Tests (Playwright)
```typescript
test('Complete order flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');

  // Browse products
  await page.goto('/products');
  await page.click('text=Google Workspace');

  // Add to cart
  await page.click('button:has-text("加入購物車")');

  // Checkout
  await page.click('text=結帳');
  await page.fill('[name="domain"]', 'test.com');
  await page.click('button:has-text("送出訂單")');

  // Verify order created
  await expect(page.locator('text=訂單已建立')).toBeVisible();
});
```

---

## 🔒 Security & Authentication

### NextAuth.js Configuration
```typescript
// auth.config.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate credentials
        // Return user object
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
```

### Role-Based Access Control (RBAC)
```typescript
// lib/auth/rbac.ts
export const permissions = {
  'order:create': ['CUSTOMER', 'YUSHENG_SALES'],
  'order:review': ['YUSHENG_SALES', 'YUSHENG_TECH'],
  'product:manage': ['YUSHENG_ADMIN'],
  'customer:manage': ['YUSHENG_ADMIN', 'YUSHENG_SALES'],
};

export function canAccess(role: Role, permission: string): boolean {
  return permissions[permission]?.includes(role) ?? false;
}
```

---

## 📂 Project Structure

```
wingwill-saas-platform/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── customers/
│   │   ├── subscriptions/
│   │   └── gws/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── orders/
│   │   ├── products/
│   │   └── subscriptions/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   └── features/
├── lib/
│   ├── db/
│   │   └── prisma.ts
│   ├── auth/
│   │   ├── auth.ts
│   │   └── rbac.ts
│   ├── services/
│   │   ├── order.service.ts
│   │   ├── product.service.ts
│   │   └── subscription.service.ts
│   ├── utils/
│   └── validations/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── types/
    └── index.ts
```

---

## 🚀 Development Workflow

### 1. Feature Development (BDD)
```gherkin
# features/order-creation.feature
Feature: Order Creation
  As a customer
  I want to create an order
  So that I can purchase cloud services

  Scenario: Create order with valid data
    Given I am logged in as a customer
    And I have selected products
    When I submit the order form
    Then the order should be created successfully
    And the status should be "PENDING_SALES"
    And I should receive a confirmation email
```

### 2. Implementation (TDD)
1. Write failing test
2. Implement minimum code to pass
3. Refactor for quality
4. Repeat

### 3. Code Review Checklist
- [ ] Tests written and passing
- [ ] SOLID principles followed
- [ ] No code duplication (DRY)
- [ ] TypeScript types defined
- [ ] Error handling implemented
- [ ] Security considerations addressed
- [ ] Performance optimized
- [ ] Documentation updated

---

## 📊 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **API Response Time**: < 200ms (p95)
- **Database Query Time**: < 100ms (p95)

---

## 🔄 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Run type check
        run: npm run type-check
      - name: Run unit tests
        run: npm run test
      - name: Run integration tests
        run: npm run test:integration
      - name: Run E2E tests
        run: npm run test:e2e

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        run: vercel --prod
```

---

## 📝 Sample Data Schema

### Mock Users
```typescript
const mockUsers = [
  {
    email: 'customer@example.com',
    name: '測試客戶',
    role: 'CUSTOMER',
  },
  {
    email: 'sales@wingwill.com',
    name: '業務人員',
    role: 'YUSHENG_SALES',
  },
  {
    email: 'tech@wingwill.com',
    name: '技術人員',
    role: 'YUSHENG_TECH',
  },
];
```

### Mock Products
```typescript
const mockBrands = [
  { name: 'Google', logo: '/brands/google.svg' },
  { name: 'Microsoft', logo: '/brands/microsoft.svg' },
];

const mockProducts = [
  {
    brandName: 'Google',
    name: 'Google Workspace',
    sku: 'GWS-001',
    plans: [
      { name: 'Business Starter', sku: 'GWS-STARTER', price: 6 },
      { name: 'Business Standard', sku: 'GWS-STANDARD', price: 12 },
      { name: 'Business Plus', sku: 'GWS-PLUS', price: 18 },
    ],
  },
];
```

### Mock Orders
```typescript
const mockOrders = [
  {
    orderNumber: 'ORD-2024-0001',
    organizationTaxId: '12345678',
    status: 'PENDING_SALES',
    items: [
      { planSku: 'GWS-STARTER', quantity: 10, price: 6 },
    ],
    totalAmount: 60,
  },
];
```

---

## 🎯 Success Criteria

### Phase 1 (MVP) - 完成標準
- [ ] 用戶註冊/登入功能
- [ ] 產品瀏覽與搜尋
- [ ] 購物車與下單
- [ ] 訂單審核流程
- [ ] 基本後台管理

### Phase 2 - 擴充功能
- [ ] GWS 訂閱管理
- [ ] 排程中心
- [ ] 金流串接
- [ ] 發票系統
- [ ] 報表分析

### Phase 3 - 進階功能
- [ ] GCP 帳單管理
- [ ] 多語系支援
- [ ] 進階權限控制
- [ ] API 開放平台

---

## 📞 Contact & Support

**開發團隊**: HD 智動化
**專案負責人**: Tony Jiang
**技術文件**: 持續更新中

---

*Last Updated: 2024-12-03*
