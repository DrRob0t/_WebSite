import { Helmet } from 'react-helmet-async'

interface NoIndexProps {
  title?: string
  description?: string
}

/**
 * NoIndex component for private/restricted pages
 * Prevents search engine indexing and crawling
 * Use for newsletters, private insights, admin pages, etc.
 */
export const NoIndex = ({ title = 'Private Content', description = 'This content is private and not available for public access.' }: NoIndexProps) => {
  return (
    <Helmet>
      {/* Prevent indexing */}
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      
      {/* Additional privacy directives */}
      <meta name="referrer" content="no-referrer" />
      
      {/* Set appropriate title and description */}
      <title>{title} | Hyve Dynamics</title>
      <meta name="description" content={description} />
      
      {/* Remove any Open Graph tags that might help indexing */}
      <meta property="og:robots" content="noindex, nofollow" />
      <meta name="twitter:robots" content="noindex, nofollow" />
      
      {/* Prevent caching */}
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
    </Helmet>
  )
}

/**
 * Higher-order component to wrap private pages
 */
export const withNoIndex = <P extends object>(
  Component: React.ComponentType<P>,
  title?: string,
  description?: string
) => {
  const NoIndexWrapper = (props: P) => (
    <>
      <NoIndex title={title} description={description} />
      <Component {...props} />
    </>
  )
  
  NoIndexWrapper.displayName = `withNoIndex(${Component.displayName || Component.name})`
  return NoIndexWrapper
}
