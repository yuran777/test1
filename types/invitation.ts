export type GalleryImage = {
  id: string
  imageUrl: string
  thumbUrl: string
}

export type Account = {
  side: "groom" | "bride"
  label: string
  bank: string
  accountNumber: string
  holder: string
}

export type Contact = {
  role: "groom" | "bride"
  name: string
  phone: string
}

export type Invitation = {
  slug: string
  groomName: string
  brideName: string
  weddingDate: string
  weddingDateText: string
  venueName: string
  venueHall: string
  venueAddress: string
  message: string
  gallery: GalleryImage[]
  accounts: Account[]
  accountNumber: string
  contacts: Contact[]
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