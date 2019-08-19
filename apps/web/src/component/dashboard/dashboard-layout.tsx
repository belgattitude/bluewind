import React, {Component, ReactNode} from 'react';
import './dashboard-layout.scss';
import DashboardSideNav from "./dashboard-side-nav";
import DashboardMainHeader from "./dashboard-main-header";
import DashboardHeader from "./dashboard-header";
import DashboardFooter from "./dashboard-footer";

const defaultProps = {
    headerTitle: 'Bluewind',
    footerText: '@belgattitude 2019',
};

type Props = {
    headerTitle: string;
    footerText: string;
    children: ReactNode;
};

class DashboardLayout extends Component<Props, {}> {
    static defaultProps = defaultProps;

    render() {
        const { children, ...p } = this.props;
        return (
            <div className="dashboard-layout">

                <DashboardHeader />

                <DashboardSideNav>Hello</DashboardSideNav>

                <main className="dashboard-main">
                    {/*
                    <DashboardMainHeader/>
                    */}
                    <div className="dashboard-main-content">
                        {children}
                    </div>
                </main>

                <DashboardFooter/>

            </div>
        );
    }
}

export default DashboardLayout;
