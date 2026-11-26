import Head from "next/head";
import React, { useEffect } from "react";
import Lenis from "lenis";
import { COPY } from "../constants";
import { LangProvider, useT } from "../lib/lang";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/motion";
import Header from "../components/header";
import Hero from "../components/hero";
import Library from "../components/library";
import Services from "../components/services";
import Process from "../components/process";
import About from "../components/about";
import Footer from "../components/footer";
import Background from "../components/background";
import Boot from "../components/boot";
import FloatWa from "../components/float-wa";

const Meta = () => {
  const t = useT();
  useEffect(() => {
    // The tab calls you back when you leave it
    const original = t(COPY.meta.title);
    const on = () => (document.title = document.hidden ? t(COPY.away) : original);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  });
  return (
    <Head>
      <title>{t(COPY.meta.title)}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={t(COPY.meta.description)} />
      <meta property="og:title" content={t(COPY.meta.title)} />
      <meta property="og:description" content={t(COPY.meta.description)} />
      <meta name="theme-color" content="#08090A" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
  );
};

const useMotion = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9 });
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

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(els, { opacity: 0, y: 30, filter: "blur(8px)" });
    const st = ScrollTrigger.batch(els, {
      start: "top 90%",
      once: true,
      onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.07, ease: "power3.out", overwrite: true, clearProps: "filter" }),
    });
    return () => st.forEach((s) => s.kill());
  }, []);
};

const Page = () => {
  useMotion();
  return (
    <>
      <Meta />
      <Background />
      <Boot />
      <Header />
      <main>
        <Hero />
        <Library />
        <Services />
        <Process />
        <About />
      </main>
      <Footer />
      <FloatWa />
    </>
  );
};

export default function Home() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
