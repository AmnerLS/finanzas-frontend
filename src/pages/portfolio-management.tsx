import {Box, Button, Typography} from "@mui/material";
import {
    Portfolio,
    useAddPortfolioMutation, useDeletePortfolioMutation,
    useGetPortfoliosQuery,
    useUpdatePortfolioMutation
} from "../redux/portfolio-api-slice.ts";
import React, {useState} from "react";
import Grid from "@mui/material/Grid2";
import {PortfolioItem} from "../components/portfolio/portfolio-item.tsx";
import {PortfolioDialog} from "../components/portfolio/portfolio-dialog.tsx";


export const PortfolioManagement=(): React.ReactElement => {
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const {data} = useGetPortfoliosQuery();
    const [addPortfolio] = useAddPortfolioMutation();
    const [updatePortfolio] = useUpdatePortfolioMutation();
    const [deletePortfolio] = useDeletePortfolioMutation();

    const handleAdd = () => {
        setSelectedPortfolio(null);
        setIsEdit(false);
        setDialogOpen(true);
    }
    const handleEdit = (portfolio: Portfolio) => {
        setSelectedPortfolio(portfolio);
        setIsEdit(true);
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedPortfolio(null);
        setIsEdit(false);
    }
    const handleSave = async (portfolio: Partial<Portfolio>) => {
        try {
            if (isEdit && selectedPortfolio) {
                await updatePortfolio({ id: selectedPortfolio.id, ...portfolio }).unwrap();
            } else {
                await addPortfolio(portfolio).unwrap();
            }
        } catch (error) {
            console.error("Failed to save the portfolio:", error);
        } finally {
            handleDialogClose();
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deletePortfolio(id).unwrap();
        } catch (error) {
            console.error("Failed to delete the portfolio:", error);
        }
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Portfolio Management</Typography>
                <Button onClick={handleAdd} variant="contained">Add Portfolio</Button>
            </Box>
            <Grid sx={{ padding: 2 }}>
                {data.map((portfolio) => (
                    <PortfolioItem key={portfolio.id} portfolio={portfolio} onEdit={handleEdit} onDelete={handleDelete}/>
                ))}
            </Grid>
            <PortfolioDialog portfolio={selectedPortfolio} open={dialogOpen} isEdit={isEdit} onClose={handleDialogClose} onSave={handleSave}/>
        </Box>
    );
}