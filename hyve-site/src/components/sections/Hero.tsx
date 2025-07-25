import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const buttonVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 } 
  },
  tap: { 
    scale: 0.98 
  },
}

export const Hero = () => {
  return (
    <section 
      className="relative h-screen flex items-start justify-center overflow-hidden pt-8 pointer-events-none"
    >
      {/* Content Container */}
      <div className="hyve-container relative z-10 mt-16 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Semi-opaque background container */}
          <div className="bg-hyve-background/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-hyve-lg border border-hyve-content/30">
            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="hyve-hero-text mb-6 text-balance"
            >
              Bringing Structures to Life with{" "}
              <span className="hyve-text-gradient">
                Real-World Intelligence
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="hyve-body-text mb-8 max-w-3xl mx-auto text-balance"
            >
              Hyve Dynamics turns machines and structures into intelligent systems. Our Haptic Matrix captures real-time pressure, strain, and temperature data—directly from complex, unpredictable environments.
            </motion.p>

            {/* Vision-Driven Message */}
            <motion.div 
              variants={itemVariants}
              className="mb-10 max-w-3xl mx-auto"
            >
              <p className="text-lg text-hyve-text leading-relaxed font-body text-balance">
              It’s not the strongest systems that thrive—but the ones that adapt.
              Hyve’s Haptic Matrix unlocks real-world, high-density data where it matters most—fueling insight, driving innovation, and enabling intelligent evolution across machines, vehicles, and structures.
              </p>
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col lg:flex-row gap-4 justify-center items-center pointer-events-auto"
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  size="lg"
                  className="hyve-btn-primary group min-w-[200px]"
                  onClick={() => {
                    // Scroll to technology section when implemented
                    document.getElementById('technology')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  Discover the Technology
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-hyve-accent text-hyve-text hover:bg-hyve-accent hover:text-white transition-all duration-300 min-w-[200px]"
                  onClick={() => {
                    // Scroll to use cases section when implemented
                    document.getElementById('use-cases')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  Explore Real-World Use Cases
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="bg-hyve-content/20 backdrop-blur-sm border-hyve-text text-hyve-text hover:bg-hyve-text hover:text-white transition-all duration-300 min-w-[200px]"
                  onClick={() => {
                    window.open('mailto:info@hyvedynamics.com?subject=Join the Next-Gen Sensing Revolution', '_blank')
                  }}
                >
                  Join the Revolution
                </Button>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Scroll Indicator - moved outside content container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-hyve-accent rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-hyve-accent rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

             {/* Decorative Elements - Removed to avoid blocking background clicks */}
    </section>
  )
} 