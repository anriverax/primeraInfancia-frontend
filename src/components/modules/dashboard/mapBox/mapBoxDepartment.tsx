"use client";

import { Layer, Source } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import departments from "@/components/modules/dashboard/sv.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
const MapBoxDepartment = (): React.JSX.Element => (
  <Source id="departments" type="geojson" data={departments as any} generateId={true}>
    <Layer
      id="depto-fill"
      type="fill"
      paint={{
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "#5d87ff",
          "rgba(79,134,247,0.1)"
        ],
        "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.45, 0.12]
      }}
    />

    <Layer
      id="depto-border"
      type="line"
      paint={{
        "line-color": "#dbdbdb",
        "line-width": 2
      }}
    />
  </Source>
);
/* eslint-enable @typescript-eslint/no-explicit-any */
export default MapBoxDepartment;
