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
    const text = `${account.bank} ${account.accountNumber} (${account.holder})`

    try {
      await navigator.clipboard.writeText(account.accountNumber)
      setCopiedValue(account.accountNumber)
      setToastMessage("계좌번호가 복사되었습니다.")

      setTimeout(() => {
        setToastMessage("")
        setCopiedValue("")
      }, 1800)
    } catch {
      setToastMessage("복사에 실패했습니다.")
      setTimeout(() => {
        setToastMessage("")
      }, 1800)
    }
  }

  return (
    <section className="px-6 py-12">
      <h2 className="mb-10 text-center text-[34px] font-light text-gray-900">
        ACCOUNT
      </h2>

      <div className="border-b border-gray-200">
        <AccordionHeader
          title="신랑측 계좌번호"
          isOpen={openSide === "groom"}
          onClick={() =>
            setOpenSide((prev) => (prev === "groom" ? null : "groom"))
          }
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
          onClick={() =>
            setOpenSide((prev) => (prev === "bride" ? null : "bride"))
          }
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
        className={[
          "text-gray-400 transition-transform duration-200",
          isOpen ? "rotate-180" : "",
        ].join(" ")}
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
        <p className="mb-2 text-[18px] font-semibold text-gray-900">
          {account.label}
        </p>
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