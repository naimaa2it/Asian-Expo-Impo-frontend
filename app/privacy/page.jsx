import PrivacyPolicyContent from "@/PageComponents/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy - Data Protection & Security",
  description:
    "Read Asian Import Export Co's privacy policy. Learn how we protect your personal information, handle cookies, and maintain data security.",
  keywords: [
    "privacy policy",
    "data protection",
    "cookie policy",
    "user privacy",
    "data security",
  ],
  openGraph: {
    title: "Privacy Policy - Asian Import Export Co",
    description:
      "Our commitment to protecting your personal information and maintaining data security.",
    url: "https://asianimportexport.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicyContent />;
}

