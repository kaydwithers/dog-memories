<template>
  <form
    class="ion-padding"
    @submit.prevent="onSaveChanges"
  >
    <ion-list>
      <ion-item>
        <ion-label position="floating">
          Title
        </ion-label>
        <ion-input
          v-model="loadedItem.title"
          required
          type="text"
        />
      </ion-item>

      <ion-item>
        <div v-if="loadedImage">
          <ion-thumbnail slot="start">
            <img
              :src="loadedImage"
              alt=""
            >
          </ion-thumbnail>
        </div>

        <ion-button
          fill="clear"
          size="large"
          type="button"
          @click="onTakePhoto"
        >
          <h2>📷</h2>
        </ion-button>
      </ion-item>

      <ion-item>
        <ion-label position="floating">
          Description
        </ion-label>
        <ion-textarea
          v-model="loadedItem.description"
          rows="5"
        />
      </ion-item>

      <ion-button
        :disabled="!isFormValid"
        expand="full"
        type="submit"
      >
        Save
      </ion-button>
    </ion-list>
  </form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonThumbnail,
} from "@ionic/vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

export default defineComponent({
  name: "Form",
  components: {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTextarea,
    IonThumbnail,
  },
  emits: ["save-item", "show-toast"],
  setup() {
    const filePicker = ref(null)
    const route = useRoute();
    const itemId = ref(route.params.id);
    const takenImageUrl = ref(null);

    return {
      filePicker,
      itemId,
      takenImageUrl,
    };
  },
  computed: {
    loadedItem() {
      return this.$store.getters.memory(this.itemId) || {};
    },
    isFormValid() {
      return this.loadedItem.description !== "" && this.loadedItem.title !== "";
    },
    loadedImage() {
      return this.loadedItem.image ? this.loadedItem.image : this.takenImageUrl;
    }
  },
  methods: {
    /** Handle the click of the Save button. */
    onSaveChanges() {
      if (
        this.loadedItem.description.trim() === "" ||
        this.loadedItem.title.trim() === ""
      ) {
        return;
      }

      const itemData = {
        date: new Date(),
        description: this.loadedItem.description,
        id: this.loadedItem.id,
        image: this.loadedImage,
        title: this.loadedItem.title,
      };

      this.$emit("save-item", itemData);
      this.$emit("show-toast");
    },

    /** Handle the click of the camera icon. */
    async onTakePhoto() {
      if (!Capacitor.isPluginAvailable("Camera")) {
        return;
      }

      try {
        const image = await Camera.getPhoto({
          allowEditing: true,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 80,
          width: 500,
        });

        if (!image || !image.path || !image.webPath) {
          return;
        }

        this.takenImageUrl = image.webPath;
      } catch (error) {
        this.openFilePicker();
        console.warn(error);
      }
    },
  },
});
</script>
