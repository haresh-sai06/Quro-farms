import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Phone, Home, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CartDropdown from "./CartDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Different nav links based on current page
  const isProductsPage =
    location.pathname === "/products" ||
    location.pathname.startsWith("/product/");

  const defaultNavLinks = [
    { name: "Why Choose Us", href: "/#features" },
    { name: "Products", href: "/products" },
    { name: "Reviews", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ];

  const navLinks = defaultNavLinks;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMenuOpen
          ? "bg-white shadow-lg"
          : "bg-white/10 backdrop-blur-md border-b border-green-100/50 shadow-sm"
      }`}
      style={{
        backgroundImage: !isMenuOpen
          ? `linear-gradient(rgba(0, 128, 0, 0.3), rgba(0, 128, 0, 0.3)), url('https://images.unsplash.com/photo-1500595046743-4c3542c2a7f5')`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <nav className="container-padding mx-auto flex h-20 items-center justify-between">
        {/* Animated Logo */}
        <motion.a
          href="/"
          className={`flex items-center gap-3 text-2xl font-bold transition-colors duration-300 ${
            isMenuOpen ? "text-green-700" : "text-primary"
          }`}
          whileHover={{ scale: 1.05 }}
          onClick={closeMenu}
        >
          <motion.div
            className="bg-green-600 p-2 rounded-xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Leaf className="w-6 h-6 text-white" />
          </motion.div>
          <span className={isMenuOpen ? "text-green-700" : "text-green-700"}>
            Quro Farms
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isProductsPage ? (
            // Products page navigation - just home icon
            <>
              <motion.a
                href="/"
                className="text-neutral-100 hover:text-green-300 transition-colors font-medium flex items-center gap-2"
                whileHover={{ y: -2, color: "#86efac" }}
                transition={{ duration: 0.2 }}
              >
                <Home className="w-5 h-5" />
                Home
              </motion.a>
            </>
          ) : (
            // Default navigation
            navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-neutral-100 hover:text-green-300 transition-colors font-medium"
                whileHover={{ y: -2, color: "#86efac" }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
              </motion.a>
            ))
          )}

          <div className="flex items-center gap-4">
            {/* Shopping Cart Dropdown - Desktop */}
            <div data-cart-icon className="relative">
              <CartDropdown />
            </div>

            {/* Order Now Button */}
            <motion.button
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-semibold flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0, 128, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              <Link to="/order">Order Now</Link>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation - Right side with Cart and Menu */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Shopping Cart Icon */}
          <motion.button
            className="relative flex items-center justify-center text-neutral-100 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {/* Cart count badge */}
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isMenuOpen ? "text-green-700 bg-green-50" : "text-neutral-100"
            }`}
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu with Smooth Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-green-100 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="container-padding py-6 space-y-4">
              {isProductsPage ? (
                <motion.a
                  href="/"
                  className="block text-green-700 hover:text-green-600 transition-colors font-medium py-3 flex items-center gap-2 border-b border-green-100 last:border-b-0"
                  onClick={closeMenu}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <Home className="w-5 h-5" />
                  Home
                </motion.a>
              ) : (
                navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-green-700 hover:text-green-600 transition-colors font-medium py-3 border-b border-green-100 last:border-b-0"
                    onClick={closeMenu}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                ))
              )}

              {/* Mobile Order Button */}
              <motion.button
                className="w-full bg-green-600 text-white px-6 py-4 rounded-full hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                onClick={closeMenu}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" />
                <Link to="/order">Order Now</Link>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/20 z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
