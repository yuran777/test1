import { Invitation } from "@/types/invitation"

export const invitationData: Invitation = {
  slug: "sample",
  groomName: "박성우",
  brideName: "김유란",
  weddingDate: "2026-07-12T14:00:00",
  weddingDateText: "2026년 7월 12일 일요일 오후 2시",
  venueName: "셀럽앤어셈",
  venueHall: "디아이 올라 홀(2층)",
  venueAddress: "서울 강남구 언주로 711 건설회관 2층",
  mainImageUrl: "/gallery/1.jpeg", // 👈 여기서 메인 이미지 파일명만 바꾸면 됩니다
  message: `저희 두 사람이 하나가 되어
첫 발걸음을 내딛는 시작,
시간이 흘러도 이날을 기억하며
설레고도 기뻤던 날을 떠올릴 것입니다.
밝은 미소로 함께해 주신다면
평생의 기억으로 소중히 간직하겠습니다.`,
  gallery: [
    { id: "1", imageUrl: "/gallery/25.jpg", thumbUrl: "/gallery/25.jpg" },
    { id: "2", imageUrl: "/gallery/26.jpg", thumbUrl: "/gallery/26.jpg" },
    { id: "3", imageUrl: "/gallery/27.jpg", thumbUrl: "/gallery/27.jpg" },
    { id: "4", imageUrl: "/gallery/28.jpg", thumbUrl: "/gallery/28.jpg" },
    { id: "5", imageUrl: "/gallery/1.jpeg", thumbUrl: "/gallery/1.jpeg" },
    { id: "6", imageUrl: "/gallery/2.jpeg", thumbUrl: "/gallery/2.jpeg" },
    { id: "7", imageUrl: "/gallery/3.jpeg", thumbUrl: "/gallery/3.jpeg" },
    { id: "8", imageUrl: "/gallery/4.jpeg", thumbUrl: "/gallery/4.jpeg" },
    { id: "9", imageUrl: "/gallery/5.jpeg", thumbUrl: "/gallery/5.jpeg" },
    { id: "10", imageUrl: "/gallery/6.jpeg", thumbUrl: "/gallery/6.jpeg" },
    { id: "11", imageUrl: "/gallery/7.jpeg", thumbUrl: "/gallery/7.jpeg" },
    { id: "12", imageUrl: "/gallery/8.jpg", thumbUrl: "/gallery/8.jpg" },
    { id: "13", imageUrl: "/gallery/9.jpg", thumbUrl: "/gallery/9.jpg" },
    { id: "14", imageUrl: "/gallery/10.jpg", thumbUrl: "/gallery/10.jpg" },
    { id: "15", imageUrl: "/gallery/11.jpg", thumbUrl: "/gallery/11.jpg" },
    { id: "16", imageUrl: "/gallery/12.jpg", thumbUrl: "/gallery/12.jpg" },
    { id: "17", imageUrl: "/gallery/13.jpg", thumbUrl: "/gallery/13.jpg" },
    { id: "18", imageUrl: "/gallery/14.jpg", thumbUrl: "/gallery/14.jpg" },
    { id: "19", imageUrl: "/gallery/15.jpg", thumbUrl: "/gallery/15.jpg" },
    { id: "20", imageUrl: "/gallery/16.jpg", thumbUrl: "/gallery/16.jpg" },
    { id: "21", imageUrl: "/gallery/17.jpg", thumbUrl: "/gallery/17.jpg" },
    { id: "22", imageUrl: "/gallery/18.jpg", thumbUrl: "/gallery/18.jpg" },
    { id: "23", imageUrl: "/gallery/19.jpg", thumbUrl: "/gallery/19.jpg" },
    { id: "24", imageUrl: "/gallery/20.jpg", thumbUrl: "/gallery/20.jpg" },
    { id: "25", imageUrl: "/gallery/21.jpg", thumbUrl: "/gallery/21.jpg" },
    { id: "26", imageUrl: "/gallery/22.jpg", thumbUrl: "/gallery/22.jpg" },
    { id: "27", imageUrl: "/gallery/23.jpg", thumbUrl: "/gallery/23.jpg" },
  ],
  accounts: [],
  contacts: [],
  mapLinks: {
    kakao: "https://kko.to/SoyaOhgHA7",
    naver: "https://naver.me/xxY2U7vu",
    google: "https://maps.app.goo.gl/ZRiaEgNrCMwEctru5",
    mapEmbed: "https://kko.to/jZsC2djv6f",
  },
  locationInfo: {
    subway: [
      "지하철 7호선 학동역 10번 출구 도보 7분",
    ],
    bus: [
`[서울세관] 간선 141, 직행 3600, 공항 6703
[서울세관사거리] 간선 401, 지선 6411, 8641, 마을버스 강남 08`,
    ],
    parking: [
`셀럽앤어셈(건설회관) 주차장 이용 (1시간 30분 무료)
최대 600대 수용`,
    ],
  },
}