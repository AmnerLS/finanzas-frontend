import {configureStore} from "@reduxjs/toolkit";
import {apiPortfolio} from "./portfolio-api-slice.ts";
import {apiBank} from "./bank-api-slice.ts";
import {apiFinancialDocument} from "./financial-document-api-slice.ts";


export const store = configureStore({
    reducer: {
        [apiBank.reducerPath]: apiBank.reducer,
        [apiPortfolio.reducerPath]: apiPortfolio.reducer,
        [apiFinancialDocument.reducerPath]: apiFinancialDocument.reducer
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(apiBank.middleware, apiPortfolio.middleware, apiFinancialDocument.middleware);
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>