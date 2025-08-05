import { IndustryPageTemplate } from '@/components/pages/IndustryPageTemplate'

const energyData = {
  id: 'energy',
  title: 'Renewable Energy',
  badge: 'ENERGY',
  tagline: 'Maximizing Renewable Energy Efficiency with Real-Time Data',
  description: 'Optimizing Wind, Solar, and Hydro Systems with Cutting-Edge Sensor Technology. At Hyve Dynamics, we empower the renewable energy sector with real-time, high-density aerodynamic, thermal, and structural data.',
  videoPath: '/models/3d_animations/Wind-Turbine.webm',
  features: [
    {
      title: 'Real-Time Monitoring',
      description: 'Captures wind flow, temperature variations, and structural stress for optimal performance.'
    },
    {
      title: 'Ultra-Thin & Non-Intrusive',
      description: '0.33 mm sensor integrates seamlessly with energy infrastructure.'
    },
    {
      title: 'High-Density Sensing',
      description: 'Over 100 sensors per 24 cm² for unmatched spatial data resolution.'
    },
    {
      title: 'Maximized Efficiency & Yield',
      description: 'Enhances wind turbine aerodynamics, optimizes solar panel orientation, and improves hydro system reliability.'
    },
    {
      title: 'Sustainability & Longevity',
      description: 'Reduces maintenance costs, prevents energy losses, and extends system lifespan.'
    }
  ],
  summary: 'By replacing static and outdated monitoring systems, Hyve Dynamics delivers real-world, real-time data to help renewable energy operators increase output, reduce downtime, and drive sustainability efforts forward.',
  cta: 'Unlock the full potential of renewable energy with Hyve Dynamics.'
}

export const EnergyPage = () => {
  return <IndustryPageTemplate industry={energyData} />
}