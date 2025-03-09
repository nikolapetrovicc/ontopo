<template>
    <div class="bg-gray-100 p-4 md:p-8 rounded-2xl max-w-4xl mx-auto">
        <div class="space-y-4">
            <restaurant-card v-for="restaurant in restaurants" :key="restaurant.post.slug" :restaurant="restaurant"
                @expand="$emit('expandRestaurant', restaurant)" />

            <!-- Load More Button -->
            <div v-if="hasMoreResults" class="flex justify-center mt-8">
                <button @click="$emit('loadMore')"
                    class="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md shadow-sm hover:bg-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    :disabled="isLoading">
                    <span v-if="isLoading">Loading...</span>
                    <span v-else>Load More</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '../stores/searchStore';
import RestaurantCard from './RestaurantCard.vue';

const { restaurants } = useSearchStore();

defineProps({
    hasMoreResults: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

defineEmits(['expandRestaurant', 'loadMore']);
</script>