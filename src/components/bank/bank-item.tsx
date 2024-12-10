import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {Bank} from "../../redux/bank-api-slice.ts";
import React from "react";

interface props{
    bank: Bank;
    onEdit: (bank: Bank) => void;
    onDelete: (id: number) => void;
}

export const BankItem=({ bank, onEdit, onDelete }: props): React.ReactElement => {

    return (
        <Card sx={{maxWidth: 300}}>
            <CardHeader title={bank.name}/>
            <CardContent>
                <Typography>City: {bank.city} </Typography>
                <Typography>Address: {bank.address} </Typography>
                <Typography>Contact: {bank.phoneNumber} </Typography>
                <Typography>Interest Type: {bank.interestType} </Typography>
                <Typography>Interest Rate: {bank.interestRate} </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="warning" onClick={()=> onEdit(bank) }>Edit</Button>
                <Button variant="contained" color="error" onClick={()=> onDelete(bank.id) }>Delete</Button>
            </CardActions>
        </Card>
    );
}