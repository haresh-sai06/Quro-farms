import { CartItem } from '../types/product';

// These will be exposed in frontend - user acknowledged the security tradeoff
const TELEGRAM_BOT_TOKEN = '8504850632:AAEcH7THTh_otXANY-QXD5oA4Wk9iuhUvzQ';
const TELEGRAM_CHAT_ID = '-1003478532969';

export interface OrderDetails {
  orderId: string;
  orderTimestamp: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  city: string;
  pinCode: string;
  paymentStatus: string;
  totalAmount: number;
  orderItems: CartItem[];
}

export const formatTelegramMessage = (order: OrderDetails): string => {
  let message = `🛒 *New Order Received – Quro Farms*\n\n`;
  message += `*Order ID:* ${order.orderId}\n`;
  message += `*Time:* ${order.orderTimestamp}\n\n`;
  
  message += `*Customer:*\n`;
  message += `Name: ${order.customerName}\n`;
  message += `Phone: ${order.customerPhone}\n`;
  message += `Email: ${order.customerEmail}\n\n`;
  
  message += `*Address:*\n`;
  message += `${order.deliveryAddress}\n`;
  message += `${order.city} – ${order.pinCode}\n\n`;
  
  message += `*Order Items:*\n`;
  order.orderItems.forEach(item => {
    const subtotal = (item.product.discountedPrice * item.quantity).toFixed(2);
    message += `• ${item.product.name} × ${item.quantity} – ₹${subtotal}\n`;
  });
  
  message += `\n*Total Amount:* ₹${order.totalAmount.toFixed(2)}\n`;
  message += `*Payment:* ${order.paymentStatus}\n\n`;
  message += `⚠️ Courier charges applicable\n`;
  message += `📦 Please acknowledge and process the order`;
  
  return message;
};

export const sendTelegramNotification = async (order: OrderDetails): Promise<boolean> => {
  const botToken = TELEGRAM_BOT_TOKEN;
  const chatId = TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured');
    return false;
  }
  
  const message = formatTelegramMessage(order);
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      console.error('Telegram API error:', data.description);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
};
