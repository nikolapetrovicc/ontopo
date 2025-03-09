import { ref } from "vue";
import { defineStore } from "pinia";
import { useApiService } from '../services/apiService';


interface LoginResponse {
    jwt_token: string;
    refresh_token: string;
}

const apiService = useApiService();

export const useAuthStore = defineStore("auth", () => {
    const jwtToken = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function loginAnonymously(): Promise<LoginResponse | null> {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await apiService.loginAnonymously() as LoginResponse;
            jwtToken.value = response.jwt_token;
            refreshToken.value = response.refresh_token;
            return response;
        } catch (err: any) {
            error.value = "Failed to login anonymously: " + err.message;
            console.error(err);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        jwtToken,
        refreshToken,
        isLoading,
        error,
        loginAnonymously,
    };
});