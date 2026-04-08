import {ref} from 'vue'
import type { User } from '../../interfaces/interfaces'
import { state } from '../globalStates/state';

export const useUsers = () => {
    const token = ref<string | null>(null);
    // const isLoggedIn = ref<boolean>(false);
    const error = ref<string | null>(null);
    const User = ref<User | null>(null);

    const name = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');


    const fetchToken = async (email:string, password:string): Promise<void> => {
        try {
            const response = await fetch('https://jewelry-rest-api.onrender.com/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token') || ''
                },
                body: JSON.stringify({ email, password })
            }) 

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log(errorResponse.error || 'Login failed');
                throw new Error('Failed to login');
            }

            const authResponse = await response.json();
            token.value = authResponse.data.token;
            User.value = authResponse.data.user;
            state.isLoggedIn= true;

            localStorage.setItem('token', authResponse.data.token)
            localStorage.setItem('userId', authResponse.data.userID)
            console.log('Login successful', authResponse)
            console.log('token', token.value)
    }
        catch (err) {
            error.value = (err as Error).message || 'An error occurred during login'
            state.isLoggedIn = false;
        }
    }


    // register
    const registerUser = async (name:string, email:string, password:string): Promise<void> => {
        try {
            const response = await fetch('https://jewelry-rest-api.onrender.com/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            }) 

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const authResponse = await response.json();
            token.value = authResponse.data.token;
            User.value = authResponse.data.user;

            localStorage.setItem('token', authResponse.data.token)
            console.log('Registration successful.', authResponse)
    }
        catch (err) {
            error.value = (err as Error).message || 'An error occurred during registration'
        }
    }


    const logout = () => {
        token.value = null;
        User.value = null;
        state.isLoggedIn= false;
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        console.log('User logged out')
    }


    return {
        token,
        isLoggedIn: state.isLoggedIn,
        error,
        User,
        name,
        email,
        password,
        fetchToken,
        registerUser,
        logout
    }

}
    
