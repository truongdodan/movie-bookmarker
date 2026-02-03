import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar";
import { Provider } from "./provider";
import { getServerAuthSession } from "~/server/auth-session";

export const metadata: Metadata = {
  title: "Popcorn",
  description: "Bookmark movies. Watch later.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          <Navbar />
          <main className="min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-6">
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </div>
          </main>
        </body>
      </Provider>
    </html>
  );
}
