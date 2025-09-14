import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, X, Heart, ArrowRight, Package } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

const CartDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    cartItems,
    savedForLater,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
    removeSavedItem,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getItemSubtotal,
  } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const itemCount = getCartItemsCount();
  const cartTotal = getCartTotal();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon with Badge */}
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative p-2 text-neutral-100 hover:text-green-300 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart className="w-6 h-6" />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {itemCount > 99 ? '99+' : itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 z-50 max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100">
                <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Shopping Cart ({itemCount})
                </h3>
                <div className="flex items-center gap-2">
                  {cartItems.length > 0 && (
                    <motion.button
                      onClick={clearCart}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All
                    </motion.button>
                  )}
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {cartItems.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center"
                    >
                      <ShoppingCart className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                      <p className="text-neutral-500 mb-4">Your cart is empty</p>
                      <Link
                        to="/products"
                        onClick={() => setIsDropdownOpen(false)}
                        className="inline-flex items-center gap-2 btn-custom-color text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                      >
                        Continue Shopping
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  ) : (
                    cartItems.map((item, index) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {/* Product Image */}
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg border border-neutral-200"
                          />
                          
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-primary truncate mb-1">
                              {item.product.name}
                            </h4>
                            <p className="text-green-600 font-bold text-sm mb-2">
                              ₹{item.product.discountedPrice}/{item.product.unit}
                            </p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mb-2">
                              <motion.button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-neutral-200 rounded-full transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus className="w-3 h-3 text-neutral-600" />
                              </motion.button>
                              
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center text-sm font-semibold border border-neutral-200 rounded px-1 py-1"
                                min="1"
                                max="10"
                              />
                              
                              <motion.button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-200 rounded-full transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus className="w-3 h-3 text-neutral-600" />
                              </motion.button>
                            </div>
                            
                            {/* Subtotal */}
                            <p className="text-sm font-bold text-green-700">
                              Subtotal: ₹{getItemSubtotal(item).toFixed(2)}
                            </p>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col gap-1">
                            <motion.button
                              onClick={() => saveForLater(item.product.id)}
                              className="p-1 hover:bg-amber-100 rounded-full transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Save for later"
                            >
                              <Heart className="w-4 h-4 text-amber-500" />
                            </motion.button>
                            <motion.button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Remove from cart"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Saved for Later Section */}
              {savedForLater.length > 0 && (
                <div className="border-t border-neutral-200">
                  <div className="p-3 bg-amber-50 border-b border-amber-100">
                    <h4 className="font-semibold text-sm text-amber-800 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Saved for Later ({savedForLater.length})
                    </h4>
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    {savedForLater.map((item) => (
                      <div key={item.product.id} className="p-3 border-b border-neutral-100 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-primary truncate">{item.product.name}</p>
                            <p className="text-xs text-green-600">₹{item.product.discountedPrice}</p>
                          </div>
                          <div className="flex gap-1">
                            <motion.button
                              onClick={() => moveToCart(item.product.id)}
                              className="text-xs btn-custom-color text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Add
                            </motion.button>
                            <motion.button
                              onClick={() => removeSavedItem(item.product.id)}
                              className="p-1 hover:bg-red-100 rounded transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="w-3 h-3 text-red-500" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-t border-neutral-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-primary">Total:</span>
                    <motion.span 
                      key={cartTotal}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="font-bold text-xl text-green-600"
                    >
                      ₹{cartTotal.toFixed(2)}
                    </motion.span>
                  </div>
                  <Link
                    to="/order"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full btn-custom-color text-white py-3 rounded-xl font-semibold text-center block hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartDropdown;