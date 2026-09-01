import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import MobileAnchorAd from "../components/MobileAnchorAd";
import DesktopSideAds from "../components/DesktopSideAds";
import AdScriptLoader from "../components/AdScriptLoader";

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <AdScriptLoader />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <MobileAnchorAd />
      <DesktopSideAds />
    </>
  );
};
export default Layout;
