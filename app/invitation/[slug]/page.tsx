"use client"

import { useState } from "react"
import { invitationData } from "@/lib/data"
import GalleryModal from "@/components/invitation/gallery-modal"
import ContactModal from "@/components/invitation/contact-modal"
import CalendarSection from "@/components/invitation/calendar-section"
import LocationSection from "@/components/invitation/location-section"
import AccountSection from "@/components/invitation/account-section"
import RevealSection from "@/components/invitation/reveal-section"

export default function InvitationPage() {
  const data = invitationData

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] bg-white shadow-lg">
      <RevealSection delay={0}>
        <section className="text-center px-6 pt-14 pb-10 md:px-10">
          <p className="mb-6 text-xs tracking-[0.35em] text-gray-500">
            💍 WEDDING INVITATION
          </p>

          <h1 className="text-3xl font-light text-gray-900 md:text-4xl">
            {data.groomName}
            <span className="mx-2 text-gray-300">·</span>
            {data.brideName}
          </h1>

          <p className="mt-6 text-sm text-gray-600 md:text-base">
            {data.weddingDateText}
          </p>

          <p className="mt-3 text-sm text-gray-500 md:text-base">
            {data.venueName} {data.venueHall}
          </p>
        </section>
      </RevealSection>

      <RevealSection delay={100}>
        <section className="px-8 py-10 text-center md:px-14">
          <p className="whitespace-pre-line text-sm leading-7 text-gray-700 md:text-base md:leading-8">
            {data.message}
          </p>
        </section>
      </RevealSection>

      <RevealSection delay={150}>
        <section className="space-y-3 px-6 text-center text-sm text-gray-600 md:text-base">
          <p>
            ㅇㅇㅇ · ㅇㅇㅇ 의 아들
            <strong className="ml-2 text-gray-900">성우</strong>
          </p>

          <p>
            김용호 · 임동미 의 딸
            <strong className="ml-2 text-gray-900">유란</strong>
          </p>
        </section>
      </RevealSection>

      <RevealSection delay={200}>
        <section className="py-10 text-center">
          <button
            onClick={() => setContactOpen(true)}
            className="rounded-lg bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
          >
            연락하기
          </button>
        </section>
      </RevealSection>

      <RevealSection>
        <CalendarSection
          groomName={data.groomName}
          brideName={data.brideName}
          weddingDate={data.weddingDate}
        />
      </RevealSection>

      <RevealSection>
        <LocationSection
          venueName={data.venueName}
          venueHall={data.venueHall}
          venueAddress={data.venueAddress}
          mapLinks={data.mapLinks}
          locationInfo={data.locationInfo}
        />
      </RevealSection>

      <RevealSection>
        <AccountSection accounts={data.accounts} />
      </RevealSection>

      <RevealSection>
        <section className="px-6 py-10 md:px-10">
          <h2 className="mb-6 text-center text-lg font-medium md:text-xl">
            GALLERY
          </h2>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
            {data.gallery.map((img) => (
              <img
                key={img.id}
                src={img.imageUrl}
                alt={`갤러리 이미지 ${img.id}`}
                className="cursor-pointer rounded-lg transition-transform duration-300 hover:scale-[1.03]"
                onClick={() => setSelectedImage(img.imageUrl)}
              />
            ))}
          </div>
        </section>
      </RevealSection>

      <GalleryModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />


    </main>
  )
}