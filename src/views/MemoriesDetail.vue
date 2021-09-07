<template>
  <base-layout
    :page-title="loadedItem ? loadedItem.title : 'Loading&hellip;'"
    page-default-back-link="/memories"
  >
    <p
      v-if="!loadedItem"
      class="ion-text-center"
    >
      Could not find a memory for the given id.
    </p>

    <memories
      v-else
      :loaded-item="loadedItem"
    />
  </base-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import Memories from "../components/Memories/index.vue";

export default defineComponent({
  name: "MemoriesDetailPage",
  components: {
    Memories,
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
  // watch: {
  //   $route(currentRoute) {
  //     this.itemId = currentRoute.params.id;
  //   },
  // },
});
</script>
