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
import { v4 } from "uuid";

export default function Home({ popular_taxis, taxis, city }) {
  const [selectedTaxi, setSelectedTaxi] = useState(null);
  const [modal, setModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState(false);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleOpenBottomSheet = () => setBottomSheet(true);
  const handleCloseBottomSheet = () => setBottomSheet(false);

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
          handleSelectTaxi={handleSelectTaxi}
        />
        <section id="app-main" className="p-4">
          <section className="lg:hidden mb-4">
            <section className="flex items-center justify-between mb-1">
              <h6 className="flex items-center gap-2 font-semibold">
                <FontAwesomeIcon icon={faRocket} className="text-primary" />
                <span>Most popular, Famagusta</span>
              </h6>
              <Button
                type={"button"}
                className={"flex items-center gap-2 text-primary !rounded"}
              >
                <span>{city?.slice(0, 10)}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </section>
            <section>
              <ul
                id="popular-taxis"
                className="flex items-center gap-6 overflow-x-scroll snap-mandatory snap-x"
              >
                {popular_taxis.map((popular_taxi) => (
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
          <section>
            <section className="flex items-center justify-between mb-1">
              <h6 className="flex items-center gap-2 font-semibold">
                <FontAwesomeIcon icon={faLocation} className="text-primary" />
                <span>Other taxis around you</span>
              </h6>
              <Button
                type={"button"}
                className={
                  "hidden lg:flex items-center gap-2 text-primary !rounded"
                }
              >
                <span>{city?.slice(0, 10)}</span>
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </section>
            <section>
              <ul className="grid grid-cols-12 gap-6 items-center">
                {taxis.map((taxi) => (
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
  const responseIP = await fetch(
    `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_IO_TOKEN}`
  );

  const responseCity = await fetch(
    `https://us1.locationiq.com/v1/reverse?key=${
      process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_TOKEN
    }&lat=${35.1922456}&lon=${33.3562027}&format=json&`
  );

  const dataIP = await responseIP.json();
  const [lat, long] = dataIP.loc.split(",");

  // const dataTaxis = await HttpRequest.get(
  //   `taxis?lat=${lat}&long=${long}&pt=5&API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
  // );

  const dataTaxis = await HttpRequest.get(
    `taxis?lat=${35.1922456}&long=${33.3562027}&pt=5&API_KEY=${
      process.env.NEXT_PUBLIC_API_KEY
    }`
  );

  const dataCity = await responseCity.json();

  const { popular_taxis, taxis } = dataTaxis.data;
  const { address } = dataCity;

  return {
    props: {
      popular_taxis,
      taxis,
      city: address.city || address.state_district,
    },
  };
}
