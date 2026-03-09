"use client"

import { useState } from "react"
import { invitationData } from "@/lib/data"
import ContactModal from "@/components/invitation/contact-modal"
import CalendarSection from "@/components/invitation/calendar-section"
import GallerySection from "@/components/invitation/gallery-section"
import LocationSection from "@/components/invitation/location-section"
import AccountSection from "@/components/invitation/account-section"



export default function InvitationPage() {

  const data = invitationData
  const [contactOpen, setContactOpen] = useState(false)

  return (

    <main className="mx-auto max-w-[480px] min-h-screen bg-gray-100">

      {/* HERO */}

      <section className="text-center px-6 pt-14 pb-10">

        <p className="text-xs tracking-[0.35em] text-gray-500 mb-6">
          💍 WEDDING INVITATION
        </p>

        <h1 className="text-3xl font-light text-gray-900">
          {data.groomName}
          <span className="mx-2 text-gray-300">·</span>
          {data.brideName}
        </h1>

        <p className="mt-6 text-gray-600 text-sm">
          {data.weddingDateText}
        </p>

        <p className="mt-3 text-gray-500 text-sm">
          {data.venueName} {data.venueHall}
        </p>

      </section>


      {/* 초대 문구 */}

      <section className="text-center px-8 py-10">

        <p className="whitespace-pre-line text-gray-700 text-sm leading-7">
          {data.message}
        </p>

      </section>


      {/* 부모님 */}

      <section className="text-center text-sm text-gray-600 space-y-3">

        <p>
          ㅇㅇㅇ · ㅇㅇㅇ 의 아들
          <strong className="ml-2 text-gray-900">성우</strong>
        </p>

        <p>
          김용호 · 임동미 의 딸
          <strong className="ml-2 text-gray-900">유란</strong>
        </p>

      </section>


      {/* 연락하기 버튼 */}

      <section className="text-center py-10">

        <button
        onClick={() => setContactOpen(true)}
        className="bg-gray-900 text-white px-8 py-3 rounded-lg text-sm font-medium"
        >
          연락하기
        </button>

      </section>

      {/* 캘린더 */}

      <CalendarSection
      groomName={data.groomName}
      brideName={data.brideName}
      weddingDate={data.weddingDate}
      />
      
      <GallerySection images={data.gallery} />

      <LocationSection
      venueName={data.venueName}
      venueHall={data.venueHall}
      venueAddress={data.venueAddress}
      mapLinks={data.mapLinks}
      locationInfo={data.locationInfo}
      />
      
      <AccountSection accounts={data.accounts} />


      <ContactModal
      open={contactOpen}
      onClose={() => setContactOpen(false)}
      />

    </main>

  )

}