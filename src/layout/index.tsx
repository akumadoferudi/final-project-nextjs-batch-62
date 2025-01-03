/* eslint-disable */

import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface ContentElementProps {
  children: React.ReactNode;
  metaTitle?: string;
  metaDescription?: string;
  userData?: any;
}

export default function Layout({
  children,
  metaTitle,
  metaDescription,
}: ContentElementProps) {
  return (
    <div className="container-phone">
      <Head>
        <title>{`${metaTitle}` || "final project"}</title>
        <meta
          name="description"
          content={
            metaDescription ||
            "final project nextjs sanbercode batch-62 by Ach. Ferdi"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div style={{ marginTop: "5rem" /* Adjust based on header height */ }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
