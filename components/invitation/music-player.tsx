"use client"

import { Pause, Play, Volume2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
}

export default function MusicPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const start = () => {
      if (started.current) return
      started.current = true

      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {})

      // 첫 상호작용 이후 리스너 제거
      document.removeEventListener("touchstart", start)
      document.removeEventListener("click", start)
      document.removeEventListener("scroll", start)
    }

    // 먼저 자동재생 시도
    audio.play()
      .then(() => {
        started.current = true
        setPlaying(true)
      })
      .catch(() => {
        // 차단된 경우 → 첫 사용자 상호작용 시 재생
        document.addEventListener("touchstart", start, { once: true })
        document.addEventListener("click", start, { once: true })
        document.addEventListener("scroll", start, { once: true })
      })

    return () => {
      document.removeEventListener("touchstart", start)
      document.removeEventListener("click", start)
      document.removeEventListener("scroll", start)
    }
  }, [])

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

      <button
        type="button"
        onClick={togglePlay}
        className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur"
        aria-label={playing ? "음악 정지" : "음악 재생"}
      >
        {playing
          ? <Pause className="h-4 w-4 text-gray-600" />
          : <Play className="h-4 w-4 text-gray-600" />
        }
      </button>
    </>
  )
}
