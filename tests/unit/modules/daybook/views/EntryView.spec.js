import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import swal from 'sweetalert2';

import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state';

import EntryView from '@/modules/daybook/views/EntryView.vue';

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState },
            },
        },
    });

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn(),
}));

describe('EntryView tests', () => {
    const store = createVuexStore(journalState);

    store.dispatch = jest.fn();

    const mockRouter = {
        push: jest.fn(),
    };

    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallowMount(EntryView, {
            props: {
                id: 'idFromMockData2',
            },
            global: {
                mocks: {
                    $router: mockRouter,
                },
                plugins: [store],
            },
        });
    });

    // test('should remove user because id does not exist', () => {
    //     const wrapper = shallowMount(EntryView, {
    //         props: {
    //             id: 'this id does not exist in store',
    //         },
    //         global: {
    //             mocks: {
    //                 $router: mockRouter,
    //             },
    //             plugins: [store],
    //         },
    //     });

    //     expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
    // });

    test('should show the correct entry', () => {
        expect(mockRouter.push).not.toHaveBeenCalled();
    });

    test('should delete the entry and exit', (done) => {
        swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));

        wrapper.find('.btn-danger').trigger('click');

        expect(swal.fire).toHaveBeenCalledWith({
            title: 'Are you sure to delete?',
            text: 'this action cannot be undone',
            showDenyButton: 'true',
            confirmButtonText: 'Yes',
        });

        setTimeout(() => {
            expect(store.dispatch).toHaveBeenCalledWith(
                'journal/deleteEntry',
                'idFromMockData2'
            );
            expect(mockRouter.push).toHaveBeenCalled();
            done();
        }, 1);
    });
});
