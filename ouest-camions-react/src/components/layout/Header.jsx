import React, { useState, useEffect } from "react";
import LogoHeader from './LogoHeader';
import HeaderMobile from "./HeaderMobile";
import Nav from './Nav';


const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); /* HeaderMobile when isMobile < 768px  */
  const [isDarkMode, setIsDarkMode] = useState(() => { /* dark mode */
    return localStorage.getItem("dark-mode") === "true";
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode); /* dark mode */
    localStorage.setItem("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return isMobile ? (
    <HeaderMobile />
  ) : (

    <header className="header">
      <div className="banner-container">
        <video className="banner-video" autoPlay muted playsInline>
          <source src={`${process.env.PUBLIC_URL}/images/video.mp4`} type="video/mp4" /> {/* import video  */}
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="top-banner"></div>
        <LogoHeader />  {/* import component LogoHeader */}
        <Nav />  {/* import component Nav  */}
        {/* dark mode */}
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {isDarkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
        </button>
      </div>
    </header>

  );
};

export default Header;