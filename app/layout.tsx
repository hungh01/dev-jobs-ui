import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Container, CssBaseline } from "@mui/material";
import Header from "./header";
import Providers from "./providers";
import Authenticated from "./auth/actions/authenticated";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Jobs",
  description: "Find your dream job",
  icons: {
    icon: "/web-icon.png",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const authenticated = await Authenticated();
  return (
    <html lang="en">
      <body
      >
        <Providers authenticated={authenticated}>
          <CssBaseline />
          <Header />
          <Container className={authenticated ? "mt-10" : ""}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
