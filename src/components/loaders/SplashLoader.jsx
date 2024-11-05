import { useState, useEffect } from "react";

const SplashLoader = () => {
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const [shouldDismount, setShouldDismount] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setShouldFadeOut(true);
    }, 800); // fade is set to 1s duration

    const dismountTimer = setTimeout(() => {
      setShouldDismount(true);
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(dismountTimer);
    };
  }, []);

  /** ONLY SHOW IN DEV (prod loads too fast */
  if (import.meta.env.MODE !== "development") return null;

  if (shouldDismount) return null;

  return (
    <div
      id="splash-loader"
      className={`fade ${shouldFadeOut ? "fade-out" : ""}`}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: -99,
      }}
    >
      <img
        className="fade"
        style={{
          animation: "spin 0.8s cubic-bezier(0.1, 0.7, 0.2, 1)",
          width: "50%",
        }}
        src="/logo.webp"
        alt="Stack Overflow Simulator"
        title="Loading..."
      />
    </div>
  );
};

export default SplashLoader;
