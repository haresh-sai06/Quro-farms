import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, Heart, Share2, Award, Leaf, Truck, Shield, User, MapPin, Clock, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import Header from "../components/Header";
import { toast } from "sonner";
import FlyToCartAnimation from "../components/FlyToCartAnimation";

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StickyAddToCart: React.FC<{ product: any; quantity: number; setQuantity: (q: number) => void; onAddToCart: () => void }> = ({ product, quantity, setQuantity, onAddToCart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-green-100 shadow-2xl"
    >
      <div className="container-padding py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-primary text-sm sm:text-base">{product.name}</h3>
              <p className="text-green-600 font-bold text-xs sm:text-base">₹{product.discountedPrice}/{product.unit}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 border border-neutral-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 sm:p-2 hover:bg-neutral-50 transition-colors"
              >
                <Minus className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
              <span className="px-2 sm:px-4 py-1 sm:py-2 font-semibold text-xs sm:text-base">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 sm:p-2 hover:bg-neutral-50 transition-colors"
              >
                <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
            </div>
            
            <motion.button
              onClick={onAddToCart}
              disabled={!product.inStock}
              className="bg-green-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-base hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [flyAnimation, setFlyAnimation] = useState<{
    isActive: boolean;
    startPosition: { x: number; y: number };
  }>({
    isActive: false,
    startPosition: { x: 0, y: 0 }
  });
  const { scrollYProgress } = useScroll();
  
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="pt-24 sm:pt-32 pb-20 container-padding text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product not found</h1>
          <Link to="/products" className="text-green-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (event?: React.MouseEvent) => {
    if (!product.inStock) {
      toast.error('This product is currently out of stock');
      return;
    }

    let startPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    if (event) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      startPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    const success = addToCart(product, quantity);
    if (success) {
      setFlyAnimation({
        isActive: true,
        startPosition
      });
      toast.success(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
    }
  };

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        
        <FlyToCartAnimation
          isActive={flyAnimation.isActive}
          startPosition={flyAnimation.startPosition}
          onComplete={() => setFlyAnimation(prev => ({ ...prev, isActive: false }))}
        />
        
        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
  <Parallax speed={-20} className="absolute inset-0">
    <motion.div
      style={{ 
        y, 
        opacity,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url(${product.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        transform: 'scale(1)' // normal scale
      }}
      className="w-full h-full"
    />
  </Parallax>
  
  {/* Floating Elements */}
  <motion.div
    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-16 sm:top-20 right-4 sm:right-20 w-12 sm:w-16 h-12 sm:h-16 bg-green-400/20 rounded-full backdrop-blur-sm"
  />
  
  <motion.div
    animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    className="absolute bottom-32 sm:bottom-40 left-4 sm:left-16 w-10 sm:w-12 h-10 sm:h-12 bg-amber-400/20 rounded-full backdrop-blur-sm"
  />

  {/* Back to Products */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="absolute top-24 sm:top-24 left-4 sm:left-10 z-30"
  >
    <Link
      to="/products"
      className="inline-flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
      <span className="text-xs sm:text-base">Back to Products</span>
    </Link>
  </motion.div>

  {/* Hero Content (inside glass card) */}
  <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-4">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-12 shadow-lg max-w-xs sm:max-w-4xl text-center text-white z-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="text-3xl sm:text-6xl md:text-8xl font-bold mb-3 sm:mb-6 text-shadow-lg"
      >
        {product.name}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="text-base sm:text-2xl md:text-3xl mb-4 sm:mb-8 text-shadow"
      >
        {product.description}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap"
      >
        <div className="text-center">
          <div className="text-2xl sm:text-4xl font-bold text-green-300">₹{product.discountedPrice}</div>
          <div className="text-sm sm:text-lg text-white/80">per {product.unit}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center">
            <Star className="w-4 sm:w-6 h-4 sm:h-6 text-amber-400 fill-current" />
            <span className="text-lg sm:text-2xl font-bold">{product.rating}</span>
          </div>
          <div className="text-white/80 text-xs sm:text-base">({product.reviews} reviews)</div>
        </div>
        
        {!product.inStock && (
          <div className="text-center">
            <div className="bg-red-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base">
              Out of Stock
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white"
  >
    <div className="flex flex-col items-center">
      <span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</span>
      <div className="w-4 sm:w-6 h-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
        <div className="w-1 sm:w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2"></div>
      </div>
    </div>
  </motion.div>
</section>


        {/* Main Content */}
        <div className="relative bg-white">
          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-green-600 z-50 origin-left"
            style={{ scaleX: scrollYProgress }}
          />

          <div className="max-w-6xl mx-auto container-padding pt-20 sm:pt-24 pb-16 sm:pb-20">
            
            {/* Product Overview */}
            <AnimatedSection className="mb-12 sm:mb-20">
              <div className="grid gap-6 sm:gap-12 items-center">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-96 object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                    />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <span className="bg-amber-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-base">
                        {product.badge}
                      </span>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 rounded-2xl sm:rounded-3xl flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-xl">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Star className="w-4 sm:w-6 h-4 sm:h-6 text-amber-400 fill-current" />
                      <span className="text-lg sm:text-2xl font-bold">{product.rating}</span>
                    </div>
                    <span className="text-neutral-600 text-sm sm:text-base">({product.reviews} reviews)</span>
                    <div className="flex gap-1 sm:gap-2 ml-auto">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 sm:p-3 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors"
                      >
                        <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-600" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 sm:p-3 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors"
                      >
                        <Share2 className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-600" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-4">
                      <span className="text-2xl sm:text-4xl font-bold text-green-600">₹{product.discountedPrice}</span>
                      <span className="text-lg sm:text-2xl text-neutral-400 line-through">₹{product.originalPrice}</span>
                      <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 sm:py-1 rounded-full font-semibold text-xs sm:text-base">
                        {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm sm:text-lg">per {product.unit}</p>
                  </div>

                  {product.inStock && (
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                      <span className="font-semibold text-sm sm:text-lg">Quantity:</span>
                      <div className="flex items-center gap-1 sm:gap-2 border-2 border-neutral-200 rounded-xl">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-1 sm:p-3 hover:bg-neutral-50 transition-colors"
                        >
                          <Minus className="w-3 sm:w-5 h-3 sm:h-5" />
                        </button>
                        <span className="px-2 sm:px-6 py-1 sm:py-3 font-bold text-base sm:text-xl">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-1 sm:p-3 hover:bg-neutral-50 transition-colors"
                        >
                          <Plus className="w-3 sm:w-5 h-3 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  <motion.button
                    onClick={handleAddToCart}
                    className="w-full bg-green-600 text-white py-2 sm:py-4 rounded-xl font-bold text-base sm:text-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-green-700 transition-colors shadow-lg"
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-4 sm:w-6 h-4 sm:h-6" />
                    Add to Cart - ₹{(product.discountedPrice * quantity).toFixed(2)}
                  </motion.button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-6 bg-green-50 rounded-2xl">
                    <div className="text-center">
                      <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                      <p className="font-semibold text-sm sm:text-base">100% Natural</p>
                    </div>
                    <div className="text-center">
                      <Truck className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                      <p className="font-semibold text-sm sm:text-base">Fresh Delivery</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                      <p className="font-semibold text-sm sm:text-base">Freshly Harvested</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Features Section */}
            <AnimatedSection delay={0.2} className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-6 sm:mb-12 text-center">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-6 rounded-2xl text-center shadow-lg"
                  >
                    <Sparkles className="w-5 sm:w-8 h-5 sm:h-8 text-green-600 mx-auto mb-2 sm:mb-4" />
                    <p className="font-semibold text-primary text-sm sm:text-base">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Processing Journey */}
            <AnimatedSection delay={0.3} className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-6 sm:mb-12 text-center">Processing Journey</h2>
              <div className="space-y-4 sm:space-y-8">
                {product.processingJourney.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center gap-2 sm:gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 sm:w-16 h-10 sm:h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-base sm:text-xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-white p-2 sm:p-6 rounded-2xl shadow-lg">
                      <p className="text-sm sm:text-lg text-neutral-700">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Why Choose Our Farm */}
            <AnimatedSection delay={0.4} className="mb-12 sm:mb-20">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-12 rounded-2xl sm:rounded-3xl">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center">Why Choose Our Farm</h2>
                <p className="text-base sm:text-xl leading-relaxed text-center max-w-xs sm:max-w-4xl mx-auto">
                  {product.whyChooseOurFarm}
                </p>
              </div>
            </AnimatedSection>

            {/* Unique Selling Points */}
            <AnimatedSection delay={0.5} className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-6 sm:mb-12 text-center">What Makes Us Special</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                {product.uniqueSellingPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-2 sm:gap-4 bg-white p-2 sm:p-6 rounded-2xl shadow-lg border-l-4 border-green-600"
                  >
                    <Leaf className="w-5 sm:w-8 h-5 sm:h-8 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-sm sm:text-lg text-neutral-700">{point}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Seasonal Availability & Storage */}
            <AnimatedSection delay={0.6} className="mb-12 sm:mb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12">
                <div className="bg-amber-50 p-4 sm:p-8 rounded-2xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                    <Clock className="w-5 sm:w-8 h-5 sm:h-8 text-amber-600" />
                    <h3 className="text-xl sm:text-2xl font-bold text-primary">Seasonal Availability</h3>
                  </div>
                  <p className="text-sm sm:text-lg text-neutral-700">{product.seasonalAvailability}</p>
                </div>
                <div className="bg-blue-50 p-4 sm:p-8 rounded-2xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                    <Shield className="w-5 sm:w-8 h-5 sm:h-8 text-blue-600" />
                    <h3 className="text-xl sm:text-2xl font-bold text-primary">Storage Instructions</h3>
                  </div>
                  <p className="text-sm sm:text-lg text-neutral-700">{product.storageInstructions}</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Health Benefits */}
            <AnimatedSection delay={0.7} className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-6 sm:mb-12 text-center">Health Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
                {product.healthBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-red-50 p-2 sm:p-6 rounded-2xl text-center shadow-lg"
                  >
                    <Heart className="w-5 sm:w-8 h-5 sm:h-8 text-red-500 mx-auto mb-1 sm:mb-4" />
                    <p className="font-semibold text-primary text-sm sm:text-base">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Recipe Ideas */}
            <AnimatedSection delay={0.8} className="mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-6 sm:mb-12 text-center">Recipe Ideas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
                {product.recipeIdeas.map((recipe, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                    className="bg-white p-2 sm:p-8 rounded-2xl shadow-lg border border-neutral-200"
                  >
                    <h4 className="text-base sm:text-xl font-bold text-primary mb-2 sm:mb-4">{recipe}</h4>
                    <p className="text-neutral-600 text-sm sm:text-base">Perfect for showcasing the natural flavors of our {product.name.toLowerCase()}.</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Sustainability Impact */}
            <AnimatedSection delay={0.9} className="mb-12 sm:mb-20">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 sm:p-12 rounded-2xl sm:rounded-3xl">
                <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4 sm:mb-8 text-center">Sustainability Impact</h2>
                <p className="text-base sm:text-xl text-center text-neutral-700 mb-4 sm:mb-12 max-w-xs sm:max-w-4xl mx-auto">
                  {product.sustainabilityImpact}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
                  {product.ecoFriendlyPractices.map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm p-2 sm:p-6 rounded-2xl text-center shadow-lg"
                    >
                      <Leaf className="w-5 sm:w-8 h-5 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-4" />
                      <p className="font-semibold text-primary text-sm sm:text-base">{practice}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Product Story */}
            <AnimatedSection delay={1.1} className="mb-12 sm:mb-20">
              <div className="bg-purple-50 p-4 sm:p-12 rounded-2xl sm:rounded-3xl">
                <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4 sm:mb-8 text-center">Our Product Story</h2>
                <p className="text-base sm:text-xl text-center text-neutral-700 max-w-xs sm:max-w-4xl mx-auto leading-relaxed">
                  {product.productStory}
                </p>
              </div>
            </AnimatedSection>

            {/* Customer Spotlight */}
            <AnimatedSection delay={1.2} className="mb-12 sm:mb-20">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-12 rounded-2xl sm:rounded-3xl text-center">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8">Customer Spotlight</h2>
                <blockquote className="text-base sm:text-2xl italic mb-4 sm:mb-8 max-w-xs sm:max-w-4xl mx-auto leading-relaxed">
                  {product.customerSpotlight}
                </blockquote>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 sm:w-8 h-4 sm:h-8 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Limited Edition Appeal */}
            {product.limitedEditionAppeal && (
              <AnimatedSection delay={1.3} className="mb-12 sm:mb-20">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4 sm:p-12 rounded-2xl sm:rounded-3xl text-center shadow-2xl"
                >
                  <Sparkles className="w-10 sm:w-16 h-10 sm:h-16 mx-auto mb-2 sm:mb-6" />
                  <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-6">Limited Edition</h2>
                  <p className="text-base sm:text-xl max-w-xs sm:max-w-3xl mx-auto leading-relaxed">
                    {product.limitedEditionAppeal}
                  </p>
                </motion.div>
              </AnimatedSection>
            )}

            {/* Farm to Table Image */}
            <AnimatedSection delay={1.4} className="mb-12 sm:mb-20">
              <div className="relative">
                <Parallax speed={-10}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={product.farmToTableImage}
                    alt="Farm to table journey"
                    className="w-full h-48 sm:h-96 object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-black/30 rounded-2xl sm:rounded-3xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">From Our Farm to Your Table</h3>
                    <p className="text-base sm:text-xl">Experience the journey of freshness</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>

        {/* Sticky Add to Cart */}
        <StickyAddToCart
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </div>
    </ParallaxProvider>
  );
};

export default ProductDetail;