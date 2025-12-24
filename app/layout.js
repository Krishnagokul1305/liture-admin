import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Liture Edutech | Admin",
  description:
    "Liture EdTech Admin Dashboard provides centralized control to manage users, roles, content, and platform operations efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Toaster position="top-center" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
