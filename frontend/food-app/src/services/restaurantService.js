import axiosInstance from '../api/axiosInstance';
import { RESTAURANTS } from '../api/endpoints';

export const restaurantService = {
    // Get all restaurants
    getAll: async () => {
        try {
            const response = await axiosInstance.get(RESTAURANTS.LIST);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to fetch restaurants' };
        }
    },

    // Get restaurant by ID
    getById: async (id) => {
        try {
            const response = await axiosInstance.get(RESTAURANTS.DETAIL(id));
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to fetch restaurant' };
        }
    },

    // Get restaurant menu
    getMenu: async (restaurantId) => {
        try {
            const response = await axiosInstance.get(RESTAURANTS.MENU(restaurantId));
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to fetch menu' };
        }
    },
};