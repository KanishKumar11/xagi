import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { MobXProvider } from "@/MobXProvider";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Investopal",
  description: "Investopal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} h-full w-full`}>
      <body
        className="h-full w-full bg-[#002E58] text-foreground"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex min-h-[80%] w-full flex-col items-center">
          <MobXProvider>{children}</MobXProvider>
        </main>
      </body>
    </html>
  );
}
