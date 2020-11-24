<template>
	<div id="app">
		<q-card>
			<q-tlbr @back="goHome" :title="mapData.brgy_name">
				<q-btn
					size="sm"
					rounded
					color="primary"
					icon="where_to_vote"
					label="OK"
					@click="updateLocation"
				/>
			</q-tlbr>
			<mapbox
				:access-token="accessToken"
				:map-options="{
					style: 'mapbox://styles/mapbox/streets-v11',
					zoom: zoom,
					center: center,
				}"
				:geolocate-control="{ show: true, position: 'top-left' }"
				@map-load="loaded"
				@geolocate-geolocate="geolocate"
				@map-init="mapInitialized"
				@map-click="click"
			/>
		</q-card>
	</div>
</template>
<script>
import Mapbox from "mapbox-gl-vue";
import Resource from "@/api/resource";
import mapboxgl from "mapbox-gl";
import EventBus from "./_event";
export default {
	components: { Mapbox },
	props: {
		mapData: Object,
	},
	data() {
		return {
			search: null,
			map: null,
			loading: false,
			accessToken:
				"pk.eyJ1Ijoia3lsbGVtaWcxNDMiLCJhIjoiY2thb3V2ZGpxMjZ0NTJ4bXNuZDJuZGE1MCJ9.qpaXH7gG7k_mH1BxwNswpw", // your access token. Needed if you using Mapbox maps
			headers: [{ text: "Business Name", value: "name" }],
			maplist: [],
			marker: [],
			center: { lng: 123.755822, lat: 10.209696 },
			zoom: 16,
			pin: [],
			currentMarkers: [],
			lngLat: [],
		};
	},
	mounted() {
		// this.mapLocation();
	},
	created() {
		if (this.mapData.lng > 0) {
			this.center = {
				lng: this.mapData.lng,
				lat: this.mapData.lat,
			};
		}

		this.map = Mapbox;
	},
	methods: {
		goHome() {
			EventBus.$emit("list");
		},
		mapInitialized(map) {
			this.map = map;
			const MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");
			this.map.addControl(
				new MapboxGeocoder({
					accessToken: this.accessToken,
					mapboxgl: map,
				})
			);
			if (this.currentMarkers !== null) {
				for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
					this.currentMarkers[i].remove();
				}
			}
			var oneMarker = new mapboxgl.Marker().setLngLat(this.center).addTo(map);
			this.currentMarkers.push(oneMarker);
			this.lngLat = this.center;
		},
		click(map, evt) {
			if (this.currentMarkers !== null) {
				for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
					this.currentMarkers[i].remove();
				}
			}
			var oneMarker = new mapboxgl.Marker().setLngLat(evt.lngLat).addTo(map);
			this.currentMarkers.push(oneMarker);
			this.lngLat = evt.lngLat;
		},
		async loaded(map) {},

		geolocate(control, position) {
			this.loclng = position.coords.longitude;
			this.loclat = position.coords.latitude;
		},
		async updateLocation() {
			try {
				this.$q
					.dialog({
						title: "Confirm",
						message: "Would you like to save this data?",
						cancel: true,
						persistent: true,
					})
					.onOk(async () => {
						this.loading = true;
						const par = {
							id: this.mapData.id,
							name: this.mapData.brgy_name,
							loc: this.lngLat,
						};
						const { data } = await new Resource("updateLocation").store(par);
						this.$q.notify(data.Message);
						if (data.status === "success") {
							EventBus.$emit("list");
						}
						this.loading = false;
					});
			} catch (error) {
				this.loading = false;
			}
		},
		async showConfirmed() {
			this.$refs.command.onShow(2);
		},
	},
};
</script>
<style scoped>
#map {
	width: 100%;
	height: 100vh;
}
</style>
