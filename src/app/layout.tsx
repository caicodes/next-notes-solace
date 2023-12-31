import "./globals.css"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AppHeader } from "@/components/AppHeader"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solace Notes App",
  description: "Solace Notes Application by Cai Toy",
}

const MollieGlaston = localFont({
  src: [
    {
      path: "../../public/fonts/Mollie_Glaston.woff2",
      weight: "400",
    },
  ],
  variable: "--font-mollie-glaston",
})
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${MollieGlaston.variable} font-display {inter.className} font-sans`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppHeader />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

