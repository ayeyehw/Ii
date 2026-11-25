import React, { useState } from "react";
import { CATEGORY_LABELS, EMAIL } from "../constants";
import Title from "./title";

/** Formulario sin backend: arma un correo listo para enviar con los datos. */
const Contact = () => {
  const [form, setForm] = useState({ nombre: "", email: "", rubro: "", mensaje: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Nuevo proyecto${form.rubro ? ` — ${form.rubro}` : ""} (${form.nombre})`;
    const body = `Hola Alejandro!\n\n${form.mensaje}\n\n— ${form.nombre}\n${form.email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contacto" className="pink-band px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 rounded-[2.5rem] border-[3px] border-ink bg-cream p-6 shadow-[10px_10px_0_#16121a] md:grid-cols-2 md:p-14">
        <div>
          <Title kicker="Trabajemos juntos" big="Cuéntame tu" script="proyecto" />
          <p data-reveal className="mt-6 max-w-sm text-lg text-ink/70">
            ¿Tienes una marca, un emprendimiento o una idea? Escríbeme y te respondo en menos de 48 h.
          </p>
          <img src="/stickers/burst.svg" alt="" className="spin-slow mt-10 hidden w-36 md:block" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-bold uppercase tracking-wider">Nombre</span>
            <input required className="field" value={form.nombre} onChange={set("nombre")} placeholder="¿Cómo te llamas?" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-bold uppercase tracking-wider">Email</span>
            <input required type="email" className="field" value={form.email} onChange={set("email")} placeholder="tu@correo.com" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-bold uppercase tracking-wider">¿Qué necesitas?</span>
            <select className="field" value={form.rubro} onChange={set("rubro")}>
              <option value="">Elige un rubro</option>
              {Object.values(CATEGORY_LABELS).map((l) => (
                <option key={l}>{l}</option>
              ))}
              <option>Otro</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-bold uppercase tracking-wider">Mensaje</span>
            <textarea required rows={4} className="field resize-none" value={form.mensaje} onChange={set("mensaje")} placeholder="Cuéntame sobre tu marca y lo que tienes en mente…" />
          </label>
          <button type="submit" className="btn btn-lime w-full justify-center !py-4">
            Enviar mensaje ✦
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
