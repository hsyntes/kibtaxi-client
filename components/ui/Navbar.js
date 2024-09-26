import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const themeState = useSelector((state) => state.theme);

  const [currentTheme, setCurrentTheme] = useState("");

  const { theme } = themeState;

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
        <li>
          <FontAwesomeIcon icon={faGear} size="lg" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
