<template>
  <memory-form
    @save-item="onSaveChanges"
    @show-toast="onShowToast"
  />
</template>

<script>
import { defineComponent } from "vue";

import MemoryForm from "./Form.vue";

export default defineComponent({
  name: "Add",
  components: {
    MemoryForm,
  },
  emits: ["show-toast"],
  methods: {
    /** Handle the click of the Save button. */
    onSaveChanges(itemData) {
      this.$store.dispatch("addItem", itemData);
      this.$router.push("/memories");
    },

    /** Handle the data for toast. */
    onShowToast() {
      const toastData = {
        message: "Memory has been added.",
        isOpen: true,  
      }

      this.$store.commit("showToast", toastData);
    },
  },
});
</script>
