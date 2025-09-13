import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Twitter} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gradient-to-b from-green-900 to-green-800 text-white">
      <div className="container-padding py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-xl">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold">Quro Farms</span>
            </div>
            <p className="text-green-100 text-lg leading-relaxed mb-6 max-w-md">
              Bringing you 100% original, chemical-free farm products directly from organic farms across India to your doorstep.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-green-100">
                <Phone className="w-5 h-5 text-green-300" />
                <span>+91 75589 38256</span>
              </div>
              <div className="flex items-center gap-3 text-green-100">
                <Mail className="w-5 h-5 text-green-300" />
                <span>Qurofarms@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-green-100">
                <MapPin className="w-5 h-5 text-green-300" />
                <span>Delivering Pan India</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#products" className="text-green-100 hover:text-white transition-colors">Our Products</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Farming Process</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Delivery Info</a></li>
              <li><a href="#testimonials" className="text-green-100 hover:text-white transition-colors">Customer Reviews</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white">Customer Care</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Help & Support</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Bulk Orders</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-green-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Farm Fresh News</h3>
            <p className="text-green-100 mb-6">Get the latest updates on seasonal produce, special offers, and farming tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-primary bg-white border-0 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.instagram.com/qurofarms/" className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61552061092675&mibextid=ZbWKwL" className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://wa.me/919876543210?text=Hi%20I%20want%20to%20know%20more%20about%20your%20products" className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition-colors">
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-center text-green-200">
            <p className="mb-2">
              © 2025 Quro Farms. All rights reserved. | Made with ❤️ for healthy living
            </p>
            <p className="text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> • 
              <a href="#" className="hover:text-white transition-colors ml-2">Terms of Service</a> • 
              <a href="#" className="hover:text-white transition-colors ml-2">Freshly Harvested</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
