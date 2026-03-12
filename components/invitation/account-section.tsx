"use client"

import { useMemo, useState } from "react"
import { Check, ChevronDown, Copy } from "lucide-react"
import { Account } from "@/types/invitation"

type Props = {
  accounts: Account[]
}

export default function AccountSection({ accounts }: Props) {
  const [openSide, setOpenSide] = useState<"groom" | "bride" | null>(null)
  const [toastMessage, setToastMessage] = useState("")
  const [copiedValue, setCopiedValue] = useState("")

  const groomAccounts = useMemo(
    () => accounts.filter((account) => account.side === "groom"),
    [accounts]
  )

  const brideAccounts = useMemo(
    () => accounts.filter((account) => account.side === "bride"),
    [accounts]
  )

  const handleCopy = async (account: Account) => {
    try {
      await navigator.clipboard.writeText(account.accountNumber)
      setCopiedValue(account.accountNumber)
      setToastMessage("계좌번호가 복사되었습니다.")
      setTimeout(() => { setToastMessage(""); setCopiedValue("") }, 1800)
    } catch {
      setToastMessage("복사에 실패했습니다.")
      setTimeout(() => { setToastMessage("") }, 1800)
    }
  }

  return (
    <section className="px-6 py-12 md:px-10">

      {/* 통일된 타이틀 */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs tracking-[0.4em] text-gray-400">ACCOUNT</p>
        <h2 className="text-[28px] font-light text-gray-900">마음 전하실 곳</h2>
        <div className="mx-auto mt-3 h-px w-10 bg-gray-300" />
      </div>

      <div className="mb-12 text-center">
        <p className="whitespace-pre-line text-[18px] leading-[2] text-gray-700 md:text-[20px]">
          멀리서도 축하의 마음을{"\n"}
          전하고 싶으신 분들을 위해{"\n"}
          계좌번호를 안내드립니다.
        </p>
        <p className="mt-10 whitespace-pre-line text-[18px] leading-[2] text-gray-700 md:text-[20px]">
          소중한 축하를 보내주셔서 감사드리며,{"\n"}
          따뜻한 마음에 깊이 감사드립니다.
        </p>
      </div>

      <div className="border-b border-gray-200">
        <AccordionHeader
          title="신랑측 계좌번호"
          isOpen={openSide === "groom"}
          onClick={() => setOpenSide((prev) => (prev === "groom" ? null : "groom"))}
        />
        {openSide === "groom" && (
          <div className="pb-6">
            <div className="space-y-4">
              {groomAccounts.map((account, index) => (
                <AccountCard
                  key={`${account.side}-${index}`}
                  account={account}
                  copied={copiedValue === account.accountNumber}
                  onCopy={() => handleCopy(account)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-b border-gray-200">
        <AccordionHeader
          title="신부측 계좌번호"
          isOpen={openSide === "bride"}
          onClick={() => setOpenSide((prev) => (prev === "bride" ? null : "bride"))}
        />
        {openSide === "bride" && (
          <div className="pb-6">
            <div className="space-y-4">
              {brideAccounts.map((account, index) => (
                <AccountCard
                  key={`${account.side}-${index}`}
                  account={account}
                  copied={copiedValue === account.accountNumber}
                  onCopy={() => handleCopy(account)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </section>
  )
}

function AccordionHeader({
  title,
  isOpen,
  onClick,
}: {
  title: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between py-6 text-left"
    >
      <span className="text-[20px] font-semibold text-gray-900">{title}</span>
      <ChevronDown
        size={26}
        className={["text-gray-400 transition-transform duration-200", isOpen ? "rotate-180" : ""].join(" ")}
      />
    </button>
  )
}

function AccountCard({
  account,
  copied,
  onCopy,
}: {
  account: Account
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className="flex items-center justify-between rounded-[18px] bg-gray-50 px-6 py-5">
      <div className="min-w-0">
        <p className="mb-2 text-[18px] font-semibold text-gray-900">{account.label}</p>
        <p className="truncate text-[16px] text-gray-600">
          {account.bank} (예금주 : {account.holder}) {account.accountNumber}
        </p>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="ml-4 shrink-0 text-gray-500"
        aria-label={`${account.label} 계좌번호 복사`}
      >
        {copied ? <Check size={26} /> : <Copy size={26} />}
      </button>
    </div>
  )
}