import { IndustryPageTemplate } from '@/components/pages/IndustryPageTemplate'

const roboticsData = {
  id: 'robotics',
  title: 'Robotics & Automation',
  badge: 'ROBOTICS',
  tagline: 'Advancing Robotics with Environmental Intelligence',
  description: 'Real-Time Operational Insights for Next-Generation Automation. At Hyve Dynamics, we unlock new dimensions of robotic performance by providing real-time environmental and interaction data that gives your automation systems unprecedented situational awareness.',
  videoPath: '/models/3d_animations/Robot.webm',
  features: [
    {
      title: 'Environmental Awareness',
      description: 'Real-time sensing of contact forces, surface interactions, and environmental conditions during robotic operations.'
    },
    {
      title: 'Adaptive Control Systems',
      description: 'Enables robots to dynamically adjust behaviors based on actual environmental feedback rather than pre-programmed responses.'
    },
    {
      title: 'High-Density Tactile Feedback',
      description: 'Over 100 sensors per 24 cm² provide granular interaction data for precision manipulation and assembly tasks.'
    },
    {
      title: 'Process Optimization',
      description: 'Continuous monitoring of robotic interactions reveals efficiency improvements and identifies optimal operating parameters.'
    },
    {
      title: 'Predictive Maintenance',
      description: 'Monitors robotic system stress, wear patterns, and performance degradation to prevent unexpected downtime.'
    },
    {
      title: 'Safety Enhancement',
      description: 'Real-time force and collision detection improves human-robot collaboration and prevents equipment damage.'
    }
  ],
  summary: 'By enhancing traditional robotic feedback systems, Hyve Dynamics provides real-world operational intelligence that enables manufacturers to optimize automation performance, reduce maintenance costs, and unlock new capabilities in human-robot collaboration.',
  cta: 'Transform your robotics with intelligent environmental sensing powered by Hyve Dynamics.'
}

export const RoboticsPage = () => {
  return <IndustryPageTemplate industry={roboticsData} />
}