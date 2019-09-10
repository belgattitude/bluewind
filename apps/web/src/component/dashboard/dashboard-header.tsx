import React, { Component, ReactNode } from 'react';
import './dashboard-layout.scss';
import DashboardSideNav from './dashboard-side-nav';
import DashboardMainHeader from './dashboard-main-header';

const defaultProps = {};

type Props = {
    children?: never;
};

class DashboardHeader extends Component<Props, {}> {
    static defaultProps = defaultProps;

    render() {
        const { ...p } = this.props;
        const baseClass = 'dashboard-header';
        return (
            <header className={`${baseClass}`}>
                <i className={`fas fa-bars ${baseClass}__menu`}></i>
                <div className={`${baseClass}__search`}>
                    <input className={`${baseClass}__input`} placeholder="Search..." />
                </div>
                <div className={`${baseClass}__avatar`}>
                    <div className="dropdown">
                        <ul className="dropdown__list">
                            <li className="dropdown__list-item">
                                <span className="dropdown__icon">
                                    <i className="far fa-user"></i>
                                </span>
                                <span className="dropdown__title">my profile</span>
                            </li>
                            <li className="dropdown__list-item">
                                <span className="dropdown__icon">
                                    <i className="fas fa-clipboard-list"></i>
                                </span>
                                <span className="dropdown__title">my account</span>
                            </li>
                            <li className="dropdown__list-item">
                                <span className="dropdown__icon">
                                    <i className="fas fa-sign-out-alt"></i>
                                </span>
                                <span className="dropdown__title">log out</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default DashboardHeader;
