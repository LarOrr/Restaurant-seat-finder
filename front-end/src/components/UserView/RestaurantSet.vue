<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <h2 class="has-text-centered has-text-centered-mobile" style="margin-bottom:2vh; margin-left:2%;">Restaurants Nearby</h2>

      <RestaurantFilters
        v-show="!isLoading"
        :filters="filterOptions"
        style="margin: 0 2% calc(0.4vh + 3px) 2%;"
        v-on:filter-update="updateFilters"
        ref="filterManager"
      >
      </RestaurantFilters>

      <b-loading :active="isLoading"></b-loading>
      <div style="text-align: center">
        <p v-show="displayPatienceMessage">Please be patient, our server was just taking a coffee break</p>
      </div>


      <b-tabs type="is-toggle" v-model="viewMode">
        <b-tab-item label="List View">
          <RestaurantList v-show="!isLoading" :restaurants="filteredRestaurants" ref="mainListView" v-on:viewOnMapRequest="openInMapView"></RestaurantList>
        </b-tab-item>
        <b-tab-item label="Map View">
          <RestaurantMap v-show="!isLoading" :restaurants="filteredRestaurants" ref="mainMapView" v-on:viewInListRequest="openInListView"></RestaurantMap>
        </b-tab-item>
      </b-tabs>


      <div v-if="filteredRestaurants.length === 0" style="margin: 0 2% calc(0.4vh + 3px) 2%;">
        <p>Sorry, there are no restaurants that match those filters</p>
        <p>Please try broadening your search</p>
      </div>

    </div>

  </div>

</template>

<script>
  import CompactRestaurant from "./CompactRestaurant";
  import api from "../../api/api_wrapper";
  import DetailedRestaurant from "./DetailedRestaurant";
  import Timing from "../../utils/Timing";
  import RestaurantFilters from "./RestaurantFilters";
  import FilterTypeEnum from "../../utils/enums/filterTypeEnum";
  import RestaurantMap from "./RestaurantMap";
  import RestaurantList from "./RestaurantList";
  import DOS from "../../utils/DistanceOnSphere";

  export default {
    name: "RestaurantSet",
    components: {RestaurantList, RestaurantMap, DetailedRestaurant, CompactRestaurant, RestaurantFilters},

    data() {
      return {
        FTEnum: FilterTypeEnum.enum,
        //this should always be the index of the mapview in the b-tabs list
        MAPVIEW: 1,

        restaurants: [],
        filteredRestaurants: [],

        filterOptions: [
          {
            displayName: "Restaurant Type",
            internalHandle: "RestaurantType",
            type: FilterTypeEnum.enum.checkboxList,
            options: [
              {
                displayName: "Restaurant",
                value: "restaurant",
              },
              {
                displayName: "Pub/Bar",
                value: "pub",
              },
              {
                displayName: "Cafe",
                value: "cafe",
              },
              {
                displayName: "Fast Food",
                value: "fast food",
              },
              {
                displayName: "Fast Casual",
                value: "fast casual",
              },
            ],
          },
          // {
          //   displayName: "Max Distance",
          //   internalHandle: "MaxDistance",
          //   type: FilterTypeEnum.enum.slider,
          // },
        ],
        selectedFilters: [],
        isLoading: true,
        displayPatienceMessage: false,

        viewMode: 0,
      }
    },

    watch: {
      viewMode(newVal, oldVal) {
        if(newVal === this.MAPVIEW && this.$refs['mainMapView'].getMap() === null) {
          window.setTimeout(function(mapView) {
            mapView.makeMap();
          }, 500, this.$refs['mainMapView']);
        }
      },

      location(newVal, oldVal) {
        if(newVal && newVal.coords) {
          this.sortRestaurants();
        }
      },

      restaurants(newVal, oldVal) {
        this.sortRestaurants();
      }
    },

    computed: {
      location() {
        return this.$store.getters.position;
      }
    },

    async mounted() {
      await this.getRestaurants();
    },

    methods: {
      async getRestaurants() {
        this.isLoading = true;
        let loadingTooLong = window.setTimeout(function(self) {
          self.displayPatienceMessage = true;
        }, 1000, this);

        // await Timing.sleep(5000);

        await api.getPlaces().then((response) => {
          if(response && response.status === 200) {
            this.restaurants = response.data;
            this.filterRestaurants();
          }
          else {
            this.$buefy.toast.open({message: 'request failed with status code: ' + ((response && response.status) ? response.status : 'unknown status'), type: 'is-danger'});
            console.error(response);
          }
          this.isLoading = false;
          window.clearTimeout(loadingTooLong);
          this.displayPatienceMessage = false;
        });
      },

      updateFilters() {
        this.selectedFilters = this.$refs["filterManager"].getFilterValues();
        this.filterRestaurants();
        this.sortRestaurants();
      },

      filterRestaurants() {
        this.filteredRestaurants = this.restaurants.slice();
        let self = this;
        this.selectedFilters.forEach(function(filter) {
          if(filter.internalHandle === "RestaurantType" && filter.selected.length > 0) {
            self.filteredRestaurants = self.filteredRestaurants.filter(item => filter.selected.map(x => x.value.toLowerCase()).includes(item.type.toLowerCase()));
          }
          else if(filter.internalHandle === "MaxDistance") {
            //ignore distance for now
          }
        });
      },

      sortRestaurants() {
        if(!(this.location && this.location.coords)) {
          return;
        }

        let self = this;

        function compareDist(a, b) {
          let dista = DOS.calcDistOnEarth(self.location.coords.latitude, self.location.coords.longitude, a.address.coord_lat, a.address.coord_lon);
          let distb = DOS.calcDistOnEarth(self.location.coords.latitude, self.location.coords.longitude, b.address.coord_lat, b.address.coord_lon);

          if(dista > distb) return 1;
          if(distb > dista) return -1;
          return 0;
        }

        //finally sort the results by distance to the user
        this.filteredRestaurants = this.filteredRestaurants.sort(compareDist);
      },

      openInListView(item) {
        this.viewMode = 0;
        let listView = this.$refs['mainListView'];
        listView.setAllOpen(false);
        listView.toggleOpen(item.id);
        listView.forceUpdateList();
      },

      openInMapView(item) {
        this.viewMode = 1;
        this.$refs['mainMapView'].highlight(item);
      }
    },
  }
</script>

<style scoped>
.columns{
  background-color: var(--lightGrey);
}
</style>
