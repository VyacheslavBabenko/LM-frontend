import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Для хранения в localStorage
import localeSlice from './locale/localeSlice';
import authSlice from './auth/authSlice';
import appSlice from './app/appSlice';
import notifySlice from './notify/notifySlice';
import transferLeadSlice from './leads/transferLead/transferLeadSlice';
import transferredLeadsSlice from './leads/transferredLeads/transferredLeads';
import receivedLeadsSlice from './leads/receivedLeads/receivedLeads';
import usersSlice from './users/usersSlice';

// Конфигурация для redux-persist
const persistConfig = {
  key: 'auth',
  storage, // Используем localStorage для хранения
};

const persistAppConfig = {
  key: 'app',
  storage,
};

const persistLocaleConfig = {
  key: 'locale',
  storage,
};

// Оборачиваем редьюсер auth в persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const persistedAppReducer = persistReducer(persistAppConfig, appSlice);
const persistedLocaleReducer = persistReducer(persistLocaleConfig, localeSlice);

const store = configureStore({
  reducer: {
    locale: persistedLocaleReducer,
    auth: persistedAuthReducer, // Подключаем персистентный редьюсер auth
    app: persistedAppReducer,
    notify: notifySlice,
    transferLead: transferLeadSlice,
    users: usersSlice,
    transferredLeads: transferredLeadsSlice,
    receivedLeads: receivedLeadsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Игнорируем эти экшены
      },
    }),
});

export const persistor = persistStore(store); // Создаем persistor для сохранения состояния

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
