import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  ChevronRight,
  Brain,
  Cpu,
  Shield,
  Zap,
  Target,
  Award,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

const featureVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
}

export const HapticMatrixPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen relative">
      <CustomMeshBackground enabled={true} className="min-h-screen" blur={true} blurIntensity="sm">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center py-16 lg:py-20 pointer-events-auto">
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
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Content */}
              <div>
                <motion.div variants={itemVariants} className="mb-6">
                  <Badge variant="secondary" className="px-4 py-1 text-sm font-medium">
                    REVOLUTIONARY TECHNOLOGY
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-4 font-heading"
                >
                  Haptic Matrix Technology
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-xl md:text-2xl text-hyve-text font-light mb-6"
                >
                  Redefining Aerodynamic Sensing Through Biomimicry
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-lg text-hyve-text/80 leading-relaxed mb-8"
                >
                  Our patented ultra-thin sensor technology transforms any surface into an
                  intelligent, responsive monitoring system, providing unprecedented real-time
                  insights for aerospace innovation.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-hyve-text hover:bg-hyve-text-dark text-white group"
                    onClick={() => {
                      // Scroll to technical specifications section
                      const techSpecsSection = document.getElementById('technical-specifications')
                      if (techSpecsSection) {
                        techSpecsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                    }}
                  >
                    Technical Specifications
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-hyve-accent text-hyve-text hover:bg-hyve-accent/10"
                    onClick={() => {
                      // Navigate to white papers when available
                      navigate('/insights/white-papers')
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Datasheet
                  </Button>
                </motion.div>
              </div>

              {/* Right Visual - Key Stats */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10"
              >
                <h3 className="text-2xl font-bold text-hyve-header mb-6 font-heading">
                  Key Performance Metrics
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white flex-shrink-0">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-hyve-header">0.33mm</div>
                      <div className="text-sm text-hyve-text/70">Ultra-thin sensor thickness</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white flex-shrink-0">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-hyve-header">100+</div>
                      <div className="text-sm text-hyve-text/70">Sensors per 576cm²</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white flex-shrink-0">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-hyve-header">&lt;10ms</div>
                      <div className="text-sm text-hyve-text/70">Real-time data latency</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white flex-shrink-0">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-hyve-header">Mach 0.85</div>
                      <div className="text-sm text-hyve-text/70">Maximum operating speed</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Nature's Blueprint Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.div variants={itemVariants} className="flex items-center mb-8">
                <Brain className="h-8 w-8 text-hyve-interactive mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header font-heading">
                  Nature's Blueprint: The Inspiration Behind Innovation
                </h2>
              </motion.div>

              <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-base md:text-lg text-hyve-text/80 leading-relaxed mb-6">
                    In nature, the most successful organisms possess sophisticated sensory systems
                    that provide instant, comprehensive awareness of their environment. From the
                    delicate touch receptors distributed across human skin to the lateral line
                    sensors that allow fish to navigate turbulent waters, evolution has perfected
                    the art of distributed sensing.
                  </p>
                  <p className="text-base md:text-lg text-hyve-text/80 leading-relaxed">
                    The Hyve Haptic Matrix draws inspiration from these biological sensory networks,
                    specifically replicating the{' '}
                    <strong className="text-hyve-header">peripheral nervous system's</strong>{' '}
                    ability to detect multiple stimuli simultaneously across large surface areas.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-hyve-content/30 to-hyve-accent/10 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-hyve-header mb-4">
                    Biomimetic Capabilities
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-hyve-interactive mr-2">•</span>
                      <span className="text-sm text-hyve-text/80">
                        Detect multiple stimuli simultaneously across large surface areas
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-hyve-interactive mr-2">•</span>
                      <span className="text-sm text-hyve-text/80">
                        Process information in real-time with remarkable sensitivity
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-hyve-interactive mr-2">•</span>
                      <span className="text-sm text-hyve-text/80">
                        Adapt to complex geometries and environmental conditions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-hyve-interactive mr-2">•</span>
                      <span className="text-sm text-hyve-text/80">
                        Provide continuous feedback for optimal performance
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Core Technology Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                The Technology: Ultra-Thin Sensor Skin
              </h2>
              <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto">
                Our patented Haptic Matrix consists of an ultra-thin, flexible electronic sensor
                array that seamlessly conforms to complex aerodynamic surfaces.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {/* Multi-Parameter Sensing */}
              <motion.div variants={featureVariants}>
                <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-hyve-header mb-4">
                      Multi-Parameter Sensing
                    </h3>
                    <p className="text-sm text-hyve-text/80 mb-4">
                      Each sensor node simultaneously captures:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-sm text-hyve-text/80">
                        <strong className="text-hyve-header">• Bi-directional pressure</strong>{' '}
                        (positive and negative)
                      </li>
                      <li className="text-sm text-hyve-text/80">
                        <strong className="text-hyve-header">• Temperature</strong> variations
                      </li>
                      <li className="text-sm text-hyve-text/80">
                        <strong className="text-hyve-header">• Strain</strong> dynamics
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Scalable Architecture */}
              <motion.div variants={featureVariants}>
                <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-hyve-header mb-4">
                      Scalable Architecture
                    </h3>
                    <p className="text-sm text-hyve-text/80 mb-4">
                      Configurations from individual sensors to thousands:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-sm text-hyve-text/80">
                        <strong className="text-hyve-header">• 10x1 arrays</strong> for wing edges
                      </li>
                      <li className="text-sm text-hyve-text/80">
                        <strong className="text-hyve-header">• 10x5 grids</strong> for control
                        surfaces
                      </li>
                      <li className="text-sm text-hyve-text/80">
                        <strong className="text-hyve-header">• 10x20 matrices</strong> for fuselage
                        panels
                      </li>
                      <li className="text-sm text-hyve-text/80">
                        <strong className="text-hyve-header">• Custom geometries</strong> for
                        specialized needs
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Core Innovation */}
              <motion.div variants={featureVariants}>
                <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-hyve-header mb-4">Core Innovation</h3>
                    <p className="text-sm text-hyve-text/80 mb-4">
                      Unlike traditional rigid instrumentation, our sensor skin becomes part of the
                      surface itself:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-sm text-hyve-text/80">• No aerodynamic disruption</li>
                      <li className="text-sm text-hyve-text/80">
                        • Maintains structural integrity
                      </li>
                      <li className="text-sm text-hyve-text/80">
                        • Unprecedented sensing capabilities
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Technical Specifications Table */}
        <section
          id="technical-specifications"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
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
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-8 font-heading text-center"
              >
                Technical Specifications
              </motion.h2>

              {/* Performance Characteristics */}
              <motion.div variants={itemVariants} className="mb-10">
                <h3 className="text-2xl font-semibold text-hyve-header mb-6">
                  Performance Characteristics
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-hyve-content/20">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-hyve-header">
                          Parameter
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-hyve-header">
                          Specification
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-hyve-header">
                          Advantage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-hyve-content/10">
                        <td className="py-3 px-4 text-sm text-hyve-text/80">Thickness</td>
                        <td className="py-3 px-4 text-sm font-medium text-hyve-header">0.33mm</td>
                        <td className="py-3 px-4 text-sm text-hyve-text/80">
                          Non-intrusive integration
                        </td>
                      </tr>
                      <tr className="border-b border-hyve-content/10">
                        <td className="py-3 px-4 text-sm text-hyve-text/80">Sensor Density</td>
                        <td className="py-3 px-4 text-sm font-medium text-hyve-header">
                          100 sensors per 576cm²
                        </td>
                        <td className="py-3 px-4 text-sm text-hyve-text/80">
                          High-resolution data capture
                        </td>
                      </tr>
                      <tr className="border-b border-hyve-content/10">
                        <td className="py-3 px-4 text-sm text-hyve-text/80">Pressure Accuracy</td>
                        <td className="py-3 px-4 text-sm font-medium text-hyve-header">
                          ±1.5% (target)
                        </td>
                        <td className="py-3 px-4 text-sm text-hyve-text/80">
                          Precision aerodynamic measurement
                        </td>
                      </tr>
                      <tr className="border-b border-hyve-content/10">
                        <td className="py-3 px-4 text-sm text-hyve-text/80">Sampling Rate</td>
                        <td className="py-3 px-4 text-sm font-medium text-hyve-header">
                          &gt;1 kHz per sensor
                        </td>
                        <td className="py-3 px-4 text-sm text-hyve-text/80">
                          Real-time dynamic response
                        </td>
                      </tr>
                      <tr className="border-b border-hyve-content/10">
                        <td className="py-3 px-4 text-sm text-hyve-text/80">Data Latency</td>
                        <td className="py-3 px-4 text-sm font-medium text-hyve-header">&lt;10ms</td>
                        <td className="py-3 px-4 text-sm text-hyve-text/80">
                          Immediate feedback capability
                        </td>
                      </tr>
                      <tr className="border-b border-hyve-content/10">
                        <td className="py-3 px-4 text-sm text-hyve-text/80">Operating Speed</td>
                        <td className="py-3 px-4 text-sm font-medium text-hyve-header">
                          Up to Mach 0.85
                        </td>
                        <td className="py-3 px-4 text-sm text-hyve-text/80">
                          High-speed aerodynamic validation
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Environmental Resilience */}
              <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-hyve-header mb-4">
                    Environmental Resilience
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Temperature Range:</strong> -40°C to
                      +100°C
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Vibration Tolerance:</strong> 5 Hz to
                      2000 Hz
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Chemical Resistance:</strong> Aviation
                      fuels, de-icing fluids
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">UV Protection:</strong> Long-term outdoor
                      exposure
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Humidity Resistance:</strong> 95% RH
                      operation
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-hyve-header mb-4">
                    Integration Capabilities
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Surface Conformity:</strong> 5mm radius
                      curves to broad contours
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Material Compatibility:</strong> Carbon
                      fiber, aluminum, composites
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Installation Methods:</strong> Surface
                      bonding or embedded
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">Connectivity:</strong> Wireless and wired
                      transmission
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Technology Readiness Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  Technology Readiness & Development Roadmap
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto">
                  Advancing from laboratory demonstration to aerospace-grade validation
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Current Status */}
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hyve-interactive to-hyve-interactive-dark flex items-center justify-center text-white text-2xl font-bold">
                          TRL 6
                        </div>
                        <div className="ml-4">
                          <h3 className="text-2xl font-bold text-hyve-header">Current Status</h3>
                          <p className="text-sm text-hyve-text/70">Advancing to TRL 6</p>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-hyve-header mb-3">
                        TRL 6 Objectives
                      </h4>
                      <ul className="space-y-2 mb-6">
                        <li className="text-sm text-hyve-text/80">
                          • High-Speed Validation at Mach 0.85
                        </li>
                        <li className="text-sm text-hyve-text/80">
                          • Full aerospace environmental testing
                        </li>
                        <li className="text-sm text-hyve-text/80">• Manufacturing optimization</li>
                        <li className="text-sm text-hyve-text/80">
                          • System integration validation
                        </li>
                      </ul>

                      <h4 className="text-lg font-semibold text-hyve-header mb-3">
                        Validation Program
                      </h4>
                      <ul className="space-y-2">
                        <li className="text-sm text-hyve-text/80">• QinetiQ wind tunnel testing</li>
                        <li className="text-sm text-hyve-text/80">
                          • Icing conditions performance
                        </li>
                        <li className="text-sm text-hyve-text/80">• Extended thermal cycling</li>
                        <li className="text-sm text-hyve-text/80">• Aerospace vibration testing</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Future Roadmap */}
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-hyve-header mb-6">Future Roadmap</h3>

                      <div className="space-y-6">
                        <div className="relative">
                          <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-hyve-content/20"></div>

                          <div className="relative flex items-start mb-6">
                            <div className="w-16 h-16 rounded-full bg-hyve-content/10 flex items-center justify-center text-hyve-header font-bold border-2 border-hyve-content/20">
                              TRL 7-8
                            </div>
                            <div className="ml-6">
                              <h4 className="text-lg font-semibold text-hyve-header">
                                12-24 months
                              </h4>
                              <p className="text-sm text-hyve-text/80">
                                System integration and paid pilot programs
                              </p>
                            </div>
                          </div>

                          <div className="relative flex items-start">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-hyve-accent to-hyve-interactive flex items-center justify-center text-white font-bold">
                              TRL 9
                            </div>
                            <div className="ml-6">
                              <h4 className="text-lg font-semibold text-hyve-header">24+ months</h4>
                              <p className="text-sm text-hyve-text/80">
                                Full commercial deployment and certification
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Competitive Advantages */}
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
                Competitive Advantages
              </motion.h2>

              {/* Comparison Table */}
              <motion.div variants={itemVariants} className="mb-10 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-hyve-content/20">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-hyve-header">
                        Capability
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-hyve-header">
                        Hyve Matrix
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-hyve-header">
                        Pressure Taps
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-hyve-header">
                        CFD Simulation
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-hyve-header">
                        Pressure Paint
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-hyve-content/10">
                      <td className="py-3 px-4 text-sm text-hyve-text/80">Real-time Data</td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-hyve-content/10">
                      <td className="py-3 px-4 text-sm text-hyve-text/80">Non-intrusive</td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-hyve-content/10">
                      <td className="py-3 px-4 text-sm text-hyve-text/80">Multi-parameter</td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-hyve-content/10">
                      <td className="py-3 px-4 text-sm text-hyve-text/80">Re-usable</td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-hyve-content/10">
                      <td className="py-3 px-4 text-sm text-hyve-text/80">Low Cost</td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-hyve-content/10">
                      <td className="py-3 px-4 text-sm text-hyve-text/80">Field Deployment</td>
                      <td className="text-center py-3 px-4">
                        <span className="text-green-600 text-xl">✓</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-red-500 text-xl">✗</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>

              {/* Key Differentiators */}
              <motion.div
                variants={itemVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-hyve-header mb-2">55%</div>
                  <p className="text-sm text-hyve-text/80">Cost reduction vs traditional methods</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-hyve-header mb-2">Real-time</div>
                  <p className="text-sm text-hyve-text/80">Monitoring for IVHM capabilities</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-hyve-header mb-2">Flexible</div>
                  <p className="text-sm text-hyve-text/80">Deployment across any geometry</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  Applications & Use Cases
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto">
                  From early-stage validation to in-flight monitoring, our technology enables a new
                  era of aerospace development
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Simulation Validation',
                    description: 'Empirical data to validate CFD models',
                    icon: '📊',
                  },
                  {
                    title: 'Sustainable Propulsion',
                    description: 'Testing hydrogen and hybrid-electric systems',
                    icon: '🌱',
                  },
                  {
                    title: 'Health Monitoring',
                    description: 'Continuous structural and aerodynamic monitoring',
                    icon: '🔍',
                  },
                  {
                    title: 'Surface Control',
                    description: 'Real-time feedback for adaptive aerodynamics',
                    icon: '🎯',
                  },
                ].map((app, index) => (
                  <motion.div key={index} variants={featureVariants}>
                    <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4">{app.icon}</div>
                        <h3 className="text-lg font-semibold text-hyve-header mb-2">{app.title}</h3>
                        <p className="text-sm text-hyve-text/80">{app.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Patent Portfolio Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 rounded-3xl p-8 lg:p-12"
            >
              <motion.div variants={itemVariants} className="flex items-center mb-8">
                <Award className="h-8 w-8 text-hyve-interactive mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header font-heading">
                  Patent Protection & IP Portfolio
                </h2>
              </motion.div>

              <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-base md:text-lg text-hyve-text/80 mb-6">
                    Our technology is protected by a comprehensive patent portfolio including:
                  </p>
                  <ul className="space-y-3">
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">
                        • Stretchable Bidirectional Pressure Sensors
                      </strong>{' '}
                      (GB2580928)
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">• Multifunctional Sensor Arrays</strong>{' '}
                      (GB2582299)
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">
                        • Integrated Sensor-Transistor Arrays
                      </strong>{' '}
                      (GB2602973)
                    </li>
                    <li className="text-sm text-hyve-text/80">
                      <strong className="text-hyve-header">• Advanced Integration Methods</strong> -
                      Surface bonding and composite embedding
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-hyve-header mb-4">10+</div>
                    <p className="text-lg text-hyve-text/80">International Patents</p>
                    <p className="text-sm text-hyve-text/60 mt-2">
                      Providing strong competitive protection and strategic partnership
                      opportunities
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12 text-center"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading"
              >
                Supporting the Future of Flight
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto mb-8"
              >
                The aviation industry faces unprecedented challenges in achieving net-zero emissions
                while maintaining safety and performance standards. The Haptic Matrix changes this
                equation by making comprehensive aerodynamic testing accessible, affordable, and
                deployable anywhere it's needed.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg font-semibold text-hyve-header mb-8"
              >
                Ready to transform your approach to aerodynamic testing and monitoring?
              </motion.p>

              <motion.div variants={itemVariants}>
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
                  Contact Our Team
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer spacing */}
        <div className="h-24" />
      </CustomMeshBackground>
    </div>
  )
}
