import Avatar from "@/components/ui/Avatar";
import HttpRequest from "@/utils/HttpRequest";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { v4 } from "uuid";

const TaxiProfilPage = ({ taxi }) => {
  console.log("Taxi: ", taxi);

  let taxi_stars = [];

  if (taxi?.taxi_popularity)
    for (let i = 0; i < Math.round(Number(taxi?.taxi_popularity?.rating)); i++)
      taxi_stars.push(
        <FontAwesomeIcon
          icon={faStar}
          className="text-primary"
          size="xs"
          key={v4()}
        />
      );

  return (
    <section className="flex items-start gap-6 p-4">
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 360,
          overflow: "hidden",
        }}
      >
        {taxi?.taxi_profile ? (
          <Image
            src={taxi?.taxi_profile}
            className="w-full h-full object-fit object-cover object-center"
            width={96}
            height={96}
            alt="Taxi Profile Image"
          />
        ) : (
          <Avatar />
        )}
      </div>
      <section className="w-full">
        <section className="mb-2">
          <h1 className="font-bold text-xl">{taxi.taxi_name}</h1>
          <p className="flex items-center gap-1 text-muted dark:text-muted-dark w-1/3">
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="line-clamp-1">{taxi?.taxi_address}</span>
          </p>
        </section>
        {taxi?.taxi_popularity ? (
          <div className="flex items-center gap-1 mb-6">
            <span className="text-primary">
              {taxi?.taxi_popularity?.rating}
            </span>
            <span className="flex items-center gap-1">
              {taxi_stars.length >= 0 &&
                taxi_stars.map((taxi_star) => taxi_star)}
            </span>
            <span className="text-muted dark:text-muted-dark">
              ({taxi?.taxi_popularity?.voted})
            </span>
          </div>
        ) : (
          <span className="text-muted dark:text-muted-dark">
            Not yet rated.
          </span>
        )}
        {taxi?.taxi_phone && (
          <section className="flex items-center gap-4">
            <a
              href={`tel:${taxi?.taxi_phone}`}
              className="inline-block bg-blue-600 text-white hover:bg-blue-700 rounded-full py-2 px-4 transition-all"
            >
              <section className="flex items-center gap-1">
                <FontAwesomeIcon icon={faPhone} />
                <span className="font-semibold text-sm">Phone</span>
              </section>
            </a>
            <a
              href={`https://wa.me/${taxi?.taxi_phone?.replace(/\s+/g, "")}`}
              target="_blank"
              className="inline-block bg-green-600 text-white hover:bg-green-700 rounded-full py-2 px-4 transition-all"
            >
              <section className="flex items-center gap-1">
                <FontAwesomeIcon icon={faWhatsapp} />
                <span className="font-semibold text-sm">WhatsApp</span>
              </section>
            </a>
          </section>
        )}
      </section>
    </section>
  );
};

export async function getServerSideProps({ query }) {
  const { taxiId } = query;
  console.log("Taxi Id: ", taxiId);

  const response = await HttpRequest.get(
    `taxis/${taxiId}?API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const { taxi } = response.data;

  return {
    props: {
      taxi,
    },
  };
}

export default TaxiProfilPage;
