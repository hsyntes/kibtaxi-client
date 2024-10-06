import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardTaxi from "./Cards/CardTaxi";

const Aside = ({ popular_taxis }) => {
  console.log("Popular Taxis: ", popular_taxis);

  return (
    <aside id="app-aside" className="border-r dark:border-r-dark p-4">
      <section className="mb-4">
        <h6 className="flex items-center gap-2 font-semibold">
          <FontAwesomeIcon icon={faRocket} className="text-primary" />
          <span>Most popular, Famagusta</span>
        </h6>
      </section>
      <section>
        <ul className="space-y-6">
          {popular_taxis.map((popular_taxi) => (
            <li key={popular_taxi._id}>
              <CardTaxi taxi={popular_taxi} />
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Aside;
