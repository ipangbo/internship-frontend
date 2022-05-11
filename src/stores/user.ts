import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    username: "",
  }),
  getters: {
    getUsername: (state) => `您是${state.username}`,
  },
  actions: {
    modifyUsername() {
      this.username = "已更改";
    },
  },
});
