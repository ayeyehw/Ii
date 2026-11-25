import React from "react";

const SectionTitle = ({ kicker, title, className = "" }: { kicker: string; title: string; className?: string }) => (
  <div className={className}>
    <p data-reveal className="kicker mb-4">{kicker}</p>
    <h2 data-reveal className="h-section max-w-3xl">{title}</h2>
  </div>
);

export default SectionTitle;
