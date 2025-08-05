import { motion } from 'framer-motion'
import { Plane, Car, Wind, Shield, Bot, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Industry data
const industries = [
  {
    id: 'aerospace',
    title: 'Aerospace',
    icon: Plane,
    description: 'Advanced sensing for aviation and space applications',
    href: '/industries/aerospace',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-600',
  },
  {
    id: 'automotive',
    title: 'Automotive',
    icon: Car,
    description: 'Real-time aerodynamic data for racing performance',
    href: '/industries/automotive',
    color: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-600',
  },
  {
    id: 'energy',
    title: 'Energy',
    icon: Wind,
    description: 'Optimizing renewable energy systems',
    href: '/industries/energy',
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-600',
  },
  {
    id: 'structural-health',
    title: 'Structural Health',
    icon: Shield,
    description: 'Predictive maintenance for critical infrastructure',
    href: '/industries/structural-health',
    color: 'from-purple-500/20 to-indigo-500/20',
    iconColor: 'text-purple-600',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    icon: Bot,
    description: 'Intelligent tactile sensing for autonomous systems',
    href: '/industries/robotics',
    color: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-600',
  },
]

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

export const Industries = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-32 pointer-events-none"
      id="industries"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hyve-header mb-6 font-heading">
              Industries We Transform
            </h2>
            <p className="text-lg md:text-xl text-hyve-text/80 max-w-3xl mx-auto">
              Our cutting-edge sensor technology delivers real-time insights across diverse sectors,
              enabling unprecedented optimization and innovation.
            </p>
          </motion.div>

          {/* Industries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={industry.id}
                  variants={itemVariants}
                  custom={index}
                  className="pointer-events-auto"
                >
                  <Link to={industry.href}>
                    <Card className="h-full p-8 bg-white/80 backdrop-blur-sm border-hyve-content hover:border-hyve-accent transition-all duration-300 hover:shadow-xl group cursor-pointer">
                      <div className="flex flex-col h-full">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-8 w-8 ${industry.iconColor}`} />
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-semibold text-hyve-header mb-3 font-heading">
                          {industry.title}
                        </h3>
                        <p className="text-hyve-text/80 leading-relaxed mb-6 flex-grow">
                          {industry.description}
                        </p>

                        {/* Learn More Link */}
                        <div className="flex items-center text-hyve-interactive font-medium group-hover:text-hyve-interactive-dark transition-colors">
                          <span>Learn More</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-lg text-hyve-text/80 mb-6">
              Ready to revolutionize your industry with real-time data insights?
            </p>
            <Button
              size="lg"
              className="bg-hyve-text hover:bg-hyve-text-dark text-white pointer-events-auto"
            >
              Contact Our Experts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}