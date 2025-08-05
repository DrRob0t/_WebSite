import { IndustryPageTemplate } from '@/components/pages/IndustryPageTemplate'

const automotiveData = {
  id: 'automotive',
  title: 'Automotive Innovation',
  badge: 'AUTOMOTIVE',
  tagline: 'Driving the Future of Automotive Innovation',
  description: 'Real-Time Aerodynamic & Structural Data for Superior Performance. At Hyve Dynamics, we revolutionize automotive testing with real-time, high-density aerodynamic, thermal, and structural data.',
  videoPath: '/models/3d_animations/F1-Car.webm',
  features: [
    {
      title: 'Real-Time Performance Insights',
      description: 'Captures aerodynamic, thermal, and structural data dynamically.'
    },
    {
      title: 'Ultra-Thin & Non-Intrusive',
      description: '0.33 mm sensor conforms to any vehicle shape without affecting airflow.'
    },
    {
      title: 'High-Density Sensing',
      description: 'Over 100 sensors per 24 cm² for unparalleled data resolution.'
    },
    {
      title: 'Optimized Design & Efficiency',
      description: 'Supports electric vehicle range extension, motorsports performance tuning, and fuel economy improvements.'
    },
    {
      title: 'Enhanced Safety & Durability',
      description: 'Detects strain, temperature fluctuations, and aerodynamic inefficiencies to improve vehicle reliability.'
    }
  ],
  summary: 'By eliminating the limitations of traditional wind tunnel testing and CFD simulations, Hyve Dynamics provides automakers and motorsports teams with real-world, real-time data to accelerate R&D, reduce costs, and enhance performance.',
  cta: 'Power the next generation of automotive excellence with Hyve Dynamics.'
}

export const AutomotivePage = () => {
  return <IndustryPageTemplate industry={automotiveData} />
}