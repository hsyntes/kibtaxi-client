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
import Avatar from "../Avatar";
import { v4 } from "uuid";

const CardTaxi = ({ taxi, handleSelectTaxi }) => {
  let taxi_stars = [];

  if (taxi.taxi_popularity)
    for (let i = 0; i < Math.round(Number(taxi.taxi_popularity?.rating)); i++)
      taxi_stars.push(
        <FontAwesomeIcon
          icon={faStar}
          className="text-primary"
          size="xs"
          key={v4()}
        />
      );

  return (
    <Card
      className={"grid grid-cols-12 items-start justify-between cursor-pointer"}
      onClick={() => handleSelectTaxi(taxi)}
    >
      <section className="col-span-3 lg:col-span-2">
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 360,
            overflow: "hidden",
          }}
        >
          {taxi.taxi_profile ? (
            <Image
              src={taxi.taxi_profile}
              className="w-full h-full object-fit object-cover object-center"
              width={48}
              height={48}
              alt="Taxi Profile Image"
            />
          ) : (
            <Avatar />
          )}
        </div>
      </section>
      <section className="col-span-8 lg:col-span-9">
        <section className="mb-3">
          <h1 className="font-semibold text-sm line-clamp-1">
            {taxi.taxi_name}
          </h1>
          <p className="flex items-center gap-1 text-xs text-muted dark:text-muted-dark">
            <FontAwesomeIcon icon={faLocationDot} size="sm" />
            <span className="line-clamp-1">{taxi.taxi_address}</span>
          </p>
        </section>
        {taxi.taxi_popularity ? (
          <div className="flex items-center gap-1 mb-6">
            <span className="text-sm text-primary">
              {taxi.taxi_popularity?.rating}
            </span>
            <span className="flex items-center gap-1">
              {taxi_stars.length >= 0 &&
                taxi_stars.map((taxi_star) => taxi_star)}
            </span>
            <span className="text-muted dark:text-muted-dark text-sm">
              ({taxi.taxi_popularity?.voted})
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted dark:text-muted-dark">
            Not yet rated.
          </span>
        )}
        {taxi.taxi_phone && (
          <section className="flex items-center gap-3">
            <a
              href={`tel:${taxi.taxi_phone}`}
              className="inline-block bg-blue-600 text-white hover:bg-blue-700 rounded-full py-2 px-4 transition-all"
            >
              <section className="flex items-center gap-1">
                <FontAwesomeIcon icon={faPhone} size="sm" />
                <span className="font-semibold text-xs">Phone</span>
              </section>
            </a>
            <a
              href={`https://wa.me/${taxi.taxi_phone?.replace(/\s+/g, "")}`}
              target="_blank"
              className="inline-block bg-green-600 text-white hover:bg-green-700 rounded-full py-2 px-4 transition-all"
            >
              <section className="flex items-center gap-1">
                <FontAwesomeIcon icon={faWhatsapp} size="sm" />
                <span className="font-semibold text-xs">WhatsApp</span>
              </section>
            </a>
          </section>
        )}
      </section>
      <section className="col-span-1 text-center">
        <FontAwesomeIcon
          icon={faBookmark}
          className="text-muted dark:text-muted-dark cursor-pointer hover:text-dark hover:dark:text-white transition-all"
        />
      </section>
    </Card>
  );
};

export default CardTaxi;
