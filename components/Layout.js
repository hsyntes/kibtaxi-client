import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./ui/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const Layout = ({ children }) => {
  const themeState = useSelector((state) => state.theme);

  const { theme } = themeState;

  useEffect(
    function () {
      if (typeof window !== "undefined") localStorage.setItem("theme", theme);

      const [html, body] = [
        document.querySelector("html"),
        document.querySelector("body"),
      ];

      if (theme === "light") {
        html.classList.remove("dark");
        body.className = "bg-white text-dark transition-all";
      }

      if (theme === "dark") {
        html.classList.add("dark");
        body.className = "bg-black text-white transition-all";
      }
    },
    [theme]
  );

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
