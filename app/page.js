import ProductCatalog from "@/components/DynamicProductCatalog/ProductCatalog";
import Banner from "@/components/Home/Banner";
import ServicesSection from "@/components/Home/ServicesSection";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

export const metadata = {
  title: "Asian Import Export Co - Global Trade Partner",
  description:
    "Asian Import Export Co offers comprehensive international trade services including agriculture, seafood, metals, trucks, vehicles, and wood products. Specializing in vehicle parts, truck tires, copper, aluminum, rice, sugar, nuts, and more.",
  keywords: [
    "import export company",
    "international trade",
    "truck tires wholesale",
    "copper scrap",
    "aluminum metal",
    "rice exporter",
    "sugar supplier",
    "cashew nuts",
    "wood pellets",
    "vehicle parts",
    "golf cart",
    "Asian Import Export",
    "global trade solutions"
  ],
  openGraph: {
    title: "Asian Import Export Co - Your Global Trade Partner",
    description:
      "Comprehensive international trade services for agriculture, seafood, metals, trucks, vehicles, and wood products.",
    url: "https://asianimportexport.com",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asian Import Export Co"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Asian Import Export Co - Global Trade Partner",
    description: "Comprehensive international trade services for all your business needs"
  }
};

export default function Home() {
  return (
    <>
      <Banner />
      <ProductCatalog />
      <ServicesSection />
      <WhyChooseUs />
    </>
  );
}
