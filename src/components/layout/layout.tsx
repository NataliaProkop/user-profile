import type { PropsWithChildren } from "react";
import { HeaderPage } from "../header/header";
import { Footer } from "../footer/footer";
import "./layout.scss";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      <HeaderPage />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  );
}
