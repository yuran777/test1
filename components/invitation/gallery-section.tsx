"use client"

import { useMemo, useState } from "react"
import GalleryModal from "@/components/invitation/gallery-modal"

type GalleryItem = {
  id: string
  imageUrl: string
  thumbUrl: string
}

type Props = {
  images: GalleryItem[]
}

export default function GallerySection({ images }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const visibleImages = useMemo(() => {
    return expanded ? images : images.slice(0, 9)
  }, [expanded, images])

  return (
    <section className="px-6 py-12">
      <h2 className="mb-10 text-center text-[34px] font-light text-gray-900">
        GALLERY
      </h2>

      <div className="grid grid-cols-3 gap-2">
        {visibleImages.map((img) => (
          <button
            key={img.id}
            type="button"
            className="aspect-square overflow-hidden bg-gray-100"
            onClick={() => setSelectedImage(img.imageUrl)}
          >
            <img
              src={img.thumbUrl}
              alt={`갤러리 이미지 ${img.id}`}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {!expanded && images.length > 9 && (
        <div className="pt-12 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg text-sm font-medium"
          >
            더보기
          </button>
        </div>
      )}

      <GalleryModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  )
}