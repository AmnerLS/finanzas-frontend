import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../config.ts";

export interface Bank{
    id: number;
    name: string;
    city: number;
    address: string;
    phoneNumber: number;
    interestType: string;
    interestRate: number;
}

type BankResponse = Bank[]

const url = API_URL + '/financial-operations';

export const apiBank = createApi({
    baseQuery: fetchBaseQuery({baseUrl: url}),
    tagTypes: ['Bank'],
    reducerPath: 'apiBank',
    endpoints: (build) =>({
        getBanks: build.query<BankResponse, void>({
            query: () => 'banks',
            providesTags: (result) =>
                result ?[
                    ...result.map(({id})=>({type: 'Bank' as const, id})),
                    {type: 'Bank', id: 'LIST'},
                ] : [{type: 'Bank', id: 'LIST'}],
        }),
        addBank: build.mutation<Bank, Partial<Bank>>({
            query: (body) => ({
                url: 'banks',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Bank', id: 'LIST'}],
        }),
        getBank: build.query<Bank, number>({
            query: (id) => `banks/${id}`,
            providesTags: (_, __, id) => [{type: 'Bank', id}],
        }),
        updateBank: build.mutation<void, Pick<Bank,'id'> & Partial<Bank>>({
            query: ({id, ...patch}) => ({
                url: `banks/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    apiBank.util.updateQueryData('getBank', id, (draft)=>{
                        Object.assign(draft, patch);
                    }),
                )
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: (_, __, {id}) => [{type: 'Bank', id}],
        }),
        deleteBank: build.mutation<{succes: boolean; id: number}, number>({
            query(id){
                return {
                    url: `banks/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (_, __, id) => [{type: 'Bank', id}],
        }),

    })
})

export const {useGetBanksQuery, useAddBankMutation, useUpdateBankMutation, useDeleteBankMutation} = apiBank;