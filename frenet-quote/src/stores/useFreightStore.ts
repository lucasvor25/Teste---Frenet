import { defineStore } from "pinia";
import { ref } from "vue";

export const useFreightStore = defineStore("freight", () => {
    const history = ref<any[]>(JSON.parse(localStorage.getItem("history") || "[]"));

    const addToHistory = (data: any) => {
        history.value.unshift(data);
        localStorage.setItem("history", JSON.stringify(history.value))
    }

    return { history, addToHistory }
})