import {Portfolio} from "../../redux/portfolio-api-slice.ts";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import React from "react";
import {Link} from "react-router-dom";

interface props{
    portfolio: Portfolio;
    onEdit: (item: Portfolio) => void;
    onDelete: (id: number) => void;
}

export const PortfolioItem=({ portfolio, onEdit, onDelete }: props): React.ReactElement => {

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography variant="h6">{portfolio.name +" - "+ portfolio.currency}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {portfolio.description}
                </AccordionDetails>
                <AccordionActions>
                    <Button variant="contained" color="warning" onClick={()=> onEdit(portfolio) }>Edit</Button>
                    <Button variant="contained" color="error" onClick={()=> onDelete(portfolio.id) }>Delete</Button>
                    <Button variant="contained" component={Link} to={`/portfolios/${portfolio.id}/financial-documents`}>See</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}