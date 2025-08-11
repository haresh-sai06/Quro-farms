import { motion } from "framer-motion";
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, Heart, Share2, Award, Leaf, Truck, Shield } from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import Header from "../components/Header";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="pt-32 pb-20 container-padding text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product not found</h1>
          <Link to="/products" className="text-green-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'journey', label: 'Farm Journey' },
    { id: 'health', label: 'Health & Nutrition' },
    { id: 'recipes', label: 'Recipes & Usage' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'story', label: 'Our Story' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <section className="pt-32 pb-20 container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>
          </motion.div>

          {/* Product Header */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.badge}
                  </span>
                </div>
              </div>
              
              {/* Farm to Table Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <img
                  src={product.farmToTableImage}
                  alt="Farm to table"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <p className="text-center text-sm text-neutral-600 mt-2">From our farm to your table</p>
              </motion.div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
              <p className="text-xl text-neutral-600 mb-6">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-bold text-lg">{product.rating}</span>
                  </div>
                  <span className="text-neutral-500">({product.reviews} reviews)</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors">
                    <Heart className="w-5 h-5 text-neutral-600" />
                  </button>
                  <button className="p-2 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors">
                    <Share2 className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-green-600">₹{product.discountedPrice}</span>
                  <span className="text-xl text-neutral-400 line-through">₹{product.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <p className="text-neutral-600">per {product.unit}</p>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center gap-2 border border-neutral-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-neutral-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-neutral-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ₹{(product.discountedPrice * quantity).toFixed(2)}
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded-xl">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold">100% Organic</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold">Fresh Delivery</p>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold">Certified Quality</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-neutral-600 hover:text-green-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Why Choose Our Farm</h3>
                    <p className="text-neutral-700 leading-relaxed">{product.whyChooseOurFarm}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Unique Selling Points</h3>
                    <ul className="space-y-2">
                      {product.uniqueSellingPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Seasonal Availability</h3>
                    <p className="text-neutral-700">{product.seasonalAvailability}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Storage Instructions</h3>
                    <p className="text-neutral-700">{product.storageInstructions}</p>
                  </div>
                </div>
              )}

              {activeTab === 'journey' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-6">Processing Journey</h3>
                    <div className="space-y-4">
                      {product.processingJourney.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-neutral-700 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Farmer Story</h3>
                    <p className="text-neutral-700 leading-relaxed">{product.farmerStory}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Product Story</h3>
                    <p className="text-neutral-700 leading-relaxed">{product.productStory}</p>
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-6">Health Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.healthBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                          <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Pairing Suggestions</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.pairingSuggestions.map((pairing, index) => (
                        <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                          {pairing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Customer Use Cases</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {product.customerUseCases.map((useCase, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'recipes' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-6">Recipe Ideas</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {product.recipeIdeas.map((recipe, index) => (
                        <div key={index} className="p-4 border border-neutral-200 rounded-xl hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-lg text-primary mb-2">{recipe}</h4>
                          <p className="text-neutral-600 text-sm">Perfect for showcasing the natural flavors of our {product.name.toLowerCase()}.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sustainability' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Sustainability Impact</h3>
                    <p className="text-neutral-700 leading-relaxed mb-6">{product.sustainabilityImpact}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Eco-Friendly Practices</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {product.ecoFriendlyPractices.map((practice, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                          <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Certifications</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full">
                          <Award className="w-4 h-4" />
                          <span className="font-semibold text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Customer Spotlight</h3>
                    <blockquote className="text-xl italic text-neutral-700 border-l-4 border-green-600 pl-6 py-4 bg-green-50 rounded-r-lg">
                      {product.customerSpotlight}
                    </blockquote>
                  </div>

                  {product.limitedEditionAppeal && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-amber-800 mb-2">Limited Edition</h3>
                      <p className="text-amber-700">{product.limitedEditionAppeal}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;