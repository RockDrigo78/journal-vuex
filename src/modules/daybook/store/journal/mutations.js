export const setEntries = (state, entries) => {
    state.entries = [...state.entries, ...entries];
    state.isLoading = false;
};

export const updateEntry = (state, entry) => {
    const idIndex = state.entries.map((e) => e.id).indexOf(entry.id);
    state.entries[idIndex] = entry;
};
export const addEntry = (state, entry) => {
    state.entries = [entry, ...state.entries];
    state.isLoading = false;
};

export const removeEntry = (state, id) => {
    state.entries = state.entries.filter((entry) => entry.id !== id);
};
