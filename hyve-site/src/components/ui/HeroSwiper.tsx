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
  { id: 1, name: 'Aerospace', content: '' },
  { id: 2, name: 'Health Monitoring', content: '' },
  { id: 3, name: 'Motorsport', content: '' },
  { id: 4, name: 'Energy', content: '' },
  { id: 5, name: 'Robotics', content: '' },
  { id: 6, name: 'Hyve', content: '' },
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
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id} className="w-full h-full">
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <h3 className="text-2xl font-light text-hyve-text/20">{slide.name}</h3>
                {/* Content placeholder - empty for now */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
