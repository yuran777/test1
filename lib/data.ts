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
    { id: "1", imageUrl: "/gallery/1.jpeg", thumbUrl: "/gallery/1.jpeg" },
    { id: "2", imageUrl: "/gallery/2.jpeg", thumbUrl: "/gallery/2.jpeg" },
    { id: "3", imageUrl: "/gallery/3.jpeg", thumbUrl: "/gallery/3.jpeg" },
    { id: "4", imageUrl: "/gallery/4.jpeg", thumbUrl: "/gallery/4.jpeg" },
    { id: "5", imageUrl: "/gallery/5.jpeg", thumbUrl: "/gallery/5.jpeg" },
    { id: "6", imageUrl: "/gallery/6.jpeg", thumbUrl: "/gallery/6.jpeg" },
    { id: "7", imageUrl: "/gallery/7.jpeg", thumbUrl: "/gallery/7.jpeg" },
    { id: "8", imageUrl: "/gallery/8.jpg", thumbUrl: "/gallery/8.jpg" },
    { id: "9", imageUrl: "/gallery/9.jpg", thumbUrl: "/gallery/9.jpg" },
    { id: "10", imageUrl: "/gallery/10.jpg", thumbUrl: "/gallery/10.jpg" },
    { id: "11", imageUrl: "/gallery/11.jpg", thumbUrl: "/gallery/11.jpg" },
    { id: "12", imageUrl: "/gallery/12.jpg", thumbUrl: "/gallery/12.jpg" },
    { id: "13", imageUrl: "/gallery/13.jpg", thumbUrl: "/gallery/13.jpg" },
    { id: "14", imageUrl: "/gallery/14.jpg", thumbUrl: "/gallery/14.jpg" },
    { id: "15", imageUrl: "/gallery/15.jpg", thumbUrl: "/gallery/15.jpg" },
    { id: "16", imageUrl: "/gallery/16.jpg", thumbUrl: "/gallery/16.jpg" },
    { id: "17", imageUrl: "/gallery/17.jpg", thumbUrl: "/gallery/17.jpg" },
    { id: "18", imageUrl: "/gallery/18.jpg", thumbUrl: "/gallery/18.jpg" },
    { id: "19", imageUrl: "/gallery/19.jpg", thumbUrl: "/gallery/19.jpg" },
    { id: "20", imageUrl: "/gallery/20.jpg", thumbUrl: "/gallery/20.jpg" },
  ],
  accounts: [
    {
      side: "groom",
      label: "신랑 박성우",
      bank: "토스뱅크",
      accountNumber: "1000-1234-5678",
      holder: "박성우",
    },
    {
      side: "groom",
      label: "신랑 아버지 박희진",
      bank: "NH농협",
      accountNumber: "301-1234-5678-91",
      holder: "박희진",
    },
    {
      side: "groom",
      label: "신랑 어머니 김경희",
      bank: "NH농협",
      accountNumber: "302-1234-5678-91",
      holder: "김경희",
    },
    {
      side: "bride",
      label: "신부 김유란",
      bank: "신한은행",
      accountNumber: "110-234-567890",
      holder: "김유란",
    },
    {
      side: "bride",
      label: "신부 아버지 김용호",
      bank: "국민은행",
      accountNumber: "123-45-6789012",
      holder: "김용호",
    },
    {
      side: "bride",
      label: "신부 어머니 임동미",
      bank: "하나은행",
      accountNumber: "456-910283-12307",
      holder: "임동미",
    },
  ],
  contacts: [
    {
      role: "groom",
      name: "박성우",
      phone: "01022431839",
    },
  ],
  mapLinks: {
    kakao: "https://kko.to/SoyaOhgHA7",
    naver: "https://naver.me/xxY2U7vu",
    google: "https://maps.app.goo.gl/ZRiaEgNrCMwEctru5",
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
  accountNumber: "",
}