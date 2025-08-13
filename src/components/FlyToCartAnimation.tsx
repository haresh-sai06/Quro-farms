import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

interface FlyToCartAnimationProps {
  isActive: boolean;
  startPosition: { x: number; y: number };
  onComplete: () => void;
}

const FlyToCartAnimation = ({ isActive, startPosition, onComplete }: FlyToCartAnimationProps) => {
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Get cart icon position
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      setCartPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{
            x: startPosition.x,
            y: startPosition.y,
            scale: 1,
            opacity: 1
          }}
          animate={{
            x: cartPosition.x,
            y: cartPosition.y,
            scale: 0.3,
            opacity: 0.8
          }}
          exit={{
            scale: 0,
            opacity: 0
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
          onAnimationComplete={onComplete}
          className="fixed z-50 pointer-events-none"
          style={{
            left: 0,
            top: 0
          }}
        >
          <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlyToCartAnimation;