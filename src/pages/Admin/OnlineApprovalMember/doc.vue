<template>
	<div>
		<gallery
			class="text-center"
			:images="imageGalley"
			:index="index"
			@close="index = null"
		></gallery>

		<q-card v-if="skel" style="max-width: 100%">
			<q-item>
				<q-item-section avatar>
					<q-skeleton type="QAvatar" />
				</q-item-section>

				<q-item-section>
					<q-item-label>
						<q-skeleton type="text" />
					</q-item-label>
					<q-item-label caption>
						<q-skeleton type="text" />
					</q-item-label>
				</q-item-section>
			</q-item>
			<q-separator />
			<q-item>
				<q-item-section avatar>
					<q-skeleton type="QAvatar" />
				</q-item-section>

				<q-item-section>
					<q-item-label>
						<q-skeleton type="text" />
					</q-item-label>
					<q-item-label caption>
						<q-skeleton type="text" />
					</q-item-label>
				</q-item-section>
			</q-item>
		</q-card>
		<q-list v-else bordered separator padding>
			<q-item
				clickable
				v-ripple
				v-for="(image, imageIndex) in images"
				:key="imageIndex"
			>
				<q-item-section>
					<a @click="viewImage(image)">{{ image.description }}</a>
				</q-item-section>
				<q-item-section side>
					<q-img
						:src="image.image"
						style="width: 50px"
						ratio="1"
						spinner-color="white"
						class="rounded-borders"
						@click="index = imageIndex"
					>
					</q-img>
				</q-item-section>
			</q-item>
		</q-list>
	</div>
</template>
<script>
import VueGallery from "vue-gallery";
export default {
	components: {
		gallery: VueGallery,
	},
	props: {
		skel: { type: Boolean, default: false },
		images: Array,
		showRemove: { type: Boolean, default: true },
		count: { type: Number, default: 1 },
	},
	data() {
		return {
			index: null,
			image: [],
		};
	},
	watch: {
		images: function (Val) {},
	},
	computed: {
		imageGalley() {
			var image = this.images;
			const result = [];
			for (let i = 0; i < image.length; i++) {
				result.push(image[i].image);
			}
			return result;
		},
		imageCount() {
			return this.images.length;
		},
	},

	methods: {
		remove(item) {
			this.$emit("remove", item);
		},
		viewImage(item) {
			if (item.image.includes("blob")) {
				this.downloadBlob(item.image, item.description);
			} else {
				window.open(item.image);
			}
		},
		downloadBlob(blob, name = "file.txt") {
			// Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
			const blobUrl = blob;

			// Create a link element
			const link = document.createElement("a");

			// Set link's href to point to the Blob URL
			link.href = blobUrl;
			link.download = name;

			// Append link to the body
			document.body.appendChild(link);

			// Dispatch click event on the link
			// This is necessary as link.click() does not work on the latest firefox
			link.dispatchEvent(
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window,
				})
			);

			// Remove link from body
			document.body.removeChild(link);
		},
	},
};
</script>
