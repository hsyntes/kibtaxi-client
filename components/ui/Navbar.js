import {
  faAngleRight,
  faEarth,
  faGear,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const themeState = useSelector((state) => state.theme);

  const [currentTheme, setCurrentTheme] = useState("");
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [settingsDropdownDisplay, setSettingsDropdownDisplay] =
    useState("none");

  const settingsDropdownRef = useRef();

  const { theme } = themeState;

  const handleSettingsDropdown = () => setSettingsDropdown(!settingsDropdown);

  console.log("Settings Dropdown: ", settingsDropdown);

  useEffect(function () {
    function handleClickOutSide(e) {
      if (
        settingsDropdownRef.current &&
        !settingsDropdownRef.current.contains(e.target) &&
        !e.target.classList.contains("dropdown")
      ) {
        setSettingsDropdown(false);
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
    <nav className="flex items-center justify-between">
      <Link href={"/"}>
        <Image
          src={currentTheme === "dark" ? "/brand.light.png" : "/brand.dark.png"}
          width={272}
          height={71}
          className="w-36"
          alt="Logo"
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
              width: "240px",
            }}
            className="dropdown absolute rounded border top-full right-full select-none transition-all"
          >
            <div className="dropdown-header p-4">
              <h6 className="flex items-center text-sm gap-2">
                <FontAwesomeIcon icon={faGear} />
                <span>Settings</span>
              </h6>
            </div>
            <hr className="my-1" />
            <div className="dropdown-body">
              <ul>
                <li className="flex items-center justify-between hover:bg-light cursor-pointer transition-all px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMoon} />
                    <span className="text-sm">Theme</span>
                  </div>
                  <FontAwesomeIcon icon={faAngleRight} size="sm" />
                </li>
                <li className="flex items-center justify-between hover:bg-light cursor-pointer transition-all px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEarth} />
                    <span className="text-sm">Language</span>
                  </div>
                  <FontAwesomeIcon icon={faAngleRight} size="sm" />
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
