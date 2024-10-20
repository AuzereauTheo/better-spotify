//libs
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
//components
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/Toasterprovider";
import getSongsByUserId from "@/actions/getSongsByUserid";

const font = Figtree({subsets: ['latin']}); 

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to your own music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  console.log("layout", userSongs)
  return (
    <html lang="fr">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
