import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import QueryProvider from "@/components/QueryProvider";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Liture EdTech",
  description:
    "Liture EdTech — industry-led webinars, hands-on internships, and membership programs to advance careers. Secure admin tools to manage users, content, and platform operations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          <SessionProvider>
            <Toaster position="top-center" />
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
