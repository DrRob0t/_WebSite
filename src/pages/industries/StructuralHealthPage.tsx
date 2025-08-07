import { IndustryPageFocused } from '@/components/pages/IndustryPageFocused'

const structuralHealthData = {
  id: 'structural-health',
  title: 'Structural Health Monitoring',
  badge: 'INFRASTRUCTURE',
  tagline: 'Real-Time FEA Validation and Predictive Maintenance Intelligence',
  description:
    'Transforming Infrastructure Monitoring with Live Structural Analysis. At Hyve Dynamics, we revolutionize structural health monitoring by delivering real-time Finite Element Analysis (FEA) validation under actual operating conditions.',
  videoPath: '/models/3d_animations/Structural-Health.webm',
  features: [
    {
      title: 'Real-Time FEA Correlation',
      description:
        'Live validation of computational models under real operating conditions, bridging the gap between simulation and reality.',
    },
    {
      title: 'Precise Failure Prediction',
      description:
        'Identifies stress concentrations, fatigue initiation points, and thermal anomalies before critical failure occurs.',
    },
    {
      title: 'Pinpoint Accuracy',
      description:
        'Over 100 sensors per 24 cm² provide exact location data for maintenance interventions - you know precisely where to repair.',
    },
    {
      title: 'Predictive Maintenance Optimization',
      description:
        'Transforms reactive maintenance into data-driven, scheduled interventions, reducing downtime and extending asset life.',
    },
    {
      title: 'Cost & Time Savings',
      description:
        'Eliminates unnecessary inspections, reduces emergency repairs, and optimizes maintenance scheduling based on actual structural performance.',
    },
    {
      title: 'Multi-Modal Sensing',
      description:
        'Simultaneously captures mechanical stress, thermal gradients, and dynamic responses across complex geometries.',
    },
  ],
  summary:
    'By replacing periodic inspections and static monitoring systems, Hyve Dynamics provides continuous, real-world structural intelligence that enables infrastructure operators to prevent failures, optimize maintenance budgets, and ensure safety with unprecedented precision.',
  cta: 'Experience predictive infrastructure intelligence with Hyve Dynamics.',
}

export const StructuralHealthPage = () => {
  return <IndustryPageFocused industry={structuralHealthData} />
}
