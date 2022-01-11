import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state';

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState },
            },
        },
    });

describe('Vuex - Journal Module Tests', () => {
    test('should have initial state', () => {
        const store = createVuexStore(journalState);
        const { isLoading, entries } = store.state.journal;

        expect(isLoading).toBeFalsy();
        expect(entries).toEqual(journalState.entries);
    });

    // Mutations
    test('mutation: setEntries ', () => {
        const store = createVuexStore({
            isLoading: true,
            entries: [],
        });

        store.commit('journal/setEntries', journalState.entries);

        expect(store.state.journal.entries.length).toBe(2);
        expect(store.state.journal.isLoading).toBeFalsy();
    });

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState);

        const updatedEntry = {
            id: 'idFromMockData2',
            date: 1627077227978,
            text: 'hello from update entry!',
        };

        store.commit('journal/updateEntry', updatedEntry);

        expect(store.state.journal.entries.length).toBe(2);
        expect(
            store.state.journal.entries.find(
                (entry) => entry.id === updatedEntry.id
            )
        ).toEqual(updatedEntry);
    });

    test('mutation: addEntry', () => {
        const store = createVuexStore(journalState);

        const newEntry = {
            id: 'idFromMockData3',
            date: 1627077227978,
            text: 'this is the new added entry!',
        };

        store.commit('journal/addEntry', newEntry);
        expect(store.state.journal.entries.length).toBe(3);
    });

    test('mutation: removeEntry', () => {
        const store = createVuexStore(journalState);
        const id = 'idFromMockData3';

        store.commit('journal/removeEntry', id);

        expect(store.state.journal.entries.length).toBe(2);
    });

    // Getters
    test('getters: getEntriesByTerm, getEntryById', () => {
        const store = createVuexStore(journalState);

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
        expect(store.getters['journal/getEntriesByTerm']('data 1').length).toBe(
            1
        );

        expect(
            store.getters['journal/getEntryById']('idFromMockData1')
        ).toEqual(journalState.entries[0]);
    });

    // Actions
    test('actions: loadEntries', async () => {
        const store = createVuexStore({
            isLoading: true,
            entries: [],
        });

        await store.dispatch('journal/loadEntries');

        expect(store.state.journal.entries.length).toBe(2);
    });

    test('actions: updateEntry', async () => {
        // const store = createVuexStore({ journalState });
        // const updatedEntry = {
        //     id: '-MsWiaXSAgQUQOFESzst',
        //     date: 1641243356803,
        //     picture:
        //         'https://res.cloudinary.com/dd469q8hl/image/upload/v1641334018/rrjvod1bjf3f0n0e4dje.png',
        //     text: 'I eat quinoassss',
        //     otherField: true,
        //     anotherOne: { a: 1 },
        // };
        // await store.dispatch('journal/updateEntry', updatedEntry);
        // expect(
        //     store.state.journal.entries.find((e) => e.id === updatedEntry.id)
        // ).toEqual({
        //     id: '-MsWiaXSAgQUQOFESzst',
        //     date: 1641243356803,
        //     text: 'I eat quinoassss',
        // });
        // expect(store.state.journal.entries.length).toBe(5);
    });

    test('actions: createEntry and deleteEntry', async () => {
        const store = createVuexStore(journalState);

        const newEntry = {
            date: 1641243356803,
            text: 'this is the new entry',
        };

        const id = await store.dispatch('journal/createEntry', newEntry);

        // expect(
        //     store.state.journal.entries.find((e) => e.id === id)
        // ).toBeTruthy();

        expect(store.state.journal.entries.length).toBe(3);

        await store.dispatch(
            'journal/deleteEntry',
            store.state.journal.entries[0].id
        );

        expect(store.state.journal.entries.length).toBe(2);
    });
});
