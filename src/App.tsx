import './App.css'
import {BankManagement} from "./pages/bank-management.tsx";
import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {AppBar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from "@mui/material";
import {AccountBalance, AccountBalanceWallet} from "@mui/icons-material";
import {PortfolioManagement} from "./pages/portfolio-management.tsx";
import {FinancialDocumentManagement} from "./pages/financial-document-management.tsx";

const drawerWidth = 240;
const appBarDrawerColor = '#2b3b7d';

export const App=(): React.ReactElement => {


    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:appBarDrawerColor }}>
                    <Toolbar>
                        <Typography variant="h2">FLEXEM</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: '64px', backgroundColor: appBarDrawerColor },
                    }}
                >
                    <List>
                        <ListItem component={Link} to="/banks">
                            <ListItemIcon><AccountBalance sx={{ color: 'white' }}/></ListItemIcon>
                            <ListItemText primary="Bank Management" sx={{ color: 'white' }}></ListItemText>
                        </ListItem>
                        <ListItem component={Link} to="/portfolios">
                            <ListItemIcon><AccountBalanceWallet sx={{ color: 'white' }}/></ListItemIcon>
                            <ListItemText primary="Portfolio Management" sx={{ color: 'white' }}></ListItemText>
                        </ListItem>

                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
                    <Routes>
                        <Route path="/banks" element={<BankManagement />} />
                        <Route path="/portfolios" element={<PortfolioManagement/>}/>
                        <Route path="/portfolios/:id/financial-documents" element={<FinancialDocumentManagement/>}/>
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

