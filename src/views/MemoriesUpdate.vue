<template>
  <base-layout
    page-title="Update memory"
    page-default-back-link="/memories"
  >
    <memories-update
      :loaded-item="loadedItem"
    />
  </base-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import MemoriesUpdate from "../components/Memories/Update.vue";

export default defineComponent({
  name: "MemoriesUpdatePage",
  components: {
    MemoriesUpdate,
  },
  setup() {
    const route = useRoute();
    const itemId = ref(route.params.id);

    return { itemId };
  },
  computed: {
    loadedItem() {
      return this.$store.getters.memory(this.itemId);
    },
  },
});
</script>
