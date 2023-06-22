import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
  // useHeader: boolean;
  // useFooter: boolean;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`layout`}>
      <Header />
      <div className="layout__main">{children}</div>
      <Footer />
    </div>
  );
}
