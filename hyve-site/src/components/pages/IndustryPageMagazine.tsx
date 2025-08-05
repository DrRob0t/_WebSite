import { motion } from 'framer-motion'
import { ArrowLeft, Download, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
      staggerChildren: 0.05,
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
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const IndustryPageMagazine: React.FC<IndustryPageProps> = ({ industry }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen relative">
      <CustomMeshBackground enabled={true} className="min-h-screen">
        {/* Magazine Style Layout */}
        <section className="relative min-h-screen pt-20 pb-8">
          <div className="relative z-10 w-full h-full max-w-[1800px] mx-auto px-6 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link to="/">
                <Button variant="ghost" size="sm" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            {/* Main Content Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-160px)]"
            >
              {/* Left Column - Hero Content */}
              <div className="lg:col-span-4 flex flex-col">
                {/* Opaque Background Container */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-hyve-content/20 flex-1 flex flex-col">
                  {/* Badge */}
                  {industry.badge && (
                    <motion.div variants={itemVariants} className="mb-4">
                      <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                        {industry.badge}
                      </Badge>
                    </motion.div>
                  )}

                  {/* Title */}
                  <motion.h1
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-bold text-hyve-header mb-3 font-heading"
                  >
                    {industry.title}
                  </motion.h1>

                  {/* Tagline */}
                  <motion.p
                    variants={itemVariants}
                    className="text-xl text-hyve-text font-light mb-4"
                  >
                    {industry.tagline}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    variants={itemVariants}
                    className="text-base text-hyve-text/80 leading-relaxed mb-6 flex-1"
                  >
                    {industry.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                    <Button
                      size="default"
                      className="bg-hyve-text hover:bg-hyve-text-dark text-white group flex-1 lg:flex-initial"
                    >
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      size="default"
                      variant="outline"
                      className="border-hyve-accent text-hyve-text hover:bg-hyve-accent/10 flex-1 lg:flex-initial"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Whitepaper
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Center Column - Video */}
              <div className="lg:col-span-3 flex items-center">
                <motion.div
                  variants={itemVariants}
                  className="relative w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-hyve-accent/10 to-hyve-interactive/10 rounded-2xl blur-xl" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 h-full flex items-center">
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
                </motion.div>
              </div>

              {/* Right Column - Features */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Features Grid */}
                <motion.div variants={itemVariants} className="flex-1">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-hyve-content/20 h-full">
                    <h2 className="text-2xl font-bold text-hyve-header mb-4 font-heading">
                      Key Features & Benefits
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {industry.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                            ✓
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-hyve-header mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-xs text-hyve-text/80 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Summary Box */}
                <motion.div variants={itemVariants}>
                  <div className="bg-gradient-to-br from-hyve-interactive/20 to-hyve-accent/20 backdrop-blur-sm rounded-xl p-5 border border-hyve-interactive/30">
                    <p className="text-sm text-hyve-text leading-relaxed mb-3">
                      {industry.summary}
                    </p>
                    <p className="text-base font-semibold text-hyve-header font-heading">
                      {industry.cta}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </CustomMeshBackground>
    </div>
  )
}