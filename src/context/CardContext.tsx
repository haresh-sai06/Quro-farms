import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types/product';
import { toast } from 'sonner';

const CART_STORAGE_KEY = 'quro-farms-cart';
const SAVED_FOR_LATER_KEY = 'quro-farms-saved-for-later';

interface CartContextType {
  cartItems: CartItem[];
  savedForLater: CartItem[];
  addToCart: (product: Product, quantity?: number) => boolean;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  removeSavedItem: (productId: string) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getItemSubtotal: (item: CartItem) => number;
  checkStock: (product: Product, requestedQuantity: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedItems = localStorage.getItem(SAVED_FOR_LATER_KEY);
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setCartItems(parsed);
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
      if (savedItems) {
        try {
          const parsed = JSON.parse(savedItems);
          setSavedForLater(parsed);
        } catch (error) {
          console.error('Error loading saved items from localStorage:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Save "saved for later" items to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(SAVED_FOR_LATER_KEY, JSON.stringify(savedForLater));
    }
  }, [savedForLater, isLoaded]);

  // Periodically check for changes in localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const interval = setInterval(() => {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedItems = localStorage.getItem(SAVED_FOR_LATER_KEY);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (JSON.stringify(parsedCart) !== JSON.stringify(cartItems)) {
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
            setSavedForLater(parsedItems);
          }
        } catch (error) {
          console.error('Error parsing saved items from localStorage:', error);
        }
      }
    }, 2500);

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

  return (
    <CartContext.Provider
      value={{
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};