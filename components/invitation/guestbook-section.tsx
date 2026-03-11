"use client";

import { useEffect, useState } from "react";
import type { GuestbookItem } from "@/types/guestbook";

type Props = {
  slug: string;
};

export default function GuestbookSection({ slug }: Props) {
  const [items, setItems] = useState<GuestbookItem[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const fetchGuestbooks = async () => {
    try {
      setFetching(true);
      setError("");

      const res = await fetch(`/api/guestbook?slug=${slug}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "방명록을 불러오지 못했습니다.");
      }

      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchGuestbooks();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !message.trim()) {
      setError("이름과 메시지를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          name,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "등록에 실패했습니다.");
      }

      setItems((prev) => [data, ...prev]);
      setName("");
      setMessage("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const alreadyLiked = localStorage.getItem(`guestbook-liked-${id}`);

      if (alreadyLiked) {
        alert("이미 좋아요를 눌렀어요.");
        return;
      }

      const res = await fetch("/api/guestbook", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "좋아요 처리에 실패했습니다.");
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, likes: data.likes } : item
        )
      );

      localStorage.setItem(`guestbook-liked-${id}`, "true");
    } catch (e) {
      alert(e instanceof Error ? e.message : "오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    const adminPassword = window.prompt("관리자 비밀번호를 입력해주세요.");
    if (!adminPassword) return;

    try {
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          adminPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "삭제에 실패했습니다.");
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("삭제되었습니다.");
    } catch (e) {
      alert(e instanceof Error ? e.message : "오류가 발생했습니다.");
    }
  };

  return (
    <section className="px-6 py-12 md:px-10">
      <h2 className="mb-8 text-center text-[34px] font-light text-gray-900">
        GUESTBOOK
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-3 rounded-2xl border border-gray-200 p-5"
      >
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
        />

        <textarea
          placeholder="축하 메시지를 남겨주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
        />

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? "등록 중..." : "방명록 남기기"}
        </button>
      </form>

      <div className="space-y-4">
        {fetching ? (
          <p className="text-center text-sm text-gray-500">불러오는 중...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            첫 번째 축하 메시지를 남겨보세요.
          </p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-200 p-5"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <strong className="text-sm text-gray-900">{item.name}</strong>
                <span className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleString("ko-KR")}
                </span>
              </div>

              <p className="mb-4 whitespace-pre-line text-sm leading-6 text-gray-700">
                {item.message}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleLike(item.id)}
                  className="rounded-lg border border-pink-200 px-3 py-2 text-sm text-pink-600 transition hover:bg-pink-50"
                >
                  ❤️ 좋아요 {item.likes ?? 0}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                >
                  삭제
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}