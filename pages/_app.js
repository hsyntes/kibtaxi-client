import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store/index.store";
import { config } from "@fortawesome/fontawesome-svg-core";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}
