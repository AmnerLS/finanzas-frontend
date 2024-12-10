import {Bank} from "../../redux/bank-api-slice.ts";
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

interface props{
    bank: Bank | null;
    open: boolean;
    isEdit: boolean;
    onClose: () => void;
    onSave: (bank: Partial<Bank>) => void;
}

export const BankDialog=({bank, open, isEdit , onClose, onSave}: props): React.ReactElement => {
    const [formData, setFormData] = useState<Partial<Bank>>(bank || {});

    useEffect(()=>{
        setFormData(bank || {});
    }, [bank]);

    const handleSave= ()=>{
        if(formData){
            onSave(formData);
        }
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(formData){
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEdit ? 'Edit Bank' : 'New Bank'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2, mt: 2 }}
                />
                <TextField
                    label="City"
                    name="city"
                    value={formData?.city || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={formData?.address || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    value={formData?.phoneNumber || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Interest Type"
                    name="interestType"
                    value={formData?.interestType || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Interest Rate"
                    name="interestRate"
                    type="number"
                    value={formData?.interestRate || ''}
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