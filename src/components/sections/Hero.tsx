import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Clock, TrendingDown, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { HeroSwiper } from '@/components/ui/HeroSwiper'

// Animation variants
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

export const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pointer-events-none py-16 lg:py-20">
      {/* Asymmetric Layout Container */}
      <div
        className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-12"
        style={{ maxWidth: '1600px' }}
      >
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-center justify-items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left relative"
          >
            {/* Subtle background for text contrast */}
            <div className="absolute inset-0 -m-8 bg-gradient-to-br from-hyve-background/40 to-transparent backdrop-blur-sm rounded-2xl" />

            <div className="relative z-10">
              {/* Subtle accent line */}
              <motion.div variants={itemVariants} className="w-12 h-[2px] bg-hyve-accent mb-6" />

              {/* Problem Statement Badge */}
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-block text-xs font-medium tracking-widest text-hyve-interactive uppercase bg-hyve-interactive/10 px-3 py-1.5 rounded-full">
                  The Missing Measurement Layer
                </span>
              </motion.div>

              {/* Main Headline - Outcome Focused */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light leading-[1.15] mb-6"
              >
                <span className="block text-hyve-text">
                  Test <span className="font-semibold">faster</span>.
                </span>
                <span className="block text-hyve-text mt-1">
                  Validate <span className="font-semibold">smarter</span>.
                </span>
                <span className="block mt-1">
                  <span className="font-semibold hyve-text-gradient">Ship with confidence.</span>
                </span>
              </motion.h1>

              {/* Value Proposition Subheadline */}
              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-hyve-text/80 max-w-lg mb-6 font-light leading-relaxed"
              >
                Aerospace has paid for decades without real-time surface data. Our ultra-thin sensor
                skin delivers the aerodynamic insight you've been missing—compressing test cycles and
                bridging the gap from simulation to reality.
              </motion.p>

              {/* Economic Impact Stats */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-1.5 rounded-md bg-emerald-500/10">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-hyve-text/70">
                    <span className="font-semibold text-hyve-header">40-60%</span> faster development
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-1.5 rounded-md bg-blue-500/10">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-hyve-text/70">
                    <span className="font-semibold text-hyve-header">Real-time</span> data at Mach
                    0.85
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-1.5 rounded-md bg-purple-500/10">
                    <Target className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-hyve-text/70">
                    <span className="font-semibold text-hyve-header">55%</span> cost reduction
                  </span>
                </div>
              </motion.div>

              {/* Outcome-Driven CTA Group */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto items-start"
              >
                <Button
                  size="sm"
                  className="group bg-hyve-text border border-hyve-text text-white hover:bg-hyve-text-dark px-5 py-3 sm:px-7 sm:py-4 lg:px-8 lg:py-5 transition-all duration-300 self-start w-auto"
                  onClick={() => {
                    // Scroll to deployment modes
                    const deploymentSection = document.getElementById('deployment')
                    if (deploymentSection) {
                      deploymentSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  <span className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
                    See How It Works
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="group bg-transparent border border-hyve-content text-hyve-text hover:border-hyve-text px-5 py-3 sm:px-7 sm:py-4 lg:px-8 lg:py-5 transition-all duration-300 self-start w-auto"
                  onClick={() => navigate('/haptic-matrix')}
                >
                  <span className="flex items-center gap-2 text-xs sm:text-sm font-light tracking-wide">
                    Technical Specs
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>

              {/* Wind Tunnel Beachhead Signal */}
              <motion.p variants={itemVariants} className="mt-6 text-xs text-hyve-text/50 italic">
                Trusted for wind tunnel validation. Built for flight test. Ready for operational
                monitoring.
              </motion.p>
            </div>
          </motion.div>

          {/* Right Side - Swiper Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full max-w-[650px] h-[380px] sm:h-[460px] md:h-[540px] lg:h-[620px] justify-self-center lg:justify-self-center mx-auto"
          >
            {/* Subtle background for visual consistency with left side */}
            <div className="absolute inset-0 -m-8 bg-gradient-to-br from-hyve-background/40 to-transparent backdrop-blur-sm rounded-2xl" />

            <div className="relative z-10 w-full h-full">
              <HeroSwiper className="pointer-events-auto" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimal scroll indicator - bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-hyve-text/30" />
        </motion.div>
      </motion.div>

      {/* Very subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-hyve-background/5 via-transparent to-transparent" />
    </section>
  )
}
