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

const videoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const IndustryPageTemplate: React.FC<IndustryPageProps> = ({ industry }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen relative">
      <CustomMeshBackground enabled={true} className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Content */}
              <div className="text-left">
                {/* Back to Home */}
                <motion.div variants={itemVariants} className="mb-8">
                  <Link to="/">
                    <Button variant="ghost" size="sm" className="group">
                      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Back to Home
                    </Button>
                  </Link>
                </motion.div>

                {/* Badge */}
                {industry.badge && (
                  <motion.div variants={itemVariants} className="mb-4">
                    <Badge variant="secondary" className="px-4 py-1 text-sm font-medium">
                      {industry.badge}
                    </Badge>
                  </motion.div>
                )}

                {/* Title */}
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-6 font-heading"
                >
                  {industry.title}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  variants={itemVariants}
                  className="text-xl md:text-2xl text-hyve-text font-light mb-6"
                >
                  {industry.tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-hyve-text/80 leading-relaxed mb-8"
                >
                  {industry.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-hyve-text hover:bg-hyve-text-dark text-white group"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-hyve-accent text-hyve-text hover:bg-hyve-accent/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Whitepaper
                  </Button>
                </motion.div>
              </div>

              {/* Right Content - Video */}
              <motion.div
                variants={videoVariants}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-full max-w-[600px]">
                  {/* Glass morphism container */}
                  <div className="absolute inset-0 bg-gradient-to-br from-hyve-accent/10 to-hyve-interactive/10 rounded-3xl blur-xl" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto rounded-2xl"
                    >
                      <source src={industry.videoPath} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 lg:py-32">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Section Header */}
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  Key Features & Benefits
                </h2>
                <p className="text-lg text-hyve-text/80 max-w-2xl mx-auto">
                  Discover how our technology transforms {industry.title.toLowerCase()} operations
                </p>
              </motion.div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industry.features.map((feature, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full bg-white/80 backdrop-blur-sm border-hyve-content hover:border-hyve-accent transition-all duration-300 hover:shadow-lg">
                      <div className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white font-bold">
                            ✓
                          </div>
                          <h3 className="text-xl font-semibold text-hyve-header flex-1">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-hyve-text/80 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="relative py-20 lg:py-32">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center"
            >
              {/* Summary Content */}
              <motion.div
                variants={itemVariants}
                className="max-w-4xl mx-auto bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl p-12 border border-hyve-content"
              >
                <p className="text-xl text-hyve-text leading-relaxed mb-8">
                  {industry.summary}
                </p>
                <p className="text-2xl font-semibold text-hyve-header font-heading">
                  {industry.cta}
                </p>
              </motion.div>

              {/* Final CTA */}
              <motion.div variants={itemVariants} className="mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-hyve-interactive via-hyve-interactive-light to-hyve-interactive hover:scale-105 transition-transform text-white px-8 py-6 text-lg"
                >
                  Contact Our {industry.title} Experts
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-32" />
      </CustomMeshBackground>
    </div>
  )
}