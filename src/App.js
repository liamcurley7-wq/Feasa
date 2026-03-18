import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

export default function App() {
  const [page, setPage] = useState(
    window.location.hash === "#demo" ? "dashboard" : "home"
  );

  useEffect(() => {
    const handleHash = () => {
      setPage(window.location.hash === "#demo" ? "dashboard" : "home");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const goToDemo = () => {
    window.location.hash = "#demo";
    setPage("dashboard");
  };

  const goHome = () => {
    window.location.hash = "";
    setPage("home");
  };

  return page === "home"
    ? <LandingPage onEnterApp={goToDemo} />
    : <Dashboard onBack={goHome} />;
}
