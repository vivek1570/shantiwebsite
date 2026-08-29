import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "P. Balakrishnan Master Memorial Special School, Vettom | Special Education in Kerala",
    template: "%s | P. Balakrishnan Master Memorial Special School",
  },
  description:
    "P. Balakrishnan Master Memorial Special School (formerly Santhi Special School), Vettom, Malappuram, Kerala. Providing education, therapy, vocational training, and care for differently-abled children since 2002. Run by Vettam Kalasamskarika Vedi.",
  keywords: [
    "P Balakrishnan Master Memorial Special School Vettom",
    "P Balakrishnan Special School Vettom",
    "Santhi Special School Vettom",
    "Special school Vettom",
    "Special school Malappuram",
    "Special education Vettom",
    "Vettom special school",
    "Vettam Kalasamskarika Vedi",
    "differently abled children Kerala",
    "special education Kerala",
    "inclusive education Malappuram",
  ],
  authors: [{ name: "P. Balakrishnan Master Memorial Special School" }],
  openGraph: {
    title:
      "P. Balakrishnan Master Memorial Special School | Vettom, Kerala",
    description:
      "Providing education, therapy, vocational training, and care for differently-abled children since 2002. Formerly known as Santhi Special School.",
    url: "https://santhispecialschool.com",
    siteName: "P. Balakrishnan Master Memorial Special School",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${playfairDisplay.variable} h-full`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SpecialEducationSchool",
              name: "P. Balakrishnan Master Memorial Special School",
              alternateName: "Santhi Special School",
              url: "https://santhispecialschool.com",
              foundingDate: "2002-09-02",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Vettam PO",
                addressLocality: "Tirur",
                addressRegion: "Kerala",
                postalCode: "676102",
                addressCountry: "IN",
              },
              parentOrganization: {
                "@type": "Organization",
                name: "Vettam Kalasamskarika Vedi",
              },
              description:
                "Special school providing education, therapy, vocational training, and care for differently-abled children since 2002.",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
