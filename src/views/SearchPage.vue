<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Search Form -->
        <search-form :is-loading="authStore.isLoading || searchStore.isLoading" @search="handleSearch" />

        <!-- Error Message -->
        <div v-if="searchStore.error || authStore.error"
            class="bg-red-50 border-1 border-red-600 text-red-700 p-4 md:p-8 rounded-2xl max-w-4xl mx-auto">
            {{ searchStore.error || authStore.error }}
        </div>

        <!-- Restaurant List -->
        <div v-if="searchStore.restaurants.length > 0" class="space-y-6">
            <restaurant-list :restaurants="searchStore.restaurants" :has-more-results="searchStore.hasMoreResults"
                :is-loading="searchStore.isLoading" @expand-restaurant="expandRestaurant" @load-more="loadMore" />
        </div>

        <!-- No Results Message -->
        <div v-else-if="!searchStore.isLoading && !searchStore.error && searchPerformed"
            class="bg-white shadow rounded-lg p-6 text-center">
            <p class="text-gray-700">No restaurants found. Please try different search criteria.</p>
        </div>

        <!-- Loading Indicator -->
        <div v-if="searchStore.isLoading && !searchStore.restaurants.length" class="flex justify-center my-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-b-sky-900"></div>
        </div>

        <!-- Restaurant Detail Modal -->
        <restaurant-detail-modal v-if="expandedRestaurant" :restaurant="expandedRestaurant"
            :current-time="searchForm.time" @close="expandedRestaurant = null" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useSearchStore, type SearchCriteria } from '../stores/searchStore';
import SearchForm from '../components/SearchForm.vue';
import RestaurantList from '../components/RestaurantList.vue';
import RestaurantDetailModal from '../components/RestaurantDetailModal.vue';


const authStore = useAuthStore();
const searchStore = useSearchStore();

// Search form data
const searchForm = reactive<SearchCriteria>({
    date: '',
    time: '',
    size: ''
});

const searchPerformed = ref(false);
const expandedRestaurant = ref(null);

// Initialize on component mount
onMounted(async () => {
    // Login anonymously when the component is mounted
    await authStore.loginAnonymously();
});

// Methods
async function handleSearch(criteria: { date: string; time: string; size: string; }) {
    searchForm.date = criteria.date;
    searchForm.time = criteria.time;
    searchForm.size = criteria.size;

    searchPerformed.value = true;
    await searchStore.createSearchToken(searchForm);
}

async function loadMore() {
    await searchStore.fetchSearchResults();
}

function expandRestaurant(restaurant: null) {
    expandedRestaurant.value = restaurant;
    console.log("expandRestaurant", restaurant);

}
</script>