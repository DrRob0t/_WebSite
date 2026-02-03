import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Users,
  Video,
  Building,
} from 'lucide-react'
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

// Event data
type EventType = 'conference' | 'webinar' | 'demo' | 'exhibition'

interface Event {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  type: EventType
  virtual?: boolean
  registrationUrl?: string
  past?: boolean
}

const events: Event[] = [
  {
    id: 'paris-air-show-2025',
    title: 'Paris Air Show 2025',
    description:
      'Meet the Hyve Dynamics team at the world\'s largest aerospace exhibition. See live demonstrations of our Haptic Matrix technology and discuss how real-time aerodynamic data can transform your development programs.',
    date: '2025-06-16',
    endDate: '2025-06-22',
    location: 'Le Bourget, Paris, France',
    type: 'exhibition',
    virtual: false,
  },
  {
    id: 'wind-tunnel-webinar',
    title: 'Webinar: The Future of Wind Tunnel Instrumentation',
    description:
      'Join our technical team for a deep dive into how conformal sensor arrays are revolutionizing experimental aerodynamics. Learn about test cycle compression, data quality improvements, and integration approaches.',
    date: '2025-03-15',
    location: 'Online',
    type: 'webinar',
    virtual: true,
  },
  {
    id: 'nwtf-conference-2025',
    title: 'National Wind Tunnel Facility (NWTF) Conference 2025',
    description:
      'Hyve Dynamics attended the NWTF Conference 2025, engaging with wind tunnel operators, aerospace OEMs, and research organisations to discuss how next-generation sensing technologies could complement and extend traditional aerodynamic test methods.',
    date: '2025-04-02',
    endDate: '2025-04-03',
    location: 'The Exchange, Birmingham, UK',
    type: 'conference',
    past: true,
  },
  {
    id: 'farnborough-2024',
    title: 'Farnborough International Airshow 2024',
    description:
      'We presented our latest advances in aerospace sensing technology and announced key partnerships with leading aerospace manufacturers.',
    date: '2024-07-22',
    endDate: '2024-07-26',
    location: 'Farnborough, UK',
    type: 'exhibition',
    past: true,
  },
]

const getEventTypeIcon = (type: EventType) => {
  switch (type) {
    case 'conference':
      return Users
    case 'webinar':
      return Video
    case 'demo':
      return Building
    case 'exhibition':
      return Building
    default:
      return Calendar
  }
}

const getEventTypeColor = (type: EventType) => {
  switch (type) {
    case 'conference':
      return 'bg-blue-100 text-blue-700'
    case 'webinar':
      return 'bg-green-100 text-green-700'
    case 'demo':
      return 'bg-purple-100 text-purple-700'
    case 'exhibition':
      return 'bg-amber-100 text-amber-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const formatDateRange = (start: string, end?: string) => {
  const startDate = new Date(start)
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }

  if (end) {
    const endDate = new Date(end)
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.getDate()}, ${endDate.getFullYear()}`
    }
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`
  }

  return startDate.toLocaleDateString('en-US', options)
}

export const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const upcomingEvents = events.filter(e => !e.past)
  const pastEvents = events.filter(e => e.past)

  return (
    <>
      <SEO
        title="Events"
        description="Join Hyve Dynamics at industry conferences, webinars, and demonstrations. Connect with our team and see our sensor technology in action."
        keywords="aerospace events, industry conferences, webinars, technology demonstrations, Hyve Dynamics events, air shows"
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
                  CONNECT WITH US
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-4 font-heading"
              >
                Events & Exhibitions
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-hyve-text font-light mb-6 max-w-3xl mx-auto"
              >
                Meet the Team. See the Technology.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-hyve-text/80 leading-relaxed max-w-4xl mx-auto"
              >
                Join us at industry events, webinars, and demonstrations to learn more about how
                Hyve Dynamics is transforming aerodynamic measurement.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="relative py-8 lg:py-12 pointer-events-auto">
          <div className="hyve-container">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl font-bold text-hyve-header mb-8 font-heading"
            >
              Upcoming Events
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2"
            >
              {upcomingEvents.map(event => {
                const TypeIcon = getEventTypeIcon(event.type)
                return (
                  <motion.div key={event.id} variants={itemVariants}>
                    <Card className="h-full bg-white/80 backdrop-blur-sm border border-hyve-content hover:border-hyve-accent transition-all duration-300 hover:shadow-hyve-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={getEventTypeColor(event.type)}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          {event.virtual && (
                            <Badge variant="outline" className="text-green-600 border-green-300">
                              <Video className="h-3 w-3 mr-1" />
                              Virtual
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl font-heading font-semibold text-hyve-header">
                          {event.title}
                        </CardTitle>
                        <div className="flex flex-col gap-2 text-sm text-hyve-text/70 mt-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDateRange(event.date, event.endDate)}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-hyve-text/80 leading-relaxed mb-4 font-body">
                          {event.description}
                        </CardDescription>

                        <Button
                          className="w-full bg-hyve-interactive hover:bg-hyve-interactive-dark text-white"
                          onClick={() => {
                            if (event.registrationUrl) {
                              window.open(event.registrationUrl, '_blank')
                            } else {
                              const contactButton = document.querySelector(
                                '[data-contact-trigger]'
                              ) as HTMLButtonElement
                              if (contactButton) contactButton.click()
                            }
                          }}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {event.virtual ? 'Register Now' : 'Schedule a Meeting'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="relative py-8 lg:py-12 pointer-events-auto">
            <div className="hyve-container">
              <motion.h2
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl font-bold text-hyve-header mb-8 font-heading"
              >
                Past Events
              </motion.h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4"
              >
                {pastEvents.map(event => (
                  <motion.div key={event.id} variants={itemVariants}>
                    <Card className="bg-hyve-content/20 border border-hyve-content/30">
                      <CardContent className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-hyve-header">{event.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-hyve-text/60 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDateRange(event.date, event.endDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-hyve-text/50 self-start md:self-auto">
                            Completed
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative py-12 pointer-events-auto">
          <div className="hyve-container">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <Card className="bg-gradient-to-r from-hyve-interactive/10 to-hyve-accent/10 border-hyve-accent/30 max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-hyve-interactive/20">
                      <ExternalLink className="h-6 w-6 text-hyve-interactive" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-heading text-hyve-header">
                    Can&apos;t Make It to an Event?
                  </CardTitle>
                  <CardDescription className="text-hyve-text/80 font-body">
                    Schedule a private demonstration or technical discussion with our team at a time
                    that works for you.
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
                    Request a Demo
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
