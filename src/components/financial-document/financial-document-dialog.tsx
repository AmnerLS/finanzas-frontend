import {FinancialDocument} from "../../redux/financial-document-api-slice.ts";
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

interface Props{
    financialDocument: FinancialDocument | null;
    open: boolean;
    isEdit: boolean;
    onClose: () => void;
    onSave: (financialDocument: FinancialDocument) => void;
}

export const FinancialDocumentDialog = ({ financialDocument, open, isEdit, onClose, onSave }: Props): React.ReactElement => {
    const [formData, setFormData] = useState<Partial<FinancialDocument>>(financialDocument || {});

    useEffect(()=>{
        setFormData(financialDocument || {});
    },[financialDocument]);

    const handleSave = () => {
        if(formData){
            onSave(formData as FinancialDocument);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(formData){
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEdit ? 'Edit Financial Document' : 'New Financial Document'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Type"
                    name="type"
                    value={formData?.type || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Number"
                    name="number"
                    value={formData?.number || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2, mt: 2 }}
                />

                <TextField
                    label="Amount"
                    name="grossAmount"
                    type="number"
                    value={formData?.grossAmount || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    value={formData?.dueDate || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );


}