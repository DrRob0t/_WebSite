import { motion } from 'framer-motion'
import { Plane, Car, Wind, Shield, Bot, ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

// Industry data - Aerospace as beachhead, others as secondary
const beachheadIndustry = {
  id: 'aerospace',
  title: 'Aerospace & Wind Tunnels',
  subtitle: 'Our Beachhead Market',
  icon: Plane,
  description:
    'Where we prove our technology. Wind tunnel instrumentation is the foundation of our credibility—enabling faster test cycles, better model-to-flight correlation, and real-time aerodynamic insights at speeds up to Mach 0.85.',
  href: '/industries/aerospace',
  stats: [
    { value: '40-60%', label: 'faster test cycles' },
    { value: 'Mach 0.85', label: 'operating speed' },
    { value: '100+', label: 'sensors per array' },
  ],
}

const secondaryIndustries = [
  {
    id: 'automotive',
    title: 'Motorsport & Automotive',
    icon: Car,
    description: 'Track testing & aerodynamic validation',
    href: '/industries/automotive',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-500/10',
  },
  {
    id: 'energy',
    title: 'Wind Energy',
    icon: Wind,
    description: 'Turbine blade optimization',
    href: '/industries/energy',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 'structural-health',
    title: 'Infrastructure',
    icon: Shield,
    description: 'Structural health monitoring',
    href: '/industries/structural-health',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    icon: Bot,
    description: 'Tactile sensing systems',
    href: '/industries/robotics',
    iconColor: 'text-pink-600',
    bgColor: 'bg-pink-500/10',
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
  const BeachheadIcon = beachheadIndustry.icon

  return (
    <section
      className="relative py-12 lg:py-16 overflow-hidden pointer-events-none"
      id="industries"
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

          <div className="relative z-10 px-8 py-10 lg:px-12 lg:py-12">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-hyve-accent" />
                <span className="text-sm font-medium tracking-widest text-hyve-text/70 uppercase">
                  Application Sectors
                </span>
                <div className="w-12 h-[2px] bg-hyve-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-3 font-heading">
                Built for Aerospace. Ready for More.
              </h2>
              <p className="text-base text-hyve-text/70 max-w-2xl mx-auto">
                We start where credibility matters most—wind tunnels and experimental aerospace—then
                expand to adjacent markets as we prove performance.
              </p>
            </motion.div>

            {/* Beachhead Market - Featured */}
            <motion.div variants={itemVariants} className="mb-10 pointer-events-auto">
              <Link to={beachheadIndustry.href}>
                <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 lg:p-8 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl group cursor-pointer">
                  {/* Beachhead Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Star className="h-3 w-3" />
                    Primary Focus
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 items-center">
                    {/* Left: Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BeachheadIcon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold text-hyve-header">
                            {beachheadIndustry.title}
                          </h3>
                          <p className="text-sm text-blue-600 font-medium">
                            {beachheadIndustry.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm lg:text-base text-hyve-text/80 leading-relaxed mb-4">
                        {beachheadIndustry.description}
                      </p>

                      <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Explore Aerospace Solutions
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {beachheadIndustry.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-hyve-header">
                            {stat.value}
                          </div>
                          <div className="text-xs text-hyve-text/60">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Secondary Industries - Compact Row */}
            <motion.div variants={itemVariants}>
              <p className="text-sm text-hyve-text/60 text-center mb-4 uppercase tracking-wider font-medium">
                Expanding to Adjacent Markets
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pointer-events-auto">
                {secondaryIndustries.map(industry => {
                  const Icon = industry.icon
                  return (
                    <Link key={industry.id} to={industry.href}>
                      <div
                        className={`p-4 rounded-xl ${industry.bgColor} border border-transparent hover:border-hyve-accent/50 transition-all hover:shadow-md group cursor-pointer`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={`h-5 w-5 ${industry.iconColor}`} />
                          <span className="font-semibold text-hyve-header text-sm">
                            {industry.title}
                          </span>
                        </div>
                        <p className="text-xs text-hyve-text/60">{industry.description}</p>
                        <div className="flex items-center text-hyve-interactive text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="text-center mt-10">
              <p className="text-sm text-hyve-text/70 mb-4">
                Working in one of these sectors? Let's discuss your measurement challenges.
              </p>
              <Button
                size="default"
                className="bg-hyve-text hover:bg-hyve-text-dark text-white pointer-events-auto"
                onClick={() => {
                  const contactButton = document.querySelector(
                    '[data-contact-trigger]'
                  ) as HTMLButtonElement
                  if (contactButton) {
                    contactButton.click()
                  }
                }}
              >
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
