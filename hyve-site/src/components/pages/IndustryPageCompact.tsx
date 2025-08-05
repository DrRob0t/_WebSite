import { motion } from 'framer-motion'
import { ArrowLeft, Download, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { CustomMeshBackground } from '@/components/ui/CustomMeshBackground'

interface IndustryPageProps {
  industry: {
    id: string
    title: string
    tagline: string
    description: string
    videoPath: string
    features: {
      title: string
      description: string
    }[]
    summary: string
    cta: string
    badge?: string
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const IndustryPageCompact: React.FC<IndustryPageProps> = ({ industry }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen relative">
      <CustomMeshBackground enabled={true} className="min-h-screen">
        {/* Single Viewport Layout */}
        <section className="relative min-h-screen flex items-start overflow-hidden pt-24">
          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-5 gap-8"
            >
              {/* Left Content - 2 columns */}
              <div className="lg:col-span-2 text-left">
                {/* Back to Home */}
                <motion.div variants={itemVariants} className="mb-6">
                  <Link to="/">
                    <Button variant="ghost" size="sm" className="group">
                      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Back to Home
                    </Button>
                  </Link>
                </motion.div>

                {/* Badge */}
                {industry.badge && (
                  <motion.div variants={itemVariants} className="mb-3">
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                      {industry.badge}
                    </Badge>
                  </motion.div>
                )}

                {/* Title */}
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-hyve-header mb-4 font-heading"
                >
                  {industry.title}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-hyve-text font-light mb-4"
                >
                  {industry.tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-base text-hyve-text/80 leading-relaxed mb-6"
                >
                  {industry.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                  <Button
                    size="default"
                    className="bg-hyve-text hover:bg-hyve-text-dark text-white group"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    className="border-hyve-accent text-hyve-text hover:bg-hyve-accent/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Whitepaper
                  </Button>
                </motion.div>
              </div>

              {/* Center - Video - 1 column */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-1 flex items-center justify-center"
              >
                <div className="relative w-full">
                  {/* Glass morphism container */}
                  <div className="absolute inset-0 bg-gradient-to-br from-hyve-accent/10 to-hyve-interactive/10 rounded-2xl blur-xl" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto rounded-xl"
                    >
                      <source src={industry.videoPath} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </motion.div>

              {/* Right - Features Grid - 2 columns */}
              <div className="lg:col-span-2">
                <motion.div variants={itemVariants}>
                  {/* Opaque container for features */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-hyve-content/20">
                    <h2 className="text-2xl font-bold text-hyve-header mb-4 font-heading">
                      Key Features & Benefits
                    </h2>
                    <div className="space-y-3">
                      {industry.features.slice(0, 5).map((feature, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                            ✓
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-hyve-header mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-hyve-text/80 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Summary below features */}
                <motion.div variants={itemVariants} className="mt-4">
                  <div className="bg-gradient-to-br from-hyve-content/80 to-hyve-accent/20 backdrop-blur-sm rounded-xl p-4 border border-hyve-content/30">
                    <p className="text-sm text-hyve-text leading-relaxed">
                      {industry.summary}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom CTA - Full width */}
            <motion.div
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <p className="text-lg font-semibold text-hyve-header font-heading">
                {industry.cta}
              </p>
            </motion.div>
          </div>
        </section>
      </CustomMeshBackground>
    </div>
  )
}