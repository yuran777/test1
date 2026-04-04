"use client"

import { Pause, Play, Volume2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
}

export default function MusicPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)

  // 페이지 로드 시 자동재생 시도
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryAutoPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
        setShowOverlay(false) // 자동재생 성공 시 오버레이 숨김
      } catch {
        // 브라우저 정책으로 자동재생 차단됨 → 오버레이 표시 유지
        setShowOverlay(true)
      }
    }

    tryAutoPlay()
  }, [])

  // 오버레이 터치/클릭 시 음악 재생 시작
  const handleOverlayClick = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      await audio.play()
      setPlaying(true)
    } catch (error) {
      console.error("오디오 재생 실패", error)
    }
    setShowOverlay(false)
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (audio.paused) {
        await audio.play()
        setPlaying(true)
      } else {
        audio.pause()
        setPlaying(false)
      }
    } catch (error) {
      console.error("오디오 재생 실패", error)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      {/* 시작 오버레이 - 화면 전체를 터치하면 음악 재생 */}
      {showOverlay && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#f8f3ee]/95 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-lg">
              <Volume2 className="h-8 w-8 text-neutral-500" />
            </div>
            <div className="space-y-2">
              <p className="text-base font-medium tracking-widest text-neutral-700">
                화면을 터치하여 시작하기
              </p>
              <p className="text-xs tracking-[0.2em] text-neutral-400">
                TAP TO BEGIN
              </p>
            </div>
            <div className="animate-pulse text-neutral-300">
              <div className="h-px w-16 bg-neutral-300 mx-auto" />
            </div>
          </div>
        </div>
      )}

      {/* 음악 재생/정지 버튼 */}
      <button
        type="button"
        onClick={toggleMusic}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm shadow-md backdrop-blur"
        aria-label="배경음악 재생 버튼"
      >
        <Volume2 className="h-4 w-4" />
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        <span>{playing ? "음악 끄기" : "음악 재생"}</span>
      </button>
    </>
  )
}