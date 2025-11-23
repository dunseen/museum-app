"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import type { LatLngExpression } from "leaflet";

type LocationMapProps = {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
  height?: string;
  className?: string;
};

export function LocationMap({
  lat,
  lng,
  title,
  zoom = 15,
  height = "400px",
  className = "",
}: LocationMapProps) {
  const position: LatLngExpression = [lat, lng];

  return (
    <div style={{ height, width: "100%" }} className={className}>
      <MapContainer
        center={position}
        zoom={zoom}
        className="z-40"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0.5rem",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
