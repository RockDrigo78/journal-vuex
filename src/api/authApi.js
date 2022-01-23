import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyCSv3e9-XFBO9Zta4dd5UPJ5nPIymOOZig',
    },
});

export default authApi;
