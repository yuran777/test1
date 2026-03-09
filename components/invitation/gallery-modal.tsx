"use client"

type Props = {
  image: string | null
  onClose: () => void
}

export default function GalleryModal({ image, onClose }: Props) {
  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 text-4xl leading-none text-white"
        aria-label="닫기"
      >
        ×
      </button>

      <img
        src={image}
        alt="확대 이미지"
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}