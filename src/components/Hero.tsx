import { motion, useAnimation, Variants } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Hero = () => {
  const badgeRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();

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

  const wordVariants: Variants = {
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

    if (inView) controls.start("visible");
  }, [controls, inView]);

  const animatedHeadline = [
    "Fresh",
    "Coconut",
    "Products",
    "From",
    "Paradise",
    "to",
    "Your",
    "Home",
  ];

  return (
    <motion.section
      ref={ref}
      className="min-h-[100vh] container-padding text-primary overflow-hidden relative bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')`,
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-10 pt-8 pt-24">
        <div className="md:w-1/2 text-left">
          <motion.div
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg border border-green-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Leaf className="w-4 h-4" />
            100% Natural Coconut Products
          </motion.div>

          <motion.h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight font-poppins flex flex-wrap gap-2">
            {animatedHeadline.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-white text-shadow-lg drop-shadow-2xl"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-lg leading-relaxed text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Experience the tropical goodness of fresh coconuts and coconut products, 
            sourced directly from pristine coconut groves and delivered to your doorstep.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <motion.button
              className="bg-green-600 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold shadow-xl hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products" className="flex items-center gap-3">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.button>
            <motion.button
              className="bg-white/90 backdrop-blur-sm text-green-700 px-8 py-4 rounded-full border-2 border-white/50 text-lg font-semibold hover:bg-white transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products">
                Explore Products
              </Link>
            </motion.button>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center relative">
          <motion.img
            src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&h=500&fit=crop"
            alt="Fresh Coconuts"
            className="w-[400px] h-[400px] object-cover rounded-full shadow-2xl border-8 border-white/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          />
          
          {/* Floating coconut elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-10 -right-10 w-20 h-20 opacity-30"
          >
            <img 
              src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=100&h=100&fit=crop" 
              alt="Coconut" 
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -bottom-5 -left-5 w-16 h-16 opacity-40"
          >
            <img 
              src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=80&h=80&fit=crop" 
              alt="Coconut" 
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;