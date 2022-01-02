export const getEntriesByTerm =
    (state) =>
    (terms = '') => {
        if (terms.length === 0) return state.entries;

        return state.entries.filter((entry) =>
            entry.text.toLowerCase().includes(terms.toLowerCase())
        );
    };
export const getEntryById = (state) => (id) => {
    return state.entries.find((entry) => entry.id === id);
};
