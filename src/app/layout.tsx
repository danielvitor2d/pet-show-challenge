import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import "@/css/globals.css";
import { Providers } from './providers';

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"]
 });

export const metadata: Metadata = {
  title: "PetShow",
  description: "PetShow, by Daniel Vitor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-100">
      <body className={roboto.className}>
        <Providers>
          {children}
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
