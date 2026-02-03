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

export const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for Hyve Dynamics Holdings website. Please read these terms carefully before using our services."
        keywords="terms of service, terms and conditions, legal terms, Hyve Dynamics"
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
                  Terms of Service
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
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      1. Acceptance of Terms
                    </h2>
                    <p>
                      By accessing and using the Hyve Dynamics website, you accept and agree to be
                      bound by these Terms of Service. If you do not agree to these terms, please do
                      not use our website.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      2. Use of Website
                    </h2>
                    <p>You agree to use this website only for lawful purposes and in a way that:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      <li>Does not infringe the rights of others</li>
                      <li>Does not restrict or inhibit anyone else's use of the website</li>
                      <li>
                        Does not violate any applicable laws or regulations
                      </li>
                      <li>Does not transmit any harmful or malicious code</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      3. Intellectual Property
                    </h2>
                    <p>
                      All content on this website, including but not limited to text, graphics,
                      logos, images, and software, is the property of Hyve Dynamics Holdings and is
                      protected by intellectual property laws.
                    </p>
                    <p className="mt-4">
                      You may not reproduce, distribute, modify, or create derivative works from any
                      content without our prior written consent.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      4. Product Information
                    </h2>
                    <p>
                      Information about our products and services is provided for general
                      informational purposes. While we strive to ensure accuracy, specifications and
                      availability may change without notice.
                    </p>
                    <p className="mt-4">
                      For the most current information about our products and services, please
                      contact us directly.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      5. Limitation of Liability
                    </h2>
                    <p>
                      To the fullest extent permitted by law, Hyve Dynamics Holdings shall not be
                      liable for any indirect, incidental, special, consequential, or punitive
                      damages arising from your use of this website.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      6. Third-Party Links
                    </h2>
                    <p>
                      Our website may contain links to third-party websites. We are not responsible
                      for the content, privacy practices, or terms of service of these external
                      sites.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      7. Governing Law
                    </h2>
                    <p>
                      These Terms of Service shall be governed by and construed in accordance with
                      the laws of England and Wales. Any disputes arising from these terms shall be
                      subject to the exclusive jurisdiction of the courts of England and Wales.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      8. Changes to Terms
                    </h2>
                    <p>
                      We reserve the right to modify these Terms of Service at any time. Changes
                      will be effective immediately upon posting to the website. Your continued use
                      of the website constitutes acceptance of the modified terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-hyve-header mb-4">
                      9. Contact Information
                    </h2>
                    <p>
                      For questions about these Terms of Service, please contact us at:
                    </p>
                    <p className="mt-4">
                      <strong>Email:</strong> info@hyvedynamics.com
                      <br />
                      <strong>Company:</strong> Hyve Dynamics Holdings
                      <br />
                      <strong>Company Number:</strong> 12258323
                      <br />
                      <strong>Registered in:</strong> England & Wales
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
