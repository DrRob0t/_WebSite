import React from 'react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './HeroSwiper.css'

interface Annotation {
  id: number
  text: string
  x: string // Position from left (e.g., '60%', '400px')
  y: string // Position from top (e.g., '20%', '100px')
  lineEndX?: string // Line end X position (defaults to center if not provided)
  lineEndY?: string // Line end Y position (defaults to center if not provided)
}

interface Slide {
  id: number
  name: string
  video: string | null
  annotations?: Annotation[]
}

interface HeroSwiperProps {
  className?: string
}

const slides: Slide[] = [
  {
    id: 1,
    name: 'Aerospace',
    video: '/models/3d_animations/A320.webm',
    annotations: [
      {
        id: 1,
        text: 'Wing Stress Monitoring',
        x: '65%',
        y: '25%',
        lineEndX: '55%',
        lineEndY: '40%',
      },
      {
        id: 2,
        text: 'Fuselage Vibration Analysis',
        x: '70%',
        y: '65%',
        lineEndX: '55%',
        lineEndY: '55%',
      },
    ],
  },
  { id: 2, name: 'Health Monitoring', video: null },
  {
    id: 3,
    name: 'Motorsport',
    video: '/models/3d_animations/F1-Car.webm',
    annotations: [
      {
        id: 1,
        text: 'Aerodynamic Load Sensing',
        x: '15%',
        y: '20%',
        lineEndX: '45%',
        lineEndY: '35%',
      },
      { id: 2, text: 'Suspension Dynamics', x: '68%', y: '70%', lineEndX: '55%', lineEndY: '60%' },
    ],
  },
  {
    id: 4,
    name: 'Energy',
    video: '/models/3d_animations/Wind-Turbine.webm',
    annotations: [
      {
        id: 1,
        text: 'Blade Fatigue Detection',
        x: '68%',
        y: '30%',
        lineEndX: '55%',
        lineEndY: '45%',
      },
      {
        id: 2,
        text: 'Tower Oscillation Monitoring',
        x: '20%',
        y: '60%',
        lineEndX: '45%',
        lineEndY: '55%',
      },
    ],
  },
  { id: 5, name: 'Robotics', video: null },
  { id: 6, name: 'Hyve', video: null },
]

export const HeroSwiper: React.FC<HeroSwiperProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full hero-swiper ${className}`}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-hyve-text/30 !w-2 !h-2 !mx-1',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-hyve-text !w-2 !h-2',
        }}
        autoplay={{
          delay: 10000, // Change this value to adjust slide duration (in milliseconds) - 4000 = 4 seconds
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full relative overflow-hidden">
              {/* Video Background */}
              {slide.video && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <video autoPlay loop muted playsInline className="w-full h-full object-contain">
                    <source src={slide.video} type="video/webm" />
                  </video>
                </div>
              )}

              {/* Slide Name Overlay */}
              <div className="absolute bottom-16 left-0 right-0 text-center z-10">
                <h3 className="text-xl font-light text-hyve-text/30 tracking-wider uppercase">
                  {slide.name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
