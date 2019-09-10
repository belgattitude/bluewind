import React, { Component, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

const defaultProps = {
    headerTitle: 'Bluewind',
    footerText: '@belgattitude 2019',
};

type LayoutProps = {
    headerTitle: string;
    footerText: string;
    children: ReactNode;
};

class Layout extends Component<LayoutProps, {}> {
    static defaultProps = defaultProps;

    render() {
        const { children, ...p } = this.props;
        return (
            <div className="layout-ctn">
                <Header title={p.headerTitle} />
                <main>{children}</main>

                <Footer text={p.footerText} />
            </div>
        );
    }
}

export default Layout;
