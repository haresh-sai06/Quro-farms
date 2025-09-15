Quro Farms E-Commerce:
Welcome to the Quro Farms E-Commerce repository! This project is a web application built to sell natural farm products, featuring a shopping cart, order management, and WhatsApp integration for order placement.

Table of Contents:
-> Overview
-> Features
-> Tech Stack
-> Installation
-> Usage
-> License
-> Contact

Overview: 
Quro Farms is an online platform designed to deliver fresh, natural products directly from farms to customers' doorsteps. The application allows users to browse products, add them to a cart, and place orders via WhatsApp for a seamless shopping experience.

Features:
Product Browsing: View a catalog of natural farm products.
Shopping Cart: Add, update, or remove items with quantity controls.
Order Summary: Review cart items on the Order Now page.
Customer Details: Input name, email, address, city, and PIN code for delivery.
WhatsApp Integration: Send order details directly to a WhatsApp number.
Local Storage: Persist cart data across sessions.
Responsive Design: Optimized for both mobile and desktop views.

Tech Stack:
Frontend: React, TypeScript, Framer Motion, Tailwind CSS
State Management: Custom hooks (e.g., useCart)
Libraries: Lucide React (icons), Sonner (toasts)
APIs: WhatsApp API for order messaging
Build Tools: Vite (assumed based on HMR context)

Installation:
Clone the Repository
git clone https://github.com/your-username/quro-farms.git
cd quro-farms


Install Dependencies:
npm install
# or
yarn install


Set Up Environment Variables:
Create a .env file in the root directory.
Add the WhatsApp phone number (e.g., WHATSAPP_PHONE_NUMBER=919xxxxxxxxx).


Run the Application:
npm run dev
# or
yarn dev
Open http://localhost:5173 (or the port specified by Vite) in your browser.


Usage:
Browse Products: Navigate to the products page to explore available items.
Add to Cart: Click "Add to Cart" on product cards to save items.
Order Now: Go to the "Order Now" page to review your cart, fill in delivery details, and send the order via WhatsApp.
Cart Persistence: Cart items are saved locally and reloaded on page refresh.


License:
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or support, please open an issue or reach out to:

Email: shareshsainaath@gmail.com
GitHub: haresh-sai06
