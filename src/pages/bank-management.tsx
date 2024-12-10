import { BankItem } from "../components/bank/bank-item.tsx";
import {
    Bank,
    useAddBankMutation,
    useDeleteBankMutation,
    useGetBanksQuery,
    useUpdateBankMutation
} from "../redux/bank-api-slice.ts";
import {Box, Button, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {BankDialog} from "../components/bank/bank-dialog.tsx";
import React, {useState} from "react";

export const BankManagement=(): React.ReactElement => {
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const {data} = useGetBanksQuery();
    const [addBank] = useAddBankMutation();
    const [updateBank] = useUpdateBankMutation();
    const [deleteBank] = useDeleteBankMutation();

    const handleAdd = () => {
        setSelectedBank(null);
        setIsEdit(false);
        setDialogOpen(true);
    }

    const handleEdit = (bank: Bank) => {
        setSelectedBank(bank);
        setIsEdit(true);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedBank(null);
        setIsEdit(false);
    }

    const handleSave = async (bank: Partial<Bank>) => {
        try {
            if (isEdit && selectedBank) {
                await updateBank({ id: selectedBank.id, ...bank }).unwrap();
            } else {
                await addBank(bank).unwrap();
            }
        } catch (error) {
            console.error("Failed to save the bank:", error);
        } finally {
            handleDialogClose();
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteBank(id).unwrap();
        } catch (error) {
            console.error("Failed to delete the bank:", error);
        }
    }




    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Bank Management</Typography>
                <Button variant="contained" onClick={handleAdd}>Add Bank</Button>
            </Box>
            <Grid container spacing={2} sx={{ padding:2 }}>
                {data.map((bank) => (
                    <Grid key={bank.id}>
                        <BankItem bank={bank} onEdit={handleEdit} onDelete={handleDelete}/>
                    </Grid>
                ))}
            </Grid>
            <BankDialog bank={selectedBank} open={dialogOpen} isEdit={isEdit} onClose={handleDialogClose} onSave={handleSave}/>
        </Box>
    );
}