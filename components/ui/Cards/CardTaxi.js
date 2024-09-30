import Image from "next/image";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faLocationDot,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const CardTaxi = ({ taxi }) => {
  console.log("Taxi: ", taxi);

  let taxi_stars = [];

  for (let i = 0; i < Math.round(Number(taxi.taxi_popularity.rating)); i++)
    taxi_stars.push(
      <FontAwesomeIcon icon={faStar} className="text-primary" size="xs" />
    );

  console.log("taxi phone: ", taxi.taxi_phone);

  return (
    <Card className={"grid grid-cols-12 gap-3 items-start justify-between"}>
      <div className="col-span-2">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 360,
            overflow: "hidden",
          }}
        >
          <Image
            src={taxi.taxi_profile}
            className="w-full h-full object-fit object-cover object-center"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="col-span-9">
        <section className="mb-3">
          <h1 className="font-semibold text-sm line-clamp-1 mb-1">
            {taxi.taxi_name}
          </h1>
          <p className="flex items-start gap-1 line-clamp-1 text-xs text-muted dark:text-muted-dark">
            <FontAwesomeIcon icon={faLocationDot} size="sm" />
            <span>{taxi.taxi_address}</span>
          </p>
        </section>
        <section className="flex items-center gap-1 mb-6">
          <span className="text-sm text-primary">
            {taxi.taxi_popularity.rating}
          </span>
          <span className="flex items-center gap-1">
            {taxi_stars.map((taxi_star) => taxi_star)}
          </span>
          <span className="text-muted dark:text-muted-dark text-sm">
            ({taxi.taxi_popularity.voted})
          </span>
        </section>
        <section className="flex items-center gap-3">
          <a
            href={`tel:${taxi.taxi_phone}`}
            className="inline-block bg-blue-500 text-white hover:bg-blue-600 rounded-full py-2 px-4 transition-all"
          >
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faPhone} size="sm" />
              <span className="font-semibold text-xs">Phone</span>
            </div>
          </a>
          <a
            href={`https://wa.me/${taxi.taxi_phone.replace(/\s+/g, "")}`}
            target="_blank"
            className="inline-block bg-green-500 text-white hover:bg-green-600 rounded-full py-2 px-4 transition-all"
          >
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faWhatsapp} size="sm" />
              <span className="font-semibold text-xs">WhatsApp</span>
            </div>
          </a>
        </section>
      </div>
      <div className="col-span-1 text-center">
        <FontAwesomeIcon
          icon={faBookmark}
          className="text-muted dark:text-muted-dark cursor-pointer hover:text-dark hover:dark:text-white transition-all"
        />
      </div>
      {/* <section className="flex items-start gap-3">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 360,
            overflow: "hidden",
          }}
        >
          <Image
            src={taxi.taxi_profile}
            className="w-full h-full object-fit object-cover object-center"
            width={100}
            height={100}
          />
        </div>
        <section>
          <section className="mb-3">
            <h1 className="font-semibold text-sm line-clamp-1 mb-1">
              {taxi.taxi_name}
            </h1>
            <p className="flex items-start gap-1 line-clamp-1 text-xs text-muted dark:text-muted-dark">
              <FontAwesomeIcon icon={faLocationDot} size="sm" />
              <span>{taxi.taxi_address}</span>
            </p>
          </section>
          <section className="flex items-center gap-1 mb-6">
            <span className="text-sm text-primary">
              {taxi.taxi_popularity.rating}
            </span>
            <span className="flex items-center gap-1">
              {taxi_stars.map((taxi_star) => taxi_star)}
            </span>
            <span className="text-muted dark:text-muted-dark text-sm">
              ({taxi.taxi_popularity.voted})
            </span>
          </section>
          <section className="flex items-center justify-between">
            <a
              href={`tel:${taxi.taxi_phone}`}
              className="inline-block bg-blue-500 text-white hover:bg-blue-600 rounded-full py-2 px-4 transition-all"
            >
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faPhone} size="sm" />
                <span className="font-semibold text-xs">Phone</span>
              </div>
            </a>
            <a
              href={`tel:${taxi.taxi_phone}`}
              className="inline-block bg-green-500 text-white hover:bg-green-600 rounded-full py-2 px-4 transition-all"
            >
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faWhatsapp} size="sm" />
                <span className="font-semibold text-xs">WhatsApp</span>
              </div>
            </a>
          </section>
        </section>
      </section>
      <section>
        <FontAwesomeIcon
          icon={faBookmark}
          className="text-muted dark:text-muted-dark cursor-pointer hover:text-dark hover:dark:text-white transition-all"
        />
      </section> */}
    </Card>
  );
};

export default CardTaxi;
