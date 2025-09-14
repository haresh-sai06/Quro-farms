import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types/product';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'quro-farms-cart';
const SAVED_FOR_LATER_KEY = 'quro-farms-saved-for-later';

// A custom logging function that is active only in development
const log = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    const savedItems = localStorage.getItem(SAVED_FOR_LATER_KEY);
    log('Raw localStorage cart:', savedCart); // Using the new log function
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        log('Parsed cart:', parsed); // Using the new log function
        setCartItems(parsed);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems);
        log('Parsed saved items:', parsed); // Using the new log function
        setSavedForLater(parsed);
      } catch (error) {
        console.error('Error loading saved items from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Save "saved for later" items to localStorage
  useEffect(() => {
    localStorage.setItem(SAVED_FOR_LATER_KEY, JSON.stringify(savedForLater));
  }, [savedForLater]);

  // Periodically check for changes in localStorage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedItems = localStorage.getItem(SAVED_FOR_LATER_KEY);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (JSON.stringify(parsedCart) !== JSON.stringify(cartItems)) {
            log('Cart updated from localStorage:', parsedCart); // Using the new log function
            setCartItems(parsedCart);
          }
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
        }
      }
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          if (JSON.stringify(parsedItems) !== JSON.stringify(savedForLater)) {
            log('Saved items updated from localStorage:', parsedItems); // Using the new log function
            setSavedForLater(parsedItems);
          }
        } catch (error) {
          console.error('Error parsing saved items from localStorage:', error);
        }
      }
    }, 2500);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [cartItems, savedForLater]);

  const checkStock = (product: Product, requestedQuantity: number): boolean => {
    const currentCartQuantity = cartItems.find(item => item.product.id === product.id)?.quantity || 0;
    const totalRequested = currentCartQuantity + requestedQuantity;
    
    if (totalRequested > 10) {
      toast.error(`Only ${10 - currentCartQuantity} items available in stock`);
      return false;
    }
    
    if (!product.inStock) {
      toast.error('This product is currently out of stock');
      return false;
    }
    
    return true;
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    log('Adding to cart:', product, quantity); // Using the new log function
    if (!checkStock(product, quantity)) {
      return false;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
    
    return true;
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = cartItems.find(item => item.product.id === productId)?.product;
    if (product && !checkStock(product, quantity - (cartItems.find(item => item.product.id === productId)?.quantity || 0))) {
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const saveForLater = (productId: string) => {
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      setSavedForLater(prevItems => {
        const existingItem = prevItems.find(saved => saved.product.id === productId);
        if (existingItem) {
          return prevItems.map(saved =>
            saved.product.id === productId
              ? { ...saved, quantity: saved.quantity + item.quantity }
              : saved
          );
        } else {
          return [...prevItems, item];
        }
      });
      removeFromCart(productId);
      toast.success('Item saved for later');
    }
  };

  const moveToCart = (productId: string) => {
    const item = savedForLater.find(item => item.product.id === productId);
    if (item && checkStock(item.product, item.quantity)) {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(cartItem => cartItem.product.id === productId);
        if (existingItem) {
          return prevItems.map(cartItem =>
            cartItem.product.id === productId
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          return [...prevItems, item];
        }
      });
      setSavedForLater(prevItems => prevItems.filter(saved => saved.product.id !== productId));
      toast.success('Item moved to cart');
    }
  };

  const removeSavedItem = (productId: string) => {
    setSavedForLater(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.success('Item removed from saved items');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.discountedPrice * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemSubtotal = (item: CartItem) => {
    return item.product.discountedPrice * item.quantity;
  };

  return {
    cartItems,
    savedForLater,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    saveForLater,
    moveToCart,
    removeSavedItem,
    getCartTotal,
    getCartItemsCount,
    getItemSubtotal,
    checkStock,
  };
};