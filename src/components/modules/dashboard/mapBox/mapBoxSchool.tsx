"use client";

import { Layer, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { SchoolList } from "../dashboard.type";
import { useGeoJson } from "./hook/useGeoJson";

type MapBoxSchoolProps = {
  filtered: SchoolList[];
  selectedSchoolId: number | null;
};

const MapBoxSchool = ({ filtered, selectedSchoolId }: MapBoxSchoolProps): React.JSX.Element => {
  const geojson = useGeoJson(filtered);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (
    <Source cluster id="escuelas" type="geojson" data={geojson as any} clusterRadius={50}>
      <Layer
        id="clusters"
        type="circle"
        filter={["has", "point_count"]}
        paint={{
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#22c55e", // 1-20
            20,
            "#f59e0b", // 20-100
            100,
            "#ef4444" // 100+
          ],
          "circle-radius": ["step", ["get", "point_count"], 14, 20, 18, 100, 22],
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#000",
            "#fff"
          ],
          "circle-stroke-width": ["case", ["boolean", ["feature-state", "hover"], false], 3, 1]
        }}
      />

      <Layer
        id="cluster-count"
        type="symbol"
        filter={["has", "point_count"]}
        layout={{
          "text-field": "{point_count_abbreviated}",
          "text-size": 14
        }}
        paint={{
          "text-color": "#fff"
        }}
      />
      <Layer
        id="heatmap"
        type="heatmap"
        paint={{
          "heatmap-weight": 1,
          "heatmap-intensity": 1,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)"
          ],
          "heatmap-radius": 30,
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 6, 1, 10, 0]
        }}
      />

      <Layer
        id="unclustered"
        type="circle"
        filter={["!", ["has", "point_count"]]}
        paint={{
          // 🎯 COLOR
          "circle-color": [
            "case",
            ["==", ["get", "id"], selectedSchoolId],
            "#1d4ed8", // seleccionado
            ["match", ["get", "zone"], "Urbana", "#3b82f6", "Rural", "#8b6c5c", "#9ca3af"]
          ],

          // 🎯 RADIO
          "circle-radius": ["case", ["==", ["get", "id"], selectedSchoolId], 14, 6],

          // 🎯 HOVER GLOW
          "circle-stroke-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#000",
            "#fff"
          ],
          "circle-stroke-width": ["case", ["boolean", ["feature-state", "hover"], false], 3, 1]
        }}
      />
    </Source>
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

export default MapBoxSchool;
