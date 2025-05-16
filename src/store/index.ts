import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Création du store
export const store = configureStore({
  reducer: {
    settings: settingsReducer
  }
});

// Types RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks typés pour DRY et dispatch Thunks sans erreur
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
