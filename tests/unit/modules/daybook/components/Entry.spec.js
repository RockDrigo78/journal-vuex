import { shallowMount } from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue';
import { journalState } from '../../../mock-data/test-journal-state';

describe('Entry component tests', () => {
    const mockRouter = {
        push: jest.fn(),
    };

    const wrapper = shallowMount(Entry, {
        props: {
            entry: journalState.entries[0],
        },
        global: {
            mocks: {
                $router: mockRouter,
            },
        },
    });
    test('should match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('should redirect on click', () => {
        const entryContainer = wrapper.find('.entry-container');

        entryContainer.trigger('click');

        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: journalState.entries[0].id,
            },
        });
    });

    test('should get computed properties', () => {
        expect(wrapper.vm.day).toBe(23);
        expect(wrapper.vm.month).toBe('July');
        expect(wrapper.vm.year).toBe(2021);
        expect(wrapper.vm.weekday).toBe('Friday');
    });
});
