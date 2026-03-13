"use client";

import { useState, useEffect } from "react";

interface RsvpSectionProps {
  slug: string;
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  weddingVenue?: string;
}

type Step = "intro" | "form";
type Side = "groom" | "bride";
type Meal = "yes" | "no" | "unknown";

export default function RsvpSection({
  slug,
  groomName = "신랑 이름",
  brideName = "신부 이름",
  weddingDate = "0000년 00월 00일 요일 오후 0시",
  weddingVenue = "예식장 이름",
}: RsvpSectionProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [side, setSide] = useState<Side>("groom");
  const [name, setName] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");
  const [memo, setMemo] = useState("");
  const [meal, setMeal] = useState<Meal>("yes");
  const [guestCount, setGuestCount] = useState(1);

  const handleHideToday = () => {
    localStorage.setItem("rsvp-popup-hidden", new Date().toDateString());
    setShowPopup(false);
  };

  const handleOpen = () => {
    setStep("form");
    setSubmitted(false);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setStep("intro");
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("성함을 입력해주세요.");
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          side,
          name: name.trim(),
          phone_last4: phoneLast4.trim(),
          memo: memo.trim(),
          meal,
          guest_count: guestCount,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        alert(err.message ?? "제출에 실패했습니다. 다시 시도해주세요.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-6 py-12 md:px-10">

        {/* 통일된 타이틀 */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs tracking-[0.4em] text-gray-400">RSVP</p>
          <h2 className="text-[28px] font-light text-gray-900">참석의사 전달하기</h2>
          <div className="mx-auto mt-3 h-px w-10 bg-gray-300" />
        </div>

        {/* 안내 카드 */}
        <div className="rounded-2xl border border-gray-200 p-8 text-center">
          <div className="mb-6 text-sm leading-7 text-gray-600">
            <p>모든 분들께</p>
            <p>부족함 없는 예식을 준비하기 위해</p>
            <p>참석 및 식사 여부를</p>
            <p>미리 여쭙고자 합니다.</p>
            <br />
            <p>부담없이 알려주시면</p>
            <p>정성껏 준비하겠습니다.</p>
          </div>
          <button
            onClick={handleOpen}
            className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            참석의사 전달하기
          </button>
        </div>
      </section>

      {/* 팝업 오버레이 */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-0"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          onClick={handleClose}
        >
          <div
            className="relative overflow-y-auto rounded-xl bg-white"
            style={{ width: "65%", maxWidth: 420, maxHeight: "80vh", margin: "0 auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Step 1: 인트로 */}
            {step === "intro" && (
              <div className="px-9 pb-7 pt-10 text-center">
                <h2 className="mb-6 text-lg font-light tracking-widest text-gray-800">
                  참석의사 전달하기
                </h2>
                <div className="mb-7 text-sm leading-7 text-gray-500">
                  <p>모든 분들께</p>
                  <p>부족함 없는 예식을 준비하기 위해</p>
                  <p>참석 및 식사 여부를</p>
                  <p>미리 여쭙고자 합니다.</p>
                  <br />
                  <p>부담없이 알려주시면</p>
                  <p>정성껏 준비하겠습니다.</p>
                </div>
                <hr className="mb-6 border-gray-100" />
                <div className="mb-7 space-y-3 text-left">
                  {[
                    ["♡", `신랑 ${groomName} & 신부 ${brideName}`],
                    ["📅", weddingDate],
                    ["📍", weddingVenue],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-5 text-center">{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="mb-4 w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  참석의사 전달하기
                </button>
                <button
                  onClick={handleHideToday}
                  className="flex items-center gap-1.5 mx-auto text-xs text-gray-400 hover:text-gray-600"
                >
                  ✓ 오늘 하루 보지 않기
                </button>
              </div>
            )}

            {/* Step 2: 폼 */}
            {step === "form" && !submitted && (
              <div className="pb-6">
                <div className="border-b border-gray-100 px-6 py-5">
                  <h2 className="text-base font-medium tracking-widest text-gray-900">
                    참석의사 전달하기
                  </h2>
                </div>

                {/* 구분 */}
                <div className="flex items-center gap-4 border-b border-gray-50 px-6 py-4">
                  <label className="w-16 text-sm font-medium text-gray-900">구분</label>
                  <div className="flex flex-1 overflow-hidden rounded-md border border-gray-200">
                    {(["groom", "bride"] as Side[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSide(s)}
                        className={`flex-1 py-2.5 text-sm transition ${
                          side === s
                            ? "bg-gray-700 text-white"
                            : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        {s === "groom" ? "신랑" : "신부"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 성함 */}
                <div className="flex items-center gap-4 border-b border-gray-50 px-6 py-4">
                  <label className="w-16 text-sm font-medium text-gray-900">성함</label>
                  <input
                    type="text"
                    placeholder="참석자 성함"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-700"
                  />
                </div>

                {/* 전화번호 */}
                <div className="flex items-center gap-4 border-b border-gray-50 px-6 py-4">
                  <label className="w-16 text-sm font-medium text-gray-900">전화번호</label>
                  <input
                    type="text"
                    placeholder="끝 4자리"
                    value={phoneLast4}
                    onChange={(e) => setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    maxLength={4}
                    className="flex-1 rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-700"
                  />
                </div>

                {/* 메모 */}
                <div className="flex items-center gap-4 border-b border-gray-50 px-6 py-4">
                  <label className="w-16 text-sm font-medium text-gray-900">메모</label>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="flex-1 rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-700"
                  />
                </div>

                {/* 식사 */}
                <div className="flex items-center gap-4 border-b border-gray-50 px-6 py-4">
                  <label className="w-16 text-sm font-medium text-gray-900">식사</label>
                  <div className="flex gap-5">
                    {([["yes", "예정"], ["no", "불참"], ["unknown", "미정"]] as [Meal, string][]).map(([v, l]) => (
                      <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-900">
                        <input
                          type="radio"
                          name="meal"
                          checked={meal === v}
                          onChange={() => setMeal(v)}
                          className="accent-blue-500"
                        />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 참석인원 */}
                <div className="flex items-center gap-4 border-b border-gray-50 px-6 py-4">
                  <label className="w-16 text-sm font-medium text-gray-900">참석인원</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="flex-1 rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-700"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        총 {n}명 {n === 1 ? "(본인 포함)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="px-6 pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full rounded-lg bg-gray-900 py-3 text-sm font-medium tracking-widest text-white disabled:opacity-50 hover:bg-gray-800"
                  >
                    {loading ? "전송 중..." : "SEND"}
                  </button>
                </div>
              </div>
            )}

            {/* 완료 */}
            {step === "form" && submitted && (
              <div className="px-9 py-16 text-center">
                <p className="mb-8 text-base text-gray-500 leading-8">
                  참석 의사를 전달해주셨습니다 🤍
                </p>
                <button
                  onClick={handleClose}
                  className="w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                  닫기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}