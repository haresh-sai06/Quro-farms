import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, MapPin, User } from "lucide-react";
import { useState } from "react";
import { useCartContext } from "../context/CardContext"; // Updated to useCartContext
import Header from "../components/Header";
import { toast } from "sonner";

const WHATSAPP_PHONE_NUMBER = "9629002576"; // Add country code (missing +91)

const OrderNow: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, checkStock } = useCartContext();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '', // Added phone field
    address: '',
    city: '',
    pincode: '',
  });

  const total = getCartTotal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const validateCustomerInfo = () => {
    // Name validation
    if (!customerInfo.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    // Email validation (must end with .com)
    if (!customerInfo.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!customerInfo.email.toLowerCase().endsWith(".com")) {
      toast.error("Email must end with .com");
      return false;
    }

    // Phone validation (10-digit integer)
    if (!customerInfo.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      toast.error("Phone number must be a 10-digit number");
      return false;
    }

    // Address validation
    if (!customerInfo.address.trim()) {
      toast.error("Please enter your delivery address");
      return false;
    }

    // City validation (if provided)
    if (customerInfo.city.trim() && !customerInfo.city.trim().length) {
      toast.error("City cannot be empty if entered");
      return false;
    }

    // PIN code validation (if provided, must be 6 digits)
    if (customerInfo.pincode.trim()) {
      const pincodeRegex = /^\d{6}$/;
      if (!pincodeRegex.test(customerInfo.pincode)) {
        toast.error("PIN code must be a 6-digit number");
        return false;
      }
    }

    return true;
  };

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) {
      return "Hello! I'm interested in your products.";
    }

    let message = `🛒 *Order Details (${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })})*\n\n`;
    
    cartItems.forEach((item) => {
      message += `📦 *${item.product.name}*\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.product.discountedPrice}/${item.product.unit}\n`;
      message += `   Subtotal: ₹${(item.product.discountedPrice * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *Total Amount: ₹${total.toFixed(2)}*\n`;
    message += `🛍 *Total Items: ${getCartItemsCount()}*\n\n`;
    
    if (customerInfo.name || customerInfo.email || customerInfo.phone || customerInfo.address || customerInfo.city || customerInfo.pincode) {
      message += "📋 *Customer Details:*\n";
      if (customerInfo.name) message += `Name: ${customerInfo.name}\n`;
      if (customerInfo.email) message += `Email: ${customerInfo.email}\n`;
      if (customerInfo.phone) message += `Phone: ${customerInfo.phone}\n`;
      if (customerInfo.address) message += `Address: ${customerInfo.address}\n`;
      if (customerInfo.city) message += `City: ${customerInfo.city}\n`;
      if (customerInfo.pincode) message += `PIN: ${customerInfo.pincode}\n\n`;
    }
    
    message += "Please confirm this order. Thank you! 🙏";

    return message;
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!validateCustomerInfo()) {
      return;
    }

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+91${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`; // Added +91 for India
    
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp to send your order...");
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Complete Your <span className="text-green-600">Order</span>
            </h1>
            <p className="text-neutral-600">You have {getCartItemsCount()} item(s) in your cart</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  Order Summary
                </h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingCart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500 text-lg">Your cart is empty</p>
                    <a
                      href="/products"
                      className="inline-block mt-4 btn-custom-color text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                    >
                      Browse Products
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-neutral-200 rounded-xl">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-primary text-sm sm:text-base truncate">{item.product.name}</h3>
                            <p className="text-green-600 font-bold text-sm sm:text-base">₹{item.product.discountedPrice}/{item.product.unit}</p>
                            <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 hover:bg-neutral-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                              </svg>
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const qty = parseInt(e.target.value) || 1;
                                if (checkStock(item.product, qty - item.quantity)) {
                                  updateQuantity(item.product.id, qty);
                                }
                              }}
                              className="w-16 text-center font-semibold border border-neutral-200 rounded px-2 py-1 text-sm"
                              min="1"
                              max="10"
                            />
                            <button
                              onClick={() => {
                                if (checkStock(item.product, 1)) {
                                  updateQuantity(item.product.id, item.quantity + 1);
                                }
                              }}
                              disabled={!item.product.inStock}
                              className="p-1 hover:bg-neutral-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors ml-2 flex-shrink-0"
                            >
                              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                            <p className="font-bold text-green-600 text-sm sm:text-base">₹{(item.product.discountedPrice * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-neutral-200 pt-4">
                      <div className="flex justify-between text-xl font-bold text-primary">
                        <span>Total:</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Customer Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">Delivery Information</h2>

                <div className="space-y-6">
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
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-sm"
                      placeholder="Enter your 10-digit phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-sm"
                      placeholder="Enter your email (must end with .com)"
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
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors resize-none text-sm"
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-sm"
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
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-green-500 transition-colors text-sm"
                        placeholder="Enter 6-digit PIN code"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    disabled={cartItems.length === 0}
                    className="w-full btn-custom-color text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    whileHover={{ scale: cartItems.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: cartItems.length > 0 ? 0.98 : 1 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {cartItems.length === 0 ? 'Cart is Empty' : 'Order via WhatsApp'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderNow;