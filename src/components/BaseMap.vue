<template>
  <div id="map" class="basemap w-full"></div>
</template>

<script>
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

const geoJson = {
  type: "FeatureCollection",
  features: [],
}

export default {
  props: {
    users: {
      validator: (prop) => typeof prop === "object" || prop === null,
      required: true,
    },
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoibWRyIiwiYSI6ImNrdmMzcm41a2F0NDQyd256N2Q2azQyaTkifQ.oOZ5M74aJndG9EI7bkcWOQ",
      geojson: null,
    }
  },
  created() {
    if (this.users) {
      this.users.forEach((user) => {
        const newFeature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [], // longitude,latitude
          },
          properties: {
            title: "",
            description: "",
          },
        }

        const { first, last } = user.name
        const { latt, longt } = user.location
        const { city, prov } = user.location

        newFeature.geometry.coordinates = [longt, latt]
        newFeature.properties.title = `${first + " " + last}`
        newFeature.properties.description = `${city + ", " + prov}`
        geoJson.features.push(newFeature)
      })

      this.geojson = geoJson
    }
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [179, 0], // starting position [lng, lat]
      zoom: 1.2, // starting zoom
    })

    map.on("load", () => {
      const nav = new mapboxgl.NavigationControl()
      map.addControl(nav, "bottom-right")

      // add markers to map
      for (const feature of this.geojson.features) {
        const el = document.createElement("div")
        el.className = "marker"
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `
							<h3 class="text-base font-medium capitalize">${feature.properties.title}</h3>
							<p>${feature.properties.description}</p>
							`
              )
          )
          .addTo(map)
      }
    })
  },
}
</script>

<style>
.basemap {
  height: 90vh;
}

.marker {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 3px solid #ea533c;

  cursor: pointer;
}
.mapboxgl-popup {
  max-width: 200px;
}
.mapboxgl-popup-content {
  text-align: center;
  font-family: "Inter", sans-serif;
  padding: 1.5rem;
}

.mapboxgl-popup-close-button {
  border-radius: 0;
  scale: 2;
  right: 11px;
  top: 5px;
}
.mapboxgl-popup-close-button:hover {
  background-color: transparent;
}

.mapboxgl-popup-close-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
