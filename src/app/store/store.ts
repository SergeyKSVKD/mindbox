import { configureStore } from '@reduxjs/toolkit'
import { AppParamsReducer } from './AppParamsSlice'
import { enableMapSet } from 'immer'

enableMapSet()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        AppState: AppParamsReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        trace: true,
        serializableCheck: false,
    })
})