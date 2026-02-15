import { motion } from 'framer-motion'
import { Gauge, Thermometer, Activity, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Animation variants - matching site patterns
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// What the sensor measures - core capabilities
const measurements = [
  {
    id: 'pressure',
    icon: Gauge,
    title: 'Bidirectional Pressure',
    spec: '±10kPa range',
    description:
      'Captures both pressure AND suction. Most sensors can only measure one direction. Hyve captures the complete aerodynamic picture.',
    iconColor: 'text-blue-600',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'temperature',
    icon: Thermometer,
    title: 'Temperature',
    spec: '-50°C to 150°C',
    description:
      'Full operating range with software compensation. From cryogenic wind tunnels to engine bay thermal management.',
    iconColor: 'text-amber-600',
    bgColor: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'strain',
    icon: Activity,
    title: 'Strain',
    spec: 'Surface deformation',
    description:
      'Captures structural loads in real-time. Transition seamlessly from aerodynamic testing to structural health monitoring.',
    iconColor: 'text-emerald-600',
    bgColor: 'from-emerald-500/20 to-teal-500/20',
  },
]

// Before vs After comparison data
const beforeHyve = [
  '20 pressure taps',
  '2 days installation',
  'Drilled holes in composite structure',
  'Single-use deployment',
  'Post-processing delays',
]

const withHyve = [
  '100+ sensors in same area',
  '1 hour deployment',
  'Non-invasive adhesive bond',
  'Infinite repositioning',
  'Real-time data streaming',
]

export const TechnicalCapabilities = () => {
  return (
    <section
      className="relative py-12 lg:py-16 overflow-hidden pointer-events-none"
      id="technology"
    >
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

          <div className="relative z-10 px-8 py-8 lg:px-12 lg:py-10">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                The Technology Behind the Numbers
              </h2>
              <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto leading-relaxed">
                Biomimicry meets aerospace engineering. The Hyve Haptic Matrix
                replicates nature's sensory intelligence using flexible strain
                gauge arrays that capture what traditional methods miss.
              </p>
            </motion.div>

            {/* What It Measures - Three Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {measurements.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    custom={index}
                    className="pointer-events-auto"
                  >
                    <div className="h-full p-5 bg-white/70 backdrop-blur-sm border border-hyve-content/50 rounded-2xl hover:border-hyve-accent/50 transition-all duration-300 hover:shadow-md">
                      {/* Icon and Title Row */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${item.bgColor} flex items-center justify-center`}
                        >
                          <Icon className={`h-5 w-5 ${item.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-hyve-header font-heading leading-tight">
                            {item.title}
                          </h3>
                          <span className="text-sm font-medium text-hyve-interactive font-mono">
                            {item.spec}
                          </span>
                        </div>
                      </div>
                      {/* Description */}
                      <p className="text-sm text-hyve-text/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Before vs After Comparison */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before Hyve */}
                <div className="p-5 bg-hyve-text/5 border border-hyve-text/10 rounded-2xl">
                  <h4 className="text-sm font-semibold text-hyve-text/60 uppercase tracking-wide mb-4">
                    Before Hyve
                  </h4>
                  <ul className="space-y-2">
                    {beforeHyve.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-hyve-text/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-hyve-text/40 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* With Hyve */}
                <div className="p-5 bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 border border-hyve-accent/30 rounded-2xl">
                  <h4 className="text-sm font-semibold text-hyve-interactive uppercase tracking-wide mb-4">
                    With Hyve
                  </h4>
                  <ul className="space-y-2">
                    {withHyve.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-hyve-header font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-hyve-interactive mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Key Statement */}
            <motion.div variants={itemVariants} className="pointer-events-auto">
              <div className="bg-gradient-to-r from-hyve-header/5 to-hyve-accent/10 border border-hyve-accent/30 rounded-2xl p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                  <p className="text-base md:text-lg text-hyve-header font-medium leading-relaxed text-center mb-4">
                    Hyve is the only technology that combines full-surface
                    coverage, real-time feedback, non-invasive deployment, and
                    multi-parameter sensing in both controlled and real-world
                    environments.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to="/haptic-matrix"
                      className="inline-flex items-center text-sm font-medium text-hyve-interactive hover:text-hyve-interactive-dark transition-colors group"
                    >
                      Explore Full Technical Specifications
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
