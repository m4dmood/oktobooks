import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('currentUser', () => {
    const user = ref(null);

    return { user };
});