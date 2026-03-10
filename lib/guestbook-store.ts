import { GuestbookItem } from "@/types/guestbook";

const guestbookStore: GuestbookItem[] = [
  {
    id: "1",
    slug: "default",
    name: "축하객",
    message: "결혼 진심으로 축하드려요!",
    createdAt: new Date().toISOString(),
  },
];

export function getGuestbooksBySlug(slug: string) {
  return guestbookStore
    .filter((item) => item.slug === slug)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function createGuestbook(slug: string, name: string, message: string) {
  const newItem: GuestbookItem = {
    id: crypto.randomUUID(),
    slug,
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  guestbookStore.unshift(newItem);
  return newItem;
}