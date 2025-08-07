/**
 * Utility function to get the correct asset path for both local development and GitHub Pages
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // In production (GitHub Pages), prepend the base URL
  // In development, just use the path as-is
  return import.meta.env.BASE_URL + cleanPath
}

/**
 * Get public asset path (for assets in the public folder)
 */
export function getPublicAssetPath(path: string): string {
  return getAssetPath(path)
}

/**
 * Get video path
 */
export function getVideoPath(filename: string): string {
  return getAssetPath(`models/3d_animations/${filename}`)
}
