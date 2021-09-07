<template>
  <ion-footer>
    <ion-button
      color="primary"
      size="large"
      @click="$emit('previous-page')"
    >
      <ion-icon
        slot="icon-only"
        :icon="arrowBackOutline"
      />
    </ion-button>

    <ion-button
      color="primary"
      size="large"
      @click="$emit('next-page')"
    >
      <ion-icon
        slot="icon-only"
        :icon="arrowForwardOutline"
      />
    </ion-button>
  </ion-footer>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButton, IonFooter, IonIcon } from "@ionic/vue";
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';

export default defineComponent({
  name: "BaseFooter",
  components: {
    IonButton,
    IonFooter,
    IonIcon,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["previous-page", "next-page"],
  setup() {
    return {
      arrowBackOutline,
      arrowForwardOutline,
    }
  }
});
</script>
