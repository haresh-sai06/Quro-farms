import { Leaf, Users, Package, Droplet } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useParams } from "react-router-dom";

import OilPicture from "/components/oil.webp";
import PowderPicture from "/components/pic7.jpeg";
import { products } from "../data/products";

const productCategories = [
  {
    title: "Farm-Fresh Products",
    count: "6",
    color: "text-yellow-600",
    bgGradient: "from-yellow-100 to-yellow-50",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
  },
  {
    title: "Average Rating",
    count: "4.7/5",
    color: "text-orange-600",
    bgGradient: "from-orange-100 to-orange-50",
    image: PowderPicture,
  },
  {
    title: "Repeated Purchase rate",
    count: "91%",
    color: "text-yellow-600",
    bgGradient: "from-yellow-100 to-yellow-50",
    image: OilPicture,
  },
  {
    title: "Happy Customers",
    count: "5K+",
    color: "text-purple-600",
    bgGradient: "from-purple-100 to-purple-50",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
  },
];

// ANIMATED WRAPPER
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// MAIN COMPONENT
const Stats = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || {
    sustainabilityImpact: "",
    ecoFriendlyPractices: [],
  };

  return (
    <section className="py-4 container-padding bg-gradient-to-b from-yellow-50/50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* CATEGORY CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCategories.map((category) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.bgGradient} opacity-90`}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-56 flex flex-col justify-center items-center text-center gap-3">
                <div className="text-5xl font-bold mb-1 ${category.color}">
                  {category.count}
                </div>
                <h3 className="font-bold text-xl mb-2 text-primary py-4">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* SUSTAINABILITY SECTION */}
        <AnimatedSection delay={0.5} className="mt-28 mb-10">
          <div className="bg-gradient-to-r from-yellow-100 to-blue-100 p-8 sm:p-12 rounded-3xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-6 sm:mb-10 text-center">
              Sustainability Impact
            </h2>

            <p className="text-base sm:text-xl text-center text-neutral-700 mb-10 max-w-4xl mx-auto">
              {product.sustainabilityImpact || "We focus on sustainable and eco-friendly production methods."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {(product.ecoFriendlyPractices.length ? product.ecoFriendlyPractices : ['Regenerative Farming Techniques', 'Water-Consious Practices', 'Compost Fertilization (Zero Pesticides)', 'Biodiversity Friendly Cultivation']).map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg"
                >
                  <Leaf className="w-8 h-8 text-yellow-600 mx-auto mb-4" />
                  <p className="font-semibold text-primary">{practice}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default Stats;
