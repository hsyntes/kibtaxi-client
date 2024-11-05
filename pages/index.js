import Aside from "@/components/ui/Aside";
import Button from "@/components/ui/Button";
import CardTaxi from "@/components/ui/Cards/CardTaxi";
import ModalTaxi from "@/components/ui/modals/ModalTaxi";
import TaxiBottomSheet from "@/components/ui/sheets/TaxiBottomSheet";
import HttpRequest from "@/utils/HttpRequest";
import {
  faAngleDown,
  faLocation,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import { v4 } from "uuid";

const getCurrentPosition = () =>
  new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));

export default function Home({}) {
  const [isLocationAllowed, setIsLocationAllowed] = useState(null);
  const [popular_taxis, setPopular_taxis] = useState(null);
  const [taxis, setTaxis] = useState(null);
  const [city, setCity] = useState(null);
  const [selectedTaxi, setSelectedTaxi] = useState(null);
  const [modal, setModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState(false);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleOpenBottomSheet = () => setBottomSheet(true);
  const handleCloseBottomSheet = () => setBottomSheet(false);

  const { isLoading: isTaxisLoading } = useQuery({
    queryKey: "getTaxis",
    queryFn: async function () {
      let coords;

      try {
        const position = await getCurrentPosition();
        coords = position.coords;
      } catch (e) {
        console.error("Error getting position: ", e);
      }

      const lat = coords?.latitude || process.env.NEXT_PUBLIC_DEFAULT_LAT;
      const long = coords?.longitude || process.env.NEXT_PUBLIC_DEFAULT_LONG;

      console.log("Lat: ", lat);
      console.log("Long: ", long);

      const responseCity = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_TOKEN}&lat=${lat}&lon=${long}&format=json&`
      );

      const dataTaxis = await HttpRequest.get(
        `taxis?lat=${lat}&long=${long}&pt=5&API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const dataCity = await responseCity.json();

      const { popular_taxis, taxis } = dataTaxis.data;
      const { address } = dataCity;

      return {
        popular_taxis,
        taxis,
        city: address.city || address.state_district,
      };
    },
    onSuccess: function (data) {
      if (data) {
        const { popular_taxis, taxis, city } = data;

        setPopular_taxis(popular_taxis);
        setTaxis(taxis);
        setCity(city);
        setIsLocationAllowed(true);
      }
    },
  });

  function handleSelectTaxi(taxi) {
    setSelectedTaxi(taxi);

    if (typeof window !== "undefined" && window.innerWidth >= 992)
      handleOpenModal();
    else if (typeof window !== "undefined" && window.innerWidth < 992)
      handleOpenBottomSheet();
  }

  function handleUnselectTaxi() {
    const identifier = setTimeout(function () {
      setSelectedTaxi(null);
    }, 200);

    handleCloseModal();
    handleCloseBottomSheet();

    return () => clearTimeout(identifier);
  }

  if (isTaxisLoading)
    return (
      <center>
        <p>Loading...</p>
      </center>
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
          content="kibtaxi, kktc taksi, kıbrıs taksi, kktc taxi, trnc taxi, trnc taksi, north cyprus taxi, north cyprus taksi, mağusa taksi, famagusta taxi, magosa taksi, girne taksi, kyrenia taksi, kyrenia taxi, nicosia taksi, nicosia taxi, ercan taksi, lefkoşa taksi"
        />
        <title>
          Kibtaxi | Kıbrıs Taksi | KKTC Taksi | Kıbrıs'ın ve Kuzey Kıbrıs'ın
          KKTC Taksi Uygulaması
        </title>
      </Head>
      <section id="app" className="flex items-start">
        <Aside
          popular_taxis={popular_taxis}
          city={city}
          handleSelectTaxi={handleSelectTaxi}
        />
        <section id="app-main" className="p-4">
          <section className="lg:hidden lg:mb-0 mb-4">
            <section className="flex items-center justify-between mb-3">
              <h6 className="flex items-center gap-2 font-semibold line-clamp-1">
                <FontAwesomeIcon icon={faRocket} className="text-primary" />
                <span className="line-clamp-1">Most popular, {city}</span>
              </h6>
              <Button
                type={"button"}
                className={
                  "flex items-center gap-2 text-primary !rounded-none !shadow-none !px-0"
                }
              >
                <span className="line-clamp-1">{city?.slice(0, 10)}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </section>
            <section>
              <ul
                id="popular-taxis"
                className="flex items-center gap-6 overflow-x-scroll snap-mandatory snap-x"
              >
                {popular_taxis?.map((popular_taxi) => (
                  <li className="min-w-[90%] snap-start snap-always" key={v4()}>
                    <CardTaxi
                      taxi={popular_taxi}
                      handleSelectTaxi={handleSelectTaxi}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </section>
          <br className="lg:hidden" />
          <section>
            <section className="flex items-center lg:items-start justify-between mb-3 lg:mb-1">
              <h6 className="flex items-center gap-2 font-semibold">
                <FontAwesomeIcon icon={faLocation} className="text-primary" />
                <span>Other taxis around you</span>
              </h6>
              <Button
                type={"button"}
                className={
                  "hidden lg:flex items-center gap-2 text-primary !rounded-none !shadow-none !px-0"
                }
              >
                <span className="line-clamp-1">{city?.slice(0, 10)}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </section>
            <section>
              <ul className="grid grid-cols-12 gap-6 items-center">
                {taxis?.map((taxi) => (
                  <li className="col-span-12 lg:col-span-6" key={taxi._id}>
                    <CardTaxi taxi={taxi} handleSelectTaxi={handleSelectTaxi} />
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </section>
      </section>
      <ModalTaxi
        show={modal}
        handleCloseModal={handleUnselectTaxi}
        taxi={selectedTaxi}
      />
      <TaxiBottomSheet
        show={bottomSheet}
        handleCloseBottomSheet={handleUnselectTaxi}
        taxi={selectedTaxi}
      />
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(process.env.NEXT_PUBLIC_API);
  const data = await response.json();

  console.group();
  console.log("Server status: ", data.status);
  console.log("Server message: ", data.message);
  console.groupEnd();

  return {
    props: {},
  };
}
