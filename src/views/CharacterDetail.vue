<template>
  <base-layout
    page-title="Details page"
    page-default-back-link="/characters"
  >
    <Loading v-if="isLoading" />

    <p
      v-else-if="!isLoading && error"
      class="error"
    >
      Something went wrong. Please try again.
    </p>

    <p
      v-else-if="!isLoading && !character"
      class="error"
    >
      No matching character found.
    </p>

    <div v-else>
      <ion-img
        :alt="character.name"
        :src="character.image"
      />

      <div class="heading">
        <h2>{{ character.name }}</h2>
      </div>

      <div class="paragraph">
        <p><strong>Species:</strong> {{ character.species }}</p>
        <p><strong>Location:</strong> {{ character.location.name }}</p>
        <p><strong>Status:</strong> {{ character.status }}</p>
      </div>

      <Episodes :character="character" />
    </div>
  </base-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { IonImg } from "@ionic/vue";

import { API_URL } from "../js/const";

import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "CharacterDetailPage",
  components: {
    Loading,
    IonImg,
  },
  props: {
    characterId: {
      default: 1,
      type: Number,
      required: false,
    },
  },
  setup() {
    const character = ref(null);
    const error = ref(null);
    const isLoading = ref(false);

    return { character, error, isLoading };
  },
  mounted() {
    this.getCharacter(this.characterId);
  },
  methods: {
    /**
     * Get the character API response.
     *
     * @param {String} characterId - The characterId of the character.
     * @return {Promise}
     */
    getCharacter(characterId) {
      this.isLoading = true;
      this.error = null;
      fetch(API_URL + characterId)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isLoading = false;
          this.character = data;
        })
        .catch((error) => {
          console.error(`Failed getCharacter(): ${error}`);
          this.isLoading = false;
          this.error = error;
        });
    }
  },
});
</script>
