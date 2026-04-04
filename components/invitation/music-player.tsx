"use client"

import { Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
}

export default function MusicPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true) // 처음엔 음소거로 시작

  // 페이지 로드 시 음소거 상태로 자동재생 (모든 브라우저 허용)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = true
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // 음소거여도 차단되는 경우 (드물게 발생)
        setPlaying(false)
      })
  }, [])

  // 음소거 토글 (소리 켜기/끄기)
  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (muted) {
      audio.muted = false
      setMuted(false)
    } else {
      audio.muted = true
      setMuted(true)
    }
  }

  // 재생/정지 토글
  const togglePlay = async () => {
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

      {/* 소리 켜기 안내 배너 (음소거 상태이고 재생 중일 때만 표시) */}
      {playing && muted && (
        <div
          onClick={toggleMute}
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 cursor-pointer rounded-full bg-black/60 px-5 py-2 text-xs text-white backdrop-blur transition hover:bg-black/75"
        >
          🎵 터치하여 소리 켜기
        </div>
      )}

      {/* 재생/정지 + 음소거 버튼 */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur"
          aria-label={muted ? "소리 켜기" : "소리 끄기"}
        >
          {muted ? (
            <VolumeX className="h-4 w-4 text-gray-600" />
          ) : (
            <Volume2 className="h-4 w-4 text-gray-600" />
          )}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur"
          aria-label={playing ? "음악 정지" : "음악 재생"}
        >
          {playing ? (
            <Pause className="h-4 w-4 text-gray-600" />
          ) : (
            <Play className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>
    </>
  )
}
