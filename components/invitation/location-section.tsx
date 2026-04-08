"use client"

import { useEffect, useRef, useState } from "react"

const KAKAO_APP_KEY = "31fac3c9801dcec88238a79ed411f604"
const VENUE_ADDRESS = "서울특별시 강남구 언주로 711"

type Props = {
  venueName: string
  venueHall: string
  venueAddress: string
  mapLinks: {
    kakao: string
    naver: string
    google: string
    mapEmbed: string
  }
  locationInfo: {
    subway: string[]
    bus: string[]
    parking: string[]
  }
}

export default function LocationSection({
  venueName,
  venueHall,
  venueAddress,
  mapLinks,
  locationInfo,
}: Props) {
  const [activeTab, setActiveTab] = useState<"지도" | "약도">("지도")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // services 라이브러리 포함 (Geocoder 사용)
    const scriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`

    const initMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      w.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map-container")
        if (!container) return

        // 임시 중심으로 지도 먼저 생성
        const map = new w.kakao.maps.Map(container, {
          center: new w.kakao.maps.LatLng(37.5, 127.0),
          level: 4,
        })
        mapInstanceRef.current = map

        // 주소 → 좌표 변환
        const geocoder = new w.kakao.maps.services.Geocoder()
        geocoder.addressSearch(VENUE_ADDRESS, (result: any[], status: string) => {
          if (status === w.kakao.maps.services.Status.OK) {
            const coords = new w.kakao.maps.LatLng(result[0].y, result[0].x)
            map.setCenter(coords)

            const marker = new w.kakao.maps.Marker({ position: coords })
            marker.setMap(map)

            const infowindow = new w.kakao.maps.InfoWindow({
              content: `<div style="padding:5px 10px;font-size:12px;font-weight:bold;white-space:nowrap;">${venueName}</div>`,
            })
            infowindow.open(map, marker)
          }
        })
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    if (w.kakao?.maps?.services) {
      initMap()
    } else if (!document.querySelector(`script[src*="dapi.kakao.com/v2/maps"]`)) {
      const script = document.createElement("script")
      script.src = scriptSrc
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      document.querySelector(`script[src*="dapi.kakao.com/v2/maps"]`)
        ?.addEventListener("load", initMap)
    }
  }, [venueName])

  // 지도 탭으로 돌아올 때 레이아웃 재계산
  useEffect(() => {
    if (activeTab === "지도" && mapInstanceRef.current) {
      setTimeout(() => mapInstanceRef.current.relayout(), 50)
    }
  }, [activeTab])

  return (
    <section className="px-6 py-12 md:px-10">

      {/* 통일된 타이틀 */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs tracking-[0.4em] text-gray-400">LOCATION</p>
        <h2 className="text-[28px] font-light text-gray-900">오시는 길</h2>
        <div className="mx-auto mt-3 h-px w-10 bg-gray-300" />
      </div>

      {/* 탭 */}
      <div className="mb-0 grid grid-cols-2 overflow-hidden rounded-t-[22px] border border-b-0 border-gray-200">
        {(["지도", "약도"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={[
              "py-3 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-white text-gray-900"
                : "bg-gray-50 text-gray-400",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 지도 / 약도 콘텐츠 */}
      <div className="overflow-hidden rounded-b-[22px] border border-gray-200 bg-white">
        {/* 카카오맵 JS API — height:0으로 숨겨 DOM 유지 */}
        <div style={activeTab === "지도" ? {} : { height: 0, overflow: "hidden" }}>
          <div id="kakao-map-container" style={{ width: "100%", height: "360px" }} />
        </div>
        {activeTab === "약도" && (
          <img src="/location-map.jpeg" alt="예식장 약도" className="w-full object-cover" />
        )}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{venueName}</h3>
        <p className="mt-2 text-sm text-gray-500">{venueHall}</p>
        <p className="mt-2 text-sm text-gray-600">{venueAddress}</p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <a href="https://tmap.life/30664446" target="_blank" rel="noreferrer"
          className="rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: "#FF4081" }}>
          티맵
        </a>
        <a href={mapLinks.kakao} target="_blank" rel="noreferrer"
          className="rounded-lg px-4 py-2 text-sm font-medium text-black"
          style={{ backgroundColor: "#FAE100" }}>
          카카오맵
        </a>
        <a href={mapLinks.naver} target="_blank" rel="noreferrer"
          className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white">
          네이버지도
        </a>
        <a href={mapLinks.google} target="_blank" rel="noreferrer"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white">
          구글맵
        </a>
      </div>

      <div className="mt-10 space-y-6 rounded-[22px] bg-white p-5">
        <InfoBlock title="지하철" items={locationInfo.subway} />
        <InfoBlock title="버스" items={locationInfo.bus} />
        <InfoBlock title="주차" items={locationInfo.parking} />
      </div>
    </section>
  )
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-900">{title}</p>
      <div className="space-y-1">
        {items.map((item, index) => (
          <p key={index} className="whitespace-pre-line text-sm leading-6 text-gray-600">{item}</p>
        ))}
      </div>
    </div>
  )
}