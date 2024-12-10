import {Portfolio} from "../../redux/portfolio-api-slice.ts";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";

interface props{
    portfolio: Portfolio | null;
    open: boolean;
    isEdit: boolean;
    onClose: () => void;
    onSave: (portfolio: Partial<Portfolio>) => void;
}

export const PortfolioDialog=({portfolio, open, isEdit, onClose, onSave}: props): React.ReactElement => {
    const [formData, setFormData] = useState<Partial<Portfolio>>(portfolio || {});

    useEffect(()=>{
        setFormData(portfolio || {});
    }, [portfolio]);

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
            <DialogTitle>{isEdit ? 'Edit Portfolio' : 'New Portfolio'}</DialogTitle>
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
                    label="Description"
                    name="description"
                    value={formData?.description || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Currency"
                    name="currency"
                    value={formData?.currency || ''}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}