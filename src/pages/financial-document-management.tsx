import {
    Box,
    Button, ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import {
    FinancialDocument,
    useAddFinancialDocumentMutation, useDeleteFinancialDocumentMutation,
    useGetFinancialDocumentsQuery,
    useUpdateFinancialDocumentMutation
} from "../redux/financial-document-api-slice.ts";
import {useParams} from "react-router-dom";
import {FinancialDocumentDialog} from "../components/financial-document/financial-document-dialog.tsx";
import {Delete, Edit} from "@mui/icons-material";


export const FinancialDocumentManagement = (): React.ReactElement => {
    const [selectedFinancialDocument, setSelectedFinancialDocument] = React.useState<FinancialDocument | null>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    const {id} = useParams<{ id:string }>();

    const { data } = useGetFinancialDocumentsQuery(Number(id));
    const [addFinancialDocument] = useAddFinancialDocumentMutation();
    const [updateFinancialDocument] = useUpdateFinancialDocumentMutation();
    const [deleteFinancialDocument] = useDeleteFinancialDocumentMutation();

    const handleAdd = () => {
        setSelectedFinancialDocument(null);
        setIsEdit(false);
        setDialogOpen(true);
    }

    const handleEdit = (financialDocument: FinancialDocument) => {
        setSelectedFinancialDocument(financialDocument);
        setIsEdit(true);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedFinancialDocument(null);
        setIsEdit(false);
    }

    const handleSave = async (financialDocument: Partial<FinancialDocument>) => {
        try {
            if (isEdit && selectedFinancialDocument) {
                await updateFinancialDocument({
                    portfolioId: Number(id),
                    id: selectedFinancialDocument.id,
                    patch: financialDocument }).unwrap();
            } else {
                await addFinancialDocument({
                    portfolioId: Number(id),
                    body: financialDocument}).unwrap();
            }
        } catch (error) {
            console.error("Failed to save the financialDocument:", error);
        } finally {
            handleDialogClose();
        }
    }

    const handleDelete = async (docId: number) => {
        try {
            await deleteFinancialDocument({portfolioId: Number(id), id:docId}).unwrap();
        } catch (error) {
            console.error("Failed to delete the financialDocument:", error);
        }
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Financial Documents Management</Typography>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                >
                    <Button >Calculate TCEA</Button>
                    <Button onClick={handleAdd}>Add Financial Document</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ padding:2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Gross Amount</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Net Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row)=>(
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.number}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.dueDate}</TableCell>
                                    <TableCell>{row.grossAmount?.toFixed(2)}</TableCell>
                                    <TableCell>{row.netAmount?.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=> handleDelete(row.id)}><Delete color="primary"/></Button>
                                        <Button onClick={()=> handleEdit(row)}><Edit color="primary"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <FinancialDocumentDialog
                    financialDocument={selectedFinancialDocument}
                    open={dialogOpen}
                    isEdit={isEdit}
                    onClose={handleDialogClose}
                    onSave={handleSave}/>
            </Box>
        </Box>
    );
}