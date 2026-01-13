import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import FlyToCartAnimation from "./components/FlyToCartAnimation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { restoreSession } from "./Redux/UserBehaviorSlice";
import { toast } from "react-toastify";

const PageNotFound = () => {
  const location = useLocation();
  return <div className="p-16 text-center text-gray-700">Page not found: {location.pathname}</div>;
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
    
    // Check if it's a returning user (simple check)
    const lastSession = localStorage.getItem('last_session_ts');
    if (lastSession) {
       // Only show if last session was > 1 hour ago (mock logic)
       // toast.info("Welcome back! We've restored your shopping preferences.", { icon: "👋" });
    }
  }, [dispatch]);

  return (
    <>
      <FlyToCartAnimation />
      <ScrollToTop />
      <Navbar />
      <main className="bg-gray-50 min-h-[60vh] pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
