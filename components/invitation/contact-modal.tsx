"use client"

type Props = {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80"
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 text-white text-3xl leading-none"
        aria-label="닫기"
      >
        ×
      </button>

      {/* 가운데 내용 */}
      <div
        className="mx-auto flex min-h-screen w-full max-w-[480px] items-center justify-center px-8 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-[360px] text-white">
          <div className="text-center mb-10">
            <p className="mb-2 text-sm tracking-[0.25em] text-white/80">
              CONTACT
            </p>
            <h2 className="text-3xl font-light">연락하기</h2>
          </div>

          {/* 신랑측 */}
          <section className="mb-10">
            <div className="mb-4">
              <p className="text-2xl font-medium">
                신랑측 <span className="text-white/60 text-xl font-light">GROOM</span>
              </p>
            </div>

            <div className="mb-5 border-b border-white/40" />

            <ContactItem label="신랑" name="박성우" />
            <ContactItem label="신랑 아버지" name="박희진" />
            <ContactItem label="신랑 어머니" name="김경희" />
          </section>

          {/* 신부측 */}
          <section>
            <div className="mb-4">
              <p className="text-2xl font-medium">
                신부측 <span className="text-white/60 text-xl font-light">BRIDE</span>
              </p>
            </div>

            <div className="mb-5 border-b border-white/40" />

            <ContactItem label="신부" name="김유란" />
            <ContactItem label="신부 아버지" name="김용호" />
            <ContactItem label="신부 어머니" name="임동미" />
          </section>
        </div>
      </div>
    </div>
  )
}

function ContactItem({
  label,
  name,
}: {
  label: string
  name: string
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center py-4 text-white">
      <p className="text-[15px] text-white/90">{label}</p>
      <p className="text-[15px] font-semibold">{name}</p>
    </div>
  )
}