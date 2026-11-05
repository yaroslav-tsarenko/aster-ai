import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import PageLoader from "./PageLoader";

const Layout = () => (
  <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-clip">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-n-1 focus:text-n-8"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" tabIndex={-1} className="outline-none">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default Layout;
