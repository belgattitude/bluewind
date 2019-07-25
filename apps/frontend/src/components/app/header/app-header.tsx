import React from 'react';
import './app-header.scss';
import PrimarySearchAppBar from './app-bar';
import { CssBaseline, Drawer } from '@material-ui/core';

const AppHeader: React.FC = () => {
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
