<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { defineComponent } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  mounted() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    this.toggleDarkTheme(prefersDark.matches);

    prefersDark.addListener((mediaQuery) =>
      this.toggleDarkTheme(mediaQuery.matches)
    );
  },
  methods: {
    /**
     * Add or remove the "dark" class based on if the media query matches.
     *
     * @param {boolean} shouldAdd - Whether or not the media query matches.
     */
    toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle("dark", shouldAdd);
    },
  },
});
</script>

<style>
@import "./css/main.css";
</style>
