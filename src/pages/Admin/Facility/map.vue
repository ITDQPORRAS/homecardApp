<template>
	<div>
		<q-layout
			view="hHh Lpr lff"
			container
			style="height: 90vh"
			class="shadow-2 rounded-borders"
		>
			<q-drawer v-model="drawer" show-if-above :width="230" side="right">
				<div class="q-pa-sm">
					<q-input dense v-model="search" type="text" label="Search" />
				</div>

				<q-scroll-area class="fit">
					<q-list dense separator>
						<q-slide-item
							v-for="(item, x) in filteredList"
							:key="x"
							@left="onLeft(false, ...arguments)"
							left-color="red"
							right-color="purple"
						>
							<template v-slot:left>
								<q-btn color="red-10" icon="push_pin" @click="notify"></q-btn>
							</template>

							<q-item clickable v-ripple @click="selected(item)">
								<q-item-section>
									{{ item.brgy_name }}
									<div
										class="text-weight-thin my-table-details"
										v-html="item.district"
									></div>
								</q-item-section>
								<q-item-section top side>
									<div class="text-grey-8 q-gutter-xs">
										<q-btn
											size="8px"
											flat
											dense
											round
											icon="more_vert"
											@click="assign(item)"
										>
										</q-btn>
									</div>
								</q-item-section>
							</q-item>
						</q-slide-item>
					</q-list>
				</q-scroll-area>
			</q-drawer>

			<q-page-container>
				<q-page class="q-pa-xs">
					<mapbox
						:access-token="accessToken"
						:map-options="{ style: styless, zoom: zoom, center: center }"
						:geolocate-control="{ show: true, position: 'top-left' }"
						@map-load="loaded"
						@map-zoomend="zoomend"
						@map-click:points="clicked"
						@geolocate-error="geolocateError"
						@geolocate-geolocate="geolocate"
						@map-mouseenter:points="mouseEntered"
						@map-mouseleave:points="mouseLeft"
						@map-init="mapInitialized"
						@map-mousemove="move"
						@map-click="click"
					>
						<MglGeolocateControl
							:access-token="accessToken"
							@results="handleSearch"
						/>
					</mapbox>
				</q-page>
			</q-page-container>
		</q-layout>
		<q-dlg
			v-model="dlgtag"
			:showCommand="false"
			:title="selectedData.brgy_name"
		>
			<tag :data="selectedData" />
		</q-dlg>
		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn fab icon="search" color="primary" @click="drawer = !drawer" />
		</q-page-sticky>
	</div>
