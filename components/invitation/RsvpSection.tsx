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

  // 폼 상태
  const [side, setSide] = useState<Side>("groom");
  const [name, setName] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");
  const [memo, setMemo] = useState("");
  const [meal, setMeal] = useState<Meal>("yes");
  const [guestCount, setGuestCount] = useState(1);

  // 오늘 하루 보지 않기
  useEffect(() => {
    const hidden = localStorage.getItem("rsvp-popup-hidden");
    if (hidden === new Date().toDateString()) {
      // 오늘 숨김 처리된 경우 팝업 자동으로 열지 않음
    }
  }, []);

  const handleHideToday = () => {
    localStorage.setItem("rsvp-popup-hidden", new Date().toDateString());
    setShowPopup(false);
  };

  const handleOpen = () => {
    setStep("intro");
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
      {/* 섹션 카드 (1번 이미지) */}
      <section className="rsvp-section">
        <div className="rsvp-card">
          <div className="rsvp-badge">참석의사 전달하기</div>
          <div className="rsvp-text">
            <p>모든 분들께</p>
            <p>부족함 없는 예식을 준비하기 위해</p>
            <p>참석 및 식사 여부를</p>
            <p>미리 여쭙고자 합니다.</p>
            <br />
            <p>부담없이 알려주시면</p>
            <p>정성껏 준비하겠습니다.</p>
          </div>
          <button className="rsvp-btn-main" onClick={handleOpen}>
            참석의사 전달하기
          </button>
        </div>
      </section>

      {/* 팝업 오버레이 */}
      {showPopup && (
        <div className="rsvp-overlay" onClick={handleClose}>
          <div className="rsvp-popup" onClick={(e) => e.stopPropagation()}>

            {/* 닫기 버튼 */}
            <button className="rsvp-close" onClick={handleClose}>✕</button>

            {/* Step 1: 인트로 (2번 이미지) */}
            {step === "intro" && (
              <div className="rsvp-intro">
                <h2 className="rsvp-popup-title">참석의사 전달하기</h2>
                <div className="rsvp-intro-text">
                  <p>모든 분들께</p>
                  <p>부족함 없는 예식을 준비하기 위해</p>
                  <p>참석 및 식사 여부를</p>
                  <p>미리 여쭙고자 합니다.</p>
                  <br />
                  <p>부담없이 알려주시면</p>
                  <p>정성껏 준비하겠습니다.</p>
                </div>

                <hr className="rsvp-divider" />

                <div className="rsvp-info-list">
                  <div className="rsvp-info-item">
                    <span className="rsvp-info-icon">♡</span>
                    <span>신랑 {groomName} &amp; 신부 {brideName}</span>
                  </div>
                  <div className="rsvp-info-item">
                    <span className="rsvp-info-icon">📅</span>
                    <span>{weddingDate}</span>
                  </div>
                  <div className="rsvp-info-item">
                    <span className="rsvp-info-icon">📍</span>
                    <span>{weddingVenue}</span>
                  </div>
                </div>

                <button className="rsvp-btn-popup" onClick={() => setStep("form")}>
                  참석의사 전달하기
                </button>
                <button className="rsvp-hide-today" onClick={handleHideToday}>
                  ✓ 오늘 하루 보지 않기
                </button>
              </div>
            )}

            {/* Step 2: 폼 (3번 이미지) */}
            {step === "form" && !submitted && (
              <div className="rsvp-form">
                <div className="rsvp-form-header">
                  <h2 className="rsvp-form-title">참석의사 전달하기</h2>
                </div>

                {/* 구분 */}
                <div className="rsvp-field">
                  <label className="rsvp-label">구분</label>
                  <div className="rsvp-side-toggle">
                    <button
                      className={`rsvp-side-btn ${side === "groom" ? "active" : ""}`}
                      onClick={() => setSide("groom")}
                    >
                      신랑
                    </button>
                    <button
                      className={`rsvp-side-btn ${side === "bride" ? "active" : ""}`}
                      onClick={() => setSide("bride")}
                    >
                      신부
                    </button>
                  </div>
                </div>

                {/* 성함 */}
                <div className="rsvp-field">
                  <label className="rsvp-label">성함</label>
                  <input
                    type="text"
                    placeholder="참석자 성함"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rsvp-input"
                  />
                </div>

                {/* 전화번호 */}
                <div className="rsvp-field">
                  <label className="rsvp-label">전화번호</label>
                  <input
                    type="text"
                    placeholder="끝 4자리"
                    value={phoneLast4}
                    onChange={(e) => setPhoneLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="rsvp-input"
                    maxLength={4}
                  />
                </div>

                {/* 메모 */}
                <div className="rsvp-field">
                  <label className="rsvp-label">메모</label>
                  <input
                    type="text"
                    placeholder=""
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="rsvp-input"
                  />
                </div>

                {/* 식사 */}
                <div className="rsvp-field">
                  <label className="rsvp-label">식사</label>
                  <div className="rsvp-radio-group">
                    {[
                      { value: "yes", label: "예정" },
                      { value: "no", label: "불참" },
                      { value: "unknown", label: "미정" },
                    ].map((opt) => (
                      <label key={opt.value} className="rsvp-radio-label">
                        <input
                          type="radio"
                          name="meal"
                          value={opt.value}
                          checked={meal === opt.value}
                          onChange={() => setMeal(opt.value as Meal)}
                          className="rsvp-radio"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 참석인원 */}
                <div className="rsvp-field">
                  <label className="rsvp-label">참석인원</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="rsvp-select"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        총 {n}명 {n === 1 ? "(본인 포함)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="rsvp-btn-send"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "전송 중..." : "SEND"}
                </button>
              </div>
            )}

            {/* 완료 */}
            {step === "form" && submitted && (
              <div className="rsvp-done">
                <p className="rsvp-done-text">참석 의사를 전달해주셨습니다 🤍</p>
                <button className="rsvp-btn-popup" onClick={handleClose}>
                  닫기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        /* 섹션 카드 */
        .rsvp-section {
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }
        .rsvp-card {
          width: 100%;
          max-width: 480px;
          background: white;
          border: 1px solid #e8e4e0;
          border-radius: 4px;
          padding: 48px 32px 36px;
          text-align: center;
          position: relative;
        }
        .rsvp-badge {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          background: #e8e4e0;
          color: #6b6460;
          font-size: 13px;
          padding: 8px 24px;
          border-radius: 999px;
          white-space: nowrap;
          letter-spacing: 0.05em;
        }
        .rsvp-text {
          font-size: 15px;
          color: #6b6460;
          line-height: 2;
          margin-bottom: 32px;
          letter-spacing: 0.03em;
        }
        .rsvp-btn-main {
          width: 100%;
          padding: 16px;
          background: #e8e4e0;
          color: #5a5450;
          border: none;
          border-radius: 999px;
          font-size: 15px;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rsvp-btn-main:hover { background: #ddd8d3; }

        /* 오버레이 */
        .rsvp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .rsvp-popup {
          background: white;
          width: 100%;
          max-width: 500px;
          border-radius: 8px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        .rsvp-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 18px;
          color: #9a9490;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        /* 인트로 팝업 */
        .rsvp-intro {
          padding: 40px 36px 28px;
          text-align: center;
        }
        .rsvp-popup-title {
          font-size: 18px;
          font-weight: 400;
          color: #3a3530;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .rsvp-intro-text {
          font-size: 14px;
          color: #6b6460;
          line-height: 2;
          margin-bottom: 28px;
          letter-spacing: 0.03em;
        }
        .rsvp-divider {
          border: none;
          border-top: 1px solid #ece8e4;
          margin-bottom: 24px;
        }
        .rsvp-info-list {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
          padding: 0 8px;
        }
        .rsvp-info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #5a5450;
          letter-spacing: 0.02em;
        }
        .rsvp-info-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }
        .rsvp-btn-popup {
          width: 100%;
          padding: 16px;
          background: #e8e4e0;
          color: #5a5450;
          border: none;
          border-radius: 999px;
          font-size: 15px;
          letter-spacing: 0.05em;
          cursor: pointer;
          margin-bottom: 14px;
          transition: background 0.2s;
        }
        .rsvp-btn-popup:hover { background: #ddd8d3; }
        .rsvp-hide-today {
          background: none;
          border: none;
          color: #aaa49e;
          font-size: 12px;
          cursor: pointer;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 0 auto;
        }

        /* 폼 팝업 */
        .rsvp-form {
          padding: 0 0 24px;
        }
        .rsvp-form-header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid #f0ece8;
        }
        .rsvp-form-title {
          font-size: 16px;
          font-weight: 400;
          color: #3a3530;
          letter-spacing: 0.08em;
          margin: 0;
        }
        .rsvp-field {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #f8f5f2;
          gap: 16px;
        }
        .rsvp-label {
          font-size: 14px;
          color: #5a5450;
          min-width: 60px;
          letter-spacing: 0.03em;
        }
        .rsvp-input {
          flex: 1;
          border: 1px solid #e0dbd6;
          border-radius: 4px;
          padding: 10px 14px;
          font-size: 13px;
          color: #3a3530;
          outline: none;
          background: white;
          letter-spacing: 0.02em;
        }
        .rsvp-input:focus { border-color: #9a918a; }
        .rsvp-input::placeholder { color: #c0bab4; }

        /* 구분 토글 */
        .rsvp-side-toggle {
          flex: 1;
          display: flex;
          border: 1px solid #e0dbd6;
          border-radius: 4px;
          overflow: hidden;
        }
        .rsvp-side-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: #f5f2ef;
          color: #8a837c;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
          letter-spacing: 0.03em;
        }
        .rsvp-side-btn.active {
          background: #6b6460;
          color: white;
        }

        /* 라디오 */
        .rsvp-radio-group {
          display: flex;
          gap: 20px;
          flex: 1;
        }
        .rsvp-radio-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #5a5450;
          cursor: pointer;
          letter-spacing: 0.02em;
        }
        .rsvp-radio {
          accent-color: #5a7ab5;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        /* 셀렉트 */
        .rsvp-select {
          flex: 1;
          border: 1px solid #e0dbd6;
          border-radius: 4px;
          padding: 10px 14px;
          font-size: 13px;
          color: #3a3530;
          outline: none;
          background: white;
          cursor: pointer;
          appearance: auto;
        }

        /* SEND 버튼 */
        .rsvp-btn-send {
          width: calc(100% - 48px);
          margin: 20px 24px 0;
          padding: 16px;
          background: #e8e4e0;
          color: #5a5450;
          border: none;
          border-radius: 999px;
          font-size: 14px;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .rsvp-btn-send:hover { background: #ddd8d3; }
        .rsvp-btn-send:disabled { opacity: 0.5; cursor: not-allowed; }

        /* 완료 */
        .rsvp-done {
          padding: 60px 36px;
          text-align: center;
        }
        .rsvp-done-text {
          font-size: 15px;
          color: #6b6460;
          margin-bottom: 32px;
          letter-spacing: 0.05em;
          line-height: 2;
        }
      `}</style>
    </>
  );
}