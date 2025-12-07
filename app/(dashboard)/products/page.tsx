'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

// Mock data with multi-level structure: Brand → Product → Plan
const mockBrands = [
  {
    id: 'google',
    name: 'Google',
    logo: '🔍',
    description: 'Google 雲端服務解決方案',
    products: [
      {
        id: 'gws',
        name: 'Google Workspace',
        description: '企業協作與生產力工具套件',
        category: '協作平台',
        plans: [
          {
            id: 'gws-starter',
            name: 'Business Starter',
            price: 6,
            currency: 'USD',
            features: ['Gmail 企業信箱', '30GB 雲端空間', 'Meet 視訊會議 (100人)', '共享行事曆']
          },
          {
            id: 'gws-standard',
            name: 'Business Standard',
            price: 12,
            currency: 'USD',
            features: ['Gmail 企業信箱', '2TB 雲端空間', 'Meet 視訊會議 (150人)', '電子簽章']
          },
          {
            id: 'gws-plus',
            name: 'Business Plus',
            price: 18,
            currency: 'USD',
            features: ['Gmail 企業信箱', '5TB 雲端空間', 'Meet 視訊會議 (500人)', '進階安全性']
          },
        ],
      },
      {
        id: 'gcp',
        name: 'Google Cloud Platform',
        description: '彈性可擴展的雲端基礎設施',
        category: '雲端運算',
        plans: [
          {
            id: 'gcp-compute',
            name: 'Compute Engine',
            price: 0,
            currency: 'USD',
            note: '依使用量計費',
            features: ['虛擬機器', '自訂配置', '按秒計費', '全球資料中心']
          },
          {
            id: 'gcp-storage',
            name: 'Cloud Storage',
            price: 0,
            currency: 'USD',
            note: '依使用量計費',
            features: ['物件儲存', '高可用性', '多區域備援', 'CDN 整合']
          },
        ],
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '💼',
    description: 'Microsoft 雲端與生產力服務',
    products: [
      {
        id: 'm365',
        name: 'Microsoft 365',
        description: '完整的企業辦公解決方案',
        category: '協作平台',
        plans: [
          {
            id: 'm365-basic',
            name: 'Business Basic',
            price: 6,
            currency: 'USD',
            features: ['Exchange 企業信箱', '1TB OneDrive', 'Teams 協作', 'Office Online']
          },
          {
            id: 'm365-standard',
            name: 'Business Standard',
            price: 12.5,
            currency: 'USD',
            features: ['Exchange 企業信箱', '1TB OneDrive', 'Teams 進階', 'Office 桌面版']
          },
          {
            id: 'm365-premium',
            name: 'Business Premium',
            price: 22,
            currency: 'USD',
            features: ['完整 Office 套件', '進階安全性', '裝置管理', '進階分析']
          },
        ],
      },
    ],
  },
];

export default function ProductsPage() {
  const [expandedBrands, setExpandedBrands] = useState<string[]>(['google']);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);
  const { items, addItem, getTotalItems } = useCart();

  const toggleBrand = (brandId: string) => {
    setExpandedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const toggleProduct = (productId: string) => {
    setExpandedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (brand: any, product: any, plan: any) => {
    addItem({
      brand: brand.name,
      brandId: brand.id,
      brandLogo: brand.logo,
      productName: product.name,
      productId: product.id,
      planName: plan.name,
      planId: plan.id,
      pricePerLicense: plan.price,
      currency: plan.currency,
      features: plan.features,
    });
    // TODO: Show toast notification
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GCP Style Header - Ultra Compact */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>首頁</span>
            <span>/</span>
            <span className="text-gray-900">產品目錄</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium text-gray-900">產品目錄</h1>
              <p className="mt-0.5 text-xs text-gray-600">
                瀏覽雲端服務產品，選擇適合您的方案
              </p>
            </div>
            <div className="flex gap-2">
              <button className="h-8 px-3 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-xs font-medium text-gray-700">篩選</span>
              </button>
              <Link href="/cart">
                <button className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-sm transition-colors flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xs font-medium">購物車</span>
                  {getTotalItems() > 0 && (
                    <span className="bg-white text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* GCP Style Product Listing - Compact */}
      <div className="p-6">
        <div className="space-y-3">
          {mockBrands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm">
              {/* Level 1: Brand - Compact */}
              <button
                onClick={() => toggleBrand(brand.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center text-lg">
                    {brand.logo}
                  </div>
                  <div className="text-left">
                    <h2 className="text-sm font-semibold text-gray-900">{brand.name}</h2>
                    <p className="text-xs text-gray-600">{brand.description}</p>
                  </div>
                  <span className="ml-3 px-2 py-0.5 bg-gray-100 rounded-sm text-[10px] font-medium text-gray-600">
                    {brand.products.length} 產品
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${expandedBrands.includes(brand.id) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Level 2: Products - Compact */}
              {expandedBrands.includes(brand.id) && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {brand.products.map((product) => (
                    <div key={product.id} className="border-b border-gray-200 last:border-0">
                      <button
                        onClick={() => toggleProduct(product.id)}
                        className="w-full px-6 py-2.5 flex items-center justify-between hover:bg-white transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          <div className="text-left">
                            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                            <p className="text-xs text-gray-600">{product.description}</p>
                          </div>
                          <span className="ml-3 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-sm text-[10px] font-medium">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">{product.plans.length} 方案</span>
                          <svg
                            className={`w-4 h-4 text-gray-500 transition-transform ${expandedProducts.includes(product.id) ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Level 3: Plans - GCP Compact Cards */}
                      {expandedProducts.includes(product.id) && (
                        <div className="px-6 pb-4 bg-white">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                            {product.plans.map((plan) => (
                              <div
                                key={plan.id}
                                className="border border-gray-200 rounded-sm p-4 hover:border-blue-600 hover:shadow-sm transition-all"
                              >
                                <div className="mb-3">
                                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{plan.name}</h4>
                                  {plan.price > 0 ? (
                                    <div className="flex items-baseline gap-1">
                                      <span className="text-2xl font-semibold text-blue-600">
                                        ${plan.price}
                                      </span>
                                      <span className="text-xs text-gray-600">USD / 用戶 / 月</span>
                                    </div>
                                  ) : (
                                    <p className="text-xs text-gray-600 italic">{plan.note}</p>
                                  )}
                                </div>

                                <ul className="space-y-1.5 mb-3">
                                  {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-900">
                                      <svg className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>

                                <button
                                  onClick={() => handleAddToCart(brand, product, plan)}
                                  className="w-full h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-sm transition-colors"
                                >
                                  加入購物車
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
