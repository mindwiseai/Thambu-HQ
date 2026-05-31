import type { Metadata } from "next";
import "./globals.css";
import { Chrome } from "@/components/Chrome";

export const metadata: Metadata = {
  title: {
    default: "RaceSims — Sim Racing, Engineered in India",
    template: "%s · RaceSims",
  },
  description:
    "Built by a race engineer with championship-winning pedigree. Spec a simulator, book a rig at the Chennai Sim Centre, or race the Indian Esports Racing League.",
  openGraph: {
    siteName: "RaceSims",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-carbon text-foreground">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
