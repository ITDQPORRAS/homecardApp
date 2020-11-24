<template>
	<div id="app">
		<q-card>
			<q-tlbr @back="goHome" :title="mapData.brgy_name">
				<!-- <q-btn
					size="sm"
					rounded
					color="primary"
					icon="where_to_vote"
					label="OK"
					@click="updateLocation"
				/> -->
			</q-tlbr>
			<div class="row">
				<div class="col-12 col-md-8">
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
				</div>
				<div class="col-12 col-md-4">
					<div class="row q-col-gutter-sm q-pa-sm">
						<div class="col-12">
							<q-input
								dense
								v-model="form.facility_name"
								type="text"
								label="Facility Name"
							/>
						</div>
						<div class="col-12">
							<q-input
								dense
								v-model="form.complete_address"
								type="text"
								label="Complete Address"
							/>
						</div>
						<div class="col-12 q-gutter-sm">
							<q-btn
								size="sm"
								color="primary"
								icon="check"
								label="OK"
								@click="onClick"
							/>
							<q-btn size="sm" icon="close" label="clear" @click="onClick" />
						</div>
						<div class="col-12">
							<q-table
								flat
								title="Facility List"
								:data="data"
								:columns="columns"
								row-key="name"
							/>
						</div>
					</div>
				</div>
			</div>
		</q-card>
	</div>
</template>
<script>
import Mapbox from "mapbox-gl-vue";
import Resource from "@/api/resource";
import mapboxgl from "mapbox-gl";
import EventBus from "./_event";
import axios from "axios";
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
			columns: [
				{ label: "Facility Name", field: "facility_name", align: "left" },
				{ label: "Complete Address", field: "complete_address", align: "left" },
			],
			form: {
				id: 0,
				brgy_id: this.mapData.id,
				facility_name: null,
				complete_address: null,
				longitude: null,
				latitude: null,
			},
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
			this.getReverseGeocode(this.lngLat.lat, this.lngLat.lng);
		},
		async loaded(map) {},

		geolocate(control, position) {
			this.loclng = position.coords.longitude;
			this.loclat = position.coords.latitude;
		},
		getReverseGeocode(lat, lng) {
			var lat = lat;
			var lng = lng;
			var url =
				"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
				lng +
				"," +
				lat +
				".json?access_token=" +
				this.accessToken;

			axios
				.get(url, {
					method: "GET",
					mode: "no-cors",
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
				})
				.then(({ data }) => {
					let par = {
						city: data.features[3].text,
						barangay: data.features[0].properties.address,
						fulladdres: data.features[0].place_name,
						lat: lat,
						lng: lng,
					};

					this.form.complete_address = data.features[0].place_name;
					this.form.latitude = lat;
					this.form.longitude = lng;
					// console.log(par);
					// console.log(response.features[0].place_name);
					// $emit("location", response.features[0].place_name);
					// this.$emit("location", par);
				});
		},
		async onClick() {
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
						let par = { form: this.form };
						const { data } = await new Resource("Map/facility").store(par);
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
