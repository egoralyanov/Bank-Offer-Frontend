import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import searchReducer from './searchSlice.ts';
import authReducer from './authSlice';
import offersReducer from './offersSlice.ts'
import offerReducer from './offerSlice.ts'
import applicationReducer from './applicationSlice.ts'
import applicationsReducer from './applicationsSlice.ts'

export const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
        offers: offersReducer,
        offer: offerReducer,
        application: applicationReducer,
        applications: applicationsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
