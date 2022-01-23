import { computed } from 'vue';
import { useStore } from 'vuex';

const useAuth = () => {
    const store = useStore();

    const createUser = async (user) => {
        const resp = await store.dispatch('authModule/createUser', user);
        return resp;
    };

    const loginUser = async (user) => {
        const resp = await store.dispatch('authModule/signInUser', user);
        return resp;
    };

    const checkAuthStatus = async () => {
        const resp = await store.dispatch('authModule/checkAuthetication');
    };

    const logout = () => {
        store.commit('authModule/logout');
        store.commit('journal/clearEntries');
    };

    return {
        createUser,
        loginUser,
        checkAuthStatus,
        logout,

        authStatus: computed(() => store.getters['authModule/currentState']),
        username: computed(() => store.getters['authModule/username']),
    };
};

export default useAuth;
