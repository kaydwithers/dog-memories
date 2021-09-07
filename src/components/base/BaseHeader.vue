<template>
  <header>
    <ion-item>
      <ion-label>
        🔍
      </ion-label>
      <ion-input
        placeholder="Search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <ion-button
        v-if="hasTheme"
        @click="handleTheme()"
      >
        🌞
      </ion-button>
      <ion-button
        v-else
        @click="handleTheme()"
      >
        🌚
      </ion-button>
    </ion-item>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/vue";

export default defineComponent({
  name: "Header",
  components: {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
  },
  props: {
    modelValue: {
      default: '',
      type: String,
      required: false,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    return {
      hasTheme: false,
    }
  },
  mounted() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.handleTheme(prefersDark.matches);
  },
  methods: {
    /**
     * Handle the click of the theme buttons.
     *
     * @param {String} theme - The theme to add.
     */
    handleTheme(shouldAdd) {
      this.hasTheme = !this.hasTheme;
      document.body.classList.toggle('dark', shouldAdd);
    },
  },
});
</script>
