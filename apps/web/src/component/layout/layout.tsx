import React from 'react';
import Header from './header';
import Footer from './footer';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = props => {
    return (
        <div className="layout-ctn">
            <Header />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
