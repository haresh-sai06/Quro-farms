
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FlyToCartAnimation from "./FlyToCartAnimation";


const ProductPreview = () => {
  const { addToCart } = useCart();
  const [flyAnimation, setFlyAnimation] = useState<{
    isActive: boolean;
    startPosition: { x: number; y: number };
  }>({
    isActive: false,
    startPosition: { x: 0, y: 0 }
  });

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const startPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };

    const success = addToCart(product, 1);
    if (success) {
      setFlyAnimation({
        isActive: true,
        startPosition
      });
      toast.success(`Added ${product.name} to cart!`);
    }
  };

  return (
    <section className="py-20 container-padding bg-white">
      <FlyToCartAnimation
        isActive={flyAnimation.isActive}
        startPosition={flyAnimation.startPosition}
        onComplete={() => setFlyAnimation(prev => ({ ...prev, isActive: false }))}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            <span className="text-green-600">Featured</span> Products
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Handpicked selection of our finest produce, delivered fresh from our partner farms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.slice(0, 4).map((product, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-100 hover:-translate-y-3"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </span>
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-primary group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-3 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                  </div>
                  <span className="text-neutral-500 text-sm">({product.reviews} reviews)</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-green-600">₹{product.discountedPrice}/{product.unit}</span>
                  <span className="text-neutral-500 line-through text-lg">₹{product.originalPrice}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.inStock}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    whileHover={product.inStock ? { scale: 1.02 } : {}}
                    whileTap={product.inStock ? { scale: 0.98 } : {}}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </motion.button>
                  <Link to={`/product/${product.id}`}>
                    <motion.button
                      className="px-4 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Products CTA */}
        <div className="text-center">
          <Link to="/products">
            <button className="bg-amber-500 text-white px-12 py-4 rounded-full hover:bg-amber-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="text-neutral-600 mt-4">Over 200+ farm-fresh products available</p>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
