import HttpRequest from "@/utils/HttpRequest";
import Head from "next/head";

export default function Home({ data }) {
  console.log("data: ", data);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Kibtaxi | Kıbrıs'ın Taksi Uygulaması"
        />
        <meta
          name="keywords"
          content="kibtaxi, kıbrıs taksi, mağusa taksi, ercan taksi, kktc taksi, kktc taxi"
        />
        <title>
          Kıbtaxi | Kıbrıs Taksi | KKTC Taksi | Kıbrıs'ın ve Kuzey Kıbrıs'ın
          Taksi Uygulaması
        </title>
      </Head>
    </>
  );
}

export async function getServerSideProps() {
  const response = await HttpRequest.get();

  console.log("response: ", response);

  return {
    props: {
      data: response,
    },
  };
}
