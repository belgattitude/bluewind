import React, { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { withDefaultProps } from 'with-default-props';

const defaultProps = {
    headerTitle: 'Bluewind',
    footerText: '@belgattitude 2019',
};

type LayoutProps = {
    headerTitle: string;
    footerText: string;
};

class Layout extends React.Component<LayoutProps, {}> {
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
