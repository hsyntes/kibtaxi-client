import {
  faAngleRight,
  faEarth,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const SettingsPage = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
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
  );
};

export default SettingsPage;
