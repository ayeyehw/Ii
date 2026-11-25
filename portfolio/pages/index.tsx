import Head from "next/head";
import React, { useEffect } from "react";
import Lenis from "lenis";
import { METADATA } from "../constants";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/motion";
import Header from "../components/header";
import Hero from "../components/hero";
import Services from "../components/services";
import CaseStudy from "../components/case-study";
import About from "../components/about";
import Contact from "../components/contact";
import Footer from "../components/footer";
import Cursor from "../components/cursor";
import InkMeter from "../components/ink-meter";

export default function Home() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.085 });
    (window as any).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content={METADATA.description} />
        <meta property="og:title" content={METADATA.title} />
        <meta property="og:description" content={METADATA.description} />
        <meta property="og:locale" content="es_ES" />
        <meta name="theme-color" content="#EFEEEA" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Services />
        <CaseStudy />
        <About />
        <Contact />
      </main>
      <Footer />
      <InkMeter />
    </>
  );
}
