import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      memories: [
        {
          date: new Date().toISOString(),
          id: "1",
          title: "Nap time",
          description: "I had a big nap with my friend Samantha.",
          image: "https://placedog.net/500/500?id=1",
        },
        {
          date: new Date().toISOString(),
          id: "2",
          title: "Flowers are great",
          description: "I played in a field of flowers with my friend Barry.",
          image: "https://placedog.net/500/500?id=2",
        },
        {
          date: new Date().toISOString(),
          id: "3",
          title: "Working hard",
          description: "Today I had to work in the office.",
          image: "https://placedog.net/500/500?id=3",
        },
        {
          date: new Date().toISOString(),
          id: "4",
          title: "Nap time again",
          description: "I love naps.",
          image: "https://placedog.net/500/500?id=4",
        },
        {
          date: new Date().toISOString(),
          id: "5",
          title: "Adventuring",
          description: "Looked at some pine trees and barked at birds.",
          image: "https://placedog.net/500/500?id=5",
        },
      ],
      toast: {
        isOpen: false,
        message: "",
      },
    };
  },
  mutations: {
    /**
     * Add an item.
     *
     * @param {array} state
     * @param {object} payload - The payload object.
     */
    addItem(state, payload) {
      state.memories.push(payload);
    },

    /**
     * Remove an item.
     *
     * @param {array} state
     * @param {string} itemId - The item ID.
     */
    removeItem(state, itemId) {
      state.memories = state.memories.filter((item) => item.id !== itemId);
    },

    /**
     * Show the toast component.
     *
     * @param {array} state
     * @param {object} payload - The payload object.
     */
    showToast(state, payload) {
      state.toast = payload;
    },

    /**
     * Update an item.
     *
     * @param {array} state
     * @param {object} payload - The payload object.
     */
    updateItem(state, payload) {
      const memory = state.memories.find((item) => {
        return item.id === payload.id;
      });

      if (payload.description) {
        memory.description = payload.description;
      }
      if (payload.image) {
        memory.image = payload.image;
      }
      if (payload.title) {
        memory.title = payload.title;
      }
    },
  },
  actions: {
    addItem({ commit }, payload) {
      const item = {
        date: new Date().toISOString(),
        description: payload.description,
        id: new Date().toISOString(),
        imageUrl: payload.image,
        title: payload.title,
      };

      commit("addItem", item);
    },

    updateItem({ commit }, payload) {
      const updatedItem = {};

      if (payload.description) {
        updatedItem.description = payload.description;
      }
      if (payload.image) {
        updatedItem.image = payload.image;
      }
      if (payload.title) {
        updatedItem.title = payload.title;
      }

      commit("updateItem", payload);
    },
  },
  getters: {
    toast(state) {
      return state.toast;
    },

    memories(state) {
      return state.memories;
    },

    memory(state) {
      return (memoryId) => {
        return state.memories.find((memory) => memory.id === memoryId);
      };
    },
  },
});

export default store;
