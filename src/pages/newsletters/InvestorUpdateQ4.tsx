import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, Download, Lock, TrendingUp, DollarSign, Users, Target } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { NoIndex } from '@/components/common/NoIndex'
import { SEO } from '@/components/common/SEO'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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

export const InvestorUpdateQ4 = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NoIndex />
      <SEO
        title="Q4 2023 Investor Update - Confidential"
        description="Confidential quarterly update for Hyve Dynamics investors covering financial performance, strategic partnerships, and growth initiatives."
        keywords="investor update, financial performance, strategic partnerships, confidential, quarterly results"
      />

      <div className="min-h-screen bg-hyve-background">
        {/* Header Section */}
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="hyve-container">
            {/* Confidential Notice */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-800">
                <Lock className="h-5 w-5" />
                <span className="font-semibold">CONFIDENTIAL - INVESTORS ONLY</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                This document contains confidential and proprietary information. Distribution is restricted to authorized investors only.
              </p>
            </motion.div>

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
              className="max-w-4xl mx-auto"
            >
              {/* Article Header */}
              <motion.div variants={itemVariants} className="mb-8">
                <Badge variant="secondary" className="px-4 py-1 text-sm font-medium mb-4 bg-red-100 text-red-800">
                  INVESTOR CONFIDENTIAL
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-6 font-heading">
                  Q4 2023 Investor Update
                </h1>

                <div className="flex items-center gap-6 text-sm text-hyve-text/70 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    January 10, 2024
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    12 min read
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-hyve-accent text-hyve-text hover:bg-hyve-accent hover:text-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share (Authorized Only)
                  </Button>
                  <Button variant="outline" size="sm" className="border-hyve-accent text-hyve-text hover:bg-hyve-accent hover:text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </motion.div>

              <Separator className="mb-8" />

              {/* Article Content */}
              <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
                <div className="space-y-8 text-hyve-text font-body leading-relaxed">
                  
                  {/* Executive Summary */}
                  <div className="text-xl text-hyve-text/90 font-light leading-relaxed bg-hyve-content/30 p-6 rounded-lg border-l-4 border-hyve-interactive">
                    Q4 2023 marked a transformational quarter for Hyve Dynamics, with record revenue growth of 
                    185% year-over-year, successful completion of Series B funding, and strategic partnerships 
                    that position us for accelerated market expansion in 2024.
                  </div>

                  {/* Key Metrics Dashboard */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                    <Card className="bg-white/80 backdrop-blur-sm border border-hyve-content text-center">
                      <CardHeader className="pb-2">
                        <div className="p-2 rounded-md bg-green-100 w-fit mx-auto">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-lg font-heading text-hyve-header">€18.5M</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-hyve-text/80 font-semibold">
                          Q4 Revenue
                        </CardDescription>
                        <p className="text-sm text-green-600 font-medium">+185% YoY</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm border border-hyve-content text-center">
                      <CardHeader className="pb-2">
                        <div className="p-2 rounded-md bg-blue-100 w-fit mx-auto">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg font-heading text-hyve-header">€45M</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-hyve-text/80 font-semibold">
                          Series B Funding
                        </CardDescription>
                        <p className="text-sm text-blue-600 font-medium">Oversubscribed</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm border border-hyve-content text-center">
                      <CardHeader className="pb-2">
                        <div className="p-2 rounded-md bg-purple-100 w-fit mx-auto">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg font-heading text-hyve-header">47</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-hyve-text/80 font-semibold">
                          Team Members
                        </CardDescription>
                        <p className="text-sm text-purple-600 font-medium">+76% Growth</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm border border-hyve-content text-center">
                      <CardHeader className="pb-2">
                        <div className="p-2 rounded-md bg-orange-100 w-fit mx-auto">
                          <Target className="h-6 w-6 text-orange-600" />
                        </div>
                        <CardTitle className="text-lg font-heading text-hyve-header">12</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-hyve-text/80 font-semibold">
                          Major Contracts
                        </CardDescription>
                        <p className="text-sm text-orange-600 font-medium">Enterprise Clients</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Section 1: Financial Performance */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-hyve-header mb-4 font-heading">
                      Financial Performance
                    </h2>
                    <p className="mb-4">
                      Q4 2023 delivered exceptional financial results, significantly exceeding our projections 
                      and establishing a strong foundation for 2024 growth initiatives.
                    </p>
                    
                    <div className="bg-hyve-content/20 p-6 rounded-lg border border-hyve-content mb-6">
                      <h3 className="text-xl font-semibold text-hyve-header mb-4">Revenue Breakdown</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-hyve-header mb-2">By Sector</h4>
                          <ul className="space-y-1 text-sm">
                            <li>Aerospace: €7.2M (39%)</li>
                            <li>Automotive: €5.9M (32%)</li>
                            <li>Energy: €3.1M (17%)</li>
                            <li>Industrial: €2.3M (12%)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-hyve-header mb-2">By Region</h4>
                          <ul className="space-y-1 text-sm">
                            <li>Europe: €9.8M (53%)</li>
                            <li>North America: €6.1M (33%)</li>
                            <li>Asia-Pacific: €2.6M (14%)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-hyve-header mb-3">Key Financial Highlights</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Gross margin improved to 68%, up from 62% in Q3</li>
                      <li>Monthly recurring revenue (MRR) grew 94% quarter-over-quarter</li>
                      <li>Customer acquisition cost (CAC) decreased 23% through improved sales efficiency</li>
                      <li>Annual recurring revenue (ARR) reached €52M, exceeding guidance by 15%</li>
                    </ul>
                  </div>

                  {/* Section 2: Strategic Partnerships */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-hyve-header mb-4 font-heading">
                      Strategic Partnerships & Major Contracts
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-hyve-header mb-3">Aerospace Breakthrough</h3>
                    <p className="mb-4">
                      Our partnership with [Confidential Major Aerospace OEM] represents our largest contract 
                      to date, valued at €28M over three years. This agreement validates our technology for 
                      next-generation commercial aircraft and establishes Hyve as a key supplier in the 
                      aerospace sensor ecosystem.
                    </p>

                    <h3 className="text-xl font-semibold text-hyve-header mb-3">Automotive Expansion</h3>
                    <p className="mb-4">
                      Three Formula 1 teams have integrated our Haptic Matrix technology for real-time 
                      aerodynamic optimization. Early results show 2-4% performance improvements, leading 
                      to expanded contracts for the 2024 season.
                    </p>

                    <h3 className="text-xl font-semibold text-hyve-header mb-3">Energy Sector Growth</h3>
                    <p className="mb-4">
                      Partnerships with leading wind turbine manufacturers have resulted in €12M in committed 
                      orders for 2024. Our blade monitoring systems are demonstrating 15-20% efficiency 
                      improvements in field trials.
                    </p>
                  </div>

                  {/* Section 3: Technology Development */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-hyve-header mb-4 font-heading">
                      Technology & Product Development
                    </h2>
                    
                    <div className="bg-hyve-content/20 p-6 rounded-lg border border-hyve-content">
                      <h3 className="text-xl font-semibold text-hyve-header mb-3">R&D Milestones</h3>
                      <ul className="space-y-3">
                        <li>
                          <strong className="text-hyve-header">Gen 3 Haptic Matrix:</strong> Achieved 50% 
                          reduction in power consumption while doubling sensor density
                        </li>
                        <li>
                          <strong className="text-hyve-header">AI Integration:</strong> On-sensor machine 
                          learning algorithms reduce data transmission by 85%
                        </li>
                        <li>
                          <strong className="text-hyve-header">Manufacturing Scale:</strong> New production 
                          facility capable of 10M sensors per month
                        </li>
                        <li>
                          <strong className="text-hyve-header">IP Portfolio:</strong> 23 new patents filed, 
                          bringing total portfolio to 87 patents
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 4: Market Opportunity */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-hyve-header mb-4 font-heading">
                      Market Opportunity & 2024 Outlook
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-hyve-header mb-3">Total Addressable Market</h3>
                    <p className="mb-4">
                      Our combined TAM across aerospace (€60B), IoT sensors (€106B), structural health 
                      monitoring (€16.6B), and wind energy (€19.4B) represents a €200+ billion opportunity. 
                      Conservative estimates suggest we can capture 0.5-1% market share by 2027.
                    </p>

                    <h3 className="text-xl font-semibold text-hyve-header mb-3">Competitive Positioning</h3>
                    <p className="mb-4">
                      Our ultra-thin form factor and high-density capabilities create significant competitive 
                      moats. Traditional sensor solutions require 10-100x more thickness, limiting integration 
                      possibilities and affecting structural properties.
                    </p>

                    <h3 className="text-xl font-semibold text-hyve-header mb-3">2024 Growth Targets</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Revenue target: €85-95M (160-180% growth)</li>
                      <li>Expand to 75+ team members across engineering and sales</li>
                      <li>Enter Asia-Pacific market with dedicated regional presence</li>
                      <li>Launch Gen 4 Haptic Matrix with integrated edge AI</li>
                      <li>Secure 3+ Fortune 500 enterprise contracts</li>
                    </ul>
                  </div>

                  {/* Section 5: Investment & Capital Allocation */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-hyve-header mb-4 font-heading">
                      Capital Allocation Strategy
                    </h2>
                    
                    <div className="bg-hyve-content/20 p-6 rounded-lg border border-hyve-content">
                      <h3 className="text-xl font-semibold text-hyve-header mb-3">Series B Fund Allocation</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-hyve-header mb-2">R&D & Product (40%)</h4>
                          <ul className="space-y-1 text-sm">
                            <li>€18M - Advanced sensor development</li>
                            <li>AI/ML integration capabilities</li>
                            <li>Manufacturing process optimization</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-hyve-header mb-2">Market Expansion (35%)</h4>
                          <ul className="space-y-1 text-sm">
                            <li>€15.75M - Sales team scaling</li>
                            <li>Asia-Pacific market entry</li>
                            <li>Strategic partnership development</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-hyve-header mb-2">Operations (15%)</h4>
                          <ul className="space-y-1 text-sm">
                            <li>€6.75M - Infrastructure scaling</li>
                            <li>Quality assurance systems</li>
                            <li>Supply chain optimization</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-hyve-header mb-2">Working Capital (10%)</h4>
                          <ul className="space-y-1 text-sm">
                            <li>€4.5M - Growth capital buffer</li>
                            <li>Strategic acquisitions</li>
                            <li>Contingency reserves</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-hyve-header mb-4 font-heading">
                      Risk Factors & Mitigation
                    </h2>
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-semibold text-hyve-header">Supply Chain Dependencies</h4>
                        <p className="text-sm text-hyve-text/80">
                          Mitigation: Diversified supplier base and 6-month inventory buffer for critical components
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-semibold text-hyve-header">Technology Competition</h4>
                        <p className="text-sm text-hyve-text/80">
                          Mitigation: Strong IP portfolio and continuous R&D investment maintaining 18-month technology lead
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-semibold text-hyve-header">Customer Concentration</h4>
                        <p className="text-sm text-hyve-text/80">
                          Mitigation: Expanding customer base with target of no single customer {'>'} 25% of revenue by Q4 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-hyve-header mb-4 font-heading">
                      Looking Ahead
                    </h2>
                    <p className="mb-4">
                      Q4 2023 exceeded all our expectations and positions Hyve Dynamics as a leader in the 
                      ultra-thin sensor market. With strong financial performance, strategic partnerships, 
                      and a robust technology roadmap, we are well-positioned to achieve our ambitious 
                      2024 growth targets.
                    </p>
                    <p>
                      Our focus remains on sustainable growth, technology leadership, and building long-term 
                      value for our investors. The market opportunity is substantial, and our competitive 
                      advantages continue to strengthen as we scale.
                    </p>
                  </div>

                </div>
              </motion.div>

              <Separator className="my-8" />

              {/* Footer CTA */}
              <motion.div variants={itemVariants} className="text-center">
                <Card className="bg-gradient-to-r from-hyve-interactive/10 to-hyve-accent/10 border-hyve-accent/30">
                  <CardHeader>
                    <CardTitle className="text-xl font-heading text-hyve-header">
                      Investor Relations
                    </CardTitle>
                    <CardDescription className="text-hyve-text/80 font-body">
                      For additional information or questions regarding this update, please contact our investor relations team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" className="border-hyve-accent text-hyve-text hover:bg-hyve-accent hover:text-white">
                        Previous Updates
                      </Button>
                      <Button className="bg-hyve-interactive hover:bg-hyve-interactive-dark text-white">
                        Contact IR Team
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
