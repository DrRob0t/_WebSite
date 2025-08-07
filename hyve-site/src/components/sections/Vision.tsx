import { motion } from 'framer-motion'

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

export const Vision = () => {
  return (
    <section className="relative py-16 lg:py-20 pointer-events-none" id="vision">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Background container - matching Industries section */}
          <div className="absolute inset-0 -m-8 bg-gradient-to-br from-white/90 to-hyve-content/30 backdrop-blur-md rounded-3xl shadow-xl" />

          <div className="relative z-10 px-8 py-8 lg:px-12 lg:py-10">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Content */}
              <motion.div variants={itemVariants} className="text-left">
                {/* Section Label */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[2px] bg-hyve-accent" />
                    <span className="text-sm font-medium tracking-widest text-hyve-text/70 uppercase">
                      Our Vision
                    </span>
                  </div>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8 font-heading">
                  <span className="block text-hyve-header">Transforming Industries</span>
                  <span className="block mt-2">
                    Through{' '}
                    <span className="relative">
                      <span className="relative hyve-text-gradient">Real-World Intelligence</span>
                    </span>
                  </span>
                </h2>

                {/* Vision Statement */}
                <div className="space-y-6">
                  <p className="text-base md:text-lg text-hyve-text/80 leading-relaxed">
                    <span className="font-semibold text-hyve-header">Hyve Dynamics</span> envisions
                    a future where{' '}
                    <span className="font-semibold text-hyve-header">
                      real-world data replaces assumptions
                    </span>
                    , enabling smarter, more sustainable, and more efficient technological
                    advancements. By seamlessly integrating high-density sensory solutions into
                    complex surfaces, we empower industries to optimize performance, safety, and
                    sustainability in ways never before possible.
                  </p>

                  <p className="text-base md:text-lg text-hyve-text/80 leading-relaxed">
                    We are committed to leading the way in{' '}
                    <span className="font-semibold text-hyve-header">aerodynamic innovation</span>,
                    helping industries accelerate development cycles, reduce costs, and achieve
                    net-zero goals through cutting-edge sensor technology.
                  </p>
                </div>
              </motion.div>

              {/* Right Side - Market Metrics */}
              <motion.div variants={itemVariants} className="relative">
                <div className="bg-gradient-to-br from-hyve-interactive/5 to-hyve-accent/10 rounded-2xl p-6 lg:p-8">
                  {/* Market Opportunity Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-4xl md:text-5xl font-bold text-hyve-header mb-2">
                      €300+ Billion
                    </h3>
                    <p className="text-sm text-hyve-text/70">Global Opportunity by 2030</p>
                  </div>

                  {/* Key Markets Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hyve-header">€60B</div>
                      <div className="text-xs text-hyve-text/70">Aerospace</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hyve-header">€106B</div>
                      <div className="text-xs text-hyve-text/70">IoT Sensors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hyve-header">€16.6B</div>
                      <div className="text-xs text-hyve-text/70">Structural Health</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hyve-header">€19.4B</div>
                      <div className="text-xs text-hyve-text/70">Wind Energy</div>
                    </div>
                  </div>

                  {/* Growth Drivers */}
                  <div className="border-t border-hyve-content/20 pt-4">
                    <h4 className="text-sm font-semibold text-hyve-header mb-3">
                      Key Growth Drivers
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hyve-interactive rounded-full"></div>
                        <span className="text-xs text-hyve-text/80">
                          Net Zero sustainability mandates
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hyve-interactive rounded-full"></div>
                        <span className="text-xs text-hyve-text/80">
                          Digital transformation acceleration
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hyve-interactive rounded-full"></div>
                        <span className="text-xs text-hyve-text/80">
                          €6.9T infrastructure replacement
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-hyve-interactive rounded-full"></div>
                        <span className="text-xs text-hyve-text/80">
                          IoT & AI technology convergence
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom tagline */}
                  <div className="mt-4 pt-4 border-t border-hyve-content/20 text-center">
                    <p className="text-xs text-hyve-text/60 italic">
                      Positioning Hyve at the intersection of the world's largest growth markets
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
