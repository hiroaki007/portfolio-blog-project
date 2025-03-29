import "@/styles/globals.css";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
          <main>
          {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
