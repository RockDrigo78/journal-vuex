import { shallowMount } from '@vue/test-utils';
import About from '@/views/About.vue';

describe('about component tests', () => {
    test('should match snapshot', () => {
        const wrapper = shallowMount(About);

        expect(wrapper.html()).toMatchSnapshot();
    });
});
