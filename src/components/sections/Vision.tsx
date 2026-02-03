import { motion } from 'framer-motion'
import { FlaskConical, Plane, Radio, ArrowRight, CheckCircle2 } from 'lucide-react'

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

// GTM Ladder stages
const gtmStages = [
  {
    id: 'wind-tunnel',
    phase: 'Now',
    title: 'Wind Tunnel Instrumentation',
    description: 'Proving technology in controlled experimental environments',
    icon: FlaskConical,
    status: 'active',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
  },
  {
    id: 'flight-test',
    phase: 'Next',
    title: 'Flight Test & Demonstrators',
    description: 'Validating real-world performance on aircraft and vehicles',
    icon: Plane,
    status: 'upcoming',
    color: 'bg-amber-500',
    borderColor: 'border-amber-400',
  },
  {
    id: 'ivhm',
    phase: 'Future',
    title: 'Operational IVHM & Adaptive Systems',
    description: 'Continuous monitoring enabling predictive maintenance',
    icon: Radio,
    status: 'future',
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-400',
  },
]

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
          {/* Background container */}
          <div className="absolute inset-0 -m-8 bg-gradient-to-br from-white/90 to-hyve-content/30 backdrop-blur-md rounded-3xl shadow-xl" />

          <div className="relative z-10 px-8 py-10 lg:px-12 lg:py-14">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-hyve-accent" />
                <span className="text-sm font-medium tracking-widest text-hyve-text/70 uppercase">
                  Strategic Vision
                </span>
                <div className="w-12 h-[2px] bg-hyve-accent" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 font-heading">
                <span className="text-hyve-header">Closing the </span>
                <span className="hyve-text-gradient">40-Year Gap</span>
              </h2>

              <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto leading-relaxed">
                While computing power has grown exponentially, aerodynamic measurement has remained
                fundamentally unchanged. Hyve is the correction aerospace has been waiting for—the
                missing data layer that unlocks the next era of efficiency, safety, and sustainability.
              </p>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left: GTM Ladder */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-hyve-header mb-6">
                  Our Deliberate Path to Market
                </h3>

                <div className="space-y-4">
                  {gtmStages.map((stage, index) => {
                    const Icon = stage.icon
                    const isActive = stage.status === 'active'

                    return (
                      <div key={stage.id} className="relative">
                        {/* Connector line */}
                        {index < gtmStages.length - 1 && (
                          <div className="absolute left-6 top-14 w-0.5 h-8 bg-hyve-content/30" />
                        )}

                        <div
                          className={`flex gap-4 p-4 rounded-xl transition-all ${
                            isActive
                              ? 'bg-blue-50 border-2 border-blue-200'
                              : 'bg-white/50 border border-hyve-content/20'
                          }`}
                        >
                          {/* Icon */}
                          <div
                            className={`w-12 h-12 rounded-xl ${stage.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-xs font-semibold uppercase tracking-wider ${
                                  isActive ? 'text-blue-600' : 'text-hyve-text/50'
                                }`}
                              >
                                {stage.phase}
                              </span>
                              {isActive && (
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <h4 className="font-semibold text-hyve-header mb-1">{stage.title}</h4>
                            <p className="text-sm text-hyve-text/70">{stage.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Reassurance message */}
                <p className="mt-6 text-sm text-hyve-text/60 italic">
                  Each stage builds credibility for the next—avoiding the "too futuristic to buy" trap.
                </p>
              </motion.div>

              {/* Right: Platform Vision */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-hyve-header mb-6">
                  The Platform Opportunity
                </h3>

                <div className="bg-gradient-to-br from-hyve-interactive/5 to-hyve-accent/10 rounded-2xl p-6 lg:p-8 mb-6">
                  <p className="text-base text-hyve-text/80 leading-relaxed mb-6">
                    Hyve isn't just a sensor product—it's the{' '}
                    <span className="font-semibold text-hyve-header">data substrate</span> for future
                    adaptive aerospace. We're building:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-hyve-interactive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="h-3 w-3 text-hyve-interactive" />
                      </div>
                      <div>
                        <span className="font-medium text-hyve-header">Continuous Datasets</span>
                        <p className="text-sm text-hyve-text/70">
                          Unlocking longitudinal aerodynamic data never before possible
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-hyve-interactive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="h-3 w-3 text-hyve-interactive" />
                      </div>
                      <div>
                        <span className="font-medium text-hyve-header">New Validation Workflows</span>
                        <p className="text-sm text-hyve-text/70">
                          Bridging the gap between CFD simulation and flight reality
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-hyve-interactive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="h-3 w-3 text-hyve-interactive" />
                      </div>
                      <div>
                        <span className="font-medium text-hyve-header">Digital Twin Grounding</span>
                        <p className="text-sm text-hyve-text/70">
                          Real-world data to calibrate and validate simulation models
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Economic Impact */}
                <div className="bg-white/80 rounded-xl p-5 border border-hyve-content/20">
                  <h4 className="text-sm font-semibold text-hyve-header mb-4 uppercase tracking-wider">
                    The Cost of Waiting
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hyve-header">£50-75M</div>
                      <div className="text-xs text-hyve-text/70">Annual UK aerospace savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hyve-header">500+</div>
                      <div className="text-xs text-hyve-text/70">UK jobs enabled by 2035</div>
                    </div>
                  </div>
                  <p className="text-xs text-hyve-text/50 text-center mt-4 italic">
                    Every year without real-time surface data is efficiency left on the table.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
