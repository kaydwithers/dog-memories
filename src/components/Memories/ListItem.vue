<template>
  <ion-item :router-link="`/memories/${memory.id}`">
    <ion-thumbnail
      slot="start"
    >
      <ion-img
        v-if="memory.image"
        :src="memory.image"
        :alt="memory.title"
      />
    </ion-thumbnail>

    <ion-label>
      {{ memory.title }}
    </ion-label>
  </ion-item>
</template>

<script>
import { defineComponent } from "vue";
import { IonImg, IonItem, IonLabel, IonThumbnail } from "@ionic/vue";

export default defineComponent({
  name: "ListItem",
  components: {
    IonImg,
    IonItem,
    IonLabel,
    IonThumbnail,
  },
  props: {
    memory: {
      default: () => {},
      type: Object,
      required: false,
    },
  },
});
</script>
