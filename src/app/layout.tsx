
import "./globals.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
