import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Modals } from "@/components/modals";
import { SubscriptionAlert } from "@/features/susbscriptions/components/subscription-alert";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creatify",
  description: "Canvas App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Analytics />
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Toaster />
            <Modals />
            <SubscriptionAlert />
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
