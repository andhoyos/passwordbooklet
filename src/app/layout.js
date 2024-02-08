import { Inter } from 'next/font/google'
import './globals.css'
import Providers from "./Providers";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mi Libreta de Claves',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 h-screen md:py-0 py-6">
        <Providers>
          <Navbar />
          <div className="container mx-auto">{children}</div>
        </Providers></body>
    </html>
  )
}
