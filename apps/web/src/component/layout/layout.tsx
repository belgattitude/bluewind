import React, { Component, ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import styled from '@emotion/styled';
import { Main } from './main';

const defaultProps = {
    headerTitle: 'Bluewind',
    footerText: '@belgattitude 2019',
};

type LayoutProps = {
    headerTitle: string;
    footerText: string;
    children: ReactNode;
    className?: string;
    handleLogout?: () => void;
};

class UnstyledLayout extends Component<LayoutProps, {}> {
    static defaultProps = defaultProps;
    render() {
        const { children, className, ...p } = this.props;
        return (
            <div className={className}>
                <Header title={p.headerTitle} />
                <Main>{children}</Main>
            </div>
        );
    }
}

export const Layout = styled(UnstyledLayout)``;
