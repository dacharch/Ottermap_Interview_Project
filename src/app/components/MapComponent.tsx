"use client";
import { useEffect } from "react";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";

const MapComponent = () => {
  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    return () => map.dispose();
  }, []);

  return (
    <div className="w-full">
      <h2 className="mt-2 mb-5 text-center font-medium text-2xl">World Map</h2>
      <div className="border">
        <div id="map" style={{ width: "100%", height: "500px" }}></div>
      </div>
    </div>
  );
};

export default MapComponent;
