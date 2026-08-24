import type { Metadata, Viewport } from "next"
import { Roboto } from "next/font/google"

import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
})

const titre = "Wealth repartition simulator"
const description =
  "What would happen if every income on Earth were shared equally? Move one slider and watch the world map change."

export const metadata: Metadata = {
  metadataBase: new URL("https://wealth-repartition-simulator.vercel.app"),
  title: titre,
  description,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50%' y='50%' style='dominant-baseline:central;text-anchor:middle;font-size:90px;'>🌍</text></svg>",
  },
  openGraph: {
    type: "website",
    title: titre,
    description,
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title: titre, description },
}

export const viewport: Viewport = {
  themeColor: "#3f3d56",
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  )
}
