import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardTaxi from "./Cards/CardTaxi";
import { v4 } from "uuid";

const Aside = ({ popular_taxis, handleSelectTaxi }) => (
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
          <li key={v4()}>
            <CardTaxi taxi={popular_taxi} handleSelectTaxi={handleSelectTaxi} />
          </li>
        ))}
      </ul>
    </section>
  </aside>
);

export default Aside;
