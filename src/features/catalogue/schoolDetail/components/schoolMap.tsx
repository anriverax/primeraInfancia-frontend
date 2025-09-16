"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type SchoolMapProps = {
  coordenates: string;
  schoolName: string;
};

const SchoolMap = ({ coordenates, schoolName }: SchoolMapProps): React.JSX.Element => {
  const coord = coordenates.split(",")!;
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type, react-hooks/exhaustive-deps */
  useEffect(() => {
    // Avoid initializing the map more than once
    const container: any = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }

    // Create map
    const map = L.map("map").setView([13.6929, -89.2182], 8);
    // Approximate borders of El Salvador
    const bounds: L.LatLngBoundsExpression = [
      [14.45, -90.13], // Noroeste
      [12.98, -87.69] // Sureste
    ];

    // Adjust the map to fit within those boundaries
    map.fitBounds(bounds);

    // Add tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    }).addTo(map);

    // Add bookmark
    L.marker([parseFloat(coord[0]), parseFloat(coord[1])], { icon: markerIcon })
      .addTo(map)
      .bindTooltip(schoolName, {
        permanent: true,
        direction: "right",
        className: "leaflet-label"
      });

    return () => {
      map.remove();
    };
  }, []);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  return <div id="map" style={{ height: "320px", width: "100%", borderRadius: "12px" }} />;
};

export default SchoolMap;
