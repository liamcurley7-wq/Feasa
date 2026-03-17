import { useState } from "react";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

export default function App() {
  const [page, setPage] = useState("home");
  return page === "home"
    ? <LandingPage onEnterApp={() => setPage("dashboard")} />
    : <Dashboard onBack={() => setPage("home")} />;
}
