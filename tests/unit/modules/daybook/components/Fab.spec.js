import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab.vue';

describe('Fab component tests', () => {
    test('should match snapshot', () => {
        const wrapper = shallowMount(Fab);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('should show default icon', () => {
        const wrapper = shallowMount(Fab);
        expect(wrapper.find('i').classes()).toContain('fa-plus');
    });

    test('should show sent icon', () => {
        const wrapper = shallowMount(Fab, {
            propsData: {
                icon: 'fa-save',
            },
        });

        expect(wrapper.props().icon).toBe('fa-save');
        expect(wrapper.find('i').classes()).toContain('fa-save');
    });

    test('should emmit on:click event on button click', () => {
        const wrapper = shallowMount(Fab);

        wrapper.find('button').trigger('click');

        expect(wrapper.emitted('on:click')).toHaveLength(1);
    });
});
