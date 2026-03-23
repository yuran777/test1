import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim();

    if (!slug) {
      return NextResponse.json(
        { message: "slug가 필요합니다." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("guestbooks")
      .select("*")
      .eq("slug", slug)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { message: "방명록 조회 실패", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
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

    if (name.length > 20) {
      return NextResponse.json(
        { message: "이름은 20자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    if (message.length > 300) {
      return NextResponse.json(
        { message: "메시지는 300자 이하로 입력해주세요." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("guestbooks")
      .insert({
        slug,
        name,
        message,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: "방명록 저장 실패", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = String(body.id ?? "").trim();

    if (!id) {
      return NextResponse.json(
        { message: "id가 필요합니다." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin.rpc(
      "increment_guestbook_like",
      {
        target_id: id,
      }
    );

    if (error) {
      return NextResponse.json(
        { message: "좋아요 처리 실패", detail: error.message },
        { status: 500 }
      );
    }

    const updatedItem = Array.isArray(data) ? data[0] : data;

    return NextResponse.json(updatedItem);
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const id = String(body.id ?? "").trim();
    const adminPassword = String(body.adminPassword ?? "").trim();

    if (!id || !adminPassword) {
      return NextResponse.json(
        { message: "id와 관리자 비밀번호가 필요합니다." },
        { status: 400 }
      );
    }

    if (adminPassword !== process.env.GUESTBOOK_ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "관리자 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("guestbooks")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: "방명록 삭제 실패", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "삭제되었습니다.",
      deleted: data,
    });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}