import React from "react"
import { motion } from "framer-motion"

// Animation variants matching Hero section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
}

export const Vision = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-32 pointer-events-none"
      id="vision"
    >
      {/* Asymmetric Layout Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-left relative"
          >
            {/* Subtle background for text contrast */}
            <div className="absolute inset-0 -m-8 bg-gradient-to-br from-hyve-background/40 to-transparent backdrop-blur-sm rounded-2xl" />
            
            <div className="relative z-10">
              {/* Section Label */}
              <motion.div 
                variants={itemVariants}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-hyve-accent" />
                  <span className="text-sm font-medium tracking-widest text-hyve-text/70 uppercase">
                    Our Vision
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] mb-8"
              >
                <span className="block text-hyve-text">Transforming Industries</span>
                <span className="block mt-2">
                  Through{" "}
                  <span className="relative font-normal">
                    <span className="relative bg-gradient-to-r from-[#0095E5] via-[#00A7D1] to-[#0095E5] bg-clip-text text-transparent">
                      Real-World Intelligence
                    </span>
                  </span>
                </span>
              </motion.h2>

              {/* Vision Statement */}
              <motion.div className="space-y-6">
                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-hyve-text/80 font-light leading-relaxed"
                >
                  <span className="font-semibold text-hyve-text">Hyve Dynamics</span> envisions a future where <span className="font-semibold text-hyve-text">real-world data replaces assumptions</span>, 
                  enabling smarter, more sustainable, and more efficient technological advancements. 
                  By seamlessly integrating high-density sensory solutions into complex surfaces, 
                  we empower industries to optimize performance, safety, and sustainability in 
                  ways never before possible.
                </motion.p>

                <motion.p 
                  variants={itemVariants}
                  className="text-base md:text-lg text-hyve-text/70 font-light leading-relaxed"
                >
                  We are committed to leading the way in <span className="font-semibold text-hyve-text">aerodynamic innovation</span>, helping industries 
                  accelerate development cycles, reduce costs, and achieve net-zero goals through 
                  cutting-edge sensor technology.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Abstract visual representing data flow */}
            <div className="relative w-full h-96">
              {/* Animated data points */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-hyve-accent rounded-full"
              />
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-1/2 right-1/3 w-3 h-3 bg-hyve-interactive rounded-full"
              />
              <motion.div
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-hyve-accent rounded-full"
              />
              
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <motion.path
                  d="M100 100 Q200 150 300 300"
                  stroke="url(#gradient1)"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                <motion.path
                  d="M300 100 Q200 200 100 300"
                  stroke="url(#gradient2)"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0095E5" stopOpacity="0" />
                    <stop offset="50%" stopColor="#00A7D1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0095E5" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00A7D1" stopOpacity="0" />
                    <stop offset="50%" stopColor="#0095E5" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00A7D1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Very subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-hyve-background/5 to-transparent" />
    </section>
  )
} 