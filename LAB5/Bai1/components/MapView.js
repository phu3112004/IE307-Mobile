import React from "react";
import { WebView } from "react-native-webview";

export default function HereMap({
  latitude = 10.8475805,
  longitude = 106.6465217,
}) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
      <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
      <link rel="stylesheet" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
      <style>
        #mapContainer {
          width: 100%;
          height: 100%;
        }
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
      </style>
    </head>
    <body>
      <div id="mapContainer"></div>
      <script>
        var platform = new H.service.Platform({
          apikey: "WNNS8mTzxcjj8ZN5shRI0lVDwIbS6LgsZhw2GP6gBBg" 
        });

        var defaultLayers = platform.createDefaultLayers();
        var map = new H.Map(
          document.getElementById('mapContainer'),
          defaultLayers.vector.normal.map,
          {
            center: { lat: ${latitude}, lng: ${longitude} },
            zoom: 18,
            pixelRatio: window.devicePixelRatio || 1
          }
        );
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        var marker = new H.map.Marker({ lat: ${latitude}, lng: ${longitude} });
        map.addObject(marker);
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
  );
}
