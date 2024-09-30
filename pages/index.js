import Aside from "@/components/ui/Aside";
import CardTaxi from "@/components/ui/Cards/CardTaxi";
import HttpRequest from "@/utils/HttpRequest";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";

export default function Home({ popular_taxis, taxis }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Kibtaxi | Kıbrıs'ın Taksi Uygulaması"
        />
        <meta
          name="keywords"
          content="kibtaxi, kıbrıs taksi, mağusa taksi, ercan taksi, lefkoşa taksi, kktc taksi, kktc taxi"
        />
        <title>
          Kıbtaxi | Kıbrıs Taksi | KKTC Taksi | Kıbrıs'ın ve Kuzey Kıbrıs'ın
          Taksi Uygulaması
        </title>
      </Head>
      <section id="app" className="flex items-start">
        <Aside popular_taxis={popular_taxis} />
        <section id="app-main" className="p-4">
          <section className="lg:hidden"></section>
          <section className="mb-4">
            <h6 className="flex items-center gap-2 font-semibold mb-4">
              <FontAwesomeIcon icon={faLocation} className="text-primary" />
              <span>Other taxis around you</span>
            </h6>
          </section>
          <section>
            <ul className="grid grid-cols-12 gap-6">
              {taxis.map((taxi) => (
                <li className="col-span-12 lg:col-span-6">
                  <CardTaxi taxi={taxi} key={taxi.taxi_placeId} />
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const responseIP = await fetch(
    `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_IO_TOKEN}`
  );

  const dataIP = await responseIP.json();
  const [lat, long] = dataIP.loc.split(",");

  const dataTaxis = await HttpRequest.get(
    `taxis?lat=${lat}&long=${long}&pt=5&API_KEY=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const { popular_taxis, taxis } = dataTaxis.data;

  return {
    props: {
      popular_taxis,
      taxis,
    },
  };
}
