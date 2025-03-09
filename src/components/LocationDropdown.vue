<template>
    <div class="relative" ref="dropdownContainer">
        <button class="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
            @click.stop="isOpen = !isOpen">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ selectedLocation }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>

        <div v-if="isOpen" class="absolute z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
            <ul>
                <li v-for="location in locations" :key="location" @click="selectLocation(location)"
                    class="p-4 hover:bg-gray-100 cursor-pointer">
                    {{ location }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const selectedLocation = ref('Beograd');
const locations = ['Beograd'];

const dropdownContainer = ref<HTMLElement | null>(null);

const selectLocation = (location: string) => {
    selectedLocation.value = location;
    isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    if (
        isOpen.value &&
        dropdownContainer.value &&
        !dropdownContainer.value.contains(event.target as Node)
    ) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>