import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import Header from "../components/Header";
import { toast } from "sonner";

const OrderNow = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const total = getCartTotal();
  const deliveryFee = total > 500 ? 0 : 50;
  const finalTotal = total + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Simulate order submission
    toast.success("Order placed successfully! We'll contact you soon.");
    clearCart();
    
    // Reset form
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      paymentMethod: 'cod'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <section className="pt-32 pb-20 container-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Complete Your <span className="text-green-600">Order</span>
            </h1>
            <p className="text-xl text-neutral-600">
              Fresh, organic produce delivered to your doorstep
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  Order Summary
                </h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500 text-lg">Your cart is empty</p>
                    <a
                      href="/products"
                      className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                    >
                      Browse Products
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary">{item.product.name}</h3>
                            <p className="text-green-600 font-bold">₹{item.product.discountedPrice}/{item.product.unit}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors ml-2"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{(item.product.discountedPrice * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-neutral-200 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">₹{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span className="font-semibold">
                          {deliveryFee === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${deliveryFee}`
                          )}
                        </span>
                      </div>
                      {total < 500 && (
                        <p className="text-sm text-amber-600">
                          Add ₹{(500 - total).toFixed(2)} more for free delivery!
                        </p>
                      )}
                      <div className="flex justify-between text-xl font-bold text-primary border-t border-neutral-200 pt-2">
                        <span>Total:</span>
                        <span>₹{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Customer Information Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Delivery Information</h2>

                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors resize-none"
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={customerInfo.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="Enter PIN code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={customerInfo.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="online">Online Payment (UPI/Card)</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={cartItems.length === 0}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
                    whileHover={{ scale: cartItems.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: cartItems.length > 0 ? 0.98 : 1 }}
                  >
                    {cartItems.length === 0 ? 'Cart is Empty' : `Place Order - ₹${finalTotal.toFixed(2)}`}
                  </motion.button>

                  <div className="text-center text-sm text-neutral-600">
                    <p>By placing this order, you agree to our terms and conditions.</p>
                    <p className="mt-2">
                      <span className="text-green-600 font-semibold">Free delivery</span> on orders above ₹500
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderNow;