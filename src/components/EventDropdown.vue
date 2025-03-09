<template>
    <div class="relative" ref="dropdownContainer">
        <button class="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
            @click.stop="isOpen = !isOpen" ref="dropdownButton">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{{ selectedEvent }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>

        <div v-if="isOpen" class="absolute z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1"
            ref="dropdownList">
            <ul>
                <li v-for="event in events" :key="event" @click="selectEvent(event)"
                    class="p-4 hover:bg-gray-100 cursor-pointer">
                    {{ event }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";

const isOpen = ref(false);
const selectedEvent = ref("Restorani");
const events = reactive(["Restorani", "Barovi"]);

const dropdownContainer = ref<HTMLElement | null>(null);
const dropdownButton = ref<HTMLElement | null>(null);
const dropdownList = ref<HTMLElement | null>(null);

const selectEvent = (event: string) => {
    selectedEvent.value = event;
    isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    if (isOpen.value && dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>
