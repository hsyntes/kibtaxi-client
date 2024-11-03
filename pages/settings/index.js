import {
  faAngleRight,
  faEarth,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";

const SettingsPage = () => {
  const router = useRouter();
  const { pathname } = router;

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
          Settings | Kibtaxi | Kıbrıs Taksi | KKTC Taksi | Kıbrıs'ın ve Kuzey
          Kıbrıs'ın KKTC Taksi Uygulaması
        </title>
      </Head>
      <section className="p-4">
        <ul className="space-y-6">
          <li
            className="flex items-center justify-between"
            onClick={() => router.push(`${pathname}/theme`)}
          >
            <section className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMoon} />
              <span className="text-lg">Theme</span>
            </section>
            <FontAwesomeIcon icon={faAngleRight} />
          </li>
          <li
            className="dropdown flex items-center justify-between"
            onClick={function () {
              setSettingsDropdownCurrentPage(1);

              setThemeSettingsPageDisplay("none");
              setLanguageSettingsPageDisplay("block");
            }}
          >
            <section className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEarth} />
              <span className="text-lg">Language</span>
            </section>
            <FontAwesomeIcon icon={faAngleRight} />
          </li>
        </ul>
      </section>
    </>
  );
};

export default SettingsPage;
