<template>
  <div>
    <div id="restaurantMainMap" style="height: 75vh">
    </div>
    <p style="text-align:right; color:gray" v-show="mapError">{{mapNotShowingMessage}}</p>
  </div>
</template>

<script>
  import * as L from "leaflet";
  import tokens from "../../top_secret_files/tokenList";

  export default {
    name: "RestaurantMap",

    props: {
      restaurants: {
        type: Array,
        required: true,
      },
    },

    watch: {
      restaurants(oldVal, newVal) {
        this.drawRestaurantsOnMap();
      },
    },

    data() {
      return {
        map: null,

        restaurantMarkers: [],
        highlighted: null,

        mapError: false,
        mapNotShowingMessage: process.env.NODE_ENV === 'production' ?
          'Map not showing? That means we messed something up in our configurations :(\nPlease let us know' :
          'It looks like you forgot to enter a value for mapboxToken in src/top_secret_files/tokenList.js',
      }
    },

    methods: {
      getMap() {
        return this.map;
      },

      makeMap() {
        let myCoords = this.$store.getters.position.coords;
        let self = this;

        //create the shell of the map
        this.map = L.map('restaurantMainMap', {
          center: this.highlighted ? [this.highlighted.address.coord_lat, this.highlighted.address.coord_lon] : [myCoords.latitude, myCoords.longitude],
          zoom: 13,
          worldCopyJump: true,
          maxBoundsViscosity: 1.0,
        });

        //add tiles to the shell, these are the actual map images
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, Coordinates by <a href="https://www.locationiq.com/">LocationIQ</a>',
          minZoom: 2,
          maxZoom: 22,
          id: 'mapbox/streets-v11',
          accessToken: tokens.mapboxToken,
          //these options make the scaling of the text a bit nicer
          tileSize: 512,
          zoomOffset: -1,
        }).on('tileerror', function() {
          if(!self.mapError) {
            self.$buefy.toast.open({message: 'could not load map tiles', type: 'is-danger'});
          }
          self.mapError = true;
        }).addTo(this.map);


        let centerControl = L.Control.extend({
          options: {
            position: 'topright',
          },

          onAdd: function(map) {
            let button = L.DomUtil.create('button', 'leaflet0bar leaflet-control leaflet-control-custom button');
            button.innerHTML = 'center map';
            button.onclick = self.centerMap;
            return button;
          }
        });

        this.map.addControl(new centerControl);

        this.drawRestaurantsOnMap();
      },

      drawRestaurantsOnMap() {
        if(!this.map) {
          return;
        }
        let myCoords = this.$store.getters.position.coords;
        let self = this;
        this.clearMarkers();

        let selfIcon = L.icon({
          iconUrl: './static/map_marker-red-small.png',
          iconSize: [25, 41],
          iconAnchor: [13, 40],
          popupAnchor: [0, -32],
        });

        let selfMarker = {id: 'self', marker: L.marker([myCoords.latitude, myCoords.longitude], {icon: selfIcon}).addTo(self.map)};
        selfMarker.popup = selfMarker.marker.bindPopup('Hey, that\'s you!');
        this.restaurantMarkers.push(selfMarker);

        this.$props.restaurants.forEach(function(item, index) {
          let restaurantPopup = L.popup().setLatLng([item.address.coord_lat, item.address.coord_lon]);

          let popupContent = L.DomUtil.create('div');
          popupContent.style= 'text-align: center';
          let restaurantNameTag = L.DomUtil.create('p', '', popupContent);
          restaurantNameTag.innerHTML = item.name;
          restaurantNameTag.style = 'font-size:150%;';
          let restaurantTypeTag = L.DomUtil.create('p', '', popupContent);
          restaurantTypeTag.innerHTML = item.type;
          let restaurantSeatTag = L.DomUtil.create('p', '', popupContent);
          restaurantSeatTag.innerHTML = item.free_seats + '/' + item.total_seats + ' free';
          restaurantTypeTag.style= 'font-size: 120%; margin-top: -20%';
          let viewInListButton = L.DomUtil.create('button', 'button is-primary', popupContent);
          viewInListButton.setAttribute('type', 'button');
          viewInListButton.innerHTML = 'view in list';

          restaurantPopup.setContent(popupContent);

          L.DomEvent.on(viewInListButton, 'click', function() {
            self.viewInList(item);
          });

          let restaurantMarker = {id: item.id, marker: L.marker([item.address.coord_lat, item.address.coord_lon]).addTo(self.map), popup: restaurantPopup};

          restaurantMarker.marker.bindPopup(restaurantPopup);
          self.restaurantMarkers.push(restaurantMarker);
        });
      },

      clearMarkers() {
        this.restaurantMarkers.forEach(function(marker) {
          marker.marker.remove();
        });
      },

      viewInList(item) {
        this.$emit('viewInListRequest', item);
      },

      highlight(restaurant, noRecursion) {
        this.highlighted = restaurant;
        if(this.map) {
          this.map.setView([restaurant.address.coord_lat, restaurant.address.coord_lon], 17);
          let marker = this.restaurantMarkers.find(marker => marker.id === restaurant.id);
          if(marker && marker.popup) {
            window.setTimeout(function(self) {
              marker.popup.openOn(self.map);
            }, 500, this);
          }
        }
        else {
          if(noRecursion) {
            return;
          }
          window.setTimeout(this.highlight, 750, restaurant, true);
        }
      },

      centerMap() {
        let myCoords = this.$store.getters.position.coords;
        this.map.setView([myCoords.latitude, myCoords.longitude]);
      },
    },
  }
</script>

<style scoped>
</style>
