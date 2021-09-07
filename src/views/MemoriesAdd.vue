<template>
  <base-layout
    page-title="Add memory"
    page-default-back-link="/memories"
  >
    <memories-add />
  </base-layout>
</template>

<script>
import { defineComponent } from "vue";

import MemoriesAdd from "../components/Memories/Add.vue";

export default defineComponent({
  name: "MemoriesAddPage",
  components: {
    MemoriesAdd,
  },
});
</script>
