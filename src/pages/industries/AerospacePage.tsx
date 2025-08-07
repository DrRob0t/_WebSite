// You can switch between these layouts to see which works best:
// import { IndustryPageCompact } from '@/components/pages/IndustryPageCompact' // Compressed horizontal layout
import { IndustryPageFocused } from '@/components/pages/IndustryPageFocused' // Single container focused layout
// import { IndustryPageMagazine } from '@/components/pages/IndustryPageMagazine' // Magazine-style layout
// import { IndustryPageTemplate } from '@/components/pages/IndustryPageTemplate' // Original scrolling layout
import { getVideoPath } from '@/lib/assets'

const aerospaceData = {
  id: 'aerospace',
  title: 'Advancing Aerospace',
  badge: 'AEROSPACE',
  tagline: 'Real-Time Aerodynamic Data',
  description:
    'Unlocking Precision, Performance, and Sustainability in Aviation. At Hyve Dynamics, we are transforming aerospace research and development with real-time, high-density aerodynamic data acquisition.',
  videoPath: getVideoPath('A320.webm'),
  features: [
    {
      title: 'Real-Time Insights',
      description:
        'High-frequency data capture to reveal aerodynamic behaviors and structural responses dynamically.',
    },
    {
      title: 'Ultra-Thin & Non-Intrusive',
      description:
        '0.25 mm sensor skin conforms to any surface without affecting aerodynamic properties.',
    },
    {
      title: 'High-Density Sensing',
      description:
        'Over 100 sensors per 24 cm² for unmatched spatial resolution. Supports aircraft design, flight testing, and next-generation propulsion systems.',
    },
    {
      title: 'Optimized Performance',
      description:
        'Supports aircraft design, flight testing and next-generation propulsion systems.',
    },
    {
      title: 'Sustainability & Efficiency',
      description: 'Enhances fuel efficiency and aids in achieving net-zero emission goals.',
    },
  ],
  summary:
    'By replacing costly and time-consuming wind tunnel testing and CFD validation, Hyve Dynamics provides aerodynamic innovation, reduces R&D costs, and enhances flight efficiency. Our cutting-edge sensor technology empowers aircraft manufacturers, defense agencies, and space exploration pioneers to push the boundaries of aerodynamic performance.',
  cta: 'Experience the future of aerospace data - powered by Hyve Dynamics.',
}

export const AerospacePage = () => {
  // 🎨 CHOOSE YOUR LAYOUT:
  // Uncomment the layout you want to use:

  // Option 1: Original scrolling layout (requires scrolling to see features)
  // return <IndustryPageTemplate industry={aerospaceData} />

  // Option 2: Compressed horizontal layout (everything on one screen)
  // return <IndustryPageCompact industry={aerospaceData} />

  // Option 3: Magazine-style layout (better use of vertical space)
  // return <IndustryPageMagazine industry={aerospaceData} />

  // Option 4: Single container focused layout (based on your mockup) ✨ NEW
  return <IndustryPageFocused industry={aerospaceData} />
}
