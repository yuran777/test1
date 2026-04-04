import type { Metadata } from "next";
import { invitationData } from "@/lib/data";
import InvitationPageClient from "@/components/invitation/invitation-page-client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = "https://test1-peach-six.vercel.app";
  const pageUrl = `${siteUrl}/invitation/${slug}`;

  return {
    title: `${invitationData.groomName} · ${invitationData.brideName} 결혼합니다`,
    description: `${invitationData.weddingDateText} ${invitationData.venueName} ${invitationData.venueHall}`,
    openGraph: {
      title: `${invitationData.groomName} · ${invitationData.brideName} 결혼합니다`,
      description: `${invitationData.weddingDateText} ${invitationData.venueName} ${invitationData.venueHall}`,
      url: pageUrl,
      siteName: "Wedding Invitation",
      images: [
        {
          url: `${siteUrl}/thumnail.jpeg`,
          width: 1200,
          height: 630,
          alt: "Wedding Invitation",
        },
      ],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${invitationData.groomName} · ${invitationData.brideName} 결혼합니다`,
      description: `${invitationData.weddingDateText} ${invitationData.venueName} ${invitationData.venueHall}`,
      images: [`${siteUrl}/thumnail.jpeg`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (slug !== invitationData.slug) {
    return <div className="p-10 text-center">존재하지 않는 청첩장입니다.</div>;
  }

  return <InvitationPageClient />;
}