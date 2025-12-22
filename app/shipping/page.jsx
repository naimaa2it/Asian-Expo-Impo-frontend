import ShippingContent from "@/PageComponents/ShippingAndDelivery";

export const metadata = {
  title: "Shipping & Delivery - International Logistics",
  description:
    "Learn about Asian Import Export Co's shipping and delivery services. Flexible payment terms, worldwide delivery, and comprehensive logistics support.",
  keywords: [
    "international shipping",
    "import export delivery",
    "logistics services",
    "payment terms",
    "worldwide delivery",
  ],
  openGraph: {
    title: "Shipping & Delivery - Asian Import Export Co",
    description:
      "Flexible payment terms and reliable international shipping services for all your trade needs.",
    url: "https://asianimportexport.com/shipping",
  },
};

export default function ShippingPage() {
  return <ShippingContent />;
}

