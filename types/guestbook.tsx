export type GuestbookItem = {
    id: string;
    slug: string;
    name: string;
    message: string;
    createdAt: string;
  };
  
  export type GuestbookCreateRequest = {
    slug: string;
    name: string;
    message: string;
  };