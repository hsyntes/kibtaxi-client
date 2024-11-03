import { themeSliceActions } from "@/store/theme/theme.slice";
import { faCheck, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeSettingsPage = () => {
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [currentTheme, setCurrentTheme] = useState();

  const handleSetTheme = (value) => dispatch(themeSliceActions.setTheme(value));

  const { theme } = themeState;

  useEffect(
    function () {
      setCurrentTheme(theme);
    },
    [theme]
  );

  return (
    <section className="p-4">
      <ul className="space-y-6">
        <li
          className="dropdown flex items-center justify-between transition-all"
          onClick={() => handleSetTheme("light")}
        >
          <section className="dropdown flex items-center gap-2">
            <FontAwesomeIcon icon={faSun} className="dropdown" />
            <span className="text-lg">Light</span>
          </section>
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              display: currentTheme !== "light" && "none",
            }}
            className="dropdown text-primary"
          />
        </li>
        <li
          className="dropdown flex items-center justify-between transition-all"
          onClick={() => handleSetTheme("dark")}
        >
          <section className="dropdown flex items-center gap-2">
            <FontAwesomeIcon icon={faMoon} className="dropdown" />
            <span className="text-lg">Dark</span>
          </section>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ display: currentTheme !== "dark" && "none" }}
            className="dropdown text-primary"
          />
        </li>
      </ul>
    </section>
  );
};

export default ThemeSettingsPage;
