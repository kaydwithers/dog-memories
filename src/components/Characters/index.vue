<template>
  <ion-grid>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ randomName() }} &amp; {{ randomName() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-row>
      <Character
        v-for="character in characters"
        :key="character.id"
        :character="character"
        @character-select="$emit('character-select', $event)"
      />
    </ion-row>
  </ion-grid>
</template>

<script>
import { defineComponent } from 'vue';
import { IonHeader, IonGrid, IonRow, IonToolbar, IonTitle } from "@ionic/vue";

import Character from "./Character.vue";

export default defineComponent({
  name: "CharactersIndex",
  components: {
    Character,
    IonGrid,
    IonRow,
    IonHeader,
    IonToolbar,
    IonTitle,
  },
  props: {
    characters: {
      type: Object,
      required: true,
    },
  },
  emits: ["character-select"],
  methods: {
    /**
     * Returns a random character name.
     * 
     * @returns {string} A random character name.
     */
    randomName() {
      const index = Math.floor(Math.random() * this.characters.length);
      return this.characters[index].name;
    },
  },
});
</script>
