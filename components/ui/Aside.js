import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Aside = ({ popular_taxis }) => {
  console.log("Popular Taxis: ", popular_taxis);

  return (
    <aside id="app-aside" className="border border-r dark:border-r-dark p-4">
      <h6 className="flex items-center gap-2 font-semibold">
        <FontAwesomeIcon icon={faLocation} className="text-primary" />
        <span>Most popular, Famagusta</span>
      </h6>
    </aside>
  );
};

export default Aside;
