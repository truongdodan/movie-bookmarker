import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar";
import { Provider } from "./provider";
import { getServerAuthSession } from "~/server/auth-session";
import { TooltipProvider } from "~/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Popcorn",
  description: "Bookmark movies. Watch later.",
  icons: [{ rel: "icon", url: "/popcorn.svg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${geist.variable}`}>
      <Provider session={session}>
        <body>
          <TooltipProvider>
            <Navbar />
          </TooltipProvider>
          <main className="min-h-screen">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <TRPCReactProvider>
                {children}
              </TRPCReactProvider>
            </div>
          </main>
        </body>
      </Provider>
    </html>
  );
}
