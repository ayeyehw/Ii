import "@fontsource-variable/unbounded/wght";
import "@fontsource-variable/figtree/wght";
import "@fontsource/caveat/600";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
