
  
  export type GuestbookCreateRequest = {
    slug: string;
    name: string;
    message: string;
  };

  export type GuestbookItem = {
    id: string;
    slug: string;
    name: string;
    message: string;
    created_at: string;
    likes?: number;
  };