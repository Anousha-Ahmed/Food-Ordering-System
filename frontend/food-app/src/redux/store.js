import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

// ✅ Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

// ✅ Auth Persist Reducer
const authPersistConfig = {
  key: "auth",
  storage,
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