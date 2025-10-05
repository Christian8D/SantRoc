import type React from "react"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"
import { ContentProvider } from "@/lib/content-context"
import { AuthProvider } from "@/lib/auth-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "Sant Roc",
  description: "The project of Australian musician Kristian Attard",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          <ContentProvider>{children}</ContentProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
