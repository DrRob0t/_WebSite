import React from 'react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getVideoPath } from '@/lib/assets'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './HeroSwiper.css'

interface HeroSwiperProps {
  className?: string
}

const slides = [
  { id: 1, name: 'Aerospace', video: getVideoPath('A320.webm') },
  { id: 2, name: 'Health Monitoring', video: getVideoPath('Structural-Health.webm') },
  { id: 3, name: 'Motorsport', video: getVideoPath('F1-Car.webm') },
  { id: 4, name: 'Energy', video: getVideoPath('Wind-Turbine.webm') },
  { id: 5, name: 'Robotics', video: getVideoPath('Robot.webm') },
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
            <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center slide-content">
              {/* Video Area */}
              {slide.video && (
                <div className="video-wrap">
                  <video autoPlay loop muted playsInline className="hero-video">
                    <source src={slide.video} type="video/webm" />
                  </video>
                </div>
              )}

              {/* Slide Name Below Video */}
              <div className="label mt-3 sm:mt-4">
                <p
                  className="text-base sm:text-lg font-light text-hyve-text/40 tracking-wider uppercase"
                  role="presentation"
                >
                  {slide.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
