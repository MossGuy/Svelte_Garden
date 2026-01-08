import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
    const query = url.searchParams.get('query');

    if (!query) {
        return {
            query: null,
            results: []
        };
    }

    const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch search results');
    }

    const data = await res.json();

    return {
        query,
        results: data.hits
    };
};



