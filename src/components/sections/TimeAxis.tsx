import { motion } from 'framer-motion'
import { Clock, Calendar, CalendarRange, ArrowRight } from 'lucide-react'

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
}

// Timeline stages
const timelineStages = [
  {
    id: 'testing',
    label: 'Testing',
    timeframe: 'Hours – Days',
    description: 'Rapid iteration in controlled environments',
    icon: Clock,
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
  },
  {
    id: 'validation',
    label: 'Validation',
    timeframe: 'Days – Weeks',
    description: 'Real-world proof of performance',
    icon: Calendar,
    color: 'bg-amber-500',
    textColor: 'text-amber-600',
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    timeframe: 'Months – Years',
    description: 'Continuous operational intelligence',
    icon: CalendarRange,
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
  },
]

export const TimeAxis = () => {
  return (
    <section className="relative py-8 lg:py-12 pointer-events-none">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          {/* Background */}
          <div className="absolute inset-0 -m-6 bg-gradient-to-r from-hyve-interactive/5 via-hyve-accent/5 to-hyve-interactive/5 rounded-2xl" />

          <div className="relative z-10 py-8 px-6">
            {/* Desktop Timeline */}
            <div className="hidden md:block">
              {/* Progress Line Container */}
              <div className="relative h-2 mb-8">
                {/* Background line */}
                <div className="absolute inset-0 bg-hyve-content/20 rounded-full" />
                
                {/* Animated gradient line */}
                <motion.div
                  variants={lineVariants}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-500 rounded-full origin-left"
                />

                {/* Stage markers */}
                <div className="absolute inset-0 flex justify-between items-center px-0">
                  {timelineStages.map((stage, index) => (
                    <motion.div
                      key={stage.id}
                      variants={itemVariants}
                      className="relative"
                      style={{ left: index === 0 ? '0%' : index === 1 ? '0%' : '0%' }}
                    >
                      <div
                        className={`w-5 h-5 ${stage.color} rounded-full border-4 border-white shadow-lg`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stage Labels */}
              <div className="grid grid-cols-3 gap-4">
                {timelineStages.map(stage => {
                  const Icon = stage.icon
                  return (
                    <motion.div
                      key={stage.id}
                      variants={itemVariants}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <div className={`p-2 rounded-lg ${stage.color}/10`}>
                          <Icon className={`h-5 w-5 ${stage.textColor}`} />
                        </div>
                      </div>
                      <h4 className="font-semibold text-hyve-header text-lg mb-1">
                        {stage.label}
                      </h4>
                      <p className={`text-sm font-medium ${stage.textColor} mb-1`}>
                        {stage.timeframe}
                      </p>
                      <p className="text-xs text-hyve-text/60">
                        {stage.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Mobile Timeline - Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex items-center justify-between gap-2">
                {timelineStages.map((stage, index) => {
                  const Icon = stage.icon
                  return (
                    <motion.div
                      key={stage.id}
                      variants={itemVariants}
                      className="flex-1 text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <div className={`w-10 h-10 ${stage.color} rounded-full flex items-center justify-center shadow-md`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-hyve-header text-sm mb-0.5">
                        {stage.label}
                      </h4>
                      <p className={`text-xs ${stage.textColor}`}>
                        {stage.timeframe}
                      </p>
                      
                      {/* Arrow between items */}
                      {index < timelineStages.length - 1 && (
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                          <ArrowRight className="h-4 w-4 text-hyve-content/40" />
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Mobile progress bar */}
              <div className="mt-4 h-1.5 bg-hyve-content/20 rounded-full overflow-hidden">
                <motion.div
                  variants={lineVariants}
                  className="h-full bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-500 origin-left"
                />
              </div>
            </div>

            {/* Bottom message */}
            <motion.p
              variants={itemVariants}
              className="text-center text-sm text-hyve-text/60 mt-6 italic"
            >
              The same sensor technology scales from rapid prototyping to permanent installation
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
