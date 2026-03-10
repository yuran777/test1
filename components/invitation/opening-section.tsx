"use client"

import { useEffect, useState } from "react"

type Props = {
  groomName: string
  brideName: string
  dateText: string
  venueText: string
}

export default function OpeningSection({
  groomName,
  brideName,
  dateText,
  venueText,
}: Props) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 2100),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  const fadeClass = (visible: boolean) =>
    `transition-all duration-1000 ease-out ${
      visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8f3ee] px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(248,243,238,0.95))]" />

      <div className="relative z-10 max-w-xl space-y-5">
        <p className={`text-xs tracking-[0.35em] text-neutral-500 ${fadeClass(step >= 1)}`}>
          WEDDING INVITATION
        </p>

        <h1 className={`text-4xl font-semibold leading-tight text-neutral-800 md:text-5xl ${fadeClass(step >= 2)}`}>
          {groomName}
          <span className="mx-3 text-neutral-400">&</span>
          {brideName}
        </h1>

        <p className={`text-sm leading-7 text-neutral-600 md:text-base ${fadeClass(step >= 3)}`}>
          저희 두 사람이 같은 방향을 바라보며
          <br />
          함께 걸어가기로 했습니다.
        </p>

        <div className={`space-y-1 text-sm text-neutral-500 md:text-base ${fadeClass(step >= 4)}`}>
          <p>{dateText}</p>
          <p>{venueText}</p>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-xs tracking-[0.3em] text-neutral-400">
        SCROLL
      </div>
    </section>
  )
}