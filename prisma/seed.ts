import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 開始播種數據...');

  // 清除現有數據
  await prisma.orderReview.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.organizationMember.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.planPricing.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // 建立用戶
  const hashedPassword = await bcrypt.hash('password123', 10);

  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: '測試客戶',
      password: hashedPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
    },
  });

  const sales = await prisma.user.create({
    data: {
      email: 'sales@wingwill.com',
      name: '業務人員',
      password: hashedPassword,
      role: 'YUSHENG_SALES',
      emailVerified: new Date(),
    },
  });

  const tech = await prisma.user.create({
    data: {
      email: 'tech@wingwill.com',
      name: '技術人員',
      password: hashedPassword,
      role: 'YUSHENG_TECH',
      emailVerified: new Date(),
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@wingwill.com',
      name: '系統管理員',
      password: hashedPassword,
      role: 'YUSHENG_ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('✅ 用戶建立完成');

  // 建立品牌
  const googleBrand = await prisma.brand.create({
    data: {
      name: 'Google',
      slug: 'google',
      logo: '/brands/google.svg',
      isActive: true,
    },
  });

  const microsoftBrand = await prisma.brand.create({
    data: {
      name: 'Microsoft',
      slug: 'microsoft',
      logo: '/brands/microsoft.svg',
      isActive: true,
    },
  });

  console.log('✅ 品牌建立完成');

  // 建立產品
  const gwsProduct = await prisma.product.create({
    data: {
      brandId: googleBrand.id,
      name: 'Google Workspace',
      slug: 'google-workspace',
      sku: 'GWS-001',
      isActive: true,
    },
  });

  const gcpProduct = await prisma.product.create({
    data: {
      brandId: googleBrand.id,
      name: 'Google Cloud Platform',
      slug: 'google-cloud-platform',
      sku: 'GCP-001',
      isActive: true,
    },
  });

  const m365Product = await prisma.product.create({
    data: {
      brandId: microsoftBrand.id,
      name: 'Microsoft 365',
      slug: 'microsoft-365',
      sku: 'M365-001',
      isActive: true,
    },
  });

  console.log('✅ 產品建立完成');

  // 建立方案
  const gwsStarter = await prisma.plan.create({
    data: {
      productId: gwsProduct.id,
      name: 'Business Starter',
      slug: 'business-starter',
      sku: 'GWS-STARTER',
      isActive: true,
      pricing: {
        create: {
          price: 6,
          currency: 'USD',
          startDate: new Date('2024-01-01'),
        },
      },
    },
  });

  const gwsStandard = await prisma.plan.create({
    data: {
      productId: gwsProduct.id,
      name: 'Business Standard',
      slug: 'business-standard',
      sku: 'GWS-STANDARD',
      isActive: true,
      pricing: {
        create: {
          price: 12,
          currency: 'USD',
          startDate: new Date('2024-01-01'),
        },
      },
    },
  });

  const gwsPlus = await prisma.plan.create({
    data: {
      productId: gwsProduct.id,
      name: 'Business Plus',
      slug: 'business-plus',
      sku: 'GWS-PLUS',
      isActive: true,
      pricing: {
        create: {
          price: 18,
          currency: 'USD',
          startDate: new Date('2024-01-01'),
        },
      },
    },
  });

  console.log('✅ 方案建立完成');

  // 建立組織
  const org = await prisma.organization.create({
    data: {
      taxId: '12345678',
      name: '測試企業股份有限公司',
      address: '台北市信義區信義路五段7號',
      phone: '02-1234-5678',
      contactName: '王大明',
      contactEmail: 'contact@test-company.com',
      members: {
        create: {
          userId: customer.id,
          isPrimary: true,
        },
      },
    },
  });

  console.log('✅ 組織建立完成');

  // 建立訂單
  const order = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2024-0001',
      organizationId: org.id,
      userId: customer.id,
      status: 'PENDING_SALES',
      totalAmount: 720,
      currency: 'USD',
      notes: '測試訂單 - 購買 10 個 Google Workspace Business Starter 授權',
      items: {
        create: {
          planId: gwsStarter.id,
          quantity: 10,
          unitPrice: 6,
          subtotal: 60,
          domain: 'test-company.com',
          adminEmail: 'admin@test-company.com',
        },
      },
    },
  });

  console.log('✅ 訂單建立完成');

  // 建立訂閱
  const subscription = await prisma.subscription.create({
    data: {
      organizationId: org.id,
      planId: gwsStarter.id,
      productType: 'GWS',
      domain: 'test-company.com',
      adminEmail: 'admin@test-company.com',
      quantity: 10,
      startDate: new Date(),
      status: 'ACTIVE',
    },
  });

  console.log('✅ 訂閱建立完成');

  console.log('\n🎉 數據播種完成！');
  console.log('\n登入資訊：');
  console.log('客戶: customer@example.com / password123');
  console.log('業務: sales@wingwill.com / password123');
  console.log('技術: tech@wingwill.com / password123');
  console.log('管理員: admin@wingwill.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ 播種失敗:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
