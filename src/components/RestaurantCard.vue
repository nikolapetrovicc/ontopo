<template>
    <div class="bg-white rounded-2xl border-gray-100 overflow-hidden">
        <div class="flex flex-col md:flex-row">
            <!-- Restaurant Image -->
            <div class="relative w-full md:w-1/3 h-48 md:h-auto">
                <div v-if="restaurant.post.benefit"
                    class="absolute top-2 left-2 bg-cyan-600 rounded-full text-white text-xs font-bold px-2 py-1">
                    NEW
                </div>
                <img src=" /restaurant.jpg" alt="ontōpo logo" class="w-full h-full object-cover" />
            </div>

            <!-- Restaurant Info -->
            <div class="p-4 md:p-6 md:w-1/3 flex-1">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ restaurant.post.venue_name }}</h3>
                <!-- Nema podataka o adresi -->
                <p class="font-semibold text-gray-600 mb-1">Južni bulevar 112</p>
                <p class="font-semibold text-gray-600">Beograd</p>
            </div>

            <!-- Available Times -->
            <div class="p-4 md:p-6 md:w-1/4 flex flex-col justify-center space-y-2">
                <div
                    v-if="restaurant.availability && restaurant.availability.recommended && restaurant.availability.recommended.length > 0">
                    <div v-for="(rec, index) in restaurant.availability.recommended.slice(0, 2)" :key="index"
                        class="border-1 rounded-2xl border-gray-500 p-1 text-center mb-2 hover:bg-zinc-50 cursor-pointer">
                        <p class="font-medium">{{ formatTime(rec.time) }}</p>
                        <div class="flex items-center justify-center">
                            <div class="bg-cyan-600 rounded-full p-0.5 mr-2"></div>
                            <p class="font-light">{{ rec.id }}</p>
                        </div>
                    </div>
                </div>

                <!-- Show More Button -->
                <button @click="$emit('expand', restaurant)"
                    class="flex items-center justify-center text-gray-800 mt-2 cursor-pointer">
                    <p class="font-medium">{{ restaurant.availability.page.showMore }}</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFormatters } from '../utils/useFormatters';


defineProps({
    restaurant: {
        type: Object,
        required: true
    }
});

defineEmits(['expand']);

const { formatTime } = useFormatters();
</script>