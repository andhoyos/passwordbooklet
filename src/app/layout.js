import { Inter } from 'next/font/google'
import './globals.css'
import Providers from "./Providers";
import Navbar from "../components/Navbar";
import SessionTimer from "@/components/SessionTimer";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Password-Booklet',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 h-screen md:py-0 py-6 text-slate-400">
        <Providers>
          <Navbar />
          <SessionTimer />
          <div className="container mx-auto py-20">{children}</div>
        </Providers>
        {/* <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2024 PasswordBooklet. Todos los derechos reservados.</p>
        </footer> */}
      </body>
    </html>
  )
}
