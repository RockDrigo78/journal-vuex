import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import journal from '@/modules/daybook/store/journal';
import EntryList from '@/modules/daybook/components/EntryList.vue';
import { journalState } from '../../../mock-data/test-journal-state';

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState },
            },
        },
    });

describe('EntryList component tests', () => {
    const store = createVuexStore(journalState);

    const mockRouter = {
        push: jest.fn(),
    };

    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter,
                },
                plugins: [store],
            },
        });
    });

    test('should call getEntriesByTerm and show 2 entries', () => {
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.findAll('entry-stub').length).toBe(2);
    });

    test('should call getEntriesByTerm and filter entries', async () => {
        const input = wrapper.find('input');
        await input.setValue('data 1');

        expect(wrapper.findAll('entry-stub').length).toBe(1);
    });

    test('new button should redirect to /new', () => {
        wrapper.find('button').trigger('click');

        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: 'new',
            },
        });
    });
});
