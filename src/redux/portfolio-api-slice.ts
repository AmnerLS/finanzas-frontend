import {API_URL} from "../config.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Portfolio{
    id: number;
    name: string;
    description: string;
    currency: string;
    tceaDate: string;
    netAmount: number;
}

type PortfolioResponse = Portfolio[]
const url = API_URL + '/financial-operations';

export const apiPortfolio = createApi({
    baseQuery: fetchBaseQuery({baseUrl: url}),
    tagTypes: ['Portfolio'],
    reducerPath: 'apiPortfolio',
    endpoints: (build) => ({
        getPortfolios: build.query<PortfolioResponse, void>({
            query: () => 'portfolios',
            providesTags: (result) =>
                result ? [
                    ...result.map(({id}) => ({type: 'Portfolio' as const, id})),
                    {type: 'Portfolio', id: 'LIST'},
                ] : [{type: 'Portfolio', id: 'LIST'}],
        }),
        addPortfolio: build.mutation<Portfolio, Partial<Portfolio>>({
            query: (body) => ({
                url: 'portfolios',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Portfolio', id: 'LIST'}],
        }),
        getPortfolio: build.query<Portfolio, number>({
            query: (id) => `portfolios/${id}`,
            providesTags: (_, __, id) => [{type: 'Portfolio', id}],
        }),
        updatePortfolio: build.mutation<void, Pick<Portfolio, 'id'> & Partial<Portfolio>>({
            query: ({id, ...patch}) => ({
                url: `portfolios/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    apiPortfolio.util.updateQueryData('getPortfolio', id, (draft) => {
                        Object.assign(draft, patch);
                    }),
                )
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: (_, __, {id}) => [{type: 'Portfolio', id}],
        }),
        deletePortfolio: build.mutation<{succes: boolean; id: number}, number>({
            query: (id) => ({
                url: `portfolios/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:(_, __, id)=> [{type: 'Portfolio', id}],
        }),
    })
})

export const {useGetPortfoliosQuery, useAddPortfolioMutation, useGetPortfolioQuery, useUpdatePortfolioMutation, useDeletePortfolioMutation} = apiPortfolio;