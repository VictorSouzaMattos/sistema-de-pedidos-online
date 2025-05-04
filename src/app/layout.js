import "./globals.css";
import { Montserrat, Nunito, Inter } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export const metadata = {
  title: "Restaurante Menu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.className} bg-gray-50`}>{children}</body>
    </html>
  );
}
