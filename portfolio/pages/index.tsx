import Head from "next/head";
import React, { useEffect } from "react";
import Lenis from "lenis";
import { COPY } from "../constants";
import { LangProvider, useT } from "../lib/lang";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../lib/motion";
import Header from "../components/header";
import Hero from "../components/hero";
import Work from "../components/work";
import Services from "../components/services";
import Process from "../components/process";
import Testimonial from "../components/testimonial";
import About from "../components/about";
import Faq from "../components/faq";
import Contact from "../components/contact";
import FloatWa from "../components/float-wa";

const Meta = () => {
  const t = useT();
  return (
    <Head>
      <title>{t(COPY.meta.title)}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={t(COPY.meta.description)} />
      <meta property="og:title" content={t(COPY.meta.title)} />
      <meta property="og:description" content={t(COPY.meta.description)} />
      <meta name="theme-color" content="#0D0D0C" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
  );
};

const useMotion = () => {
  // Smooth scroll synced with ScrollTrigger
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

  // Text fades up; images open like a curtain and drift slightly inside their frame
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(els, { opacity: 0, y: 28 });
      ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1, stagger: 0.07, ease: "power3.out", overwrite: true }),
      });
      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(18% 8% 18% 8% round 24px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
        const img = el.querySelector("[data-parallax]");
        if (img)
          gsap.fromTo(img, { yPercent: -4 }, {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
      });
    });
    return () => ctx.revert();
  }, []);
};

const Page = () => {
  useMotion();
  return (
    <>
      <Meta />
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
        <Testimonial />
        <About />
        <Faq />
        <Contact />
      </main>
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
