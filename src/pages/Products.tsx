import { motion } from "framer-motion";
import { ArrowRight, Star, Search, ShoppingCart, Plus, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import FlyToCartAnimation from "../components/FlyToCartAnimation";
import { sendProductInquiry } from "../utils/whatsapp";


const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  const [flyAnimation, setFlyAnimation] = useState<{
    isActive: boolean;
    startPosition: { x: number; y: number };
  }>({
    isActive: false,
    startPosition: { x: 0, y: 0 }
  });
  const categories = ["All", "Oils", "Powders"];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory)
  );

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <FlyToCartAnimation
        isActive={flyAnimation.isActive}
        startPosition={flyAnimation.startPosition}
        onComplete={() => setFlyAnimation(prev => ({ ...prev, isActive: false }))}
      />
      
      <section className="pt-32 pb-20 container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6">
              Our <span className="text-amber-500">Farm-Fresh</span> Products
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover our wide range of organic produce, handpicked daily from trusted local farms.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-green-600 text-white"
                      : "bg-white border border-neutral-200 text-neutral-600 hover:bg-green-50"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-neutral-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
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
                </div>
                <div className="p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg text-green-800 group-hover:text-amber-500 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-neutral-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="font-semibold text-sm">{product.rating}</span>
                    </div>
                    <span className="text-neutral-500 text-sm">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-green-600">₹{product.discountedPrice}/{product.unit}</span>
                    <span className="text-neutral-400 line-through">₹{product.originalPrice}</span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!product.inStock}
                      className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed mb-2"
                      whileHover={product.inStock ? { scale: 1.03 } : {}}
                      whileTap={product.inStock ? { scale: 0.98 } : {}}
                    >
                      {product.inStock ? (
                        <>
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </>
                      ) : (
                        'Out of Stock'
                      )}
                    </motion.button>
                    <Link to={`/product/${product.id}`}>
                      <motion.button
                        className="px-4 py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all mb-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-neutral-600">No products found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;