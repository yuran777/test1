import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim();

    if (!slug) {
      return NextResponse.json({ message: "slug가 필요합니다." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("rsvp")
      .select("*")
      .eq("slug", slug)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ message: "조회 실패", detail: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const slug = String(body.slug ?? "").trim();
    const side = String(body.side ?? "").trim();
    const name = String(body.name ?? "").trim();
    const phone_last4 = String(body.phone_last4 ?? "").trim();
    const memo = String(body.memo ?? "").trim();
    const meal = String(body.meal ?? "yes").trim();
    const guest_count = Number(body.guest_count ?? 1);

    if (!slug || !side || !name) {
      return NextResponse.json({ message: "slug, side, name은 필수입니다." }, { status: 400 });
    }

    if (!["groom", "bride"].includes(side)) {
      return NextResponse.json({ message: "side는 groom 또는 bride여야 합니다." }, { status: 400 });
    }

    if (!["yes", "no", "unknown"].includes(meal)) {
      return NextResponse.json({ message: "meal 값이 올바르지 않습니다." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("rsvp")
      .insert({ slug, side, name, phone_last4, memo, meal, guest_count })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: "제출 실패", detail: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}