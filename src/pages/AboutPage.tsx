import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Award,
  Calendar,
  Globe,
  Users,
  Target,
  Lightbulb,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Vision } from '@/components/sections/Vision'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CustomMeshBackground } from '@/components/ui/CustomMeshBackground'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

const countVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Timeline data
const timelineData = [
  {
    year: '2012-2018',
    title: 'PhD Research at Cranfield University',
    description:
      '6 years of intensive aerospace research developing core sensor technology concepts and academic validation',
    highlight: 'Academic Foundation',
  },
  {
    year: '2018-2023',
    title: 'Private Sector Development',
    description:
      '5 years refining technology for commercial applications and securing multiple international patents',
    highlight: 'Industry Refinement',
  },
  {
    year: '2023-Present',
    title: 'Market Leadership',
    description:
      'First aerospace-grade flexible sensor deployment, expanding across industries, building global presence',
    highlight: 'Commercial Success',
  },
]

// Impact metrics data
const impactMetrics = [
  {
    value: '500+',
    label: 'UK aerospace jobs',
    description: 'enabled by 2035',
    icon: Users,
  },
  {
    value: '£57M+',
    label: 'annual revenue',
    description: 'potential by 2030',
    icon: Target,
  },
  {
    value: '40-60%',
    label: 'reduction',
    description: 'in development time',
    icon: Calendar,
  },
  {
    value: '£50-75M',
    label: 'annual UK savings',
    description: 'across aerospace programs',
    icon: Globe,
  },
]

