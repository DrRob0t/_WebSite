import React from 'react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './HeroSwiper.css'

interface HeroSwiperProps {
  className?: string
}

const slides = [
  { id: 1, name: 'Aerospace', video: '/models/3d_animations/A320.webm' },
  { id: 2, name: 'Health Monitoring', video: null },
  { id: 3, name: 'Motorsport', video: '/models/3d_animations/F1-Car.webm' },
  { id: 4, name: 'Energy', video: '/models/3d_animations/Wind-Turbine.webm' },
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
