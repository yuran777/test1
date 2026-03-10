import { NextResponse } from "next/server";

type GuestbookItem = {
  id: string;
  slug: string;
  name: string;
  message: string;
  created_at: string;
};

const guestbookStore: GuestbookItem[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json(
      { message: "slug가 필요합니다." },
      { status: 400 }
    );
  }

  const items = guestbookStore
    .filter((item) => item.slug === slug)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const slug = String(body.slug ?? "").trim();
    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!slug || !name || !message) {
      return NextResponse.json(
        { message: "slug, name, message는 필수입니다." },
        { status: 400 }
      );
    }

    const newItem: GuestbookItem = {
      id: crypto.randomUUID(),
      slug,
      name,
      message,
      created_at: new Date().toISOString(),
    };

    guestbookStore.unshift(newItem);

    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}