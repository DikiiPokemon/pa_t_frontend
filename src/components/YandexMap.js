"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import Logo from "@/components/assets/LogoPAT.svg"
import styles from "@/components/Yandex.module.css";

export default function YandexMap() {
   const [api, setApi] = React.useState(null);

  React.useEffect(() => {
    async function initMap() {
      try {
        // Ждём, пока Yandex Maps API появится в window
        if (!window.ymaps3) {
          console.error("Yandex Maps API ещё не загружена");
          return;
        }

        const ymaps3 = window.ymaps3;

        // Ждём полной готовности API
        await ymaps3.ready;

        // Загружаем reactify
        const ymaps3React = await ymaps3.import(
          "@yandex/ymaps3-reactify"
        );

        // Превращаем Yandex API в React-компоненты
        const reactified = ymaps3React.reactify
          .bindTo(React, ReactDOM)
          .module(ymaps3);

        setApi(reactified);
      } catch (error) {
        console.error("Ошибка загрузки Yandex Maps:", error);
      }
    }

    initMap();
  }, []);

  // API ещё не готов
  if (!api) {
    return <div>Загрузка карты...</div>;
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
  } = api
  return (
    <YMap
      location={{
        center: [30.339314, 59.964800],
        zoom: 17,
      }}
      style={{ width: "100%", height: "500px" }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapMarker coordinates={[30.339000, 59.964950]}>
        <div className={styles.Mark_container}>
            <img style={{minWidth: "30px", height: "41px"}} src="/favicon.svg"></img>
        </div>
      </YMapMarker>
    </YMap>
  );
}