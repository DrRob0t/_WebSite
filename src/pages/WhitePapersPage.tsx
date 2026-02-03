import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Download, Clock, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { SEO } from '@/components/common/SEO'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// White paper data
interface WhitePaper {
  id: string
  title: string
  description: string
  category: string
  pages: number
  publishDate: string
  topics: string[]
  comingSoon?: boolean
}

const whitePapers: WhitePaper[] = [
  {
    id: 'haptic-matrix-technical-overview',
    title: 'Haptic Matrix Technology: Technical Overview',
    description:
      'A comprehensive technical deep-dive into our ultra-thin sensor technology, covering multi-parameter sensing, scalable architecture, and aerospace-grade specifications.',
    category: 'Technology',
    pages: 24,
    publishDate: '2025-Q1',
    topics: ['Sensor Technology', 'Aerospace', 'Technical Specifications'],
    comingSoon: true,
  },
  {
    id: 'wind-tunnel-instrumentation',
    title: 'Revolutionizing Wind Tunnel Instrumentation',
    description:
      "How Hyve's conformal sensor arrays are transforming experimental aerodynamics, reducing test cycles by 40-60% while improving data quality.",
    category: 'Applications',
    pages: 18,
    publishDate: '2025-Q1',
    topics: ['Wind Tunnels', 'Aerodynamics', 'Test & Measurement'],
    comingSoon: true,
  },
  {
    id: 'from-simulation-to-reality',
    title: 'Bridging the Gap: From CFD Simulation to Flight Reality',
    description:
      'Understanding model-to-flight correlation challenges and how real-time surface data closes the validation gap in aerospace development.',
    category: 'Research',
    pages: 32,
    publishDate: '2025-Q2',
    topics: ['CFD Validation', 'Flight Test', 'Digital Twins'],
    comingSoon: true,
  },
]

export const WhitePapersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="White Papers"
        description="Access technical white papers and research publications from Hyve Dynamics covering sensor technology, aerodynamic testing, and aerospace innovation."
        keywords="white papers, technical documentation, sensor technology research, aerospace papers, wind tunnel testing, aerodynamic measurement"
      />

      <div className="min-h-screen bg-hyve-background">
        {/* Header Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="hyve-container">
            {/* Back Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-hyve-text hover:text-hyve-interactive transition-colors font-body"
              >
                <ArrowLeft className="h-4 w-4" />
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
                  TECHNICAL RESOURCES
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-4 font-heading"
              >
                White Papers
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-hyve-text font-light mb-6 max-w-3xl mx-auto"
              >
                Technical Deep Dives & Research
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-hyve-text/80 leading-relaxed max-w-4xl mx-auto"
              >
                Explore our library of technical white papers covering sensor technology, aerospace
                applications, and the science behind our innovations.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* White Papers Grid */}
        <section className="relative py-8 lg:py-12 pointer-events-auto">
          <div className="hyve-container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {whitePapers.map(paper => (
                <motion.div key={paper.id} variants={itemVariants}>
                  <Card className="h-full bg-white/80 backdrop-blur-sm border border-hyve-content hover:border-hyve-accent transition-all duration-300 hover:shadow-hyve-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-hyve-interactive/10 text-hyve-interactive"
                        >
                          {paper.category}
                        </Badge>
                        {paper.comingSoon && (
                          <Badge variant="outline" className="text-amber-600 border-amber-300">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-heading font-semibold text-hyve-header">
                        {paper.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-hyve-text/60 mt-2">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {paper.pages} pages
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {paper.publishDate}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-hyve-text/80 leading-relaxed mb-4 font-body">
                        {paper.description}
                      </CardDescription>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.topics.map(topic => (
                          <span
                            key={topic}
                            className="text-xs bg-hyve-content/30 text-hyve-text/70 px-2 py-1 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-hyve-accent text-hyve-text hover:bg-hyve-interactive hover:text-white"
                        disabled={paper.comingSoon}
                      >
                        {paper.comingSoon ? (
                          'Available Soon'
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Request Custom Paper */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-16 text-center"
            >
              <Card className="bg-gradient-to-r from-hyve-interactive/10 to-hyve-accent/10 border-hyve-accent/30 max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-hyve-interactive/20">
                      <ExternalLink className="h-6 w-6 text-hyve-interactive" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-heading text-hyve-header">
                    Need Specific Information?
                  </CardTitle>
                  <CardDescription className="text-hyve-text/80 font-body">
                    Contact us to discuss your specific technical requirements or request access to
                    detailed specifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="bg-hyve-interactive hover:bg-hyve-interactive-dark text-white"
                    onClick={() => {
                      const contactButton = document.querySelector(
                        '[data-contact-trigger]'
                      ) as HTMLButtonElement
                      if (contactButton) contactButton.click()
                    }}
                  >
                    Request Information
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  )
}
