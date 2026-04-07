type Props = {
  venueName: string
  venueHall: string
  venueAddress: string
  mapLinks: {
    kakao: string
    naver: string
    google: string
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
  return (
    <section className="px-6 py-12 md:px-10">

      {/* 통일된 타이틀 */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs tracking-[0.4em] text-gray-400">LOCATION</p>
        <h2 className="text-[28px] font-light text-gray-900">오시는 길</h2>
        <div className="mx-auto mt-3 h-px w-10 bg-gray-300" />
      </div>

      <div className="overflow-hidden rounded-[22px] border border-gray-200 bg-white">
        <img src="/location-map.jpeg" alt="예식장 약도" className="w-full object-cover" />
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{venueName}</h3>
        <p className="mt-2 text-sm text-gray-500">{venueHall}</p>
        <p className="mt-2 text-sm text-gray-600">{venueAddress}</p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
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