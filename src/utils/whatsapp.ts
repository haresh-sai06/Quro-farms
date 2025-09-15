import { CartItem } from '../types/product';

export const WHATSAPP_PHONE_NUMBER = "9629002576"; // Add country code (91 for India)

export interface CustomerInfo {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
}

export const generateOrderMessage = (
  cartItems: CartItem[], 
  total: number, 
  customerInfo?: CustomerInfo
): string => {
  if (cartItems.length === 0) {
    return "Hello! I'm interested in your products from Quro Farms.";
  }

  let message = "🛒 *New Order from Quro Farms Website*\n\n";
  message += "📦 *Order Details:*\n";
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   • Quantity: ${item.quantity} \n`; // Changed to separate number and unit
    message += `   • Unit Price: ₹${item.product.discountedPrice}\n`;
    message += `   • Subtotal: ₹${(item.product.discountedPrice * item.quantity).toFixed(2)}\n\n`;
  });

  message += `💰 *Total Amount: ₹${total.toFixed(2)}*\n\n`;
  
  if (customerInfo && (customerInfo.name || customerInfo.phone || customerInfo.address)) {
    message += "👤 *Customer Information:*\n";
    if (customerInfo.name) message += `• Name: ${customerInfo.name}\n`;
    if (customerInfo.phone) message += `• Phone: ${customerInfo.phone}\n`;
    if (customerInfo.email) message += `• Email: ${customerInfo.email}\n`;
    if (customerInfo.address) message += `• Address: ${customerInfo.address}\n`;
    if (customerInfo.city) message += `• City: ${customerInfo.city}\n`;
    if (customerInfo.pincode) message += `• PIN Code: ${customerInfo.pincode}\n\n`;
  }
  
  message += "✅ Please confirm this order.\n";
  message += "🙏 Thank you for choosing Quro Farms!";
  
  return message;
};

export const generateProductInquiryMessage = (
  productName: string, 
  productUnit: string,
  customerName?: string
): string => {
  let message = "🌱 *Product Inquiry - Quro Farms*\n\n";
  message += `📦 *Product: ${productName}*\n`;
  message += `📏 *Unit: ${productUnit}*\n\n`;
  
  if (customerName) {
    message += `👤 *Customer: ${customerName}*\n\n`;
  }
  
  message += "Hi! I'm interested in this product. Could you please provide more details about availability and pricing?\n\n";
  message += "Thank you! 🙏";
  
  return message;
};

export const openWhatsApp = (message: string, phoneNumber: string = WHATSAPP_PHONE_NUMBER): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export const sendOrderViaWhatsApp = (
  cartItems: CartItem[], 
  total: number, 
  customerInfo?: CustomerInfo,
  phoneNumber: string = WHATSAPP_PHONE_NUMBER
): void => {
  const message = generateOrderMessage(cartItems, total, customerInfo);
  openWhatsApp(message, phoneNumber);
};

export const sendProductInquiry = (
  productName: string, 
  productUnit: string,
  customerName?: string,
  phoneNumber: string = WHATSAPP_PHONE_NUMBER
): void => {
  const message = generateProductInquiryMessage(productName, productUnit, customerName);
  openWhatsApp(message, phoneNumber);
};