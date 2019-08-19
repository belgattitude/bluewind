import React, {Component, ReactNode} from 'react';
import './dashboard-layout.scss';
import DashboardSideNav from "./dashboard-side-nav";
import DashboardMainHeader from "./dashboard-main-header";

const defaultProps = {
};

type Props = {
    children?: never;
};

class DashboardFooter extends Component<Props, {}> {
    static defaultProps = defaultProps;

    render() {
        const { children, ...p } = this.props;
        const baseClass = 'dashboard-footer';
        return (

                <footer className={`${baseClass}`}>
                    <p><span className={`${baseClass}__copyright`}>&copy;</span> 2018 MTH</p>
                    <p>Crafted with
                        <i className={`fas fa-heart ${baseClass}__icon`}></i> by <a
                        href="https://www.linkedin.com/in/matt-holland/" target="_blank" className={`${baseClass}__signature`}>Matt
                        H</a></p>
                </footer>

        );
    }
}

export default DashboardFooter;
