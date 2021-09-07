<template>
  <ion-list>
    <div v-if="memories.length">
      <memory-list-item
        v-for="memory in memories"
        :key="memory.id"
        :memory="memory"
        @delete-item="$emit('delete-item', $event)"
      />
    </div>

    <p
      v-else
      class="ion-text-center"
    >
      No memories found.
    </p>
  </ion-list>
</template>

<script>
import { defineComponent } from "vue";
import { IonList } from "@ionic/vue";

import MemoryListItem from "./ListItem.vue";

export default defineComponent({
  name: "List",
  components: {
    IonList,
    MemoryListItem,
  },
  props: {
    memories: {
      default: () => [],
      type: Array,
      required: false,
    },
  },
  emits: ["delete-item"],
});
</script>
