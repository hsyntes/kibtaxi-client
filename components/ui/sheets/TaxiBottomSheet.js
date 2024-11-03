import Image from "next/image";
import BottomSheet from "./BottomSheet";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faLocationDot,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Button from "../Button";
import { v4 } from "uuid";

const TaxiBottomSheet = ({ show, handleCloseBottomSheet, taxi }) => {
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
    <BottomSheet show={show} handleCloseBottomSheet={handleCloseBottomSheet}>
      <section className="grid grid-cols-12">
        <section className="col-span-3">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 360,
              overflow: "hidden",
            }}
          >
            {taxi?.taxi_profile ? (
              <Image
                src={taxi?.taxi_profile}
                className="w-full h-full object-fit object-cover object-center"
                width={64}
                height={64}
                alt={`${taxi.taxi_name} Profil Image`}
              />
            ) : (
              <Avatar />
            )}
          </div>
        </section>
        <section className="col-span-8">
          <section className="mb-1">
            <h1 className="font-semibold text-xl line-clamp-1">
              {taxi?.taxi_name}
            </h1>
            <p className="flex items-center gap-1 text-sm text-muted dark:text-muted-dark">
              <FontAwesomeIcon icon={faLocationDot} />
              <span className="line-clamp-1">{taxi?.taxi_address}</span>
            </p>
          </section>
          {taxi?.taxi_popularity ? (
            <div className="flex items-center text-sm gap-1 mb-6">
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
            <p className="text-muted dark:text-muted-dark">Not yet rated.</p>
          )}
          {taxi?.taxi_phone && (
            <section className="flex items-center gap-3">
              <a
                href={`tel:${taxi?.taxi_phone}`}
                className="inline-block bg-blue-600 text-white hover:bg-blue-700 rounded-full py-2 px-4 transition-all"
              >
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faPhone} />
                  <span className="font-semibold text-sm">Phone</span>
                </div>
              </a>
              <a
                href={`https://wa.me/${taxi?.taxi_phone?.replace(/\s+/g, "")}`}
                target="_blank"
                className="inline-block bg-green-600 text-white hover:bg-green-700 rounded-full py-2 px-4 transition-all"
              >
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faWhatsapp} />
                  <span className="font-semibold text-sm">WhatsApp</span>
                </div>
              </a>
            </section>
          )}
        </section>
        <div className="col-span-1">
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-muted dark:text-muted-dark cursor-pointer hover:text-dark hover:dark:text-white transition-all"
            size="lg"
          />
        </div>
      </section>
      <hr className="border-none bg-border dark:bg-border-dark h-[1px] my-6" />
      <section
        id="review-taxibottomsheet"
        className="max-h-[300px] overflow-y-scroll"
      >
        <section className="flex gap-3 overflow-x-scroll snap-mandatory snap-x mb-6">
          {taxi?.taxi_photos &&
            taxi?.taxi_photos.slice(0, 4).map((taxi_photo) => (
              <div
                className="min-w-48 max-h-[124px] snap-start snap-always"
                key={v4()}
              >
                <Image
                  src={taxi_photo}
                  width={192}
                  height={192}
                  className="w-full h-full object-fit object-cover object-center rounded"
                  alt={`${taxi?.taxi_name}'s Photos`}
                />
              </div>
            ))}
        </section>
        <section>
          <ul className="space-y-6">
            {taxi?.taxi_reviews?.map((taxi_review) => (
              <li className="flex items-start gap-3" key={v4()}>
                <section>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 360,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={taxi_review.reviewer_photo}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover object-center"
                      alt={`${taxi?.taxi_name}'s reviewer photo`}
                    />
                  </div>
                </section>
                <section>
                  <h6 className="font-semibold">{taxi_review.reviewer_name}</h6>
                  <p className="text-sm text-muted dark:text-muted-dark">
                    {taxi_review.reviewer_review?.text}
                  </p>
                </section>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <section className="grid grid-cols-12 items-center mt-auto py-6">
        <section className="col-span-11">
          <Button type={"button"} variant={"blue"} className={"w-full !py-3"}>
            View Full Profile
          </Button>
        </section>
        <section className="col-span-1 flex justify-end">
          <a href={taxi?.taxi_googleMaps} target="_blank">
            <Image
              src={"/icons/google_maps.png"}
              width={46}
              height={46}
              alt={`${taxi?.taxi_name} Google Maps`}
            />
          </a>
        </section>
      </section>
    </BottomSheet>
  );
};

export default TaxiBottomSheet;
