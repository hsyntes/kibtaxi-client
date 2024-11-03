import { themeSliceActions } from "@/store/theme/theme.slice";
import { faCheck, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
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
    <>
      <Head>
        <meta
          name="description"
          content="Kibtaxi KKTC ve Kuzey Kıbrıs'ın Taksi Uygulaması | Kıbrıs Taxi | Kıbrıs taksi"
        />
        <meta
          name="keywords"
          content="kibtaxi, kktc taksi, kıbrıs taksi, kktc taxi, trnc taxi, trnc taksi, north cyprus taxi, north cyprus taksi, mağusa taksi, famagusta taxi, magosa taksi, girne taksi, kyrenia taksi, kyrenia taxi, nicosia taksi, nicosia taxi, ercan taksi, lefkoşa taksi"
        />
        <title>
          Theme Settings | Kibtaxi | Kıbrıs Taksi | KKTC Taksi | Kıbrıs'ın ve
          Kuzey Kıbrıs'ın KKTC Taksi Uygulaması
        </title>
      </Head>
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
    </>
  );
};

export default ThemeSettingsPage;
