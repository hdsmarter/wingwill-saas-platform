'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// 購物車商品類型
export interface CartItem {
  id: string;
  brand: string;
  brandId: string;
  brandLogo: string;
  productName: string;
  productId: string;
  planName: string;
  planId: string;
  pricePerLicense: number;
  currency: string;
  quantity: number;
  features: string[];
}

// Context 類型
interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  clearBrandCart: (brandId: string) => void;
  getItemsByBrand: () => Map<string, CartItem[]>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getBrandTotal: (brandId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 從 localStorage 載入購物車
  useEffect(() => {
    const savedCart = localStorage.getItem('wingwill_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
  }, []);

  // 儲存到 localStorage
  useEffect(() => {
    localStorage.setItem('wingwill_cart', JSON.stringify(items));
  }, [items]);

  // 新增商品到購物車
  const addItem = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems((prev) => {
      // 檢查是否已存在相同的商品方案
      const existingIndex = prev.findIndex(
        (item) =>
          item.brandId === newItem.brandId &&
          item.productId === newItem.productId &&
          item.planId === newItem.planId
      );

      if (existingIndex >= 0) {
        // 如果已存在，增加數量
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      // 如果不存在，新增商品
      return [
        ...prev,
        {
          ...newItem,
          id: `${newItem.brandId}-${newItem.productId}-${newItem.planId}-${Date.now()}`,
          quantity: 1,
        },
      ];
    });
  };

  // 移除商品
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 更新數量
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // 清空購物車
  const clearCart = () => {
    setItems([]);
  };

  // 清空特定品牌的購物車
  const clearBrandCart = (brandId: string) => {
    setItems((prev) => prev.filter((item) => item.brandId !== brandId));
  };

  // 按品牌分組
  const getItemsByBrand = (): Map<string, CartItem[]> => {
    const brandMap = new Map<string, CartItem[]>();
    items.forEach((item) => {
      const brandItems = brandMap.get(item.brandId) || [];
      brandItems.push(item);
      brandMap.set(item.brandId, brandItems);
    });
    return brandMap;
  };

  // 取得總商品數
  const getTotalItems = (): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // 取得總價格
  const getTotalPrice = (): number => {
    return items.reduce((sum, item) => sum + item.pricePerLicense * item.quantity, 0);
  };

  // 取得特定品牌的總價
  const getBrandTotal = (brandId: string): number => {
    return items
      .filter((item) => item.brandId === brandId)
      .reduce((sum, item) => sum + item.pricePerLicense * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        clearBrandCart,
        getItemsByBrand,
        getTotalItems,
        getTotalPrice,
        getBrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
