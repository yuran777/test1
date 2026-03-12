"use client"

import { useEffect, useMemo, useState } from "react"

type Props = {
  groomName: string
  brideName: string
  weddingDate: string
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"]

export default function CalendarSection({ groomName, brideName, weddingDate }: Props) {
  const wedding = useMemo(() => new Date(weddingDate), [weddingDate])

  const year = wedding.getFullYear()
  const month = wedding.getMonth()
  const date = wedding.getDate()

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(wedding))

  useEffect(() => {
    const timer = setInterval(() => { setTimeLeft(getTimeLeft(wedding)) }, 1000)
    return () => clearInterval(timer)
  }, [wedding])

  const calendarCells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const cells: (number | null)[] = []
    for (let i = 0; i < firstDay; i += 1) cells.push(null)
    for (let day = 1; day <= lastDate; day += 1) cells.push(day)
    return cells
  }, [year, month])

  return (
    <section className="px-6 py-12 md:px-10">

      {/* 통일된 타이틀 */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs tracking-[0.4em] text-gray-400">CALENDAR</p>
        <h2 className="text-[28px] font-light text-gray-900">예식 일정</h2>
        <div className="mx-auto mt-3 h-px w-10 bg-gray-300" />
      </div>

      <div className="overflow-hidden rounded-[22px]">
        <div
          className="relative"
          style={{ backgroundImage: "url('/calendar-bg.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 px-6 py-8 text-white">
            <h3 className="mb-8 text-center text-[28px] font-semibold">
              {year}년 {month + 1}월
            </h3>
            <div className="grid grid-cols-7 gap-y-5 text-center">
              {WEEKDAYS.map((day, index) => (
                <div
                  key={day}
                  className={["text-[18px] font-semibold", index === 0 ? "text-rose-200" : index === 6 ? "text-blue-200" : "text-white/85"].join(" ")}
                >
                  {day}
                </div>
              ))}
              {calendarCells.map((day, index) => {
                if (day === null) return <div key={`empty-${index}`} className="h-12" />
                const weekday = index % 7
                const isSunday = weekday === 0
                const isSaturday = weekday === 6
                const isWeddingDay = day === date
                return (
                  <div key={day} className="flex h-12 items-center justify-center">
                    {isWeddingDay ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-pink-200 bg-white text-[18px] font-bold text-pink-600 shadow-lg">
                        {day}
                      </div>
                    ) : (
                      <span className={["text-[18px] font-semibold", isSunday ? "text-rose-200" : isSaturday ? "text-blue-200" : "text-white"].join(" ")}>
                        {day}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 text-center">
        <div className="flex items-end justify-center gap-3">
          <CountBox label="DAYS" value={timeLeft.days} />
          <span className="pb-1 text-5xl font-light text-gray-400">:</span>
          <CountBox label="HOUR" value={timeLeft.hours} />
          <span className="pb-1 text-5xl font-light text-gray-400">:</span>
          <CountBox label="MIN" value={timeLeft.minutes} />
          <span className="pb-1 text-5xl font-light text-gray-400">:</span>
          <CountBox label="SEC" value={timeLeft.seconds} />
        </div>
        <p className="mt-12 text-[18px] font-medium text-gray-600">
          {groomName}, {brideName}의 결혼식이{" "}
          <span className="font-bold text-rose-500">{timeLeft.days}일</span>
          {" "}남았습니다.
        </p>
      </div>
    </section>
  )
}

function CountBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="w-[72px] text-center">
      <p className="mb-2 text-[13px] font-semibold tracking-wide text-gray-400">{label}</p>
      <p className="text-[54px] font-extralight leading-none text-gray-800">
        {String(value).padStart(2, "0")}
      </p>
    </div>
  )
}

function getTimeLeft(targetDate: Date) {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}