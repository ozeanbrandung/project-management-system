import type { Metadata } from "next";
import { Ysabeau } from 'next/font/google' 
import { SITE_NAME } from "@/constants/seo.constants";
import "./globals.scss";
import { Providers } from "./providers";
import {Toaster} from 'sonner';

const zen = Ysabeau({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-zen',
  style: ['normal']
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: "Приложение для планирование проектов и задач",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={zen.className}>
        <Providers>
          {children}
          <Toaster theme='dark' position='bottom-right' duration={1500}/>
        </Providers>
      </body>
    </html>
  );
}
