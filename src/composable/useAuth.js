import { reactive, toRefs, ref } from "vue";
// import axios from '@/service/axios'
import { useGet, usePost } from "./useHttp";
const AUTH_KEY = "hireproof_token";

export const AUTH_TOKEN = "sessionToken";

export const state = reactive({
    user: null,
    error: null,
    token: null,
    organization: null,
    userType: null,
    role: null,
    plan: "free",
    quota: {},
    isFirstTimeLogin: true,
    isAuthenticated: false
});
const token = window.localStorage.getItem('collaborative-token');
if (token) {
    state.token = token;
}




export const login = async ({ email, password }) => {
    try {
        // const response = await axios.post('/users/login', {
        //     email,
        //     password
        // })
        const { post, data } = usePost('/users/login')
        await post({
            email,
            password
        })
        state.user = data.value.user
        state.token = data.value.accessToken
        state.isAuthenticated = true
        localStorage.setItem('collaborative-token', data.value.accessToken);
    } catch (error) {
        console.error('error:', error)
    }
}

export const verifyToken = async () => {
    try {
        const { get, data, error } = useGet('users/self');
        await get();
        if (!error.value && data.value) {
            state.user = data.value.data.user;
            return { success: true, data: data.value };  // Return success and data
        } else {
            throw new Error(error.value || 'Token verification failed.');
        }
    } catch (err) {
        return { success: false, error: err.message };  // Return error
    }
};

export const refreshToken = async () => {
    try {
        const { get, data, error } = useGet('users/self');
        await get();
        if (!error.value && data.value) {
            state.user = data.value.data.user;
            return { success: true, data: data.value };
        } else {
            throw new Error(error.value || 'Token verification failed.');
        }
    } catch (err) {
        return { success: false, error: err.message };  // Return error
    }
};

