import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home component tests', () => {
    test('should match snapshot', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('should redirect to no-entry route when button clicked', () => {
        const mockRouter = {
            push: jest.fn(),
        };

        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $router: mockRouter,
                },
            },
        });

        wrapper.find('button').trigger('click');

        expect(mockRouter.push).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'daybook' });
    });
});
