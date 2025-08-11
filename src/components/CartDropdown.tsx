import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount } = useCart();

  const itemCount = getCartItemsCount();
  const total = getCartTotal();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-100 hover:text-green-300 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {itemCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 z-50 max-h-96 overflow-hidden"
            >
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="font-bold text-lg text-primary">Shopping Cart</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCart className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500">Your cart is empty</p>
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="p-4 border-b border-neutral-100 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-primary truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-green-600 font-bold text-sm">
                              ₹{item.product.discountedPrice}/{item.product.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                              <Minus className="w-4 h-4 text-neutral-600" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                              <Plus className="w-4 h-4 text-neutral-600" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors ml-2"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-lg text-primary">Total:</span>
                      <span className="font-bold text-xl text-green-600">₹{total.toFixed(2)}</span>
                    </div>
                    <Link
                      to="/order"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-center block hover:bg-green-700 transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartDropdown;