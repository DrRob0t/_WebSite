import { motion } from 'framer-motion'
import {
  FlaskConical,
  Gauge,
  Factory,
  Plane,
  Car,
  Wind,
  Shield,
  Bot,
  HardHat,
  ArrowRight,
} from 'lucide-react'

import { Card } from '@/components/ui/card'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Deployment mode data
const deploymentModes = [
  {
    id: 'experimental',
    title: 'Experimental Testing',
    subtitle: 'Hours to Days',
    description:
      'High-density instrumentation for wind tunnels, test rigs, and controlled environments. Capture comprehensive aerodynamic data during development cycles.',
    icon: FlaskConical,
    highlights: [
      'Wind tunnel validation',
      'Model-to-flight correlation',
      'High-frequency data capture',
      'Rapid reconfiguration',
    ],
    industries: [
      { icon: Plane, label: 'Aerospace' },
      { icon: Car, label: 'Motorsport' },
    ],
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentColor: 'text-blue-600',
    borderColor: 'hover:border-blue-400',
  },
  {
    id: 'realworld',
    title: 'Real-World Validation',
    subtitle: 'Days to Weeks',
    description:
      'Portable deployment for track testing, flight trials, and field validation. Bridge the gap between simulation and operational reality.',
    icon: Gauge,
    highlights: [
      'On-vehicle instrumentation',
      'Flight test integration',
      'Telemetry-grade data',
      'Environmental resilience',
    ],
    industries: [
      { icon: Plane, label: 'Flight Test' },
      { icon: Car, label: 'Track Testing' },
      { icon: Wind, label: 'Field Trials' },
    ],
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: 'text-amber-600',
    borderColor: 'hover:border-amber-400',
  },
  {
    id: 'monitoring',
    title: 'Continuous Monitoring',
    subtitle: 'Months to Years',
    description:
      'Permanent installation for operational assets, infrastructure, and long-term health monitoring. Enable predictive maintenance and performance optimization.',
    icon: Factory,
    highlights: [
      'Structural health monitoring',
      'Predictive maintenance',
      'Asset optimization',
      'Long-term durability',
    ],
    industries: [
      { icon: Wind, label: 'Wind Energy' },
      { icon: Shield, label: 'Infrastructure' },
      { icon: HardHat, label: 'Mining' },
      { icon: Bot, label: 'Robotics' },
    ],
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    accentColor: 'text-emerald-600',
    borderColor: 'hover:border-emerald-400',
  },
]

// Deployment Mode Card Component
const DeploymentModeCard = ({
  mode,
}: {
  mode: (typeof deploymentModes)[0]
}) => {
  const Icon = mode.icon

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Card
        className={`h-full p-6 lg:p-8 bg-white/95 backdrop-blur-sm border-2 border-hyve-content/30 ${mode.borderColor} transition-all duration-300 hover:shadow-xl group cursor-pointer`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`h-7 w-7 ${mode.accentColor}`} />
          </div>
          <span className="text-xs font-medium text-hyve-text/50 uppercase tracking-wider">
            {mode.subtitle}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl lg:text-2xl font-bold text-hyve-header mb-3 font-heading">
          {mode.title}
        </h3>
        <p className="text-sm text-hyve-text/70 leading-relaxed mb-5">
          {mode.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          {mode.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${mode.accentColor} bg-current`} />
              <span className="text-sm text-hyve-text/80">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Industry Icons */}
        <div className="pt-4 border-t border-hyve-content/20">
          <p className="text-xs text-hyve-text/50 uppercase tracking-wider mb-3">
            Key Applications
          </p>
          <div className="flex flex-wrap gap-3">
            {mode.industries.map((industry, idx) => {
              const IndustryIcon = industry.icon
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-xs text-hyve-text/70 bg-hyve-content/20 px-2.5 py-1.5 rounded-full"
                >
                  <IndustryIcon className="h-3.5 w-3.5" />
                  <span>{industry.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className={mode.accentColor}>Learn more</span>
          <ArrowRight className={`ml-1 h-4 w-4 ${mode.accentColor} group-hover:translate-x-1 transition-transform`} />
        </div>
      </Card>
    </motion.div>
  )
}

export const DeploymentModes = () => {
  return (
    <section className="relative py-16 lg:py-24 pointer-events-none" id="deployment">
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
                  One Platform, Three Deployment Modes
                </span>
                <div className="w-12 h-[2px] bg-hyve-accent" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hyve-header mb-4 font-heading">
                From Experiment to Infrastructure
              </h2>

              <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto leading-relaxed">
                The same sensing platform adapts to your timeline—whether you need rapid test data,
                field validation, or permanent monitoring. One technology, increasing operational permanence.
              </p>
            </motion.div>

            {/* Three Equal Cards - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pointer-events-auto">
              {deploymentModes.map(mode => (
                <DeploymentModeCard key={mode.id} mode={mode} />
              ))}
            </div>

            {/* Platform Continuity Message */}
            <motion.div variants={itemVariants} className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 bg-hyve-interactive/10 px-6 py-3 rounded-full">
                <div className="flex -space-x-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-sm font-medium text-hyve-text">
                  Same data. Same quality. Different timelines.
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
