import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aigrammarwritingfixer.krishaiworks.com"
  ),

  title: {
    default: "AI Grammar & Writing Fixer | Improve Your Writing",
    template: "%s | AI Grammar & Writing Fixer",
  },

  description:
    "Fix grammar, spelling, punctuation, sentence structure, and writing mistakes instantly with the AI Grammar & Writing Fixer by KrishAIWorks.",

  keywords: [
    "AI Grammar Checker",
    "AI Grammar Fixer",
    "Grammar Checker",
    "Grammar Fixer",
    "AI Writing Fixer",
    "AI Writing Assistant",
    "Grammar Correction Tool",
    "AI Proofreading Tool",
    "Spelling and Grammar Checker",
    "Writing Improvement Tool",
    "Fix Grammar with AI",
    "AI Proofreader",
    "Free Grammar Checker",
    "KrishAIWorks",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  applicationName: "AI Grammar & Writing Fixer",

  category: "technology",

  alternates: {
    canonical:
      "https://aigrammarwritingfixer.krishaiworks.com/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aigrammarwritingfixer.krishaiworks.com/",
    siteName: "KrishAIWorks",
    title: "AI Grammar & Writing Fixer | KrishAIWorks",
    description:
      "Fix grammar, spelling, punctuation, and writing mistakes instantly with AI.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AI Grammar & Writing Fixer - KrishAIWorks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Grammar & Writing Fixer | KrishAIWorks",
    description:
      "Improve your writing by fixing grammar, spelling, punctuation, and sentence mistakes with AI.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },

    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },

    {
      "@type": "WebApplication",
      "@id":
        "https://aigrammarwritingfixer.krishaiworks.com/#webapplication",
      name: "AI Grammar & Writing Fixer",
      url: "https://aigrammarwritingfixer.krishaiworks.com/",
      description:
        "Fix grammar, spelling, punctuation, sentence structure, and writing mistakes instantly with the AI Grammar & Writing Fixer by KrishAIWorks.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },

    {
      "@type": "WebPage",
      "@id":
        "https://aigrammarwritingfixer.krishaiworks.com/#webpage",
      url: "https://aigrammarwritingfixer.krishaiworks.com/",
      name: "AI Grammar & Writing Fixer | Improve Your Writing",
      description:
        "Fix grammar, spelling, punctuation, sentence structure, and writing mistakes instantly with the AI Grammar & Writing Fixer by KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://aigrammarwritingfixer.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}