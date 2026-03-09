"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type Props = {
  images: string[]
  selectedIndex: number | null
  onClose: () => void
}

export default function GalleryModal({
  images,
  selectedIndex,
  onClose,
}: Props) {
  if (selectedIndex === null) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 animate-[fadeIn_.25s_ease-out]"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-50 text-4xl leading-none text-white"
        aria-label="닫기"
      >
        ×
      </button>

      <div
        className="w-full max-w-[960px] animate-[zoomIn_.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          initialSlide={selectedIndex}
          spaceBetween={16}
          className="w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center">
                <img
                  src={image}
                  alt={`갤러리 이미지 ${index + 1}`}
                  className="max-h-[88vh] max-w-[90vw] rounded-xl object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}