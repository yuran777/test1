type ContactItem = {
    role: "groom" | "bride";
    name: string;
    phone: string;
  };
  
  type Props = {
    contacts: ContactItem[];
  };
  
  export default function ContactSection({ contacts }: Props) {
    return (
      <section className="px-6 py-12">
        <h2 className="mb-6 text-center text-lg font-medium text-gray-900">
          연락하기
        </h2>
  
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div
              key={`${contact.role}-${index}`}
              className="flex items-center justify-between rounded-2xl border border-gray-200 p-4"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                <p className="mt-1 text-sm text-gray-500">{contact.phone}</p>
              </div>
  
              <div className="flex gap-2">
                <a
                  href={`tel:${contact.phone}`}
                  className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white"
                >
                  전화
                </a>
                <a
                  href={`sms:${contact.phone}`}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
                >
                  문자
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }