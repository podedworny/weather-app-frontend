import {Nunito} from 'next/font/google';
import "../lib/fontawesome";
import './global.css'
import TopBar from "../components/TopBar";
import {ThemeProvider} from "../components/ThemeProvider";

const nunito = Nunito({
  subsets: ['latin'],
})


export const metadata = {
  title: 'Prognoza pogody',
  description: 'Prognoza pogody na 7 dni',
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
    <html lang="en" className={nunito.className} suppressHydrationWarning>
      <body>
      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          enableColorScheme={false}
          >
      <TopBar />
      {children}
      </ThemeProvider>
      </body>
    </html>
  )
}
