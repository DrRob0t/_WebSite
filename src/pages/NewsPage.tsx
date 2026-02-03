import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  Newspaper,
  Megaphone,
  PenTool,
  Rss,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { SEO } from '@/components/common/SEO'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

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

// News article types
type ArticleCategory = 'all' | 'news' | 'press' | 'blog'

interface NewsArticle {
  id: string
  title: string
  description: string
  date: string
  readTime: string
  category: ArticleCategory
  categoryLabel: string
  featured?: boolean
  href?: string
  external?: boolean
}

// Sample news data - this would typically come from a CMS or API
const newsArticles: NewsArticle[] = [
  {
    id: 'nwtf-conference-2025',
    title: 'Hyve Dynamics at NWTF Conference 2025',
    description:
      'Hyve Dynamics attended the National Wind Tunnel Facility (NWTF) Conference 2025 in Birmingham, engaging with leading researchers, industry partners, and infrastructure providers in aerodynamic testing and experimental fluid dynamics.',
    date: '2025-04-03',
    readTime: '3 min read',
    category: 'news',
    categoryLabel: 'Company News',
    featured: true,
    href: 'https://uobevents.eventsair.com/nwtf-2025',
    external: true,
  },
  {
    id: 'qinetiq-partnership-2025',
    title: 'Hyve Dynamics Partners with QinetiQ for High-Speed Validation',
    description:
      'Exciting milestone as we begin comprehensive wind tunnel testing at QinetiQ facilities, validating our Haptic Matrix technology at speeds up to Mach 0.85.',
    date: '2025-01-20',
    readTime: '4 min read',
    category: 'press',
    categoryLabel: 'Press Release',
    featured: false,
  },
  {
    id: 'trl6-advancement',
    title: 'Advancing to TRL 6: Our Technology Readiness Journey',
    description:
      'A deep dive into our progression toward Technology Readiness Level 6, including the rigorous aerospace environmental testing protocols we\'re completing.',
    date: '2025-01-10',
    readTime: '6 min read',
    category: 'blog',
    categoryLabel: 'Blog',
    featured: false,
  },
  {
    id: 'aerospace-innovation-award',
    title: 'Hyve Dynamics Recognized for Aerospace Innovation',
    description:
      'We\'re honored to be recognized by the Aerospace Technology Institute for our contributions to next-generation sensing technology.',
    date: '2024-12-15',
    readTime: '3 min read',
    category: 'news',
    categoryLabel: 'Company News',
    featured: false,
  },
  {
    id: 'biomimicry-sensor-design',
    title: 'How Nature Inspired Our Sensor Technology',
    description:
      'Exploring the biomimetic principles behind the Haptic Matrix and how we replicated the peripheral nervous system\'s distributed sensing capabilities.',
    date: '2024-11-28',
    readTime: '8 min read',
    category: 'blog',
    categoryLabel: 'Blog',
    featured: false,
  },
  {
    id: 'net-zero-aviation',
    title: 'Supporting Net-Zero Aviation Goals Through Real-Time Data',
    description:
      'How our sensor technology is helping aerospace manufacturers optimize fuel efficiency and reduce emissions in their development programs.',
    date: '2024-11-15',
    readTime: '5 min read',
    category: 'news',
    categoryLabel: 'Company News',
    featured: false,
  },
  {
    id: 'cranfield-collaboration',
    title: 'Continuing Our Academic Partnership with Cranfield University',
    description:
      'Announcing the extension of our research collaboration with Cranfield University, focusing on next-generation composite integration techniques.',
    date: '2024-10-30',
    readTime: '4 min read',
    category: 'press',
    categoryLabel: 'Press Release',
    featured: false,
  },
]

// Category filter options
const categoryFilters: { id: ArticleCategory; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All', icon: Rss },
  { id: 'news', label: 'Company News', icon: Newspaper },
  { id: 'press', label: 'Press Releases', icon: Megaphone },
  { id: 'blog', label: 'Blog', icon: PenTool },
]

