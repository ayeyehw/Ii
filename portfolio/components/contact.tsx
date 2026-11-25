import React, { useState } from "react";
import { EMAIL, SOCIAL } from "../constants";
import SectionHead from "./section-head";

const Contact = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [ready, setReady] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Proyecto de marca: ${form.nombre}`;
    const body = `${form.mensaje}\n\n${form.nombre}\n${form.email}`;
    setReady(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contacto" className="gutter bg-ink py-24 text-sheet md:py-36">
      <div className="[&_.slug]:!text-sheet/60 [&_.sh-rule]:!bg-sheet [&_.slug>span]:!border-sheet">
        <SectionHead plate="D" label="Contacto" meta="Respuesta en menos de 48 h" title="Hablemos" />
      </div>
      <div className="mt-12 grid gap-14 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <p className="max-w-md text-2xl font-medium leading-tight">
            Cuéntame qué vende tu negocio, a quién le habla y qué no te gusta de cómo se ve hoy.
          </p>
          <a href={`mailto:${EMAIL}`} className="link-draw mt-8 inline-block break-all font-display text-[clamp(1.6rem,3.6vw,3rem)] font-bold" style={{ fontStretch: "80%" }}>
            {EMAIL}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-draw text-sheet/80 hover:text-sheet">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="grid gap-6 md:col-span-5 md:col-start-8 [&_.field]:border-sheet [&_.field:focus]:border-flame">
          <label className="grid gap-1">
            <span className="slug !text-sheet/60">Nombre</span>
            <input id="c-nombre" required className="field" value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre y el de tu negocio" />
          </label>
          <label className="grid gap-1">
            <span className="slug !text-sheet/60">Correo</span>
            <input id="c-email" required type="email" className="field" value={form.email} onChange={set("email")} placeholder="nombre@negocio.com" />
          </label>
          <label className="grid gap-1">
            <span className="slug !text-sheet/60">Proyecto</span>
            <textarea id="c-msg" required rows={4} className="field resize-none" value={form.mensaje} onChange={set("mensaje")} placeholder="Marca nueva, rediseño, campaña…" />
          </label>
          <button type="submit" className="mt-2 flex items-center justify-between bg-flame px-6 py-4 text-lg font-semibold text-ink transition-colors hover:bg-sheet">
            Enviar a imprenta <span>→</span>
          </button>
          {ready && <p className="text-[15px] text-sheet/70">Se abrió tu correo con el mensaje listo. Si no se abrió, escríbeme a {EMAIL}.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
