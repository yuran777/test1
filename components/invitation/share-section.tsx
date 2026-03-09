export default function ShareSection() {
    return (
      <section className="px-6 py-12 text-center">
        <h2 className="mb-6 text-lg font-medium text-gray-900">공유하기</h2>
  
        <div className="flex justify-center gap-3">
          <button className="rounded-xl bg-yellow-300 px-4 py-3 text-sm font-medium text-black">
            카카오톡 공유
          </button>
          <button className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
            링크 복사
          </button>
        </div>
      </section>
    );
  }