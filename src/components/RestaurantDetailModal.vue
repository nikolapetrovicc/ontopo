<template>
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click="closeDialog">
        <div class="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" @click.stop>
            <!-- Restaurant Header -->
            <div class="p-6 flex items-start justify-between">
                <div class="flex items-start gap-4">
                    <img src=" /restaurant.jpg" alt="ontopo" class="w-20 h-20 flex-shrink-0 rounded-lg object-cover" />
                    <div>
                        <h3 class="text-xl font-bold">{{ restaurant.post.venue_name }}</h3>
                        <p class="text-gray-600">{{ restaurant.post.address || 'Vojvode Stepe 118' }}</p>
                        <p class="text-gray-600">Beograd</p>
                    </div>
                </div>
            </div>

            <!-- Available Times Section -->
            <div class="bg-gray-50 rounded-lg p-6 mx-4 mb-6">
                <h4 class="text-xl font-semibold mb-2">Pronašli smo nekoliko slobodnih stolova za tebe!</h4>
                <p class="text-gray-500 mb-8">
                    {{ formatDate(restaurant.availability.formattedRequest.date) }} |
                    oko {{ formatTime(currentTime) }}
                </p>

                <!-- Areas with Time Slots -->
                <div v-for="area in restaurant.availability.areas" :key="area.id" class="mb-8 last:mb-0">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex items-center">
                            <h5 class="font-bold text-lg">{{ area.name }}</h5>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        <button v-for="option in area.options" :key="option.time"
                            class="reservation-btn border-2 border-gray-200 rounded-xl p-3 text-center hover:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-200 flex flex-col items-center relative overflow-hidden active:scale-[0.98] group">
                            <div class="text-base font-medium">{{ formatTime(option.time) }}</div>
                            <div class="flex items-center mt-1">
                                <div class="w-2 h-2 bg-cyan-600 rounded-full mr-2"></div>
                                <div class="text-sm text-cyan-700">Rezerviši sada</div>
                            </div>
                            <div
                                class="absolute inset-0 bg-cyan-600/5 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-xl">
                            </div>
                        </button>
                    </div>
                </div>
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
    },
    currentTime: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['close']);

const { formatTime, formatDate } = useFormatters();

const closeDialog = (event: { target: any; currentTarget: any; }) => {
    if (event.target === event.currentTarget) {
        emit('close');
    }
};
</script>