// News card component
const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const getCategoryColor = (category: ArticleCategory) => {
    switch (category) {
      case 'news':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      case 'press':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200'
      case 'blog':
        return 'bg-green-100 text-green-700 hover:bg-green-200'
      default:
        return 'bg-hyve-accent/20 text-hyve-text hover:bg-hyve-accent/30'
    }
  }

  const cardContent = (
    <Card className="h-full bg-white/80 backdrop-blur-sm border border-hyve-content hover:border-hyve-accent transition-all duration-300 hover:shadow-hyve-lg cursor-pointer">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className={getCategoryColor(article.category)}>
                {article.categoryLabel}
              </Badge>
              {article.featured && (
                <Badge className="bg-hyve-interactive text-white">Featured</Badge>
              )}
            </div>
            <CardTitle className="text-xl md:text-2xl font-heading font-semibold text-hyve-header group-hover:text-hyve-interactive transition-colors">
              {article.title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-hyve-text/70 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-hyve-text/80 leading-relaxed mb-4 font-body">
              {article.description}
            </CardDescription>
            <div className="flex items-center text-hyve-interactive font-medium text-sm group-hover:gap-2 transition-all">
              Read more
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
  )

  return (
    <motion.div
      variants={itemVariants}
      className={cn('group', article.featured && 'md:col-span-2')}
    >
      {article.href ? (
        <Link to={article.href} target={article.external ? '_blank' : undefined}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  )
}

export const NewsPage = () => {
  const [activeFilter, setActiveFilter] = useState<ArticleCategory>('all')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredArticles =
    activeFilter === 'all'
      ? newsArticles
      : newsArticles.filter(article => article.category === activeFilter)

  return (
    <>
      <SEO
        title="News & Blog"
        description="Stay updated with the latest news, press releases, and blog posts from Hyve Dynamics. Discover insights on sensor technology, aerospace innovation, and industry developments."
        keywords="Hyve Dynamics news, sensor technology blog, aerospace press releases, company updates, innovation insights, technology news"
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
                  INSIGHTS & UPDATES
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-4 font-heading"
              >
                News & Blog
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-hyve-text font-light mb-6 max-w-3xl mx-auto"
              >
                The Latest from Hyve Dynamics
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-hyve-text/80 leading-relaxed max-w-4xl mx-auto"
              >
                Stay informed with company news, press releases, and insights on sensor technology,
                aerospace innovation, and the future of real-world data acquisition.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="relative pb-8 pointer-events-auto">
          <div className="hyve-container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-3"
            >
              {categoryFilters.map(filter => {
                const Icon = filter.icon
                return (
                  <motion.div key={filter.id} variants={itemVariants}>
                    <Button
                      variant={activeFilter === filter.id ? 'default' : 'outline'}
                      className={cn(
                        'flex items-center gap-2 transition-all',
                        activeFilter === filter.id
                          ? 'bg-hyve-interactive text-white hover:bg-hyve-interactive-dark'
                          : 'border-hyve-content text-hyve-text hover:border-hyve-interactive hover:text-hyve-interactive'
                      )}
                      onClick={() => setActiveFilter(filter.id)}
                    >
                      <Icon className="h-4 w-4" />
                      {filter.label}
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="relative py-8 lg:py-12 pointer-events-auto">
          <div className="hyve-container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredArticles.map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </motion.div>

            {filteredArticles.length === 0 && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-16"
              >
                <Newspaper className="h-16 w-16 text-hyve-content mx-auto mb-4" />
                <p className="text-hyve-text/70 text-lg">
                  No articles found in this category.
                </p>
              </motion.div>
            )}

            {/* Newsletter CTA */}
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
                      <Rss className="h-6 w-6 text-hyve-interactive" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-heading text-hyve-header">
                    Stay Updated
                  </CardTitle>
                  <CardDescription className="text-hyve-text/80 font-body">
                    Subscribe to receive the latest news and insights directly to your inbox.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/insights/newsletter">
                    <Button
                      variant="outline"
                      className="border-hyve-interactive text-hyve-interactive hover:bg-hyve-interactive hover:text-white"
                    >
                      <Newspaper className="h-4 w-4 mr-2" />
                      View Newsletters
                    </Button>
                  </Link>
                  <Button className="bg-hyve-interactive hover:bg-hyve-interactive-dark text-white">
                    <Rss className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer spacing */}
        <div className="h-16" />
      </div>
    </>
  )
}
