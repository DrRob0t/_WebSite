import { IndustryPageTemplate } from '@/components/pages/IndustryPageTemplate'

const aerospaceData = {
  id: 'aerospace',
  title: 'Advancing Aerospace',
  badge: 'AEROSPACE',
  tagline: 'Real-Time Aerodynamic Data',
  description: 'Unlocking Precision, Performance, and Sustainability in Aviation. At Hyve Dynamics, we are transforming aerospace research and development with real-time, high-density aerodynamic data acquisition.',
  videoPath: '/models/3d_animations/A320.webm',
  features: [
    {
      title: 'Real-Time Insights',
      description: 'High-frequency data capture to reveal aerodynamic behaviors and structural responses dynamically.'
    },
    {
      title: 'Ultra-Thin & Non-Intrusive',
      description: '0.25 mm sensor skin conforms to any surface without affecting aerodynamic properties.'
    },
    {
      title: 'High-Density Sensing',
      description: 'Over 100 sensors per 24 cm² for unmatched spatial resolution. Supports aircraft design, flight testing, and next-generation propulsion systems.'
    },
    {
      title: 'Optimized Performance',
      description: 'Supports aircraft design, flight testing and next-generation propulsion systems.'
    },
    {
      title: 'Sustainability & Efficiency',
      description: 'Enhances fuel efficiency and aids in achieving net-zero emission goals.'
    }
  ],
  summary: 'By replacing costly and time-consuming wind tunnel testing and CFD validation, Hyve Dynamics provides aerodynamic innovation, reduces R&D costs, and enhances flight efficiency. Our cutting-edge sensor technology empowers aircraft manufacturers, defense agencies, and space exploration pioneers to push the boundaries of aerodynamic performance.',
  cta: 'Experience the future of aerospace data - powered by Hyve Dynamics.'
}

export const AerospacePage = () => {
  return <IndustryPageTemplate industry={aerospaceData} />
}