import "../styles/global.css";
import "../styles/tailwind.css";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (...args) => fetch(...args).then((res) => res.json()) }}
    >
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}
