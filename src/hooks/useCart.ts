import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '../types/product';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'quro-farms-cart';
const SAVED_FOR_LATER_KEY = 'quro-farms-saved-for-later';
const CART_LAST_CLEARED_KEY = 'quro-farms-cart-last-cleared'; // New key for session tracking

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

  // Helper to check if this is a "new session" (e.g., after 24 hours) and clear if so
  const shouldClearOnLoad = useCallback(() => {
    const lastCleared = localStorage.getItem(CART_LAST_CLEARED_KEY);
    const now = Date.now();
    const isNewSession = !lastCleared || (now - parseInt(lastCleared)) > 24 * 60 * 60 * 1000; // 24h threshold
    return isNewSession;
  }, []);

  // Load cart from localStorage on mount, with new session clearing
  useEffect(() => {
    const clearIfNewSession = () => {
      if (shouldClearOnLoad()) {
        localStorage.removeItem(CART_STORAGE_KEY);
        localStorage.removeItem(SAVED_FOR_LATER_KEY);
        localStorage.setItem(CART_LAST_CLEARED_KEY, Date.now().toString());
        log('Cleared cart for new session on load');
        setIsLoaded(true);
        return { cart: [], saved: [] };
      }
      return null;
    };

    const clearedData = clearIfNewSession();
    if (clearedData) {
      setCartItems(clearedData.cart);
      setSavedForLater(clearedData.saved);
      return;
    }

    // Otherwise, load normally
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
        localStorage.removeItem(CART_STORAGE_KEY); // Clear invalid data
      }
    }

    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems);
        log('Parsed saved items:', parsed);
        setSavedForLater(parsed);
      } catch (error) {
        console.error('Error loading saved items from localStorage:', error);
        localStorage.removeItem(SAVED_FOR_LATER_KEY); // Clear invalid data
      }
    }

    setIsLoaded(true);
  }, [shouldClearOnLoad]);

  // Save cart to localStorage whenever it changes (only after loaded to avoid initial empty saves)
  useEffect(() => {
    if (isLoaded && cartItems.length > 0) { // Only save if non-empty to avoid unnecessary writes
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      localStorage.setItem(CART_LAST_CLEARED_KEY, Date.now().toString()); // Update timestamp on any change
    } else if (isLoaded && cartItems.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cartItems, isLoaded]);

  // Save "saved for later" items to localStorage (only after loaded)
  useEffect(() => {
    if (isLoaded && savedForLater.length > 0) {
      localStorage.setItem(SAVED_FOR_LATER_KEY, JSON.stringify(savedForLater));
    } else if (isLoaded && savedForLater.length === 0) {
      localStorage.removeItem(SAVED_FOR_LATER_KEY);
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
      if (e.key === CART_LAST_CLEARED_KEY) {
        // Optionally react to manual clears from other tabs
        const lastCleared = e.newValue ? parseInt(e.newValue) : 0;
        if (shouldClearOnLoad()) { // Re-check if we need to clear here too
          setCartItems([]);
          setSavedForLater([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [shouldClearOnLoad]);

  // Reduce polling frequency to 5s and optimize (only if not already synced)
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedItems = localStorage.getItem(SAVED_FOR_LATER_KEY);

      if (savedCart && JSON.stringify(JSON.parse(savedCart)) !== JSON.stringify(cartItems)) {
        try {
          const parsedCart = JSON.parse(savedCart);
          log('Cart refreshed from localStorage poll:', parsedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error parsing cart from localStorage poll:', error);
        }
      }

      if (savedItems && JSON.stringify(JSON.parse(savedItems)) !== JSON.stringify(savedForLater)) {
        try {
          const parsedItems = JSON.parse(savedItems);
          log('Saved items refreshed from localStorage poll:', parsedItems);
          setSavedForLater(parsedItems);
        } catch (error) {
          console.error('Error parsing saved items from localStorage poll:', error);
        }
      }
    }, 5000); // Increased to 5s for less overhead

    return () => clearInterval(interval);
  }, [cartItems, savedForLater, isLoaded]);

  const checkStock = useCallback((product: Product, requestedQuantity: number): boolean => {
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
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
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
  }, [checkStock]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.success('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
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
  }, [cartItems, checkStock, removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setSavedForLater([]); // Optionally clear saved items too, or keep separate
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(SAVED_FOR_LATER_KEY);
    localStorage.setItem(CART_LAST_CLEARED_KEY, Date.now().toString());
    toast.success('Cart cleared');
  }, []);

  const saveForLater = useCallback((productId: string) => {
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
  }, [cartItems, removeFromCart]);

  const moveToCart = useCallback((productId: string) => {
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
  }, [savedForLater, checkStock]);

  const removeSavedItem = useCallback((productId: string) => {
    setSavedForLater(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.success('Item removed from saved items');
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.discountedPrice * item.quantity);
    }, 0);
  }, [cartItems]);

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const getItemSubtotal = useCallback((item: CartItem) => {
    return item.product.discountedPrice * item.quantity;
  }, []);

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