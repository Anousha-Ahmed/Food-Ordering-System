// import axiosInstance from '../api/axiosInstance';
// import { AUTH } from '../api/endpoints';

// export const authService = {
//     // Login user
//     login: async (email, password) => {
//         try {
//             const response = await axiosInstance.post(AUTH.LOGIN, { email, password });
//             if (response.data.access) {
//                 localStorage.setItem('access_token', response.data.access);
//                 localStorage.setItem('refresh_token', response.data.refresh);
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//             }
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || { error: 'Login failed' };
//         }
//     },

//     // Register user
//     register: async (userData) => {
//         try {
//             const response = await axiosInstance.post(AUTH.REGISTER, userData);
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || { error: 'Registration failed' };
//         }
//     },

//     // Logout user
//     logout: () => {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//     },

//     // Get user profile
//     getProfile: async () => {
//         try {
//             const response = await axiosInstance.get(AUTH.PROFILE);
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || { error: 'Failed to get profile' };
//         }
//     },

//     // Check if user is authenticated
//     isAuthenticated: () => {
//         return !!localStorage.getItem('access_token');
//     },

//     // Get current user
//     getCurrentUser: () => {
//         const user = localStorage.getItem('user');
//         return user ? JSON.parse(user) : null;
//     },
// };