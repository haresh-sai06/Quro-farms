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
    "Pure",
    "&",
    "Chemical",
    "Free",
    "Farm",
    "to",
    "Your",
    "Table",
  ];

  return (
    <motion.section
      ref={ref}
      className="min-h-[100vh] container-padding text-primary overflow-hidden relative bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 128, 0, 0.3), rgba(0, 128, 0, 0.3)), url('https://4kwallpapers.com/images/wallpapers/agriculture-farm-land-countryside-aerial-view-green-2560x1440-3985.jpg')`,
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-10 pt-8 pt-28">
        <div className="md:w-1/2 text-left">
          <motion.div
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-green-100/80 backdrop-blur-sm text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Leaf className="w-4 h-4" />
            100% Original Farm Products
          </motion.div>

          <motion.h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight font-poppins flex flex-wrap gap-2">
            {animatedHeadline.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block bg-clip-text text-transparent text-shadow-lg ${
                  i < 2
                    ? "bg-gradient-to-r from-green-500 to-emerald-400"
                    : "bg-gradient-to-r from-amber-500 to-yellow-300"
                }`}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl bg-gradient-to-r from-green-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              textShadow: inView ? "0 0 8px rgba(255,255,255,0.3)" : "none",
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Direct from the farm to your doorstep. We deliver 100% natural,
            healthy produce all over India without chemicals or preservatives.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <motion.button
              className="bg-green-600 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products" className="flex items-center gap-3">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.button>
            <motion.button
              className="bg-white/80 backdrop-blur-sm text-green-700 px-8 py-4 rounded-full border-2 border-green-200 text-lg font-semibold"
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
            src="/components/picture.jpeg"
            alt="Vegetable Basket"
            className="w-[400px] h-[400px] object-cover"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;