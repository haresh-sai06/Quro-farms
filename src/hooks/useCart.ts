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
    log('Raw localStorage cart:', savedCart);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        log('Parsed cart:', parsed);
        setCartItems(parsed);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems);
        log('Parsed saved items:', parsed);
        setSavedForLater(parsed);
      } catch (error) {
        console.error('Error loading saved items from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes (only after loaded to avoid initial empty saves)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Save "saved for later" items to localStorage (only after loaded)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SAVED_FOR_LATER_KEY, JSON.stringify(savedForLater));
    }
  }, [savedForLater, isLoaded]);

  // Listen for storage events from other tabs/windows (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) {
        try {
          const parsedCart = e.newValue ? JSON.parse(e.newValue) : [];
          log('Cart updated from storage event:', parsedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error parsing cart from storage event:', error);
        }
      }
      if (e.key === SAVED_FOR_LATER_KEY) {
        try {
          const parsedItems = e.newValue ? JSON.parse(e.newValue) : [];
          log('Saved items updated from storage event:', parsedItems);
          setSavedForLater(parsedItems);
        } catch (error) {
          console.error('Error parsing saved items from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Poll localStorage every 2.5 seconds for updates (for same-tab sync and faster refresh)
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedItems = localStorage.getItem(SAVED_FOR_LATER_KEY);

      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (JSON.stringify(parsedCart) !== JSON.stringify(cartItems)) {
            log('Cart refreshed from localStorage poll:', parsedCart);
            setCartItems(parsedCart);
          }
        } catch (error) {
          console.error('Error parsing cart from localStorage poll:', error);
        }
      }

      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          if (JSON.stringify(parsedItems) !== JSON.stringify(savedForLater)) {
            log('Saved items refreshed from localStorage poll:', parsedItems);
            setSavedForLater(parsedItems);
          }
        } catch (error) {
          console.error('Error parsing saved items from localStorage poll:', error);
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [cartItems, savedForLater, isLoaded]);

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
    log('Adding to cart:', product, quantity);
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
    const currentQuantity = cartItems.find(item => item.product.id === productId)?.quantity || 0;
    if (product && !checkStock(product, quantity - currentQuantity)) {
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
    isLoaded,
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