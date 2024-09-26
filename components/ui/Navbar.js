import { faEarth, faGear, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const themeState = useSelector((state) => state.theme);

  const [currentTheme, setCurrentTheme] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [dropdownDisplay, setDropdownDisplay] = useState("none");

  const { theme } = themeState;

  const handleDropdown = () => setDropdown(!dropdown);

  console.log("dropdown: ", dropdown);

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        if (!dropdown) setDropdownDisplay("none");
      }, 100);

      if (dropdown) setDropdownDisplay("block");

      return () => clearTimeout(identifier);
    },
    [dropdown]
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
            onClick={handleDropdown}
          />
          <div
            style={{
              display: dropdownDisplay,
              width: "240px",
            }}
            className="dropdown absolute rounded border top-full right-full p-6 select-none transition-all"
          >
            <div className="dropdown-header">
              <h6 className="text-sm flex items-center gap-2">
                <FontAwesomeIcon icon={faGear} />
                <span>Settings</span>
              </h6>
            </div>
            <hr className="my-4" />
            <div className="dropdown-body">
              <ul className="space-y-3">
                <li className="flex items-center hover:bg-light cursor-pointer transition-all gap-2">
                  <FontAwesomeIcon icon={faMoon} />
                  <span className="text-sm">Theme</span>
                </li>
                <li className="flex items-center hover:bg-light cursor-pointer transition-all gap-2">
                  <FontAwesomeIcon icon={faEarth} />
                  <span className="text-sm">Language</span>
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
