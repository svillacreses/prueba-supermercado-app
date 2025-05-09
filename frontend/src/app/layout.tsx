import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import TextLink from "@/components/ui/TextLink";
import CustomLoading from "@/components/ui/CustomLoading";
import PrincipalActions from "@/components/PrincipalActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supermercado App",
  description: "Prueba técnica para el cargo de Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-rows-[115px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-17 font-[family-name:var(--font-geist-sans)]">
          <div className="w-full row-start-1 flex flex-col gap-[10px] items-center justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold">Supermercado App</h1>
            <PrincipalActions />
          </div>
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
            <div className="w-full">
              <Suspense fallback={<CustomLoading />}>{children}</Suspense>
            </div>
          </main>
          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            <a
              href="https://linkedin.com/in/sivillacreses"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TextLink forward>LinkedIn de Santiago Villacreses</TextLink>
            </a>
          </footer>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{
            width: "300px",
            maxWidth: "100%",
            fontSize: "16px",
          }}
        />
      </body>
    </html>
  );
}
