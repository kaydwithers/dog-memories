<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <BaseHeader
        v-model="searchText"
        @update:modelValue="getCharacters(`?name=${searchText}`)"
      />

      <Loading v-if="isLoading" />

      <p 
        v-else-if="!isLoading && error" 
        class="error"
      >
        Something went wrong. Please try again.
      </p>

      <p
        v-else-if="!isLoading && (!characters || characters.length === 0)"
        class="error"
      >
        No characters found.
      </p>

      <Characters
        v-else
        :characters="characters"
        @character-select="handleCharacterSelect"
      />

      <BaseFooter
        @next-page="handleNextPage"
        @previous-page="handlePreviousPage"
      />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

import { API_URL } from "../js/const";

import BaseFooter from "../components/base/BaseFooter.vue";
import BaseHeader from "../components/base/BaseHeader.vue";
import Characters from "../components/Characters/index.vue";
import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "CharactersPage",
  components: {
    BaseFooter,
    BaseHeader,
    Characters,
    IonPage,
    IonContent,
    Loading,
  },
  data() {
    return {
      characterId: null,
      characters: [],
      currentPage: 1,
      error: null,
      isLoading: false,
      isModalOpen: false,
      searchText: null,
    };
  },
  mounted() {
    this.getCharacters();
  },
  methods: {
    /**
     * Get the API response.
     *
     * @param {string} param - The API url param.
     * @returns {Promise}
     */
    getCharacters(param = "") {
      this.isLoading = true;
      this.error = null;
      fetch(API_URL + param)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isLoading = false;
          this.characters = data.results;
          console.log(this.characters)
        })
        .catch((error) => {
          console.error(`Failed getCharacters(): ${error}`);
          this.isLoading = false;
          this.error = error;
        });
    },

    /**
     * Handle the click of a character selection.
     *
     * @param {string} id - The ID of the character.
     */
    handleCharacterSelect(id) {
      this.characterId = id;
      this.isModalOpen = true;
    },

    /**
     * Handle the click of the next page button.
     */
    handleNextPage() {
      this.currentPage += 1;
      this.getCharacters(`?page=${this.currentPage}`);
      this.$router.push(`/characters/${this.currentPage}`)
    },

    /**
     * Handle the click of the previous page button.
     */
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.getCharacters(`?page=${this.currentPage}`);
        this.$router.push(`/characters/${this.currentPage}`)
      }
    },
  },
});
</script>
