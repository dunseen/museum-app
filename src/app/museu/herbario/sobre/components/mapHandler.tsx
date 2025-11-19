"use client";

import dynamic from "next/dynamic";
import React from "react";

const HerbariumMap = dynamic(
  () => import("./map").then((mod) => mod.HerbariumMap),
  { ssr: false, loading: () => <p>Carregando mapa...</p> },
);

export function MapHandler() {
  return <HerbariumMap />;
}
