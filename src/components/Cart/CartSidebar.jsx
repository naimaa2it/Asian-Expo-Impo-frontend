'use client';

import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartSidebar = () => {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    canProceedToCheckout,
  } = useCart();

  const handleProceedToCheckout = () => {
    const validation = canProceedToCheckout();
    
    if (!validation.canProceed) {
      // Show error message
      if (validation.showWhatsApp) {
        // Show WhatsApp contact option
        const whatsappNumber = '1234567890'; // Replace with your WhatsApp number
        const message = encodeURIComponent(
          'Hello, I would like to place a custom order with multiple categories.'
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      }
      return;
    }

    toggleCart();
    router.push('/checkout');
  };

  const validation = canProceedToCheckout();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <h2 className="text-xl font-bold">Shopping Cart</h2>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCart className="w-16 h-16 mb-4" />
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingCart className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm mb-2">
                        ${parseFloat(item.price || 0).toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            updateQuantity(item.id, value);
                          }}
                          className="w-16 text-center border rounded-md px-2 py-1 text-sm"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors self-start"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Subtotal and Checkout */}
          {cart.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>

              {/* Validation Message */}
              {!validation.canProceed && (
                <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800 flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">⚠️</span>
                    <span>{validation.message}</span>
                  </p>
                </div>
              )}

              {/* WhatsApp Contact Button (shows ABOVE proceed button when mixed categories) */}
              {validation.showWhatsApp && (
                <button
                  onClick={() => {
                    const whatsappNumber = '14379003996'; // Replace with your number
                    const message = encodeURIComponent(
                      'Hello, I would like to place a custom order with multiple categories.'
                    );
                    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                  }}
                  className="w-full mb-3 flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-semibold shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact via WhatsApp for Custom Order
                </button>
              )}

              <button
                onClick={handleProceedToCheckout}
                disabled={!validation.canProceed}
                className={`w-full py-3 px-4 rounded-md font-semibold transition-all ${
                  validation.canProceed
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
