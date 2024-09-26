import {
  faAngleLeft,
  faAngleRight,
  faCheck,
  faEarth,
  faGear,
  faGears,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { themeSliceActions } from "@/store/theme/theme.slice";

const Navbar = () => {
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [currentTheme, setCurrentTheme] = useState("");
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [settingsDropdownDisplay, setSettingsDropdownDisplay] =
    useState("none");
  const [settingsDropdownCurrentPage, setSettingsDropdownCurrentPage] =
    useState(0);
  const [themeSettingsPageDisplay, setThemeSettingsPageDisplay] =
    useState("none");
  const [languageSettingsPageDisplay, setLanguageSettingsPageDisplay] =
    useState("none");

  const settingsDropdownRef = useRef();

  const { theme } = themeState;

  const handleSettingsDropdown = () => setSettingsDropdown(!settingsDropdown);
  const handleSetTheme = (value) => dispatch(themeSliceActions.setTheme(value));

  useEffect(function () {
    function handleClickOutSide(e) {
      if (
        settingsDropdownRef.current &&
        !settingsDropdownRef.current.contains(e.target) &&
        !e.target.classList.contains("dropdown")
      ) {
        setSettingsDropdown(false);

        setTimeout(function () {
          setSettingsDropdownCurrentPage(0);
        }, 100);
      }
    }

    document.addEventListener("click", handleClickOutSide, true);

    return () =>
      document.removeEventListener("click", handleClickOutSide, true);
  }, []);

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        if (!settingsDropdown) setSettingsDropdownDisplay("none");
      }, 100);

      if (settingsDropdown) setSettingsDropdownDisplay("block");

      return () => clearTimeout(identifier);
    },
    [settingsDropdown]
  );

  useEffect(
    function () {
      setCurrentTheme(theme);
    },
    [theme]
  );

  return (
    <nav className="flex items-center justify-between p-4">
      <Link href={"/"}>
        <Image
          src={currentTheme === "dark" ? "/brand.light.png" : "/brand.dark.png"}
          width={272}
          height={71}
          className="w-36"
          alt="Logo"
          priority
        />
      </Link>
      <ul>
        <li className="relative">
          <FontAwesomeIcon
            icon={faGear}
            size="lg"
            className="cursor-pointer"
            onClick={handleSettingsDropdown}
            ref={settingsDropdownRef}
          />
          <div
            style={{
              display: settingsDropdownDisplay,
              width: "200px",
            }}
            className="dropdown absolute top-full right-full bg-white dark:bg-black select-none transition-all"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: settingsDropdown ? [0.9, 1] : [1, 0.9],
                opacity: settingsDropdown ? [0, 1] : [1, 0],
              }}
              // transition={{ ease: "easeOut", duration: 0.35 }}
              className="flex rounded border dark:border-dark overflow-x-hidden"
            >
              <motion.div
                className="dropdown min-w-full"
                animate={{
                  translateX: `-${settingsDropdownCurrentPage * 100}%`,
                }}
              >
                <div className="dropdown dropdown-header p-4">
                  <h6 className="dropdown flex items-center text-sm gap-2">
                    <FontAwesomeIcon icon={faGears} className="dropdown" />
                    <span className="dropdown font-semibold">Settings</span>
                  </h6>
                </div>
                <hr
                  style={{ height: 0.5 }}
                  className="border-none bg-border dark:bg-border-dark"
                />
                <div className="dropdown dropdown-body">
                  <ul>
                    <li
                      className="dropdown flex items-center justify-between hover:bg-light hover:dark:bg-dark cursor-pointer transition-all px-4 py-3"
                      onClick={function () {
                        setSettingsDropdownCurrentPage(1);

                        setThemeSettingsPageDisplay("block");
                        setLanguageSettingsPageDisplay("none");
                      }}
                    >
                      <div className="dropdown flex items-center gap-2">
                        <FontAwesomeIcon icon={faMoon} className="dropdown" />
                        <span className="dropdown text-sm">Theme</span>
                      </div>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        size="sm"
                        className="dropdown"
                      />
                    </li>
                    <li
                      className="dropdown flex items-center justify-between hover:bg-light hover:dark:bg-dark cursor-pointer transition-all px-4 py-3"
                      onClick={function () {
                        setSettingsDropdownCurrentPage(1);

                        setThemeSettingsPageDisplay("none");
                        setLanguageSettingsPageDisplay("block");
                      }}
                    >
                      <div className="dropdown flex items-center gap-2">
                        <FontAwesomeIcon icon={faEarth} className="dropdown" />
                        <span className="text-sm dropdown">Language</span>
                      </div>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        size="sm"
                        className="dropdown"
                      />
                    </li>
                  </ul>
                </div>
              </motion.div>
              <motion.div
                style={{ display: themeSettingsPageDisplay }}
                className="dropdown min-w-full"
                animate={{
                  translateX: `-${settingsDropdownCurrentPage * 100}%`,
                }}
              >
                <div className="dropdown dropdown-header p-4">
                  <div
                    className="dropdown flex items-center text-sm gap-1 hover:text-primary cursor-pointer transition-all"
                    onClick={function () {
                      setSettingsDropdownCurrentPage(0);

                      setThemeSettingsPageDisplay("none");
                      setLanguageSettingsPageDisplay("none");
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <span className="dropdown font-semibold">Back</span>
                  </div>
                </div>
                <hr
                  style={{ height: 0.5 }}
                  className="border-none bg-border dark:bg-border-dark"
                />
                <div className="dropdown dropdown-body">
                  <ul>
                    <li
                      className="dropdown flex items-center justify-between hover:bg-light hover:dark:bg-dark cursor-pointer transition-all px-4 py-3"
                      onClick={() => handleSetTheme("light")}
                    >
                      <div className="dropdown flex items-center gap-2">
                        <FontAwesomeIcon icon={faSun} className="dropdown" />
                        <span className="dropdown text-sm">Light</span>
                      </div>
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="sm"
                        style={{ display: currentTheme !== "light" && "none" }}
                        className="dropdown text-primary"
                      />
                    </li>
                    <li
                      className="dropdown flex items-center justify-between hover:bg-light hover:dark:bg-dark cursor-pointer transition-all px-4 py-3"
                      onClick={() => handleSetTheme("dark")}
                    >
                      <div className="dropdown flex items-center gap-2">
                        <FontAwesomeIcon icon={faMoon} className="dropdown" />
                        <span className="text-sm dropdown">Dark</span>
                      </div>
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="sm"
                        style={{ display: currentTheme !== "dark" && "none" }}
                        className="dropdown text-primary"
                      />
                    </li>
                  </ul>
                </div>
              </motion.div>
              <motion.div
                style={{ display: languageSettingsPageDisplay }}
                className="dropdown min-w-full"
                animate={{
                  translateX: `-${settingsDropdownCurrentPage * 100}%`,
                }}
              >
                <div className="dropdown dropdown-header p-4">
                  <div
                    className="dropdown flex items-center text-sm gap-1 hover:text-primary cursor-pointer transition-all"
                    onClick={function () {
                      setSettingsDropdownCurrentPage(0);

                      setThemeSettingsPageDisplay("none");
                      setLanguageSettingsPageDisplay("none");
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <span className="dropdown font-semibold">Back</span>
                  </div>
                </div>
                <hr
                  style={{ height: 0.5 }}
                  className="border-none bg-border dark:bg-border-dark"
                />
                <div className="dropdown dropdown-body">
                  <ul>
                    <li
                      className="dropdown flex items-center justify-between hover:bg-light hover:dark:bg-dark cursor-pointer transition-all px-4 py-3"
                      // onClick={() => handleSetTheme("light")}
                    >
                      <span className="dropdown text-sm">English</span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="sm"
                        style={{ display: currentTheme !== "light" && "none" }}
                        className="dropdown text-primary"
                      />
                    </li>
                    <li
                      className="dropdown flex items-center justify-between hover:bg-light hover:dark:bg-dark cursor-pointer transition-all px-4 py-3"
                      // onClick={() => handleSetTheme("dark")}
                    >
                      <span className="text-sm dropdown">Turkish</span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="sm"
                        style={{ display: currentTheme !== "dark" && "none" }}
                        className="dropdown text-primary"
                      />
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
