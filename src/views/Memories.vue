<template>
  <base-layout page-title="All memories">
    <template #actions-end>
      <ion-button :router-link="`/memories/add`">
        <ion-icon
          slot="icon-only"
          :icon="add"
        />
      </ion-button>
    </template>

    <memories-list :memories="memories" />

    <ion-toast
      color="primary"
      :is-open="toast.isOpen"
      :message="toast.message"
      :duration="2000"
      @did-dismiss="onDismiss"
    />
  </base-layout>
</template>

<script>
import { defineComponent } from "vue";
import { IonButton, IonIcon, IonToast } from "@ionic/vue";
import { add } from "ionicons/icons";

import MemoriesList from "../components/Memories/List.vue";

export default defineComponent({
  name: "MemoriesPage",
  components: {
    IonButton,
    IonIcon,
    IonToast,
    MemoriesList,
  },
  setup() {
    return {
      add,
    };
  },
  computed: {
    memories() {
      return this.$store.getters.memories;
    },
    toast() {
      return this.$store.getters.toast;
    },
  },
  methods: {
    /**
     * Handle the toast dismissal.
     */
    onDismiss() {
      this.$store.getters.toast.isOpen = false;
    },
  },
});
</script>
