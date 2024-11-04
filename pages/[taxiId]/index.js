import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import HttpRequest from "@/utils/HttpRequest";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faComment,
  faImage,
  faLocationDot,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { v4 } from "uuid";
import { motion } from "framer-motion";
import Head from "next/head";

const TaxiProfilPage = ({ taxi }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => setCurrentSlide(1);
  const handlePrevSlide = () => setCurrentSlide(0);

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
    <>
      <Head>
        <meta
          name="description"
          content="Kibtaxi KKTC ve Kuzey Kıbrıs'ın Taksi Uygulaması | Kıbrıs Taxi | Kıbrıs taksi"
        />
        <meta
          name="keywords"
          content={`${taxi.taxi_name}, kibtaxi, kktc taksi, kıbrıs taksi, kktc taxi, trnc taxi, trnc taksi, north cyprus taxi, north cyprus taksi, mağusa taksi, famagusta taxi, magosa taksi, girne taksi, kyrenia taksi, kyrenia taxi, nicosia taksi, nicosia taxi, ercan taksi, lefkoşa taksi`}
        />
        <title>
          {taxi.taxi_name} | Kibtaxi | Kıbrıs Taksi | KKTC Taksi | Kıbrıs'ın ve
          Kuzey Kıbrıs'ın KKTC Taksi Uygulaması
        </title>
      </Head>
      <section className="flex gap-6 h-[92svh] overflow-y-auto p-4">
        <section className="lg:w-3/4">
          <section className="flex items-start gap-6">
            <section>
              <div
                style={{
                  borderRadius: 360,
                  overflow: "hidden",
                }}
                className="w-[64px] h-[64px] lg:w-[96px] lg:h-[96px]"
              >
                {taxi?.taxi_profile ? (
                  <Image
                    src={taxi?.taxi_profile}
                    className="w-full h-full object-fit object-cover object-center"
                    width={256}
                    height={256}
                    alt="Taxi Profile Image"
                  />
                ) : (
                  <Avatar />
                )}
              </div>
            </section>
            <section>
              <section className="mb-1">
                <h1 className="font-bold text-xl">{taxi.taxi_name}</h1>
                <p className="flex items-center gap-1 text-muted dark:text-muted-dark lg:max-w-[320px]">
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
                    href={`https://wa.me/${taxi?.taxi_phone?.replace(
                      /\s+/g,
                      ""
                    )}`}
                    target="_blank"
                    className="inline-block bg-green-600 text-white hover:bg-green-700 rounded-full py-2 px-4 transition-all"
                  >
                    <section className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faWhatsapp} />
                      <span className="font-semibold text-sm">WhatsApp</span>
                    </section>
                  </a>
                  <a href={taxi?.taxi_googleMaps} target="_blank">
                    <Image
                      src={"/icons/google_maps.png"}
                      width={32}
                      height={32}
                      alt={`${taxi?.taxi_name} Google Maps`}
                    />
                  </a>
                </section>
              )}
            </section>
          </section>
          <section className="flex items-center justify-between lg:hidden mt-6">
            <Button
              type={"button"}
              className={`flex flex-[0.5] items-center justify-center gap-2 !shadow-none !rounded-none !text-md ${
                currentSlide === 0 && "text-primary border-b border-b-primary"
              }`}
              onClick={handlePrevSlide}
            >
              <FontAwesomeIcon icon={faImage} />
              <span>Photos</span>
            </Button>
            <Button
              type={"button"}
              className={`flex flex-[0.5] items-center justify-center gap-2 !shadow-none !rounded-none !text-md ${
                currentSlide === 1 && "text-primary border-b border-b-primary"
              }`}
              onClick={handleNextSlide}
            >
              <FontAwesomeIcon icon={faComment} />
              <span>Comments</span>
            </Button>
          </section>
          <section className="flex overflow-hidden mt-6">
            <motion.section
              animate={{ translateX: `-${currentSlide * 100}%` }}
              className="min-w-full"
            >
              <ul className={`flex flex-wrap items-center lg:gap-3`}>
                {taxi?.taxi_photos?.map((taxi_photo) => (
                  <li
                    key={v4()}
                    className="w-1/2 h-[160px] lg:w-[250px] lg:h-[250px] overflow-hidden rounded p-1 lg:p-0"
                  >
                    <Image
                      src={taxi_photo}
                      width={328}
                      height={328}
                      className="w-full h-full object-fit object-cover object-center"
                      alt={`${taxi?.taxi_name}'s Photos`}
                    />
                  </li>
                ))}
              </ul>
            </motion.section>
            <motion.section
              id="review-taxiprofile"
              animate={{ translateX: `-${currentSlide * 100}%` }}
              className="min-w-full overflow-y-scroll lg:hidden"
            >
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
                      <h6 className="font-semibold">
                        {taxi_review.reviewer_name}
                      </h6>
                      <p className="text-sm text-muted dark:text-muted-dark">
                        {taxi_review.reviewer_review?.text}
                      </p>
                    </section>
                  </li>
                ))}
              </ul>
            </motion.section>
          </section>
        </section>
        <section
          id="review-taxiprofile"
          className="w-1/4 overflow-y-scroll hidden lg:block"
        >
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
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { taxiId } = query;

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
