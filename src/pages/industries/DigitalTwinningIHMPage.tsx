import { IndustryPageFocused } from '@/components/pages/IndustryPageFocused'
import { getVideoPath } from '@/lib/assets'

const digitalTwinningIHMData = {
  id: 'digital-twinning-ihm',
  title: 'Digital Twinning & IHM',
  badge: 'DIGITAL TWINS & INTEGRATED HEALTH MONITORING',
  tagline: 'Real-Time Digital Twins Powered by High-Density Sensing',
  description:
    'Hyve Dynamics bridges the gap between simulation and reality by delivering real-time, high-density data that fuels accurate digital twins and integrated health monitoring. From wind turbines to bridges, our Haptic Matrix enables continuous structural intelligence — transforming how operators predict failures, optimise maintenance, and extend asset lifecycles across energy and infrastructure.',
  videoPath: getVideoPath('Wind-Turbine.webm'),
  videoPaths: [
    getVideoPath('Wind-Turbine.webm'),
    getVideoPath('Structural-Health.webm'),
  ],
  features: [
    {
      title: 'Live Digital Twin Correlation',
      description:
        'Real-time validation of computational models (FEA, CFD) under actual operating conditions — bridging the gap between simulation and reality for energy systems and infrastructure.',
    },
    {
      title: 'Predictive Failure Intelligence',
      description:
        'Identifies stress concentrations, fatigue initiation points, thermal anomalies, and aerodynamic inefficiencies before critical failure occurs.',
    },
    {
      title: 'Pinpoint Spatial Accuracy',
      description:
        'Over 100 sensors per 24 cm² provide exact location data for maintenance interventions — you know precisely where to inspect and repair.',
    },
    {
      title: 'Multi-Modal Sensing',
      description:
        'Simultaneously captures wind flow, mechanical stress, temperature variations, and dynamic responses across complex geometries on turbines, blades, and structures.',
    },
    {
      title: 'Optimised Maintenance & Yield',
      description:
        'Transforms reactive maintenance into data-driven, scheduled interventions — reducing downtime, maximising energy output, and extending asset life.',
    },
    {
      title: 'Ultra-Thin & Non-Intrusive',
      description:
        'At just 0.33 mm, the Haptic Matrix integrates seamlessly with turbine blades, bridge decks, and building facades without affecting structural or aerodynamic properties.',
    },
  ],
  summary:
    'By replacing periodic inspections and static monitoring systems, Hyve Dynamics delivers continuous, real-world structural and aerodynamic intelligence — enabling operators to build accurate digital twins, prevent failures, optimise maintenance budgets, and drive sustainability across energy and infrastructure assets.',
  cta: 'Enable intelligent digital twins and predictive health monitoring with Hyve Dynamics.',
}

export const DigitalTwinningIHMPage = () => {
  return <IndustryPageFocused industry={digitalTwinningIHMData} />
}
