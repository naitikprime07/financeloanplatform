import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import MobileAnchorAd from "../components/MobileAnchorAd";
import DesktopSideAds from "../components/DesktopSideAds";
import AdScriptLoader from "../components/AdScriptLoader";
import AdUnit from "../components/AdUnit";

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <AdScriptLoader />
      <section className="top-ad-rail" aria-label="Top advertisement">
        <div className="top-ad-inner"><AdUnit slot="TOP" /></div>
      </section>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <section className="bottom-ad-rail" aria-label="Bottom advertisement">
        <div className="container"><AdUnit slot="BOTTOM" /></div>
      </section>
      <Footer />
      <CookieConsent />
      <MobileAnchorAd />
      <DesktopSideAds />
    </>
  );
};
export default Layout;

