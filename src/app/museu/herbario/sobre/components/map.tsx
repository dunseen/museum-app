"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import type { LatLngExpression } from "leaflet";

const position: LatLngExpression = [-1.458412, -48.434518];
export function HerbariumMap() {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={15}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Herbário Dr. Felisberto Camargo (FC)</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
