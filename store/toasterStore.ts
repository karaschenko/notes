import { defineStore } from "pinia";
import { ToasterState } from "~/types/types";

export const useToasterStore = defineStore("toaster", {
  state: (): ToasterState => ({
    text: null,
    showToaster: false,
  }),

  actions: {
    showToast(text: string, seconds: number = 3) {
      this.text = text;
      this.showToaster = true;
      setTimeout(() => {
        this.hideToaster();
      }, seconds * 1000);
    },

    hideToaster() {
      this.showToaster = false;
      this.text = null;
    },
  },
});
