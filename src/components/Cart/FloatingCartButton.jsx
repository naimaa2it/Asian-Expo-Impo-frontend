'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

const FloatingCartButton = () => {
  const { getCartItemCount, getCartTotal, toggleCart } = useCart();
  const itemCount = getCartItemCount();
  const total = getCartTotal();

  if (itemCount === 0) return null;

  return (
    <button
      onClick={toggleCart}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 p-3 flex flex-col items-center gap-1 min-w-[70px]"
      aria-label="Open Cart"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {itemCount}
          </span>
        )}
      </div>
      <div className="text-[10px] font-semibold leading-tight text-center">
        <div>Cart</div>
        <div className="text-yellow-300">${total.toFixed(2)}</div>
      </div>
    </button>
  );
};

export default FloatingCartButton;
