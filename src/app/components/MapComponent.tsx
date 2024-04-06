"use client";

import { useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import Zoom from "ol/control/Zoom";
import DropdownMenu from "./DropDownMenu";
import Draw from "ol/interaction/Draw.js";
import { useState } from "react";

const MapComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("UserArea");

  const centerLongitude: number = -11000000;
  const centerLatitude: number = 4600000;

  const vectorSource = new VectorSource({ wrapX: false });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({}),
  });

  let map: any;

  const raster = new TileLayer({
    source: new OSM({
      attributions: [],
    }),
  });


  useEffect(() => {
    // This is map instance
    map = new Map({
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

    if (selectedOption === "UserArea") {
      map.on("click", function (event: any) {
        const coords = event.coordinate;
        const iconFeature = new Feature({
          geometry: new Point(coords),
        });

        // Icon image
        const iconStyle = new Style({
          image: new Icon({
            src: "https://mapmarker.io/api/v2/font-awesome/v5/pin?icon=fa-star-solid&size=50&color=FFF&background=BC5AF4&hoffset=0&voffset=0",
          }),
        });
        iconFeature.setStyle(iconStyle);
        vectorSource.clear();
        vectorSource.addFeature(iconFeature);
      });
    } else {
      addInteraction();
    }

   


    return () => {
      map.dispose(); // for disposing the map
    };
  }, [selectedOption]);

  function addInteraction(): void {
    let draw = new Draw({
      source: vectorSource,
      type: selectedOption as any,
    });
    map.addInteraction(draw);
  }

  function handleOptionChange(option: string): void {
    setSelectedOption(option);
    console.log(option);
  }

  return (
    <div className="w-full relative">
      <div className="container mx-auto w-10/10 h-[500px] border border-gray-300 rounded-lg shadow-xlg ">
        <div id="map" className="w-full h-[550px]"></div>

        {/*Toast component*/}
      </div>

      <div className="absolute top-0 right-12 mt-2 border-black-300 z-10">
        <DropdownMenu
          options={["UserArea", "Point", "LineString", "Polygon"]}
          onSelectOption={handleOptionChange}
        />
      </div>
    </div>
  );
};

export default MapComponent;
