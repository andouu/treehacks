import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./Components/Providers";

const telegraf = localFont({
  src: [
    {
      path: "./Assets/Fonts/PPTelegraf-Regular.otf",
      weight: "400",
    },
  ],
  variable: "--font-telegraf",
});

export const metadata: Metadata = {
  title: "TradeLingo",
  description: "A hedgefund at your fingertips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${telegraf.variable} ${telegraf.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
