import "flatpickr/dist/flatpickr.css";
import "../assets/scss/tailwind.scss";
import "../assets/scss/icons.scss";
import "../assets/scss/fonts/fonts.scss";
import "simplebar-react/dist/simplebar.min.css";
import "../assets/scss/plugins.scss";
import ClientProviders from "@src/components/common/ClientProviders";
import { Metadata } from "next";
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    userScalable: "no",
  };
}
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Domiex - Next TS Premium Admin & Dashboard Template",
    description:
      "Domiex is a powerful and responsive admin dashboard template supporting 21 frameworks, including React, Angular, Laravel, Node.js, and more.",
    keywords: [
      "admin dashboard template",
      "admin template",
      "TailwindCSS dashboard",
      "react admin",
      "angular admin",
      "laravel admin",
      "responsive dashboard",
      "dark mode",
      "RTL support",
      "Vue",
      "Blazor",
      "PHP",
      "Node.js",
      "Django",
      "Flask",
      "Symfony",
      "CodeIgniter",
    ],
    openGraph: {
      title: "Domiex - Next TS Premium Admin & Dashboard Template",
      description:
        "Explore Domiex, a feature-rich admin dashboard template with multiple frameworks support.",
      type: "website",
    },
    twitter: {
      title: "Domiex - Next TS Premium Admin & Dashboard Template",
      description:
        "A modern and responsive admin template with built-in support for various frameworks.",
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
