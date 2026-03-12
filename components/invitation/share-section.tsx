"use client";
import { invitationData } from "@/lib/data";

declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: unknown) => void;
      };
    };
  }
}

export default function ShareSection() {
  const handleKakaoShare = () => {
    const { Kakao } = window;
    if (!Kakao) { alert("카카오 SDK가 아직 로드되지 않았어요."); return; }
    if (!Kakao.isInitialized()) {
      const kakaoKey = '31fac3c9801dcec88238a79ed411f604';
      if (!kakaoKey) { alert("카카오 JavaScript 키가 설정되지 않았어요."); return; }
      Kakao.init(kakaoKey);
    }
    const invitationUrl = `${window.location.origin}/invitation/${invitationData.slug}`;
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${invitationData.groomName} · ${invitationData.brideName} 결혼합니다`,
        description: `${invitationData.weddingDateText} | ${invitationData.venueName} ${invitationData.venueHall}`,
        imageUrl: `${window.location.origin}/thumbnail.jpg`,
        link: { mobileWebUrl: invitationUrl, webUrl: invitationUrl },
      },
      buttons: [{ title: "청첩장 보러가기", link: { mobileWebUrl: invitationUrl, webUrl: invitationUrl } }],
    });
  };

  const handleCopyLink = async () => {
    const invitationUrl = `${window.location.origin}/invitation/${invitationData.slug}`;
    try {
      await navigator.clipboard.writeText(invitationUrl);
      alert("링크가 복사되었어요.");
    } catch {
      alert("링크 복사에 실패했어요.");
    }
  };

  return (
    <section className="px-6 py-12 pb-16 md:px-10">

      {/* 통일된 타이틀 */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs tracking-[0.4em] text-gray-400">SHARE</p>
        <h2 className="text-[28px] font-light text-gray-900">공유하기</h2>
        <div className="mx-auto mt-3 h-px w-10 bg-gray-300" />
      </div>

      <div className="mx-auto max-w-md">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleKakaoShare}
            className="rounded-xl bg-yellow-300 px-5 py-3 text-sm font-semibold text-black"
          >
            카카오톡 공유하기
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
          >
            링크 복사하기
          </button>
        </div>
      </div>
    </section>
  );
}