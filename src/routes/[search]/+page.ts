export const load = async ({ url, fetch, depends }) => {
    depends('hn:search');

    const query = url.searchParams.get('query');

    if (!query) {
        return { query: null, results: [] };
    }

    const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}`
    );

    const data = await res.json();

    return {
        query,
        results: data.hits
    };
};
