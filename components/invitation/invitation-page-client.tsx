"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { invitationData } from "@/lib/data";
import GalleryModal from "@/components/invitation/gallery-modal";
import ContactModal from "@/components/invitation/contact-modal";
import CalendarSection from "@/components/invitation/calendar-section";
import LocationSection from "@/components/invitation/location-section";
import AccountSection from "@/components/invitation/account-section";
import RevealSection from "@/components/invitation/reveal-section";
import ShareSection from "@/components/invitation/share-section";
import GuestbookSection from "@/components/invitation/guestbook-section";

interface Props {
  slug: string;
}

export default function InvitationPageClient({ slug }: Props) {
  const data = invitationData;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const visibleGallery = showAllGallery ? data.gallery : data.gallery.slice(0, 9);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroStep(1), 200),
      setTimeout(() => setIntroStep(2), 900),
      setTimeout(() => setIntroStep(3), 1600),
      setTimeout(() => setIntroStep(4), 2300),
      setTimeout(() => setIntroStep(5), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeClass = (visible: boolean) =>
    `transform transition-all duration-1000 ease-out ${
      visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`;

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("배경음악 재생 실패:", error);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/wedding-bgm.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggleMusic}
        className="fixed right-4 top-4 z-50 rounded-full bg-black/45 px-4 py-2 text-sm font-medium text-white shadow-md backdrop-blur transition hover:scale-105"
      >
        {isPlaying ? "🎵 음악 끄기" : "🎵 음악 재생"}
      </button>

      <main className="mx-auto min-h-screen w-full max-w-[720px] bg-white shadow-lg">
        {/* 메인 섹션 */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center">
          {/* ✅ priority 추가 → 첫 화면 이미지 즉시 로딩 (LCP 개선) */}
          {/* ✅ <img> → <Image> 교체 → Vercel 자동 WebP 변환 + 리사이징 */}
          {/* ✅ mainImageUrl 우선 사용, 없으면 갤러리 첫 번째 이미지로 폴백 */}
          <Image
            src={data.mainImageUrl ?? data.gallery?.[0]?.imageUrl ?? "/gallery/main-visual.jpeg"}
            alt="청첩장 메인 이미지"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/50" />
          <div className="relative z-10 px-6 text-white md:px-10">
            <p className={`mb-5 text-xs tracking-[0.4em] text-white/85 ${fadeClass(introStep >= 1)}`}>
              WEDDING INVITATION
            </p>
            <p className={`mb-4 text-sm leading-7 text-white/90 md:text-base ${fadeClass(introStep >= 2)}`}>
              소중한 분들을 초대합니다
            </p>
            <h1 className={`text-4xl font-light leading-tight md:text-5xl ${fadeClass(introStep >= 3)}`}>
              {data.groomName}
              <span className="mx-3 text-white/70">·</span>
              {data.brideName}
            </h1>
            <p className={`mt-6 whitespace-pre-line text-sm leading-7 text-white/90 md:text-base md:leading-8 ${fadeClass(introStep >= 4)}`}>
              서로의 모든 날을 함께하고 싶은 두 사람이{"\n"}
              이제 평생의 약속을 하려 합니다.
            </p>
            <div className={`mt-8 space-y-2 text-sm text-white/85 md:text-base ${fadeClass(introStep >= 5)}`}>
              <p>{data.weddingDateText}</p>
              <p>
                {data.venueName} {data.venueHall}
              </p>
            </div>
          </div>
          <div className="absolute bottom-10 z-10 animate-bounce text-xs tracking-[0.3em] text-white/80">
            SCROLL
          </div>
        </section>

        <RevealSection delay={100}>
          <section className="px-8 py-10 text-center md:px-14">
            <p className="whitespace-pre-line text-sm leading-7 text-gray-700 md:text-base md:leading-8">
              {data.message}
            </p>
          </section>
        </RevealSection>

        <RevealSection delay={150}>
          <section className="space-y-3 px-6 text-center text-sm text-gray-600 md:text-base">
            <p>
              박희진 · 김경희 의 아들
              <strong className="ml-2 text-gray-900">성우</strong>
            </p>
            <p>
              김용호 · 임동미 의 딸
              <strong className="ml-2 text-gray-900">유란</strong>
            </p>
          </section>
        </RevealSection>

        <RevealSection delay={175}>
          <section className="px-6 pt-8 md:px-10">
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
              <Image
                src="/gallery/13.jpg"
                alt="웨딩 사진"
                fill
                className="object-cover"
                sizes="(max-width: 720px) 100vw, 720px"
              />
            </div>
          </section>
        </RevealSection>

        <RevealSection delay={200}>
          <section className="py-10 text-center">
            <button
              onClick={() => setContactOpen(true)}
              className="rounded-lg bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              연락하기
            </button>
          </section>
        </RevealSection>

        <RevealSection>
          <CalendarSection
            groomName={data.groomName}
            brideName={data.brideName}
            weddingDate={data.weddingDate}
          />
        </RevealSection>

        <RevealSection>
          <LocationSection
            venueName={data.venueName}
            venueHall={data.venueHall}
            venueAddress={data.venueAddress}
            mapLinks={data.mapLinks}
            locationInfo={data.locationInfo}
          />
        </RevealSection>

        <RevealSection>
          <AccountSection accounts={data.accounts} />
        </RevealSection>

        {/* 갤러리 */}
        <RevealSection>
          <section className="px-6 py-12 md:px-10">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs tracking-[0.4em] text-gray-400">GALLERY</p>
              <h2 className="text-[28px] font-light text-gray-900">웨딩 사진</h2>
              <div className="mx-auto mt-3 h-px w-10 bg-gray-300" />
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
              {visibleGallery.map((img) => {
                const originalIndex = data.gallery.findIndex(
                  (item) => item.id === img.id
                );
                return (
                  // ✅ <img> → <Image> 교체 → 썸네일 크기(400px)로 자동 리사이징 + WebP 변환
                  // ✅ loading="lazy" 기본 적용됨 (priority 없으면 자동 lazy)
                  <div
                    key={img.id}
                    className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedImageIndex(originalIndex)}
                  >
                    <Image
                      src={img.imageUrl}
                      alt={`갤러리 이미지 ${img.id}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                );
              })}
            </div>
            {data.gallery.length > 9 && !showAllGallery && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllGallery(true)}
                  className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  더보기
                </button>
              </div>
            )}
          </section>
        </RevealSection>

        {/* 방명록 */}
        <RevealSection>
          <GuestbookSection slug={data.slug} />
        </RevealSection>

        {/* 공유 */}
        <RevealSection>
          <ShareSection />
        </RevealSection>

        <GalleryModal
          images={data.gallery.map((item) => item.imageUrl)}
          selectedIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </main>
    </>
  );
}