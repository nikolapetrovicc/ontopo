import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { useApiService } from '../services/apiService';

const apiService = useApiService();

export interface SearchCriteria {
    date: string;
    time: string;
    size: string;
}

export interface Restaurant {
    post: {
        slug: string;
        version: number;
        venue_name: string;
        page_slug: string;
        score: number;
        availability_search: number;
    };
    availability: {
        page: {
            title: string;
            showLess: string;
            showMore: string;
            subtitle: string;
            generalError: string;
        };
        areas: Array<{
            id: string;
            icon: string;
            name: string;
            text: string;
            options: Array<{
                time: string;
                method: string;
                text: string;
                score: number;
            }>;
            score: number;
        }>;
        recommended: Array<{
            id: string;
            time: string;
            method: string;
            text: string;
        }>;
        method: string;
        formattedRequest: {
            date: string;
            mediumDate: string;
            shortDate: string;
            time: string;
            size: string;
            service: string;
        };
        availability_id: string;
    };
}

export const useSearchStore = defineStore("search", () => {
    const authStore = useAuthStore();

    const searchId = ref<string | null>(null);
    const restaurants = ref<Restaurant[]>([]);
    const totalResults = ref(0);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const criteria = ref<SearchCriteria>({
        date: "",
        time: "",
        size: "",
    });

    const hasMoreResults = computed(() => {
        return restaurants.value.length < totalResults.value;
    });

    async function createSearchToken(searchCriteria: SearchCriteria): Promise<any> {
        isLoading.value = true;
        error.value = null;
        criteria.value = searchCriteria;

        try {
            if (!authStore.jwtToken) {
                await authStore.loginAnonymously();
            }

            const response = await apiService.createSearchToken(authStore.jwtToken as string, {
                criteria: searchCriteria,
                marketplace_id: "15380287",
                locale: "en",
                geocodes: ["belgrade"],
            });

            searchId.value = response.search_id;
            restaurants.value = [];

            return await fetchSearchResults();
        } catch (err: any) {
            error.value = "Failed to create search token: " + err.message;
            console.error(err);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchSearchResults(): Promise<any> {
        if (!searchId.value || !authStore.jwtToken) {
            error.value = "No active search or missing authentication";
            return null;
        }

        isLoading.value = true;
        error.value = null;

        try {
            const response = await apiService.searchRequest(authStore.jwtToken, searchId.value);

            if (response.posts && response.posts.length > 0) {
                restaurants.value.push(...response.posts);
            }
            totalResults.value = response.total;

            return response;
        } catch (err: any) {
            error.value = "Failed to fetch search results: " + err.message;
            console.error(err);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    function resetSearch() {
        searchId.value = null;
        restaurants.value = [];
        totalResults.value = 0;
        error.value = null;
    }

    return {
        searchId,
        restaurants,
        totalResults,
        isLoading,
        error,
        criteria,
        hasMoreResults,
        createSearchToken,
        fetchSearchResults,
        resetSearch,
    };
});