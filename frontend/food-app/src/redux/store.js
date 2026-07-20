import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

// ✅ Manual Storage Object ]
const storage = {
  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      return Promise.resolve(value ? JSON.parse(value) : null);
    } catch (err) {
      console.error("Error getting item:", err);
      return Promise.resolve(null);
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    } catch (err) {
      console.error("Error setting item:", err);
      return Promise.resolve();
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return Promise.resolve();
    } catch (err) {
      console.error("Error removing item:", err);
      return Promise.resolve();
    }
  },
};


// ✅ Persist Config
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "cart"],
};

// ✅ Auth Persist Config
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["user"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;