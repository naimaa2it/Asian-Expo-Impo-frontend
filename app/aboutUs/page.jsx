import AboutUs from "@/PageComponents/AboutUs";


export const metadata = {
  title: "About Us - Our Story & Mission",
  description:
    "Learn about Asian Import Export Co, established in 2013. A leading international trading company with over 10 years of experience serving 50+ countries worldwide.",
  keywords: [
    "about asian import export",
    "company history",
    "international trading company",
    "import export experience",
    "global trade partner",
  ],
  openGraph: {
    title: "About Asian Import Export Co - Our Story & Mission",
    description:
      "Established 2013. Leading international trading company with 10+ years experience serving 50+ countries.",
    url: "https://asianimportexport.com/aboutUs",
  },
};

export default function AboutUsPage() {
  return <AboutUs />;
}