</template>
<script>
import EventBus from "./_event";
import Mapbox from "mapbox-gl-vue";
import PopupContent from "./PopupContent.vue";
import Resource from "@/api/resource";
import { MglGeolocateControl } from "vue-mapbox";
const mapboxgl = require("mapbox-gl");
import moment from "moment";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapGetters } from "vuex";
import tag from "./tag";
export default {
	components: {
		Mapbox,
		MglGeolocateControl,
		tag,
		// detailss,
	},
	data() {
		return {
			resetState: {
				reset: null,
			},
			selectedData: [],
			dlgtag: false,
			styless: "mapbox://styles/mapbox/streets-v11",
			loading: false,
			dlgshow: false,
			search: "",
			map: null,
			title: null,
			accessToken:
				"pk.eyJ1Ijoia3lsbGVtaWcxNDMiLCJhIjoiY2thb3V2ZGpxMjZ0NTJ4bXNuZDJuZGE1MCJ9.qpaXH7gG7k_mH1BxwNswpw", // your access token. Needed if you using Mapbox maps
			headers: [
				{ text: "Business Name", value: "name" },
				{ text: "Action", value: "Action", width: "30px" },
			],
			mapData: [],
			facility: [],
			maplist: [],
			marker: [],
			center: { lng: 123.755822, lat: 10.209696 },
			zoom: 16,
			popup: [],
			width: 300,
			items: [
				{ color: "blue", icon: "mdi-map-marker", title: "Released" },
				{ color: "green", icon: "mdi-map-marker", title: "Paid" },
				{ color: "orange", icon: "mdi-map-marker", title: "Uncomplied" },
				{ color: "yellow", icon: "mdi-map-marker", title: "Partial Payment" },
				{ color: "brown", icon: "mdi-map-marker", title: "For Assessment" },
				{ color: "red", icon: "mdi-map-marker", title: "Unpaid" },
				{ divider: true },
				{
					icon: "map",
					title: "streets",
					datax: "mapbox://styles/mapbox/streets-v11",
				},
				{
					icon: "map",
					title: "light",
					datax: "mapbox://styles/mapbox/light-v10",
				},
				{
					icon: "map",
					title: "dark",
					datax: "mapbox://styles/mapbox/dark-v10",
				},
				{
					icon: "map",
					title: "outdoors",
					datax: "mapbox://styles/mapbox/outdoors-v11",
				},
				{
					icon: "map",
					title: "satellite",
					datax: "mapbox://styles/mapbox/satellite-v9",
				},
			],
			drawer: false,
			group: null,
			currentMarkerss: null,
		};
	},
	watch: {},
	mounted() {
		this.mapLocation();
		EventBus.$on("list", (data) => {
			this.mapLocation();
		});
	},
	created() {
		this.map = Mapbox;
	},
	methods: {
		mapInitialized(map) {
			this.map = map;
			const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");
			this.map.addControl(
				new MapboxGeocoder({
					accessToken: this.accessToken,
					mapboxgl: map,
				})
			);
			// this.setMarker(map);
		},
		switchLayer(layer) {
			// map.setStyle('mapbox://styles/mapbox/' + layerId);
		},
		assign(item) {
			EventBus.$emit("entry", item);
		},
		handleSearch(event) {
			// console.log(event);
		},
		move(e) {
			// console.log(e);
		},
		click(map, evt) {
			// console.log(evt.lngLat);
		},
		async loaded(map) {
			await this.mapLocation();
			await this.getFacility();
			map.addLayer({
				id: "points",
				type: "symbol",
				source: {
					type: "geojson",
					data: this.mapData,
				},
				layout: {
					"icon-image": "{icon}-15",
					"text-field": "{title}",
					"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
					"text-offset": [0, 0.6],
					"text-anchor": "top",
					"icon-allow-overlap": true,
				},
			});
			map.addLayer({
				id: "points",
				type: "symbol",
				source: {
					type: "geojson",
					data: this.facility.map,
				},
				layout: {
					"icon-image": "{icon}-15",
					"text-field": "{title}",
					"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
					"text-offset": [0, 0.6],
					"text-anchor": "top",
					"icon-allow-overlap": true,
				},
			});
			this.marker.forEach((marker) => {
				new mapboxgl.Marker().setLngLat(marker).addTo(map);
			});
			this.facility.coordinate.forEach((marker) => {
				new mapboxgl.Marker({ color: "orange" }).setLngLat(marker).addTo(map);
			});
		},
		zoomend(map, e) {},

		onSelected(item) {
			// this.dlgtag = true;
			this.selectedData = item;
			EventBus.$emit("entry", item);
		},

		async clicked(map, e) {
			console.log(map);
			if (e.features) {
				const coordinates = e.features[0].geometry.coordinates.slice();
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				const datax = {
					brgy_name: e.features[0].properties.title,
					lat: e.features[0].properties.lat,
					lng: e.features[0].properties.lng,
				};
				if (this.popup !== null) {
					for (var i = this.popup.length - 1; i >= 0; i--) {
						this.popup[i].remove();
					}
				}
				this.title = e.features[0].properties.title;
				this.loading = true;
				this.dlgshow = true;
				this.loading = false;
				const popup = new mapboxgl.Popup()
					.setLngLat({ lng: coordinates[0], lat: coordinates[1] })
					.setHTML('<div id="vue-popup-content"></div>')
					.addTo(map);
				new PopupContent({
					propsData: { datax: datax },
				}).$mount("#vue-popup-content");
				this.popup.push(popup);
			}
		},
		geolocateError(control, positionError) {
			console.log(positionError);
		},
		geolocate(control, position) {
			console.log(
				`User position: ${position.coords.latitude}, ${position.coords.longitude}`
			);
		},
		mouseEntered(map) {
			// alert('asd');
			this.zoom = 18;
			map.getCanvas().style.cursor = "pointer";
		},
		mouseLeft(map) {
			this.zoom = 18;
			map.getCanvas().style.cursor = "";
		},
		async mapLocation() {
			const { data } = await new Resource("businessLocation").list();
			this.mapData = data.map;
			this.maplist = data.list;
			this.marker = data.coordinate;
		},
		async getFacility() {
			const { data } = await new Resource("Map/facilityList").list();
			this.facility = data;
		},
		notify() {},
		selected(item) {
			this.zoom = 18;
			if (item.lng > 0) {
				this.map.flyTo({
					center: [item.lng, item.lat],
					essential: true,
				});
				if (this.popup !== null) {
					for (var i = this.popup.length - 1; i >= 0; i--) {
						this.popup[i].remove();
					}
				}
				const popup = new mapboxgl.Popup()
					.setLngLat({ lng: item.lng, lat: item.lat })
					.setHTML('<div id="vue-popup-content"></div>')
					.addTo(this.map);
				new PopupContent({
					propsData: { datax: item },
				}).$mount("#vue-popup-content");
				this.popup.push(popup);
			} else {
				this.$message({ message: "No location setup!", type: "error" });
			}
		},
	},
	computed: {
		// ...mapGetters(["barangay"]),
		filteredList() {
			return this.maplist.filter((post) => {
				return post.brgy_name.toLowerCase().includes(this.search.toLowerCase());
			});
		},
	},
	beforeDestroy() {
		clearTimeout(this.timer);
	},
};
</script>
<style scoped>
#map {
	width: 100%;
	height: 100vh;
}
.marker {
	display: block;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	padding: 0;
}
</style>
<style>
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css");
</style>