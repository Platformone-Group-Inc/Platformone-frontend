import type { Metadata } from "next";
// Plus Jakarta Sans
import ReduxProvider from "@/reducer/ReduxProvider";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import QueryProvider from "@/context/query-provider";
const font = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Compliance One",
    default: "Compliance One",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.variable} antialiased`}>
        <QueryProvider>
        <ReduxProvider>
          <Providers>{children}</Providers>
        </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
