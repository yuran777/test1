"use client"

import Image from "next/image"
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
              {/* ✅ <img> → <Image> 교체 → 모달 원본은 고화질 필요하므로 sizes를 넓게 설정 */}
              <div className="relative flex items-center justify-center" style={{ height: "88vh" }}>
                <Image
                  src={image}
                  alt={`갤러리 이미지 ${index + 1}`}
                  fill
                  className="object-contain rounded-xl"
                  sizes="90vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}