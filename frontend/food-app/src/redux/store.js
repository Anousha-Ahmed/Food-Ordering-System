import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

// ✅ Debug - Check storage methods
console.log("Storage object:", storage);
console.log("Storage getItem:", typeof storage.getItem);
console.log("Storage setItem:", typeof storage.setItem);
console.log("Storage removeItem:", typeof storage.removeItem);

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