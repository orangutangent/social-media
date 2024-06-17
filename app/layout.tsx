import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavPanel from "@/components/NavPanel";
import { getServerSession } from "next-auth";
import AuthProvider from "@/libs/AuthProvider";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import EditModal from "@/components/modals/EditModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "otana-social-media",
  description: "otana-social-media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Toaster position="top-center" />
          <EditModal />
          <LoginModal />
          <RegisterModal />
          <div>
            <NavPanel />
            <div className="py-20">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
