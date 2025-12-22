import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import "./globals.css";

export const metadata = {
  title: {
    default: "Asian Import Export Co - Global Trade Solutions",
    template: "%s | Asian Import Export Co",
  },
  description:
    "Leading import-export company specializing in agriculture, seafood, metals, trucks, vehicles, and wood products. Your trusted partner for international trade.",
  keywords: [
    "import export",
    "international trade",
    "agriculture products",
    "seafood export",
    "metal trading",
    "truck tires",
    "vehicle export",
    "wood products",
    "global trade",
    "Asian Import Export",
  ],
  authors: [{ name: "Asian Import Export Co" }],
  creator: "Asian Import Export Co",
  publisher: "Asian Import Export Co",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://asianimportexport.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Asian Import Export Co - Global Trade Solutions",
    description:
      "Leading import-export company specializing in agriculture, seafood, metals, trucks, vehicles, and wood products.",
    url: "https://asianimportexport.com",
    siteName: "Asian Import Export Co",
    images: [
      {
        url: "/og-image.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Asian Import Export Co",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asian Import Export Co - Global Trade Solutions",
    description:
      "Leading import-export company specializing in agriculture, seafood, metals, trucks, vehicles, and wood products.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    // yandex: 'your-yandex-verification',
    // bing: 'your-bing-verification',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="loading loading-spinner loading-lg"></div></div>}>
          <main>{children}</main>
        </Suspense>
        <Footer />
        <FloatingWhatsApp
          phoneNumber="14379003996"
          message="Hello! How can I help you?"
        />
      </body>
    </html>
  );
}
