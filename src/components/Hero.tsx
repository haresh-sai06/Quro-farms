import { motion, useAnimation, Variants } from "framer-motion";
import { ArrowRight, Leaf, Play, Star, Heart, Shield, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import gsap from "gsap";
import farmerImage from "/components/picture.jpeg";
import farmImage from "/components/bg_img.jpg";
import product1 from "/components/pic5.jpeg";
import product2 from "/components/pic6.jpeg";
import product3 from "/components/pic7.jpeg";

const Hero = () => {
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.1 });
  const animationControls = useAnimation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const headlineWordVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 120 },
    },
  };

  useEffect(() => {
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "sine.inOut",
      });
    }
    if (isSectionInView) animationControls.start("visible");
  }, [animationControls, isSectionInView]);

  const headlineWords = [
    "From",
    "Our",
    "Farms",
    "To",
    "Your",
    "Home",
  ];

  const heroFeatures = [
    { icon: <Heart className="w-5 h-5" />, text: "Crafted with Care" },
    { icon: <Shield className="w-5 h-5" />, text: "Consistent Trusted Quality" },
    { icon: <Leaf className="w-5 h-5" />, text: "Single Sourced" },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen container-padding text-primary overflow-hidden relative bg-center bg-cover flex items-center w-full pt-24 sm:pt-16 lg:pt-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('${farmImage}')`,
      }}
      initial="hidden"
      animate={animationControls}
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative w-full max-w-2xl sm:max-w-4xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button 
              className="absolute -top-10 sm:-top-12 right-0 text-white text-2xl sm:text-3xl z-10 hover:text-yellow-300 transition-colors"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close video modal"
            >
              &times;
            </button>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-yellow-900 to-yellow-700">
                <div className="text-center">
                  <Play className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2 sm:mb-4" />
                  <p className="text-lg sm:text-xl font-semibold">Farm Tour Video</p>
                  <p className="text-sm">See how we grow our products</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto relative z-10 px-4 py-6 gap-6">
        {/* Mobile View: Vertical Stack */}
        <div className="flex flex-col items-center sm:hidden">
          <div className="text-center mb-6">
            <motion.div
              className="max-w-xs mx-auto mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 className="text-2xl font-bold leading-tight font-poppins flex flex-wrap justify-center gap-1">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={word + i}
                    className="inline-block text-white text-shadow-lg drop-shadow-2xl"
                    variants={headlineWordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-base text-white/90 mb-4 max-w-xs leading-relaxed text-shadow mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Experience pure, natural products made in our farms and thoughtfully processed for your everyday use.
            </motion.p>

            <div className="flex justify-center w-full"> {/* Centers the feature list */}
<motion.div 
  className="flex flex-row gap-3 mb-4 justify-start items-center w-full"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7 }}
>
  {heroFeatures.map((feature, i) => (
    <div 
      key={feature.text + i} 
      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap"
    >
      <span className="text-yellow-400">{feature.icon}</span>
      <span className="text-white text-sm">{feature.text}</span>
    </div>
  ))}
</motion.div>


            </div>

            <div className="flex flex-col items-center justify-center w-full py-3"> {/* Reduced py-6 to py-3 */}
              <div className="flex flex-col gap-3 mb-2 w-fit md:w-1/2 lg:w-1/3"> {/* Reduced mb-6 to mb-2 */}
                <motion.button
                  className="btn-custom-color text-black px-6 py-3 rounded-full flex items-center gap-2 text-base font-semibold shadow-xl hover:bg-yellow-700 transition-colors relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-white/20 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></span>
                  <Link to="/products" className="flex items-center gap-2 relative z-10">
                    Shop Now
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.button>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-2"> {/* Reduced gap-6 to gap-2 */}
            <motion.div 
              className="relative z-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={farmerImage}
                  alt="Our Farmer"
                  className="w-[300px] h-[200px] object-cover rounded-2xl shadow-2xl border-4 border-white/30"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-10 left-0 right-0 mx-auto bg-white/90 backdrop-blur-sm text-yellow-800 px-1 py-2 rounded-full text-center shadow-lg w-1/2"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm font-semibold">Quro Farms – Our Authentic Products</p>
                <p className="text-xs">🌿 Farm Fresh</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Desktop View: Side-by-Side Layout */}
        <div className="hidden sm:flex sm:flex-row justify-between items-center w-full gap-16">
          <div className="w-1/2 text-center pr-4">
            <motion.div
              className="max-w-md mx-auto mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 className="text-3xl lg:text-5xl font-bold leading-tight font-poppins flex flex-wrap justify-center gap-2">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={word + i}
                    className="inline-block text-white text-shadow-lg drop-shadow-2xl"
                    variants={headlineWordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-lg lg:text-xl text-white/90 mb-4 max-w-md leading-relaxed text-shadow mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Experience pure, natural products made in our farms and thoughtfully processed for your everyday use.
            </motion.p>

<motion.div 
  className="flex flex-row gap-3 mb-4 justify-start items-center w-full"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7 }}
>
  {heroFeatures.map((feature, i) => (
    <div 
      key={feature.text + i} 
      className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap"
    >
      <span className="text-yellow-400">{feature.icon}</span>
      <span className="text-white text-sm">{feature.text}</span>
    </div>
  ))}
</motion.div>



            <div className="flex flex-row gap-2 mb-2 py-4"> {/* Reduced py-10 to py-4, mb-6 to mb-2 */}
              <motion.button
                className="btn-custom-color text-black px-6 py-3 rounded-full flex items-center gap-2 text-base font-semibold shadow-xl hover:bg-yellow-700 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-white/20 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></span>
                <Link to="/products" className="flex items-center gap-2 relative z-10">
                  Shop Now
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.button>
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-center gap-6"> {/* Reduced gap-6 to gap-2 */}
            <motion.div 
              className="relative z-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={farmerImage}
                  alt="Our Farmer"
                  className="w-[500px] h-[320px] object-cover rounded-2xl shadow-2xl border-4 border-white/30"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 left-0 right-0 mx-auto bg-white/90 backdrop-blur-sm text-yellow-800 px-4 py-2 rounded-full text-center shadow-lg w-2/3"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm font-semibold">Quro Farms – Our Authentic Products</p>
                <p className="text-xs">🌿 Farm Fresh | Preservative-Free</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs sm:text-sm mb-1">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 rotate-90" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;