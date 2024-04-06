"use client";

import { useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import Zoom from "ol/control/Zoom";

import { Draw, Modify } from "ol/interaction";

import { useState } from "react";
import Toast from "./Toast";

const MapComponent: React.FC = () => {
  const centerLongitude: number = -11000000;
  const centerLatitude: number = 4600000;

  useEffect(() => {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({}),
    });

    const raster = new TileLayer({
      source: new OSM({
        attributions: [],
      }),
    });

    // Here, I am creating map instance
    const map = new Map({
      target: "map",
      layers: [raster, vectorLayer],
      view: new View({
        center: [centerLongitude, centerLatitude],
        zoom: 3,
      }),
      controls: [
        new Zoom({
          className: "bg-white text-xl  rounded-md  px-2 py-1 m-2  w-[60px]",
          zoomInLabel: "+",
          zoomOutLabel: "-",
        }),
      ],
    });

    map.on("click", function (event) {
      const coords = event.coordinate;
      const lonLat = fromLonLat(coords);

      const iconFeature = new Feature({
        geometry: new Point(coords),
      });

      const iconStyle = new Style({
        image: new Icon({
          src: "https://mapmarker.io/api/v2/font-awesome/v5/pin?icon=fa-star-solid&size=50&color=FFF&background=BC5AF4&hoffset=0&voffset=0",
        }),
      });

      iconFeature.setStyle(iconStyle);
      vectorSource.clear();
      vectorSource.addFeature(iconFeature);
    });

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div className="w-full">
      <h2 className="mt-2 mb-5 text-center font-medium text-2xl">World Map</h2>

      <div className="container mx-auto w-9/10 h-64 border border-gray-300 rounded-lg shadow-lg ">
        <div id="map" className="w-full h-[500px]"></div>

        {/*Toast component*/}
      </div>
    </div>
  );
};

export default MapComponent;
