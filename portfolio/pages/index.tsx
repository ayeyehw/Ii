import Head from "next/head";
import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { Category, METADATA, TICKER } from "../constants";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/motion";
import Header from "../components/header";
import Ticker from "../components/ticker";
import Hero from "../components/hero";
import Services from "../components/services";
import BigMarquee from "../components/big-marquee";
import Featured from "../components/featured";
import Gallery from "../components/gallery";
import Content from "../components/content";
import Ribbons from "../components/ribbons";
import About from "../components/about";
import Experience from "../components/experience";
import Contact from "../components/contact";
import Footer from "../components/footer";

export default function Home() {
  const [filter, setFilter] = useState<Category | "todos">("todos");

  // Scroll suave (Lenis) sincronizado con GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09 });
    (window as any).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  // Aparición suave de los elementos con [data-reveal]
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(els, { opacity: 0, y: 40 });
    const triggers = ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: true }),
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={METADATA.description} />
        <meta property="og:title" content={METADATA.title} />
        <meta property="og:description" content={METADATA.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta name="theme-color" content="#FBF6F1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Header />
      <Ticker
        items={TICKER}
        className="border-y-2 border-ink bg-lime py-2.5"
        itemClassName="text-xs font-bold uppercase tracking-[0.2em]"
        speed="40s"
      />
      <main>
        <Hero />
        <Services onPick={setFilter} />
        <BigMarquee word="Proyectos" />
        <Featured />
        <div className="checker border-y-2 border-ink" />
        <Gallery filter={filter} setFilter={setFilter} />
        <Content />
        <Ribbons />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
