'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearBrandCart, getItemsByBrand, getBrandTotal } = useCart();
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());

  const brandMap = getItemsByBrand();
  const brandEntries = Array.from(brandMap.entries());

  const toggleBrand = (brandId: string) => {
    const newExpanded = new Set(expandedBrands);
    if (newExpanded.has(brandId)) {
      newExpanded.delete(brandId);
    } else {
      newExpanded.add(brandId);
    }
    setExpandedBrands(newExpanded);
  };

  const handleCheckout = (brandId: string, brandName: string) => {
    // TODO: 實現結帳流程
    alert(`即將為 ${brandName} 的商品進行結帳\n總金額: $${getBrandTotal(brandId).toLocaleString()}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <div className="bg-white border-b border-[#E5E7EB]">
          <div className="max-w-[1200px] mx-auto px-20 py-14">
            <h1 className="text-3xl font-semibold text-[#202124] mb-2">購物車</h1>
            <p className="text-base text-[#5F6368]">檢視並確認您的訂購內容</p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-20 py-14">
          <div className="bg-white rounded-xl border-2 border-[#E5E7EB] p-16 text-center">
            <svg
              className="w-24 h-24 mx-auto text-[#DADCE0] mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#202124] mb-3">購物車是空的</h2>
            <p className="text-[#5F6368] mb-8 text-lg">瀏覽我們的產品目錄，開始選購</p>
            <Link href="/products">
              <button className="px-8 py-4 bg-[#C81C11] hover:bg-[#A01108] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl">
                前往產品目錄
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-20 py-14">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#202124] mb-2">購物車</h1>
              <p className="text-base text-[#5F6368]">
                按品牌分組，可分別結帳 • {items.length} 個商品
              </p>
            </div>
            <Link href="/products">
              <button className="px-6 py-3 border-2 border-[#DADCE0] hover:border-[#C81C11] hover:bg-red-50 rounded-xl transition-all font-semibold text-[#202124] hover:text-[#C81C11]">
                繼續選購
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Items by Brand */}
      <div className="max-w-[1200px] mx-auto px-20 py-14">
        <div className="space-y-8">
          {brandEntries.map(([brandId, brandItems]) => {
            const firstItem = brandItems[0];
            const brandTotal = getBrandTotal(brandId);
            const isExpanded = expandedBrands.has(brandId);

            return (
              <div
                key={brandId}
                className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Brand Header */}
                <div className="bg-gradient-to-r from-[#FAFAFA] to-white border-b-2 border-[#E5E7EB] p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F1F3F4] to-[#E8EAED] flex items-center justify-center text-3xl shadow-sm">
                        {firstItem.brandLogo}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#202124] mb-2">{firstItem.brand}</h2>
                        <p className="text-base text-[#5F6368]">
                          {brandItems.length} 個商品 • 總計 ${brandTotal.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleBrand(brandId)}
                        className="px-5 py-3 border-2 border-[#DADCE0] hover:border-[#5F6368] rounded-xl transition-all font-semibold text-[#5F6368] hover:bg-[#F9FAFB]"
                      >
                        {isExpanded ? '收起' : '展開詳情'}
                      </button>
                      <button
                        onClick={() => handleCheckout(brandId, firstItem.brand)}
                        className="px-8 py-3 bg-[#C81C11] hover:bg-[#A01108] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
                      >
                        結帳此品牌
                      </button>
                    </div>
                  </div>
                </div>

                {/* Brand Items (Collapsible) */}
                {isExpanded && (
                  <div className="p-8 space-y-6">
                    {brandItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-6 p-6 border-2 border-[#E8EAED] rounded-xl hover:border-[#DADCE0] transition-all bg-[#FAFAFA]"
                      >
                        {/* Product Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-[#202124] mb-2">
                                {item.productName}
                              </h3>
                              <p className="text-base text-[#5F6368] mb-3">{item.planName}</p>
                              <p className="text-xl font-bold text-[#C81C11]">
                                ${item.pricePerLicense} {item.currency} / 用戶 / 月
                              </p>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#5F6368] hover:text-[#C81C11] transition-colors p-2 hover:bg-red-50 rounded-lg"
                              title="移除商品"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Features */}
                          <ul className="space-y-2 mb-6">
                            {item.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-[#5F6368]">
                                <svg
                                  className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-base font-semibold text-[#202124]">數量:</span>
                              <div className="flex items-center border-2 border-[#DADCE0] rounded-lg overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-5 py-3 hover:bg-[#F1F3F4] transition-colors font-bold text-lg"
                                >
                                  −
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="w-20 text-center border-x-2 border-[#DADCE0] py-3 focus:outline-none font-bold text-lg"
                                  min="1"
                                />
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-5 py-3 hover:bg-[#F1F3F4] transition-colors font-bold text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-[#5F6368] mb-1">小計</p>
                              <p className="text-2xl font-bold text-[#202124]">
                                ${(item.pricePerLicense * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Clear Brand Cart */}
                    <button
                      onClick={() => {
                        if (confirm(`確定要清空 ${firstItem.brand} 的購物車嗎？`)) {
                          clearBrandCart(brandId);
                        }
                      }}
                      className="w-full py-3 border-2 border-[#DADCE0] hover:border-[#C81C11] hover:bg-red-50 rounded-xl transition-all font-semibold text-[#5F6368] hover:text-[#C81C11]"
                    >
                      清空 {firstItem.brand} 購物車
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-white rounded-xl border-2 border-blue-100 p-8">
          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-2">需要協助？</h3>
              <p className="text-base text-blue-700 mb-4">
                我們的業務團隊隨時為您提供專業諮詢服務，協助您選擇最適合的方案。
              </p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">
                聯絡業務團隊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
