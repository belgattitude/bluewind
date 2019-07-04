import React from 'react';
import './app-header.scss';
import PrimarySearchAppBar from './app-bar';
import { CssBaseline, Drawer } from '@material-ui/core';

const AppHeader: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <header className="app-header">
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <PrimarySearchAppBar />
                <Drawer />
            </div>
        </header>
    );
};

export default AppHeader;
