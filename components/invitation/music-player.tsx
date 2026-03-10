"use client"

import { Pause, Play, Volume2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
}

export default function MusicPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

      {mounted && !playing && (
        <div className="fixed left-1/2 top-20 z-40 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs text-white">
          모바일 브라우저 정책상 자동재생이 제한될 수 있어요. 상단 버튼을 눌러 재생해 주세요.
        </div>
      )}
    </>
  )
}