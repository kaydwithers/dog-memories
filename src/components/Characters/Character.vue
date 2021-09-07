<template>
  <ion-col
    size="12"
    size-md="4"
    size-lg="3"
    size-xl="2"
  >
    <ion-card :router-link="`/character/${character.id}`">
      <ion-img
        :alt="character.name"
        :src="character.image"
      />
      <ion-card-header>
        <ion-card-subtitle>{{ character.type }}</ion-card-subtitle>
        <ion-card-title>{{ character.name }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        {{ character.location.name }}
      </ion-card-content>
    </ion-card>
  </ion-col>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonImg,
} from "@ionic/vue";

export default defineComponent({
  name: "Character",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonImg,
  },
  props: {
    character: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  emits: {
    "character-select": (id) => {
      if (id) {
        return true;
      } else {
        console.warn("id is missing.");
        return false;
      }
    },
  },
  methods: {
    /**
     * Handle the click of a character selection.
     */
    handleCharacterSelect() {
      this.$emit("character-select", this.character.id);
    },
  },
});
</script>
