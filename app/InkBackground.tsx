"use client";

import InkDustParticles from "./InkDustParticles";

/* Soluklaştırılmış arka plan görseli */
function FadedInkLayer() {
  return (
    <div className="ink-bg-layer" aria-hidden>
      {/* Ana görsel – tam kaplar, soluk */}
      <div className="ink-bg-image ink-bg-faded" />
      {/* Ek vurgular – farklı köşelerde hafif tekrarlar */}
      <div className="ink-bg-image ink-bg-spot ink-bg-spot-tl" />
      <div className="ink-bg-image ink-bg-spot ink-bg-spot-br" />
      <div className="ink-bg-image ink-bg-spot ink-bg-spot-mr" />
    </div>
  );
}

/* Hafif toz bulutları – esinti gibi yavaş hareket */
function DustClouds() {
  return (
    <div className="dust-layer" aria-hidden>
      <div className="dust-cloud dust-cloud-1" />
      <div className="dust-cloud dust-cloud-2" />
      <div className="dust-cloud dust-cloud-3" />
      <div className="dust-cloud dust-cloud-4" />
      <div className="dust-cloud dust-cloud-5" />
      <div className="dust-cloud dust-cloud-6" />
    </div>
  );
}

export default function InkBackground() {
  return (
    <>
      <FadedInkLayer />
      <DustClouds />
      <InkDustParticles />
    </>
  );
}
