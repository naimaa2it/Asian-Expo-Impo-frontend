'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('asian-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('asian-cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('asian-cart');
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast.success('Quantity updated in cart');
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        toast.success('Added to cart');
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('asian-cart');
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartCategories = () => {
    const categories = new Set();
    cart.forEach((item) => {
      if (item.category) {
        categories.add(item.category.toLowerCase());
      }
    });
    return Array.from(categories);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const canProceedToCheckout = () => {
    const categories = getCartCategories();
    const totalQuantity = getTotalQuantity();
    
    // Check if cart is empty
    if (cart.length === 0) {
      return { canProceed: false, message: 'Your cart is empty' };
    }

    // Check if multiple categories exist
    if (categories.length > 1) {
      return {
        canProceed: false,
        message: 'Multiple categories detected.',
        showWhatsApp: true,
      };
    }

    // Get the MOQ for the current category (from first item)
    const firstItem = cart[0];
    const categoryMOQ = firstItem?.moq || 50;
    const moqUnit = firstItem?.moqUnit || 'units';

    // Check minimum quantity based on category MOQ
    if (totalQuantity < categoryMOQ) {
      const remaining = categoryMOQ - totalQuantity;
      return {
        canProceed: false,
        message: `Minimum order quantity is ${categoryMOQ} ${moqUnit}. You have ${totalQuantity} ${moqUnit} in cart. Please add ${remaining} more ${moqUnit}.`,
        showWhatsApp: true,
        categoryMOQ: categoryMOQ,
        moqUnit: moqUnit,
        currentQuantity: totalQuantity,
      };
    }

    return { canProceed: true };
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        getCartCategories,
        getTotalQuantity,
        canProceedToCheckout,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
