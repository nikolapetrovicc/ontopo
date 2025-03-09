export interface LoginResponse {
    jwt_token: string;
    refresh_token: string;
}

export interface SearchTokenRequest {
    criteria: any;
    marketplace_id: string;
    locale: string;
    geocodes: string[];
}

export interface SearchTokenResponse {
    search_id: string;
}

export interface SearchRequestResponse {
    posts: any[];
    total: number;
}

export const useApiService = () => {
    const baseUrl = "https://site.ontopo.work/api";

    const loginAnonymously = async (): Promise<LoginResponse> => {
        const response = await fetch(`${baseUrl}/loginAnonymously`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }

        return await response.json();
    };

    const createSearchToken = async (
        token: string,
        data: SearchTokenRequest
    ): Promise<SearchTokenResponse> => {
        const response = await fetch(`${baseUrl}/search_token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Create search token failed: ${response.status}`);
        }

        return await response.json();
    };

    const searchRequest = async (
        token: string,
        searchId: string
    ): Promise<SearchRequestResponse> => {
        const response = await fetch(`${baseUrl}/search_request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body: JSON.stringify({ search_id: searchId }),
        });

        if (!response.ok) {
            throw new Error(`Search request failed: ${response.status}`);
        }

        return await response.json();
    };

    return {
        loginAnonymously,
        createSearchToken,
        searchRequest,
    };
}