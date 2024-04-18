"use client";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/Header";
import ContextProvider from "@/Context/Context";
import Footer from "@/components/Footer";
import { ProductContextProvider } from "@/Context/CreateProduct";
import { Toaster } from "react-hot-toast";
import CartProvider from "@/Context/CartProvider";
import AdminProvider from "@/Context/AdminProvider";
import Homenav from "@/components/Homenav";
import { usePathname } from 'next/navigation'
import { SelectedCountryProvider } from "@/Context/selectCountry";
const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  //
  const isHomePage = usePathname() === "/";

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#000" height={4} />
        <SelectedCountryProvider>
        <ContextProvider>
          <AdminProvider>
            <ProductContextProvider>
              <CartProvider>
                {isHomePage ? <Homenav /> : <Header />}
                <Toaster />
                {children}
                <Footer />
              </CartProvider>
            </ProductContextProvider>
          </AdminProvider>
        </ContextProvider>
        </SelectedCountryProvider>
      </body>
    </html>
  );
}
