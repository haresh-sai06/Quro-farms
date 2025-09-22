import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Home } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CartDropdown from "./CartDropdown";
import LogoImage from "../../public/components/image.png"; // Assuming image.png is directly in public

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isProductsPage =
    location.pathname === "/products" ||
    location.pathname.startsWith("/product/");

  const navLinks = [
    { name: "Why Choose Us", href: "/#features" },
    { name: "Products", href: "/products" },
    { name: "Reviews", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMenuOpen
          ? "bg-white shadow-lg"
          : "bg-white/10 backdrop-blur-md border-b border-yellow-100/50 shadow-sm"
      }`}
      style={{
        backgroundImage: !isMenuOpen
          ? `linear-gradient(rgba(246, 205, 92, 0.6), rgba(246, 205, 92, 0.7)), url('https://images.unsplash.com/photo-1500595046743-4c3542c2a7f5')`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <nav className="container-padding mx-auto flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-black"
        >
          <motion.div
            className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center p-1"
            style={{ backgroundColor: "#f6cd5c" }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={LogoImage}
              alt="Quro Farms Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isProductsPage ? (
            <motion.div
              whileHover={{ y: -2, color: "#f6cd5c" }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/"
                className="text-black hover:text-yellow-300 transition-colors font-medium flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
            </motion.div>
          ) : (
            navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2, color: "#f6cd5c" }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={link.href}
                  className="text-black hover:text-yellow-300 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))
          )}

          <div className="flex items-center gap-4">
            <div data-cart-icon>
              <CartDropdown />
            </div>

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(246, 205, 92, 1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/order"
                className="bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors font-semibold flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Order Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-yellow-100/50 shadow-lg"
            style={{
              backgroundImage: `linear-gradient(rgba(246, 205, 92, 0.4), rgba(246, 205, 92, 0.4)), url('https://images.unsplash.com/photo-1500595046743-4c3542c2a7f5')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container-padding py-6 flex flex-col gap-4">
              {isProductsPage ? (
                <Link
                  to="/"
                  className="text-black hover:text-yellow-300 transition-colors font-medium py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
              ) : (
                navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-black hover:text-yellow-300 transition-colors font-medium py-2 flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))
              )}
              <div className="flex gap-4 pt-4 border-t border-yellow-100/50">
                <Link
                  to="/order"
                  className="flex-1 bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors font-semibold text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
