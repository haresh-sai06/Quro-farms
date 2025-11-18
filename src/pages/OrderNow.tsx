import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, MapPin, User, X } from "lucide-react"; // Added X for close button
import { useState } from "react";
import { useCartContext } from "../context/CardContext";
import Header from "../components/Header";
import { toast } from "sonner";

const WHATSAPP_PHONE_NUMBER = "7558938256"; // Corrected with country code +91

const OrderNow: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, checkStock, clearCart } = useCartContext();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const total = getCartTotal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const validateCustomerInfo = () => {
    if (!customerInfo.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!customerInfo.email.toLowerCase().endsWith(".com")) {
      toast.error("Email must end with .com");
      return false;
    }
    if (!customerInfo.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      toast.error("Phone number must be a 10-digit number");
      return false;
    }
    if (!customerInfo.address.trim()) {
      toast.error("Please enter your delivery address");
      return false;
    }
    if (customerInfo.city.trim() && !customerInfo.city.trim().length) {
      toast.error("City cannot be empty if entered");
      return false;
    }
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
    message += "Additional courier charges  apply.\n\n";
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
    setIsModalOpen(true); // Open confirmation modal
  };

  const confirmOrder = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/+91${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp to send your order...");
    setIsModalOpen(false); // Close modal after opening WhatsApp
    clearCart(); // Clear the cart after confirming the order
    setCustomerInfo({ name: '', email: '', phone: '', address: '', city: '', pincode: '' }); // Reset form values
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Header />
      
      <section className="pt-32 pb-20 container-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-700 mb-4">
              Complete Your <span className="text-yellow-600">Order</span>
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
                      className="inline-block mt-4 bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition-colors"
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
                            <p className="text-yellow-600 font-bold text-sm sm:text-base">₹{item.product.discountedPrice}/{item.product.unit}</p>
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
                            <p className="font-bold text-yellow-600 text-sm sm:text-base">₹{(item.product.discountedPrice * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-neutral-200 pt-4">
                      <div className="flex justify-between text-xl font-bold text-primary">
                        <span>Total:</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mt-1">Shipping charges may apply*</p>
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
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-sm"
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
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-sm"
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
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-sm"
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
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors resize-none text-sm"
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
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-sm"
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
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-sm"
                        placeholder="Enter 6-digit PIN code"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    disabled={cartItems.length === 0}
                    className="w-full bg-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-yellow-700 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    whileHover={{ scale: cartItems.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: cartItems.length > 0 ? 0.98 : 1 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {cartItems.length === 0 ? 'Cart is Empty' : 'Review Order Details'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Order Confirmation Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)} // Close on backdrop click
        >
          <motion.div
            initial={{ scale: 0.7, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 50 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">Confirm Your Order</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-primary">Order Summary</h3>
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>₹{(item.product.discountedPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-primary">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                  <span>Courier charges will apply</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-primary">Customer Details</h3>
              <p><strong>Name:</strong> {customerInfo.name}</p>
              <p><strong>Phone:</strong> {customerInfo.phone}</p>
              <p><strong>Email:</strong> {customerInfo.email}</p>
              <p><strong>Address:</strong> {customerInfo.address}</p>
              <p><strong>City:</strong> {customerInfo.city || 'N/A'}</p>
              <p><strong>PIN:</strong> {customerInfo.pincode || 'N/A'}</p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-neutral-200 text-neutral-800 rounded-xl hover:bg-neutral-300 transition-colors"
              >
                Back
              </button>
              <motion.button
                onClick={confirmOrder}
                className="px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                Confirm Order
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default OrderNow;