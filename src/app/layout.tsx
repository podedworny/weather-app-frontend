import {Nunito} from 'next/font/google';
import "../lib/fontawesome";
import './global.css'

const nunito = Nunito({
  subsets: ['latin'],
})


export const metadata = {
  title: 'WeatherApp',
  description: 'WeatherApp with localization',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>{children}</body>
    </html>
  )
}