// Company values data
const companyValues = [
  {
    title: 'Innovation',
    description: 'Continuous advancement of sensing technology through rigorous R&D',
    icon: Lightbulb,
  },
  {
    title: 'Integrity',
    description: 'Scientific rigor and transparency in every development decision',
    icon: Award,
  },
  {
    title: 'Impact',
    description: 'Measurable benefits for customers, society, and the environment',
    icon: Target,
  },
  {
    title: 'Sustainability',
    description: 'Supporting net-zero aviation goals and environmental responsibility',
    icon: Globe,
  },
]

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen relative">
      <CustomMeshBackground enabled={true} className="min-h-screen" blur={true} blurIntensity="sm">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-hyve-text hover:text-hyve-accent transition-colors group cursor-pointer pointer-events-auto"
                style={{ position: 'relative', zIndex: 50 }}
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <Badge variant="secondary" className="px-4 py-1 text-sm font-medium">
                  ABOUT HYVE DYNAMICS
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-4 font-heading"
              >
                Pioneering Real-World Intelligence Since 2012
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-hyve-text font-light mb-6 max-w-3xl mx-auto"
              >
                Transforming Industries Through Real-World Intelligence
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-hyve-text/80 leading-relaxed max-w-4xl mx-auto"
              >
                We envision a future where real-world data replaces assumptions, enabling smarter,
                more sustainable, and more efficient technological advancements. By seamlessly
                integrating high-density sensory solutions into complex surfaces, we empower
                industries to optimize performance, safety, and sustainability in ways never before
                possible.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Research Foundation Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Mission */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-hyve-header mb-6 font-heading">
                    Our Mission
                  </h2>
                  <p className="text-base md:text-lg text-hyve-text/80 leading-relaxed mb-6">
                    We are committed to leading the way in aerodynamic innovation, helping
                    industries accelerate development cycles, reduce costs, and achieve net-zero
                    goals through cutting-edge sensor technology.
                  </p>
                  <p className="text-base md:text-lg text-hyve-text/80 leading-relaxed">
                    With origins rooted in six years of PhD and postdoctoral research at Cranfield
                    University, followed by five years of dedicated private sector development, Hyve
                    Dynamics has secured multiple international patents, positioning us as a leader
                    in next-generation design validation and performance optimization.
                  </p>
                </motion.div>

                {/* Research Foundation */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-hyve-header mb-6 font-heading">
                    Research Excellence
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-hyve-content/30 to-hyve-accent/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-hyve-header mb-3">
                        Academic Foundation
                      </h3>
                      <ul className="space-y-2">
                        <li className="text-sm text-hyve-text/80">
                          • 6 years of PhD and postdoctoral research
                        </li>
                        <li className="text-sm text-hyve-text/80">
                          • Deep expertise in aerodynamics and sensor technology
                        </li>
                        <li className="text-sm text-hyve-text/80">
                          • Published research in leading scientific journals
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-hyve-content/30 to-hyve-accent/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-hyve-header mb-3">
                        Industry Development
                      </h3>
                      <ul className="space-y-2">
                        <li className="text-sm text-hyve-text/80">
                          • 5 years of private sector innovation
                        </li>
                        <li className="text-sm text-hyve-text/80">
                          • Multiple international patents secured
                        </li>
                        <li className="text-sm text-hyve-text/80">
                          • Proven track record in real-world applications
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-12 font-heading text-center"
              >
                Our Journey
              </motion.h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-hyve-content/20 transform -translate-x-1/2 hidden lg:block"></div>

                {/* Timeline items */}
                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`relative flex items-center mb-12 lg:mb-16 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <Card className="bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 lg:p-8">
                          <Badge variant="secondary" className="mb-3">
                            {item.highlight}
                          </Badge>
                          <h3 className="text-2xl font-bold text-hyve-header mb-2">{item.year}</h3>
                          <h4 className="text-xl font-semibold text-hyve-header mb-3">
                            {item.title}
                          </h4>
                          <p className="text-sm text-hyve-text/80">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-hyve-interactive rounded-full border-4 border-white shadow-lg hidden lg:block"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/95 to-hyve-content/30 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-12 font-heading text-center"
              >
                Our Impact
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {impactMetrics.map((metric, index) => (
                  <motion.div key={index} variants={countVariants} className="text-center">
                    <metric.icon className="h-12 w-12 text-hyve-interactive mx-auto mb-4" />
                    <div className="text-4xl font-bold text-hyve-header mb-2">{metric.value}</div>
                    <div className="text-sm font-semibold text-hyve-header">{metric.label}</div>
                    <div className="text-xs text-hyve-text/70">{metric.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Company Values */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-12 font-heading text-center"
              >
                Our Values
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {companyValues.map((value, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                      <CardContent className="p-6 text-center">
                        <value.icon className="h-12 w-12 text-hyve-interactive mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-hyve-header mb-3">
                          {value.title}
                        </h3>
                        <p className="text-sm text-hyve-text/80">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Strategic Vision */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-8 font-heading text-center"
              >
                Strategic Vision
              </motion.h2>

              <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      2025
                    </div>
                    <h3 className="text-lg font-semibold text-hyve-header mb-2">
                      UK Market Leader
                    </h3>
                    <p className="text-sm text-hyve-text/80">
                      Leading position in aerospace sensing technology
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      2027
                    </div>
                    <h3 className="text-lg font-semibold text-hyve-header mb-2">
                      International Expansion
                    </h3>
                    <p className="text-sm text-hyve-text/80">
                      Growth across Europe and North America
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hyve-accent to-hyve-interactive flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      2030
                    </div>
                    <h3 className="text-lg font-semibold text-hyve-header mb-2">Global Standard</h3>
                    <p className="text-sm text-hyve-text/80">
                      Industry standard for real-world data acquisition
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hyve-accent to-hyve-interactive flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                      Beyond
                    </div>
                    <h3 className="text-lg font-semibold text-hyve-header mb-2">
                      Platform Technology
                    </h3>
                    <p className="text-sm text-hyve-text/80">
                      Enabling emerging industries worldwide
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-base md:text-lg text-hyve-text/80 mb-6">
                    By 2030, we aim to achieve a 2.5x improvement in UK aerospace competitiveness,
                    enabling over 500 high-value jobs and generating £57M+ in annual revenue.
                  </p>
                  <Button
                    size="lg"
                    className="bg-hyve-text hover:bg-hyve-text-dark text-white group"
                    onClick={() => {
                      // Trigger the contact form in the header
                      const contactButton = document.querySelector(
                        '[data-contact-trigger]'
                      ) as HTMLButtonElement
                      if (contactButton) {
                        contactButton.click()
                      }
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Demo
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Market Opportunity */}
        <Vision />

        {/* Footer spacing */}
        <div className="h-24" />
      </CustomMeshBackground>
    </div>
  )
}
