import { motion, useAnimation, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Leaf, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Hero = () => {
  const badgeRef = useRef(null);
  const heroRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Scroll-based animations
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.8]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 100,
        duration: 0.8
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 2,
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

  const handleScrollToProducts = () => {
    const productsSection = document.getElementById('products-preview');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className="min-h-screen container-padding text-white overflow-hidden relative bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')`,
        y,
        opacity
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 opacity-20"
        variants={floatingVariants}
        animate="animate"
      >
        <img 
          src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=150&h=150&fit=crop" 
          alt="Floating coconut" 
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-16 w-24 h-24 opacity-30"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=120&h=120&fit=crop" 
          alt="Floating coconut" 
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-32 w-16 h-16 opacity-25"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 4 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=80&h=80&fit=crop" 
          alt="Floating coconut" 
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center relative z-10 pt-20">
        <div className="lg:w-1/2 text-left mb-12 lg:mb-0">
          <motion.div
            ref={badgeRef}
            className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl border border-green-200"
            variants={itemVariants}
          >
            <Leaf className="w-5 h-5" />
            100% Natural Farm Products
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight font-serif"
            variants={itemVariants}
          >
            <div className="flex flex-wrap gap-3">
              {animatedHeadline.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block text-white drop-shadow-2xl"
                  variants={{
                    hidden: { opacity: 0, y: 50, rotateX: -90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { 
                        delay: i * 0.1,
                        type: "spring",
                        damping: 15,
                        stiffness: 100
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: "#fbbf24",
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/95 mb-10 max-w-2xl leading-relaxed font-light"
            variants={itemVariants}
          >
            Experience the tropical goodness of fresh coconuts and coconut products, 
            sourced directly from pristine coconut groves and delivered to your doorstep.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 mb-16"
            variants={itemVariants}
          >
            <motion.button
              className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-full flex items-center gap-4 text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products" className="flex items-center gap-4">
                🛒 Shop Now
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Link>
            </motion.button>
            
            <motion.button
              className="group bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full border-2 border-white/30 text-lg font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-4"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToProducts}
            >
              <Play className="w-5 h-5" />
              Explore Products
            </motion.button>
          </motion.div>

          {/* Tropical Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 text-center"
            variants={itemVariants}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-amber-300">🌴 50+</div>
              <div className="text-sm text-white/80">Coconut Varieties</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-green-300">🥥 100%</div>
              <div className="text-sm text-white/80">Fresh & Natural</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-blue-300">🚚 24hrs</div>
              <div className="text-sm text-white/80">Farm to Home</div>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 flex justify-center relative">
          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&h=600&fit=crop"
              alt="Fresh Coconuts"
              className="w-[500px] h-[500px] object-cover rounded-full shadow-2xl border-8 border-white/30 backdrop-blur-sm"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Glowing effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-amber-400/20 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Floating tropical elements */}
          <motion.div
            className="absolute -top-10 -right-10 text-6xl"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🌺
          </motion.div>
          
          <motion.div
            className="absolute -bottom-5 -left-5 text-5xl"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🥥
          </motion.div>

          <motion.div
            className="absolute top-1/2 -left-16 text-4xl"
            animate={{ 
              x: [0, 10, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🌴
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={handleScrollToProducts}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-3 font-medium">Discover Paradise 🌴</span>
          <motion.div 
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <motion.div 
              className="w-1 h-3 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Tropical Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        >
          {['🥥', '🌴', '🌺', '🍃'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Hero;