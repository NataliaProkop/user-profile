import type { FC, PropsWithChildren } from "react";
import { HeaderPage } from "../header";
import { Footer } from "../footer";
import "./layout.scss";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <HeaderPage />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  );
};
