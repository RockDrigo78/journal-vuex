import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import authModule from '@/modules/auth/store/auth';

const store = createStore({
    modules: {
        authModule,
        journal,
    },
});

export default store;
