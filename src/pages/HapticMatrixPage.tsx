import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Cpu,
  Zap,
  Target,
  Thermometer,
  Activity,
  Layers,
  Wifi,
  Shield,
  Award,
  Calendar,
  Plane,
  Car,
  Bot,
  Building2,
  GraduationCap,
  Factory,
  Check,
  X,
  AlertTriangle,
  FileText,
  Users,
  Wrench,
  Radio,
  Database,
  Settings,
  HardDrive,
  Gauge,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CustomMeshBackground } from '@/components/ui/CustomMeshBackground'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

// Helper to trigger contact form
const triggerContactForm = () => {
  const contactButton = document.querySelector(
    '[data-contact-trigger]'
  ) as HTMLButtonElement
  if (contactButton) {
    contactButton.click()
  }
}

// FAQ Accordion Component
const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) => (
  <div className="border-b border-hyve-content/20 last:border-b-0">
    <button
      onClick={onClick}
      className="w-full py-4 flex items-center justify-between text-left hover:text-hyve-interactive transition-colors"
    >
      <span className="text-sm font-medium text-hyve-header pr-4">
        {question}
      </span>
      <ChevronDown
        className={`h-4 w-4 text-hyve-text/50 flex-shrink-0 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <p className="text-sm text-hyve-text/70 pb-4 leading-relaxed">{answer}</p>
    </motion.div>
  </div>
)

export const HapticMatrixPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // FAQ Data
  const faqs = [
    {
      question: 'How does Hyve compare to load cells or force balances?',
      answer:
        'Load cells measure bulk force (total lift/drag on entire model). Hyve measures distributed pressure across the surface. These are complementary: load cells give integrated forces, Hyve shows WHERE those forces come from. For example, a load cell tells you total downforce = 500N; Hyve shows you that 300N is from the front wing and 200N is from the floor, and precisely where on each surface.',
    },
    {
      question: 'Can Hyve survive autoclave curing for composite integration?',
      answer:
        'Yes. Current sensor materials are rated to 150°C and have survived typical autoclave cure cycles (120-180°C, 6-8 bar pressure) in laboratory testing. Long-term durability under repeated thermal cycling is under evaluation. For permanent IVHM installations, we recommend co-curing validation tests with your specific composite system and cure schedule.',
    },
    {
      question: "What's the maximum pressure range?",
      answer:
        'Standard configuration: -10kPa to +10kPa. This covers the vast majority of subsonic aerodynamic applications (wind tunnel testing, automotive, motorsport, commercial aviation). For specialized applications (hypersonics, blast loading, underwater), custom configurations up to ±50kPa are feasible with modified membrane geometries.',
    },
    {
      question:
        'How do you handle sensor drift and long-term calibration stability?',
      answer:
        'Three mechanisms: (1) Factory multi-point calibration with traceable pressure standards; (2) On-board temperature compensation using reference sensors and software algorithms; (3) Field re-zeroing protocol before each test campaign. Drift is monitored via periodic validation with calibrated pressure pumps. Typical drift: <2% over 100 test cycles.',
    },
    {
      question:
        'Can I integrate Hyve data with my existing wind tunnel data acquisition system?',
      answer:
        'Yes. Multiple integration methods: (1) Direct serial/USB connection with provided LabVIEW VIs or Python libraries; (2) MQTT publish to your data platform; (3) RESTful API calls from your DAQ software; (4) CSV file export for post-processing. We provide integration documentation for common systems (National Instruments, dSPACE, ETAS).',
    },
    {
      question:
        'What about electromagnetic interference (EMI) in high-power environments?',
      answer:
        'Sensor design includes EMI mitigation: (1) Twisted-pair wiring for differential signaling; (2) Shielded cables for high-interference environments; (3) On-board filtering for power supply noise. DO-160G Category M (EMI) testing is in progress. For extremely high-interference environments, we recommend shielded enclosures or fiber-optic data transmission.',
    },
    {
      question: 'How does temperature affect pressure measurement accuracy?',
      answer:
        'We address thermal sensitivity with: (1) On-board reference temperature sensors at each array; (2) Software compensation algorithms that correct pressure readings based on measured temperature; (3) Factory calibration at multiple temperatures to characterize thermal coefficients. Residual thermal error after compensation: <0.5% over 0-30°C ambient range.',
    },
    {
      question: 'Can I use Hyve on curved surfaces?',
      answer:
        'Yes, this is a core design feature. The flexible Kapton substrate conforms to surfaces with radii as small as 10mm (leading edge of small aircraft wings, F1 front wing elements). For extremely tight radii (<5mm), custom sensor geometries are available. The flexible substrate also handles moderate surface strain (up to 5% elongation) without damage.',
    },
    {
      question: "What's the data storage requirement for a typical test?",
      answer:
        '100 sensors at 100Hz = 10,000 samples/second. Each sample ≈21 bytes. Total: ~210 KB/second or ~750 MB/hour. A typical 4-hour wind tunnel session = ~3 GB uncompressed CSV. Compressed: ~500 MB. Recommendation: Stream to cloud storage or use local SSD.',
    },
    {
      question: 'Do I need special training to use Hyve?',
      answer:
        'Basic operation (bonding sensor, launching dashboard, running test): No specialized training required; includes 1-hour onboarding video. Advanced use (custom calibration, API integration, multi-array synchronization): Recommended 1-day training session. Installation for permanent IVHM: 3-day composite integration course available.',
    },
    {
      question: "What's the warranty and support model?",
      answer:
        'Standard warranty: 12 months from delivery for manufacturing defects. Sensor arrays rated for 500+ test cycles. Support tiers: (1) Basic email support (48hr response); (2) Priority support with phone/video (same-day response); (3) On-site engineering support (quoted separately). Extended warranties available.',
    },
    {
      question: 'Can I try before I buy?',
      answer:
        'Yes. Options: (1) Schedule on-site demonstration at our wind tunnel facility (UK-based); (2) Request 30-day pilot deployment at your facility (requires deposit, refundable upon purchase); (3) Rent arrays for short-term projects (minimum 1 week rental).',
    },
  ]

  return (
    <div className="min-h-screen relative">
      <CustomMeshBackground
        enabled={true}
        className="min-h-screen"
        blur={true}
        blurIntensity="sm"
      >
        {/* ============================================ */}
        {/* SECTION 1: HERO */}
        {/* ============================================ */}
        <section className="relative min-h-[70vh] flex items-center py-16 lg:py-20 pointer-events-auto">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                to="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-hyve-text hover:text-hyve-accent transition-colors group"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Content */}
              <div>
                <motion.div variants={itemVariants} className="mb-6">
                  <Badge
                    variant="secondary"
                    className="px-4 py-1 text-sm font-medium"
                  >
                    TECHNOLOGY DEEP DIVE
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-hyve-header mb-4 font-heading"
                >
                  Hyve Haptic Matrix Technology
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-hyve-text font-light mb-6 leading-relaxed"
                >
                  The aerospace industry's first non-invasive, multi-parameter
                  sensing platform for real-time aerodynamic intelligence and
                  structural health monitoring.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-hyve-text hover:bg-hyve-text-dark text-white group"
                    onClick={() => {
                      const techSpecsSection =
                        document.getElementById('specifications')
                      if (techSpecsSection) {
                        techSpecsSection.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }
                    }}
                  >
                    Technical Specifications
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-hyve-accent text-hyve-text hover:bg-hyve-accent/10"
                    onClick={triggerContactForm}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Demo
                  </Button>
                </motion.div>
              </div>

              {/* Right Visual - Product Image + Stats Column */}
              <motion.div
                variants={itemVariants}
                className="relative flex items-center justify-center gap-4"
              >
                {/* Product Image - No background */}
                <div className="relative max-w-[350px]">
                  <img
                    src="/MatrixMesh-r5.png"
                    alt="Hyve Haptic Matrix - Flexible sensor array showing 10x10 grid configuration on Kapton substrate"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Key Stats - Right Column */}
                <div className="flex flex-col gap-3">
                  <div className="text-center p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-hyve-content/20">
                    <div className="text-xl font-bold text-hyve-header font-mono">
                      0.33mm
                    </div>
                    <div className="text-[10px] text-hyve-text/70">
                      Thickness
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-hyve-content/20">
                    <div className="text-xl font-bold text-hyve-header font-mono">
                      1kHz
                    </div>
                    <div className="text-[10px] text-hyve-text/70">
                      Sampling
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-hyve-content/20">
                    <div className="text-xl font-bold text-hyve-header font-mono">
                      ±1.5%
                    </div>
                    <div className="text-[10px] text-hyve-text/70">
                      Accuracy
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: TECHNICAL OVERVIEW */}
        {/* ============================================ */}
        <section
          id="overview"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-6 font-heading"
              >
                What Is the Hyve Haptic Matrix?
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-hyve-text/80 leading-relaxed mb-8"
              >
                The Hyve Haptic Matrix is an ultra-thin (0.33mm), flexible
                sensor array that transforms surfaces into intelligent sensing
                systems. Based on biomimetic principles—replicating how living
                organisms sense their environment—our technology delivers
                real-time pressure, temperature, and strain measurements without
                structural modification or invasive installation.
              </motion.p>

              {/* Core Innovation */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  Core Innovation
                </h3>
                <p className="text-sm text-hyve-text/70 mb-4">
                  Unlike traditional instrumentation that requires drilling into
                  composites or complex camera systems, the Hyve Haptic Matrix
                  uses a peel-and-stick deployment model with flexible strain
                  gauge arrays. This enables:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {
                      icon: Gauge,
                      text: 'Bidirectional pressure sensing (±10kPa, both pressure and suction)',
                    },
                    {
                      icon: Layers,
                      text: 'Multi-parameter measurement (pressure, temperature, strain in one sensor)',
                    },
                    {
                      icon: Shield,
                      text: 'Non-destructive deployment (adhesive bonding, no structural penetration)',
                    },
                    {
                      icon: Settings,
                      text: 'Infinite repositioning (deploy, test, move, redeploy in minutes)',
                    },
                    {
                      icon: Zap,
                      text: 'Real-time data streaming (100Hz per sensor, sub-second latency)',
                    },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-hyve-content/10 rounded-lg"
                      >
                        <Icon className="h-4 w-4 text-hyve-interactive flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-hyve-text/80">
                          {item.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Development History */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  Development History
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 rounded-xl">
                    <div className="text-2xl font-bold text-hyve-header">
                      8 years
                    </div>
                    <div className="text-xs text-hyve-text/70 mt-1">
                      PhD & post-doctoral research at Cranfield University
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 rounded-xl">
                    <div className="text-2xl font-bold text-hyve-header">
                      15+ years
                    </div>
                    <div className="text-xs text-hyve-text/70 mt-1">
                      Aerospace experience (NASA, Boeing, Airbus, Rolls-Royce)
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 rounded-xl">
                    <div className="text-2xl font-bold text-hyve-header">
                      6 patents
                    </div>
                    <div className="text-xs text-hyve-text/70 mt-1">
                      Granted + 2 filed applications
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 rounded-xl">
                    <div className="text-2xl font-bold text-hyve-header">
                      Validated
                    </div>
                    <div className="text-xs text-hyve-text/70 mt-1">
                      With F1 teams, aerospace OEMs, defense contractors
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: HOW IT WORKS */}
        {/* ============================================ */}
        <section
          id="how-it-works"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  How It Actually Works
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto">
                  Deep dive into sensor architecture, measurement principles,
                  and signal processing
                </p>
              </motion.div>

              {/* Sensor Architecture */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10 mb-8"
              >
                <h3 className="text-2xl font-bold text-hyve-header mb-6 font-heading">
                  Sensor Architecture
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Physical Construction */}
                  <div>
                    <h4 className="text-lg font-semibold text-hyve-header mb-4 flex items-center gap-2">
                      <Layers className="h-5 w-5 text-hyve-interactive" />
                      Physical Construction
                    </h4>
                    <ul className="space-y-3">
                      {[
                        {
                          label: 'Substrate',
                          value:
                            'Flexible Kapton polyimide film (proven in aerospace)',
                        },
                        {
                          label: 'Sensing elements',
                          value: 'Strain gauge matrix in 10×10 configuration',
                        },
                        {
                          label: 'Spatial resolution',
                          value: '4mm × 4mm per sensing element',
                        },
                        {
                          label: 'Total thickness',
                          value: '0.33mm excluding adhesive',
                        },
                        {
                          label: 'Weight',
                          value: '0.08g per cm² of sensory membrane',
                        },
                        {
                          label: 'Pressure orifices',
                          value:
                            'Precision-cut based on Euler-Bernoulli beam theory',
                        },
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-sm font-semibold text-hyve-header min-w-[120px]">
                            {item.label}:
                          </span>
                          <span className="text-sm text-hyve-text/70">
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Electronics */}
                  <div>
                    <h4 className="text-lg font-semibold text-hyve-header mb-4 flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-hyve-interactive" />
                      Electronics
                    </h4>
                    <ul className="space-y-3">
                      {[
                        {
                          label: 'PCB',
                          value: 'Flexible Kapton board (10cm × 10cm × 5mm)',
                        },
                        {
                          label: 'Data acquisition',
                          value: 'Multiplexed ADC with synchronized sampling',
                        },
                        {
                          label: 'Power',
                          value: '10mA sensor, 500mA max with wireless',
                        },
                        {
                          label: 'Connectivity',
                          value: 'USB serial (wired) and WiFi (wireless)',
                        },
                        {
                          label: 'Temp compensation',
                          value:
                            'On-board reference sensors with software correction',
                        },
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-sm font-semibold text-hyve-header min-w-[120px]">
                            {item.label}:
                          </span>
                          <span className="text-sm text-hyve-text/70">
                            {item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Measurement Principles */}
              <motion.div
                variants={itemVariants}
                className="grid md:grid-cols-3 gap-6 mb-8"
              >
                {/* Pressure */}
                <Card className="bg-white/95 backdrop-blur-xl border-hyve-content/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Gauge className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-hyve-header">
                        Pressure Sensing
                      </h4>
                    </div>
                    <p className="text-sm text-hyve-text/70 mb-4">
                      Differential strain measurement across precisely-engineered
                      membrane orifices. When pressure or suction is applied, the
                      membrane deflects proportionally.
                    </p>
                    <ul className="space-y-2 text-xs text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">
                          Bidirectional:
                        </strong>{' '}
                        Both positive pressure and suction
                      </li>
                      <li>
                        <strong className="text-hyve-header">Range:</strong>{' '}
                        -10kPa to +10kPa (expandable to ±50kPa)
                      </li>
                      <li>
                        <strong className="text-hyve-header">Accuracy:</strong>{' '}
                        ±1.5% relative standard error
                      </li>
                      <li>
                        <strong className="text-hyve-header">Resolution:</strong>{' '}
                        Detects ~0.1mm ride height variation
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Temperature */}
                <Card className="bg-white/95 backdrop-blur-xl border-hyve-content/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                        <Thermometer className="h-5 w-5 text-amber-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-hyve-header">
                        Temperature Sensing
                      </h4>
                    </div>
                    <p className="text-sm text-hyve-text/70 mb-4">
                      Integrated temperature-sensitive resistive elements provide
                      thermal mapping alongside pressure data.
                    </p>
                    <ul className="space-y-2 text-xs text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">
                          Operating range:
                        </strong>{' '}
                        -50°C to 150°C materials
                      </li>
                      <li>
                        <strong className="text-hyve-header">Tested:</strong>{' '}
                        0°C to 30°C ambient (current validation)
                      </li>
                      <li>
                        <strong className="text-hyve-header">
                          Compensation:
                        </strong>{' '}
                        Software corrects thermal drift
                      </li>
                      <li>
                        <strong className="text-hyve-header">
                          Applications:
                        </strong>{' '}
                        Brake ducts, cryogenic tunnels
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Strain */}
                <Card className="bg-white/95 backdrop-blur-xl border-hyve-content/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-emerald-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-hyve-header">
                        Strain Sensing
                      </h4>
                    </div>
                    <p className="text-sm text-hyve-text/70 mb-4">
                      Surface deformation measurement enables structural health
                      monitoring and transition from aerodynamic testing to IVHM.
                    </p>
                    <ul className="space-y-2 text-xs text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">Measurement:</strong>{' '}
                        Direct strain gauge output
                      </li>
                      <li>
                        <strong className="text-hyve-header">Use cases:</strong>{' '}
                        Composite monitoring, impact detection
                      </li>
                      <li>
                        <strong className="text-hyve-header">Integration:</strong>{' '}
                        Embeddable during composite manufacturing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Signal Processing */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10"
              >
                <h3 className="text-2xl font-bold text-hyve-header mb-6 font-heading">
                  Signal Processing & Data Output
                </h3>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Sampling & Latency */}
                  <div>
                    <h4 className="text-lg font-semibold text-hyve-header mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-hyve-interactive" />
                      Sampling & Latency
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">Per-sensor:</strong>{' '}
                        100Hz (10ms intervals)
                      </li>
                      <li>
                        <strong className="text-hyve-header">
                          System latency:
                        </strong>{' '}
                        1-10ms per array
                      </li>
                      <li>
                        <strong className="text-hyve-header">Sync:</strong>{' '}
                        All sensors timestamp-synchronized
                      </li>
                    </ul>
                  </div>

                  {/* Data Formats */}
                  <div>
                    <h4 className="text-lg font-semibold text-hyve-header mb-4 flex items-center gap-2">
                      <Database className="h-5 w-5 text-hyve-interactive" />
                      Data Formats
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">Raw:</strong> CSV
                        with timestamp, ID, pressure, temp, strain
                      </li>
                      <li>
                        <strong className="text-hyve-header">Streaming:</strong>{' '}
                        MQTT protocol for cloud dashboards
                      </li>
                      <li>
                        <strong className="text-hyve-header">API:</strong>{' '}
                        RESTful for CFD tools, MATLAB, Python
                      </li>
                    </ul>
                  </div>

                  {/* Calibration */}
                  <div>
                    <h4 className="text-lg font-semibold text-hyve-header mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-hyve-interactive" />
                      Calibration
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">Factory:</strong>{' '}
                        Multi-point with traceable standards
                      </li>
                      <li>
                        <strong className="text-hyve-header">Software:</strong>{' '}
                        Field-adjustable coefficients
                      </li>
                      <li>
                        <strong className="text-hyve-header">Drift:</strong>{' '}
                        Periodic re-zeroing + temp correction
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: TECHNICAL SPECIFICATIONS */}
        {/* ============================================ */}
        <section
          id="specifications"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/95 to-hyve-content/30 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-8 font-heading text-center"
              >
                Technical Specifications
              </motion.h2>

              {/* Performance Characteristics */}
              <motion.div variants={itemVariants} className="mb-10">
                <h3 className="text-2xl font-semibold text-hyve-header mb-6">
                  Performance Characteristics
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-hyve-content/30">
                        <th className="text-left py-3 px-4 font-semibold text-hyve-header">
                          Specification
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-hyve-header">
                          Value
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-hyve-header">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          spec: 'Pressure Accuracy',
                          value: '±1.5% RSE',
                          notes: 'Across full ±10kPa range',
                        },
                        {
                          spec: 'Pressure Range',
                          value: '-10kPa to +10kPa',
                          notes: 'Standard config, expandable to ±50kPa',
                        },
                        {
                          spec: 'Pressure Resolution',
                          value: '±1kPa',
                          notes: '~0.1mm ride height variation in F1',
                        },
                        {
                          spec: 'Sampling Rate',
                          value: '100Hz per sensor',
                          notes: 'Real-time flow separation detection',
                        },
                        {
                          spec: 'System Latency',
                          value: '1-10ms per array',
                          notes: 'Correlation with driver inputs',
                        },
                        {
                          spec: 'Spatial Resolution',
                          value: '4mm × 4mm grid',
                          notes: 'Maps vortex structures and gradients',
                        },
                        {
                          spec: 'Temperature Range',
                          value: '-50°C to 150°C',
                          notes: 'Material ratings; tested 0-30°C ambient',
                        },
                        {
                          spec: 'Sensor Density',
                          value: '100 per 24cm × 24cm',
                          notes: 'Scalable to thousands',
                        },
                        {
                          spec: 'Thickness',
                          value: '0.33mm max',
                          notes: 'Excluding adhesive backing',
                        },
                        {
                          spec: 'Weight',
                          value: '0.08g per cm²',
                          notes: 'Lighter than paint on aircraft surfaces',
                        },
                        {
                          spec: 'Durability',
                          value: '500+ test cycles',
                          notes: 'Validated via calibrated pumps',
                        },
                      ].map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-hyve-content/10"
                        >
                          <td className="py-3 px-4 font-medium text-hyve-header">
                            {row.spec}
                          </td>
                          <td className="py-3 px-4 font-mono text-hyve-interactive">
                            {row.value}
                          </td>
                          <td className="py-3 px-4 text-hyve-text/70">
                            {row.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Physical Characteristics */}
              <motion.div variants={itemVariants} className="mb-10">
                <h3 className="text-2xl font-semibold text-hyve-header mb-6">
                  Physical Characteristics
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      label: 'Substrate Material',
                      value: 'Kapton polyimide film',
                    },
                    {
                      label: 'Sensing Element',
                      value: 'Strain gauges in matrix',
                    },
                    { label: 'PCB Dimensions', value: '10cm × 10cm × 5mm' },
                    { label: 'Connection', value: 'USB serial or WiFi' },
                    {
                      label: 'Power Draw',
                      value: '10mA membrane, 500mA max',
                    },
                    {
                      label: 'Adhesive',
                      value: 'Aerospace-grade pressure-sensitive',
                    },
                    { label: 'Reusability', value: 'Hundreds of cycles' },
                    {
                      label: 'Environmental',
                      value: 'DO-160G (in certification)',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/70 rounded-xl border border-hyve-content/20"
                    >
                      <div className="text-xs text-hyve-text/50 uppercase tracking-wide mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium text-hyve-header">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Scalability */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-hyve-header mb-4">
                  Scalability & Configuration
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: 'Modular Arrays',
                      desc: 'Single 10×10 to thousands of sensors',
                    },
                    {
                      title: 'Custom Geometries',
                      desc: 'Tailored to wings, bodywork, blades',
                    },
                    {
                      title: 'Daisy-chaining',
                      desc: 'Multiple arrays on single data bus',
                    },
                    {
                      title: 'Hot-swappable',
                      desc: 'Add/remove without system restart',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 rounded-xl"
                    >
                      <h4 className="text-sm font-semibold text-hyve-header mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-hyve-text/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: WHAT IT ACHIEVES */}
        {/* ============================================ */}
        <section
          id="outcomes"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  What It Achieves — Quantified Outcomes
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto">
                  Real-world results from aerospace, motorsport, and automotive
                  applications
                </p>
              </motion.div>

              {/* Aerospace Testing */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10 mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-hyve-header font-heading">
                    Aerospace Testing
                  </h3>
                </div>

                {/* Key Stats */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      value: '40-60%',
                      label: 'Lower instrumentation costs',
                    },
                    {
                      value: '500+',
                      label: 'Data points/sec vs 10-20',
                    },
                    { value: '<1 hour', label: 'Setup vs 1-2 days' },
                    {
                      value: 'Infinite',
                      label: 'Repositioning without damage',
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-hyve-content/10 rounded-xl"
                    >
                      <div className="text-2xl font-bold text-hyve-header">
                        {stat.value}
                      </div>
                      <div className="text-xs text-hyve-text/70 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* F1 Example */}
                <div className="bg-gradient-to-r from-hyve-header/5 to-hyve-accent/10 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-hyve-header mb-4">
                    Example: F1 Wind Tunnel Testing
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-hyve-text/60 mb-2">
                        Legacy Approach
                      </h5>
                      <ul className="space-y-1 text-sm text-hyve-text/70">
                        <li>• 20-30 pressure taps</li>
                        <li>• 2 days installation</li>
                        <li>• Limited spatial resolution</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-hyve-interactive mb-2">
                        With Hyve
                      </h5>
                      <ul className="space-y-1 text-sm text-hyve-header font-medium">
                        <li>• 100+ sensors per wing section</li>
                        <li>• 1 hour deployment</li>
                        <li>• Complete pressure distribution mapping</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-hyve-content/20 grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-hyve-header">
                        £2.8M
                      </div>
                      <div className="text-xs text-hyve-text/70">
                        Annual savings (wind tunnel + CFD + models)
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-hyve-header">
                        4-6 months
                      </div>
                      <div className="text-xs text-hyve-text/70">ROI period</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-hyve-header">
                        ~£10M
                      </div>
                      <div className="text-xs text-hyve-text/70">
                        Per championship position
                      </div>
                    </div>
                  </div>
                </div>

                {/* CFD & In-Flight */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-white/70 rounded-xl border border-hyve-content/20">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      CFD Validation
                    </h4>
                    <p className="text-sm text-hyve-text/70 mb-3">
                      £500K-£2M CFD campaigns still require experimental
                      validation. Hyve provides real-time validation with actual
                      measured data.
                    </p>
                    <ul className="text-xs text-hyve-text/70 space-y-1">
                      <li>• Identify correlation errors early</li>
                      <li>• Reduce iteration cycles by 30-40%</li>
                      <li>• Catch simulation errors before prototypes</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-white/70 rounded-xl border border-hyve-content/20">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      In-Flight Testing
                    </h4>
                    <p className="text-sm text-hyve-text/70 mb-3">
                      Non-invasive bonding, rapid deployment for flight test
                      campaigns, no structural modification required.
                    </p>
                    <ul className="text-xs text-hyve-text/70 space-y-1">
                      <li>• New aircraft certification</li>
                      <li>• Aerodynamic performance validation</li>
                      <li>• Flutter testing</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Motorsport Performance */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10 mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                    <Car className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-hyve-header font-heading">
                    Motorsport Performance
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      title: 'Real-time downforce mapping',
                      desc: 'Monitor pressure across wings, floor, bodywork during track sessions',
                    },
                    {
                      title: 'Brake duct optimization',
                      desc: 'Temperature + pressure for cooling validation',
                    },
                    {
                      title: 'DRS validation',
                      desc: 'Quantify pressure changes when rear wing activates',
                    },
                    {
                      title: 'Tunnel-to-track correlation',
                      desc: 'Identical sensors in tunnel and on-car',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-hyve-content/10 rounded-xl"
                    >
                      <h4 className="text-sm font-semibold text-hyve-header mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-hyve-text/70">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-red-500/5 to-orange-500/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-hyve-header mb-3">
                    2026 Regulation Reset Advantage
                  </h4>
                  <p className="text-sm text-hyve-text/70 mb-4">
                    New technical rules create development race. Faster iteration
                    between wind tunnel, CFD, and track testing = more performance
                    updates = championship positions.
                  </p>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-hyve-header">
                      £14M+ cumulative value
                    </div>
                    <div className="text-xs text-hyve-text/70">
                      2026-2030 for top team
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Automotive */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <Car className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-hyve-header font-heading">
                    Automotive (EV & ICE)
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-5 bg-hyve-content/10 rounded-xl">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      EV Range Optimization
                    </h4>
                    <p className="text-sm text-hyve-text/70 mb-3">
                      Every watt of aero drag reduces range. Full-surface pressure
                      mapping identifies drag sources (mirrors, A-pillar,
                      underbody).
                    </p>
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-lg font-bold text-hyve-header">
                        2-5% drag reduction
                      </div>
                      <div className="text-xs text-hyve-text/70">
                        = 10-25 miles additional range
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-hyve-content/10 rounded-xl">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      Thermal Management
                    </h4>
                    <p className="text-sm text-hyve-text/70 mb-3">
                      Battery cooling, motor thermal limits, cabin HVAC efficiency.
                      Simultaneous pressure + temperature mapping.
                    </p>
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-lg font-bold text-hyve-header">
                        Optimized airflow
                      </div>
                      <div className="text-xs text-hyve-text/70">
                        Without weight penalty
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-hyve-content/10 rounded-xl">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      High-Speed Stability
                    </h4>
                    <p className="text-sm text-hyve-text/70 mb-3">
                      Quantified lift/downforce distribution at speed. Identify
                      separation points causing instability.
                    </p>
                    <div className="text-center p-3 bg-white/70 rounded-lg">
                      <div className="text-lg font-bold text-hyve-header">
                        Improved safety
                      </div>
                      <div className="text-xs text-hyve-text/70">
                        Reduced warranty claims
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 6: IVHM */}
        {/* ============================================ */}
        <section
          id="ivhm"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/95 to-hyve-accent/10 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-xs font-medium mb-4"
                >
                  UNDERDEVELOPED OPPORTUNITY
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  Structural Health Monitoring (IVHM)
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl">
                  Shift from reactive maintenance (fix after failure) to
                  predictive maintenance (detect before failure).
                </p>
              </motion.div>

              {/* The Problem */}
              <motion.div
                variants={itemVariants}
                className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 mb-8"
              >
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  The Problem: Unscheduled Maintenance Costs Billions
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {[
                    {
                      value: '$15-20B',
                      label: 'Annual unscheduled maintenance (global fleet)',
                    },
                    {
                      value: '$150K-$500K',
                      label: 'AOG cost per day (wide-body)',
                    },
                    {
                      value: '40-60%',
                      label: 'Inspected components with no degradation',
                    },
                    {
                      value: '$500K-$2M',
                      label: 'Per C-check (heavy maintenance)',
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-3 bg-white/70 rounded-lg"
                    >
                      <div className="text-xl font-bold text-red-600">
                        {stat.value}
                      </div>
                      <div className="text-xs text-hyve-text/70 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-hyve-text/70">
                  Current inspection methods (visual, scheduled tear-down) miss
                  internal damage. Failure modes like delamination, fatigue
                  cracks, and impact damage often go undetected until
                  catastrophic.
                </p>
              </motion.div>

              {/* How Hyve Enables IVHM */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  How Hyve Enables IVHM
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-5 bg-white/70 rounded-xl border border-hyve-content/20">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      Composite Integration
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">
                          Embedding during layup:
                        </strong>{' '}
                        Sensors placed between composite layers
                      </li>
                      <li>
                        <strong className="text-hyve-header">
                          Zero weight penalty:
                        </strong>{' '}
                        Thinner than resin-rich layer
                      </li>
                      <li>
                        <strong className="text-hyve-header">
                          Permanent monitoring:
                        </strong>{' '}
                        First flight through end of service life
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-white/70 rounded-xl border border-hyve-content/20">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      What Gets Detected
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">
                          Delamination:
                        </strong>{' '}
                        Strain changes indicate layer separation
                      </li>
                      <li>
                        <strong className="text-hyve-header">
                          Impact detection:
                        </strong>{' '}
                        Bird strikes, hail, debris signatures
                      </li>
                      <li>
                        <strong className="text-hyve-header">Fatigue:</strong>{' '}
                        Micro-strain precedes visible cracks by thousands of
                        cycles
                      </li>
                      <li>
                        <strong className="text-hyve-header">
                          Degradation:
                        </strong>{' '}
                        Moisture ingress, thermal cycling effects
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* IVHM Business Case */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-emerald-500/5 to-teal-500/10 rounded-2xl p-6 mb-8"
              >
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  IVHM Business Case
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-hyve-text/60 mb-3">
                      With Hyve IVHM
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        • <strong>Condition-based maintenance:</strong> Inspect
                        only when sensors indicate degradation
                      </li>
                      <li>
                        • <strong>Avoided AOG events:</strong> Early detection
                        prevents in-service failures
                      </li>
                      <li>
                        • <strong>Extended service life:</strong> Operate to
                        actual limits, not assumptions
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-center p-4 bg-white/70 rounded-xl">
                      <div className="text-3xl font-bold text-emerald-600">
                        30-40%
                      </div>
                      <div className="text-sm text-hyve-text/70 mt-1">
                        Reduction in unscheduled maintenance costs
                      </div>
                      <div className="text-xs text-hyve-text/50 mt-2">
                        3-5x ROI over 10-year aircraft service life
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Defense Applications */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  Defense Applications
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'UAV Structural Monitoring',
                      desc: 'Track cumulative damage in lightweight composites, predict remaining service life',
                    },
                    {
                      title: 'Hypersonic Instrumentation',
                      desc: 'Real-time temperature + strain on leading edges, validate thermal protection',
                    },
                    {
                      title: 'Impact Detection',
                      desc: 'Instant detection of small-arms, shrapnel, debris impacts; assess structural integrity',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/70 rounded-xl border border-hyve-content/20"
                    >
                      <h4 className="text-sm font-semibold text-hyve-header mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-hyve-text/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 7: COMPETITIVE COMPARISON */}
        {/* ============================================ */}
        <section
          id="comparison"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading text-center"
              >
                Competitive Comparison
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-base text-hyve-text/70 text-center mb-8 max-w-2xl mx-auto"
              >
                Why legacy methods fail and how Hyve solves the problems
              </motion.p>

              {/* Comparison Table */}
              <motion.div
                variants={itemVariants}
                className="overflow-x-auto mb-8"
              >
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b-2 border-hyve-content/30">
                      <th className="text-left py-3 px-2 font-semibold text-hyve-header min-w-[120px]">
                        Capability
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-hyve-interactive min-w-[80px]">
                        Hyve
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-hyve-text/70 min-w-[80px]">
                        Pressure Taps
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-hyve-text/70 min-w-[80px]">
                        PSP
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-hyve-text/70 min-w-[80px]">
                        CFD
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-hyve-text/70 min-w-[80px]">
                        Tufting
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-hyve-text/70 min-w-[80px]">
                        IR Thermo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        cap: 'Non-invasive',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'warn',
                        cfd: 'check',
                        tuft: 'warn',
                        ir: 'check',
                      },
                      {
                        cap: 'Reusable',
                        hyve: 'check',
                        taps: 'warn',
                        psp: 'x',
                        cfd: 'check',
                        tuft: 'warn',
                        ir: 'check',
                      },
                      {
                        cap: 'Real-time data',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'x',
                        cfd: 'x',
                        tuft: 'x',
                        ir: 'warn',
                      },
                      {
                        cap: 'Full-surface coverage',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'check',
                        cfd: 'check',
                        tuft: 'warn',
                        ir: 'check',
                      },
                      {
                        cap: 'Low latency (1-10ms)',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'x',
                        cfd: 'x',
                        tuft: 'na',
                        ir: 'check',
                      },
                      {
                        cap: 'Low setup cost',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'x',
                        cfd: 'x',
                        tuft: 'check',
                        ir: 'warn',
                      },
                      {
                        cap: 'Works in real-world',
                        hyve: 'check',
                        taps: 'warn',
                        psp: 'warn',
                        cfd: 'check',
                        tuft: 'warn',
                        ir: 'warn',
                      },
                      {
                        cap: 'Multi-parameter (P+T+S)',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'x',
                        cfd: 'check',
                        tuft: 'x',
                        ir: 'x',
                      },
                      {
                        cap: 'Structural health',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'x',
                        cfd: 'x',
                        tuft: 'x',
                        ir: 'x',
                      },
                      {
                        cap: 'Install time <1hr',
                        hyve: 'check',
                        taps: 'x',
                        psp: 'x',
                        cfd: 'na',
                        tuft: 'check',
                        ir: 'check',
                      },
                      {
                        cap: 'Quantitative output',
                        hyve: 'check',
                        taps: 'check',
                        psp: 'warn',
                        cfd: 'check',
                        tuft: 'x',
                        ir: 'warn',
                      },
                    ].map((row, index) => {
                      const renderIcon = (val: string) => {
                        if (val === 'check')
                          return (
                            <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                          )
                        if (val === 'x')
                          return <X className="h-4 w-4 text-red-400 mx-auto" />
                        if (val === 'warn')
                          return (
                            <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto" />
                          )
                        return (
                          <span className="text-hyve-text/30 text-xs">N/A</span>
                        )
                      }
                      return (
                        <tr
                          key={index}
                          className="border-b border-hyve-content/10"
                        >
                          <td className="py-2 px-2 text-hyve-header font-medium">
                            {row.cap}
                          </td>
                          <td className="py-2 px-2 bg-hyve-interactive/5">
                            {renderIcon(row.hyve)}
                          </td>
                          <td className="py-2 px-2">{renderIcon(row.taps)}</td>
                          <td className="py-2 px-2">{renderIcon(row.psp)}</td>
                          <td className="py-2 px-2">{renderIcon(row.cfd)}</td>
                          <td className="py-2 px-2">{renderIcon(row.tuft)}</td>
                          <td className="py-2 px-2">{renderIcon(row.ir)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </motion.div>

              {/* Legend */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center gap-6 mb-8 text-xs"
              >
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-emerald-500" />
                  <span className="text-hyve-text/70">Major advantage</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  <span className="text-hyve-text/70">Partial/Limited</span>
                </div>
                <div className="flex items-center gap-1">
                  <X className="h-3 w-3 text-red-400" />
                  <span className="text-hyve-text/70">
                    Significant disadvantage
                  </span>
                </div>
              </motion.div>

              {/* Bottom Line */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-hyve-interactive/10 to-hyve-accent/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-hyve-header mb-3">
                  Bottom Line
                </h3>
                <p className="text-sm text-hyve-text/80 max-w-3xl mx-auto">
                  Hyve is the <strong>only technology</strong> that combines:
                  full-surface coverage (like PSP), real-time feedback (unlike
                  PSP, pressure taps, CFD), non-invasive deployment (unlike
                  pressure taps), multi-parameter measurement (unlike any single
                  legacy method), works in both controlled and real-world
                  environments, and enables structural health monitoring.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 8: PATENT PORTFOLIO */}
        {/* ============================================ */}
        <section
          id="patents"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-hyve-interactive/10 to-hyve-accent/10 rounded-3xl p-8 lg:p-12"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center mb-8"
              >
                <Award className="h-8 w-8 text-hyve-interactive mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header font-heading">
                  Patent Portfolio & IP Protection
                </h2>
              </motion.div>

              {/* Granted Patents */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  Granted Patents (6)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'GB2580928',
                      title: 'Stretchable Bidirectional Pressure Sensor',
                      innovation:
                        'Malleable surface senses both positive pressure and negative pressure (suction)',
                      apps: 'Wind tunnel testing, in-flight pressure mapping',
                    },
                    {
                      id: 'GB2582299',
                      title: 'Stretchable Multifunctional Pressure Sensor',
                      innovation:
                        'Adds temperature sensing to pressure measurement in single integrated sensor',
                      apps: 'Brake duct optimization, cryogenic wind tunnels',
                    },
                    {
                      id: 'GB2591240',
                      title: 'Multifunctional Composite Material',
                      innovation:
                        '"Artificial muscle mechanics" - sensors embedded enable sensing AND actuation',
                      apps: 'Active flow control, morphing structures',
                    },
                    {
                      id: 'GB2602973',
                      title: 'Deforming Sensing Layer',
                      innovation:
                        'Large sensing surface without sacrificing individual sensor precision',
                      apps: 'Full-vehicle coverage, wing-to-fuselage continuous',
                    },
                    {
                      id: 'GB2405409',
                      title: 'In-Plane Stretchable Thin Shear Bidirectional Force',
                      innovation:
                        'Integration format bringing all prior patents together',
                      apps: 'Aerodynamic shear mapping, boundary layer detection',
                    },
                    {
                      id: 'GB2409070.6',
                      title: 'Integrated Bi-Directional Pressure with In-Plane Resistors',
                      innovation:
                        'Full-scale deflection measurements - pinnacle configuration',
                      apps: 'High-speed aerodynamics, hypersonic testing',
                    },
                  ].map((patent, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/80 rounded-xl border border-hyve-content/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-hyve-interactive bg-hyve-interactive/10 px-2 py-0.5 rounded">
                          {patent.id}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-hyve-header mb-2">
                        {patent.title}
                      </h4>
                      <p className="text-xs text-hyve-text/70 mb-2">
                        <strong>Innovation:</strong> {patent.innovation}
                      </p>
                      <p className="text-xs text-hyve-text/50">
                        <strong>Applications:</strong> {patent.apps}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* IP Strategy */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  IP Strategy
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: 'Broad Coverage',
                      desc: 'Spans sensor architecture, measurement principles, integration, applications',
                    },
                    {
                      title: 'Defensive Moat',
                      desc: '6 granted patents create significant barriers to entry',
                    },
                    {
                      title: 'Future Roadmap',
                      desc: '2 additional filings extend into shear sensing, advanced integration',
                    },
                    {
                      title: 'Freedom to Operate',
                      desc: 'Clean IP landscape for aerospace and automotive applications',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/60 rounded-xl text-center"
                    >
                      <h4 className="text-sm font-semibold text-hyve-header mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-hyve-text/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 9: CERTIFICATIONS */}
        {/* ============================================ */}
        <section
          id="certifications"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center mb-8"
              >
                <Shield className="h-8 w-8 text-hyve-interactive mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header font-heading">
                  Certifications & Compliance
                </h2>
              </motion.div>

              {/* Aerospace Certifications */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  Aerospace Certifications
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-hyve-content/10 rounded-xl">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      DO-160G
                    </h4>
                    <p className="text-sm text-hyve-text/70 mb-3">
                      Environmental Conditions and Test Procedures for Airborne
                      Equipment
                    </p>
                    <Badge variant="outline" className="mb-3">
                      In Certification
                    </Badge>
                    <ul className="text-xs text-hyve-text/60 space-y-1">
                      <li>• Temperature and altitude (Category A/B)</li>
                      <li>• Vibration (Category Y)</li>
                      <li>• Electromagnetic interference (Category M)</li>
                      <li>• Humidity (Category C)</li>
                      <li>• Fluid susceptibility (Category X)</li>
                    </ul>
                  </div>

                  <div className="p-5 bg-hyve-content/10 rounded-xl">
                    <h4 className="text-base font-semibold text-hyve-header mb-3">
                      AS9100D
                    </h4>
                    <p className="text-sm text-hyve-text/70 mb-3">
                      Quality Management Systems for Aviation, Space, and Defense
                    </p>
                    <Badge variant="outline" className="mb-3">
                      Designed to Standard
                    </Badge>
                    <ul className="text-xs text-hyve-text/60 space-y-1">
                      <li>• Partner manufacturers with existing certification</li>
                      <li>• Documented calibration procedures</li>
                      <li>• Full traceability</li>
                      <li>• Non-conformance processes</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Certification Pathways */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  Certification Pathways for Airborne Use
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'TSO (Technical Standard Order)',
                      timeline: '12-18 months',
                      desc: 'For primary flight instrumentation. FAA approval of design, manufacturing, testing.',
                    },
                    {
                      title: 'STC (Supplemental Type Certificate)',
                      timeline: '6-12 months',
                      desc: 'For installation on existing certified aircraft. Required for in-flight testing and IVHM.',
                    },
                    {
                      title: 'PMA (Parts Manufacturer Approval)',
                      timeline: '6-9 months',
                      desc: 'For replacement/modification parts. Less stringent than TSO.',
                    },
                  ].map((path, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/70 rounded-xl border border-hyve-content/20"
                    >
                      <h4 className="text-sm font-semibold text-hyve-header mb-2">
                        {path.title}
                      </h4>
                      <div className="text-xs text-hyve-interactive font-medium mb-2">
                        Timeline: {path.timeline}
                      </div>
                      <p className="text-xs text-hyve-text/70">{path.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-hyve-text/70 mt-4 bg-hyve-content/10 rounded-lg p-3">
                  <strong>Note:</strong> Wind tunnel and ground testing does NOT
                  require airworthiness certification—enables immediate
                  deployment for aerospace R&D.
                </p>
              </motion.div>

              {/* Defense Standards */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-hyve-header mb-4">
                  Defense & Military Standards
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-hyve-content/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-hyve-header mb-2">
                      MIL-STD-810
                    </h4>
                    <p className="text-xs text-hyve-text/70">
                      Material selections based on MIL-STD-810 proven components.
                      Relevant tests: shock, vibration, temperature extremes,
                      humidity, salt fog.
                    </p>
                  </div>
                  <div className="p-4 bg-hyve-content/10 rounded-xl">
                    <h4 className="text-sm font-semibold text-hyve-header mb-2">
                      Cybersecurity (NIST, CMMC)
                    </h4>
                    <p className="text-xs text-hyve-text/70">
                      AES-256 encryption for wireless transmission. Isolated VLANs
                      for defense installations. ITAR compliance for export
                      control.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 10: INTEGRATION & DEPLOYMENT */}
        {/* ============================================ */}
        <section
          id="integration"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  Integration & Deployment
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto">
                  Multiple installation methods and seamless system integration
                </p>
              </motion.div>

              {/* Installation Methods */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10 mb-8"
              >
                <h3 className="text-2xl font-bold text-hyve-header mb-6 font-heading">
                  Installation Methods
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Layers,
                      title: 'Adhesive Bonding (Primary)',
                      steps: [
                        'Clean surface with isopropyl alcohol',
                        'Position sensor array',
                        'Apply pressure for 30 seconds',
                        'Removal: peel at 90-degree angle',
                      ],
                      note: 'Hundreds of bond/peel cycles demonstrated',
                    },
                    {
                      icon: HardDrive,
                      title: 'Magnetic Mounting',
                      steps: [
                        'Zero surface preparation',
                        'Instant attachment/removal',
                        'Ideal for steel/aluminum models',
                      ],
                      note: 'Requires ferromagnetic substrate',
                    },
                    {
                      icon: Wrench,
                      title: 'Composite Integration (IVHM)',
                      steps: [
                        'Embed between composite plies',
                        'Autoclave compatible (120-180°C)',
                        'Route leads to edge connector',
                        'Becomes permanent part of structure',
                      ],
                      note: 'Co-curing validation recommended',
                    },
                  ].map((method, index) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={index}
                        className="p-5 bg-hyve-content/10 rounded-xl"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-hyve-interactive/20 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-hyve-interactive" />
                          </div>
                          <h4 className="text-base font-semibold text-hyve-header">
                            {method.title}
                          </h4>
                        </div>
                        <ul className="space-y-2 text-sm text-hyve-text/70 mb-3">
                          {method.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-hyve-interactive font-bold">
                                {i + 1}.
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-hyve-text/50 italic">
                          {method.note}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* System Integration */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10 mb-8"
              >
                <h3 className="text-2xl font-bold text-hyve-header mb-6 font-heading">
                  System Integration
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-hyve-header mb-4 flex items-center gap-2">
                      <Radio className="h-5 w-5 text-hyve-interactive" />
                      Hardware Interface
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">Wired:</strong> USB
                        2.0 or serial UART
                      </li>
                      <li>
                        <strong className="text-hyve-header">Wireless:</strong>{' '}
                        WiFi 802.11b/g/n (2.4GHz) with WPA2
                      </li>
                      <li>
                        <strong className="text-hyve-header">Power:</strong> USB
                        bus-powered or external 5V
                      </li>
                      <li>
                        <strong className="text-hyve-header">Multi-array:</strong>{' '}
                        Daisy-chain up to 10 arrays
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-hyve-header mb-4 flex items-center gap-2">
                      <Database className="h-5 w-5 text-hyve-interactive" />
                      Software Integration
                    </h4>
                    <ul className="space-y-2 text-sm text-hyve-text/70">
                      <li>
                        <strong className="text-hyve-header">Dashboard:</strong>{' '}
                        Web-based UI for real-time visualization
                      </li>
                      <li>
                        <strong className="text-hyve-header">API:</strong>{' '}
                        RESTful (JSON) for third-party integration
                      </li>
                      <li>
                        <strong className="text-hyve-header">Streaming:</strong>{' '}
                        MQTT for cloud platforms
                      </li>
                      <li>
                        <strong className="text-hyve-header">Formats:</strong>{' '}
                        CSV, HDF5, MATLAB .mat files
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-hyve-content/20">
                  <h4 className="text-base font-semibold text-hyve-header mb-3">
                    Compatible With Existing Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'ANSYS Fluent',
                      'OpenFOAM',
                      'STAR-CCM+',
                      'MATLAB',
                      'Python (NumPy/Pandas)',
                      'LabVIEW',
                      'dSPACE',
                      'ETAS',
                      'AWS IoT',
                      'Azure IoT',
                    ].map((tool, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Deployment Scenarios */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-10"
              >
                <h3 className="text-2xl font-bold text-hyve-header mb-6 font-heading">
                  Deployment Scenarios
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Wind Tunnel Model Testing',
                      steps: [
                        'Clean model surface',
                        'Position sensor array on test location',
                        'Connect via USB or WiFi',
                        'Launch dashboard, verify sensors',
                        'Start wind tunnel run',
                        'Export data, reposition in <5 min',
                      ],
                    },
                    {
                      title: 'On-Track F1 Testing',
                      steps: [
                        'Bond arrays to wing, floor, brake ducts',
                        'Connect to onboard DAQ via WiFi',
                        'Configure sampling parameters',
                        'Run sessions with pit wall telemetry',
                        'Correlate with driver inputs, lap times',
                        'Remove arrays post-session',
                      ],
                    },
                    {
                      title: 'Composite IVHM Installation',
                      steps: [
                        'Embed sensors between plies during layup',
                        'Route leads to wing root connector',
                        'Cure in autoclave',
                        'Connect to aircraft data bus',
                        'Commission: establish baseline readings',
                        'In-service: continuous monitoring',
                      ],
                    },
                  ].map((scenario, index) => (
                    <div
                      key={index}
                      className="p-5 bg-gradient-to-br from-hyve-interactive/5 to-hyve-accent/5 rounded-xl"
                    >
                      <h4 className="text-base font-semibold text-hyve-header mb-4">
                        {scenario.title}
                      </h4>
                      <ol className="space-y-2">
                        {scenario.steps.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-hyve-text/70"
                          >
                            <span className="w-5 h-5 rounded-full bg-hyve-interactive/20 text-hyve-interactive text-xs flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 11: CUSTOMER SEGMENTS */}
        {/* ============================================ */}
        <section
          id="customers"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  Customer Segments & Use Cases
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-3xl mx-auto">
                  Tailored solutions for aerospace, motorsport, automotive,
                  defense, and research
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Plane,
                    title: 'Aerospace OEMs',
                    apps: [
                      'Wing design validation',
                      'Propulsion system integration',
                      'Control surface optimization',
                      'Sustainable aviation fuel testing',
                    ],
                    value:
                      'Reduce wind tunnel test time 40-60%, validate £2M CFD campaigns',
                    targets:
                      'Boeing, Airbus, Embraer, Bombardier, Gulfstream, Bell, Sikorsky',
                  },
                  {
                    icon: Factory,
                    title: 'Wind Tunnel Facilities',
                    apps: [
                      'Instrumentation rental services',
                      'Model preservation',
                      'Multi-customer efficiency',
                    ],
                    value:
                      'Differentiate with cutting-edge instrumentation, reduce refurbishment 30-50%',
                    targets:
                      'NASA, ONERA, DLR, QinetiQ, university wind tunnels',
                  },
                  {
                    icon: Car,
                    title: 'Formula 1 / Motorsport',
                    apps: [
                      'Real-time downforce mapping',
                      'Tunnel-to-track correlation',
                      'Brake duct optimization',
                      'DRS validation',
                    ],
                    value:
                      '£2M+ annual savings, faster development in regulation resets',
                    targets:
                      'Mercedes-AMG, Red Bull, Ferrari, McLaren, Alpine, Porsche',
                  },
                  {
                    icon: Building2,
                    title: 'Automotive (EV & Performance)',
                    apps: [
                      'EV drag reduction',
                      'Thermal management',
                      'High-speed stability',
                      'Acoustic optimization',
                    ],
                    value:
                      '2-5% drag reduction = 10-25 miles additional EV range',
                    targets:
                      'Tesla, Lucid, Rivian, Porsche, BMW, Mercedes, Aston Martin',
                  },
                  {
                    icon: Shield,
                    title: 'Defense & Government',
                    apps: [
                      'UAV testing and monitoring',
                      'Hypersonic instrumentation',
                      'Impact detection',
                      '6th gen fighter development',
                    ],
                    value:
                      'Real-time mission-critical data, embedded IVHM for fleet availability',
                    targets:
                      'UK MoD, DARPA, AFRL, Lockheed Martin, Northrop Grumman, BAE',
                  },
                  {
                    icon: GraduationCap,
                    title: 'Research Institutions',
                    apps: [
                      'PhD research',
                      'Grant-funded projects',
                      'Collaborative partnerships',
                    ],
                    value:
                      'Academic pricing, publication-quality data, student training',
                    targets:
                      'MIT, Stanford, Caltech, Cranfield, TU Delft, Georgia Tech, Imperial',
                  },
                ].map((segment, index) => {
                  const Icon = segment.icon
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hyve-interactive/20 to-hyve-accent/20 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-hyve-interactive" />
                            </div>
                            <h3 className="text-lg font-semibold text-hyve-header">
                              {segment.title}
                            </h3>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-hyve-text/50 uppercase tracking-wide mb-2">
                              Primary Applications
                            </h4>
                            <ul className="space-y-1">
                              {segment.apps.map((app, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-hyve-text/70 flex items-center gap-2"
                                >
                                  <span className="w-1 h-1 rounded-full bg-hyve-interactive" />
                                  {app}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4 p-3 bg-hyve-content/10 rounded-lg">
                            <h4 className="text-xs font-semibold text-hyve-text/50 uppercase tracking-wide mb-1">
                              Value Proposition
                            </h4>
                            <p className="text-sm text-hyve-header font-medium">
                              {segment.value}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold text-hyve-text/50 uppercase tracking-wide mb-1">
                              Target Customers
                            </h4>
                            <p className="text-xs text-hyve-text/60">
                              {segment.targets}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 12: FAQs */}
        {/* ============================================ */}
        <section
          id="faq"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-hyve-content/20 p-8 lg:p-12"
            >
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-hyve-header mb-8 font-heading text-center"
              >
                Frequently Asked Questions
              </motion.h2>

              <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 13: CTAs */}
        {/* ============================================ */}
        <section
          id="contact"
          className="relative py-16 lg:py-20 pointer-events-auto"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hyve-header mb-4 font-heading">
                  Next Steps
                </h2>
                <p className="text-base md:text-lg text-hyve-text/80 max-w-2xl mx-auto">
                  Ready to transform your aerodynamic testing and structural
                  monitoring? Choose the path that fits your needs.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Plane,
                    title: 'Aerospace OEMs & Test Facilities',
                    cta: 'Book Technical Demo',
                    desc: 'See the Hyve Haptic Matrix in action at our wind tunnel facility. We\'ll demonstrate real-time pressure mapping on your test article geometry.',
                  },
                  {
                    icon: Car,
                    title: 'Motorsport Teams',
                    cta: 'Request Performance Briefing',
                    desc: 'Join the F1 teams already achieving £2M+ annual savings. Private ROI analysis based on your wind tunnel usage.',
                  },
                  {
                    icon: Shield,
                    title: 'Defense & Government',
                    cta: 'Arrange Cleared Discussion',
                    desc: 'ITAR-compliant solutions for classified programs. Hypersonic testing, UAV monitoring, survivability assessment.',
                  },
                  {
                    icon: GraduationCap,
                    title: 'Research Institutions',
                    cta: 'Explore Academic Programs',
                    desc: 'Academic pricing available. Discuss grant-funded research, PhD projects, and publication opportunities.',
                  },
                  {
                    icon: Settings,
                    title: 'Custom Applications',
                    cta: 'Contact Engineering',
                    desc: 'Extreme temperature ranges? Custom geometries? Proprietary system integration? Our engineering team can help.',
                  },
                  {
                    icon: FileText,
                    title: 'General Inquiries',
                    cta: 'Download Technical Datasheet',
                    desc: 'Get the full technical specifications, comparison guides, and application briefs in PDF format.',
                  },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="h-full bg-white/95 backdrop-blur-xl border-hyve-content/20 hover:shadow-xl transition-shadow">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hyve-interactive/20 to-hyve-accent/20 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-hyve-interactive" />
                            </div>
                            <h3 className="text-base font-semibold text-hyve-header">
                              {item.title}
                            </h3>
                          </div>

                          <p className="text-sm text-hyve-text/70 mb-6 flex-grow">
                            {item.desc}
                          </p>

                          <Button
                            className="w-full bg-hyve-text hover:bg-hyve-text-dark text-white"
                            onClick={triggerContactForm}
                          >
                            {item.cta}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer spacing */}
        <div className="h-24" />
      </CustomMeshBackground>
    </div>
  )
}
