import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "PharmaFill",
  description: "Pharmacy Performance Dashboard",
  generator: "v0.app",
  icons: {
    icon: "https://brandcenter.walmart.com/content/dam/brand/home/brand-identity/spark/spark-yellow-on-blue.png",
    shortcut: "https://brandcenter.walmart.com/content/dam/brand/home/brand-identity/spark/spark-yellow-on-blue.png",
    apple: "https://brandcenter.walmart.com/content/dam/brand/home/brand-identity/spark/spark-yellow-on-blue.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
