import {API_URL} from "../config.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface FinancialDocument{
    id: number;
    portfolioId: number;
    number: string;
    grossAmount: number;
    type: string;
    dueDate: string;
    netAmount: number;
}

type FinancialDocumentResponse = FinancialDocument[]
const url = API_URL + '/financial-operations/portfolios';

export const apiFinancialDocument = createApi({
    baseQuery: fetchBaseQuery({baseUrl: url}),
    tagTypes: ['FinancialDocument'],
    reducerPath: 'apiFinancialDocument',
    endpoints: (build) =>({
        getFinancialDocuments: build.query<FinancialDocumentResponse, number>({
            query: (portfolioId) => `${portfolioId}/financial-documents`,
            providesTags: (result) =>
                result ? [
                    ...result.map(({id}) => ({type: 'FinancialDocument' as const, id})),
                    {type: 'FinancialDocument', id: 'LIST'},
                ] : [{type: 'FinancialDocument', id: 'LIST'}],
        }),
        addFinancialDocument: build.mutation<FinancialDocument, { portfolioId: number; body: Partial<FinancialDocument> }>({
            query: ({portfolioId, ...body}) => ({
                url: `${portfolioId}/financial-documents`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'FinancialDocument', id: 'LIST'}],
        }),
        getFinancialDocument: build.query<FinancialDocument, {portfolioId: number, id: number}>({
            query: ({portfolioId, id}) => `${portfolioId}/financial-documents/${id}`,
            providesTags: (_, __, {id}) => [{type: 'FinancialDocument', id}],
        }),
        updateFinancialDocument: build.mutation< void, { portfolioId: number; id: number; patch: Partial<FinancialDocument> }>({
            query: ({portfolioId, id, ...patch}) => ({
                url: `${portfolioId}/financial-documents/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({portfolioId, id, ...patch}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    apiFinancialDocument.util.updateQueryData('getFinancialDocument', { portfolioId, id}, (draft) => {
                        Object.assign(draft, patch);
                    }),
                )
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: (_, __, {id}) => [{type: 'FinancialDocument', id}],
        }),
        deleteFinancialDocument: build.mutation<{succes: boolean; id: number}, {portfolioId: number, id: number}>({
            query: ({portfolioId, id}) => ({
                url: `${portfolioId}/financial-documents/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, {id}) => [{type: 'FinancialDocument', id}],
        })
    })
})

export const { useGetFinancialDocumentsQuery, useAddFinancialDocumentMutation, useUpdateFinancialDocumentMutation, useDeleteFinancialDocumentMutation }=apiFinancialDocument;