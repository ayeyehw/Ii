import "@fontsource-variable/anybody/wdth";
import "@fontsource-variable/schibsted-grotesk/wght";
import "@fontsource-variable/martian-mono/wdth";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
