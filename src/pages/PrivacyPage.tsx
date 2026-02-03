import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { SEO } from '@/components/common/SEO'
import { Badge } from '@/components/ui/badge'

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

export const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Hyve Dynamics Holdings. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, GDPR, personal data, Hyve Dynamics"
      />

      <div className="min-h-screen bg-hyve-background">
        <section className="relative py-16 lg:py-20 pointer-events-auto">
          <div className="hyve-container max-w-4xl">
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
            >
              <motion.div variants={itemVariants} className="mb-8">
                <Badge variant="secondary" className="px-4 py-1 text-sm font-medium mb-4">
                  LEGAL
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-hyve-header mb-4 font-heading">
                  Privacy Policy
                </h1>
                <p className="text-hyve-text/60 text-sm">
                  Last updated: February 2026
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="prose prose-lg max-w-none text-hyve-text/80"
              >
                <div className="bg-white/80 rounded-2xl p-8 border border-hyve-content/30 space-y-8">
                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">1. Introduction</h2>
                    <p>
                      Hyve Dynamics Holdings ("we," "our," or "us") is committed to protecting your
                      privacy. This Privacy Policy explains how we collect, use, disclose, and
                      safeguard your information when you visit our website or use our services.
                    </p>
                    <p className="mt-4">
                      We are registered in England and Wales under company number 12258323.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      2. Information We Collect
                    </h2>
                    <p>We may collect information about you in various ways, including:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      <li>
                        <strong>Personal Data:</strong> Name, email address, phone number, and
                        company information you provide when contacting us.
                      </li>
                      <li>
                        <strong>Usage Data:</strong> Information about how you interact with our
                        website, including pages visited and time spent.
                      </li>
                      <li>
                        <strong>Technical Data:</strong> IP address, browser type, device
                        information, and operating system.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      3. How We Use Your Information
                    </h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      <li>Respond to your inquiries and provide customer support</li>
                      <li>Send you information about our products and services</li>
                      <li>Improve our website and user experience</li>
                      <li>Comply with legal obligations</li>
                      <li>Protect against fraudulent or unauthorized activity</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      4. Data Protection Rights (GDPR)
                    </h2>
                    <p>Under the General Data Protection Regulation (GDPR), you have the right to:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      <li>Access the personal data we hold about you</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Object to processing of your data</li>
                      <li>Request restriction of processing</li>
                      <li>Request data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      5. Data Security
                    </h2>
                    <p>
                      We implement appropriate technical and organizational measures to protect your
                      personal data against unauthorized access, alteration, disclosure, or
                      destruction.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      6. Contact Us
                    </h2>
                    <p>
                      If you have questions about this Privacy Policy or wish to exercise your data
                      protection rights, please contact us at:
                    </p>
                    <p className="mt-4">
                      <strong>Email:</strong> info@hyvedynamics.com
                      <br />
                      <strong>Company:</strong> Hyve Dynamics Holdings
                      <br />
                      <strong>Company Number:</strong> 12258323
                    </p>
                  </section>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
