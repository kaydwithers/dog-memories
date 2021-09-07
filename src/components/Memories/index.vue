<template>
  <div v-if="loadedItem.image">
    <ion-img
      :src="loadedItem.image"
      :alt="loadedItem.title"
    />
  </div>

  <h2 class="ion-text-center">
    {{ loadedItem.title }}
  </h2>

  <p class="ion-text-center">
    {{ loadedItem.date }}
  </p>

  <p class="ion-text-center">
    {{ loadedItem.description }}
  </p>

  <div class="ion-text-center">
    <ion-button
      fill="clear"
      size="large"
      @click="onRemoveItem(loadedItem.id)"
    >
      <h2>🗑️</h2>
    </ion-button>

    <ion-button
      fill="clear"
      size="large"
      @click="onUpdateItem(loadedItem.id)"
    >
      <h2>✏️</h2>
    </ion-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { IonButton, IonImg } from "@ionic/vue";

export default defineComponent({
  name: "Memories",
  components: {
    IonButton,
    IonImg,
  },
  props: {
    loadedItem: {
      default: () => {},
      type: Object,
      required: false,
    },
  },
  methods: {
    /**
     * Handle the click of the remove icon.
     * 
     * @param {string} itemId
    */
    onRemoveItem(itemId) {
      this.$store.commit("removeItem", itemId);
      this.$router.replace("/memories");
      this.showToast();
    },

    /**
     * Handle the click of the edit icon.
     * 
     * @param {string} itemId
    */
    onUpdateItem(itemId) {
      this.$router.replace(`/memories/update/${itemId}`);
    },

    /**
     * Show the toast component.
    */
    showToast() {
      const toastData = {
        message: "Memory has been deleted.",
        isOpen: true,  
      };

      this.$store.commit("showToast", toastData);
    },
  }
});
</script>
