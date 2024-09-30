import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardTaxi from "./Cards/CardTaxi";

const Aside = ({ popular_taxis }) => {
  console.log("Popular Taxis: ", popular_taxis);

  return (
    <aside id="app-aside" className="border-r dark:border-r-dark p-4">
      <h6 className="flex items-center gap-2 font-semibold mb-4">
        <FontAwesomeIcon icon={faLocation} className="text-primary" />
        <span>Most popular, Famagusta</span>
      </h6>
      <ul className="space-y-6">
        {popular_taxis.map((popular_taxi) => (
          <CardTaxi taxi={popular_taxi} key={popular_taxi.taxi_placeId} />
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
