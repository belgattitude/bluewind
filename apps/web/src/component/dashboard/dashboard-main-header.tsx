import React, {Component, ReactNode} from 'react';
import './dashboard-layout.scss';

const defaultProps = {
};

type Props = {
    children?: never
};

class DashboardMainHeader extends Component<Props, {}> {
    static defaultProps = defaultProps;

    render() {
        const { ...p } = this.props;
        return (
            <div className="dashboard-main-header">
                <div className="dashboard-main-header__intro-wrapper">
                    <div className="main-header__welcome">
                        <div className="main-header__welcome-title text-light">Welcome, <strong>Matthew</strong>
                        </div>
                        <div className="main-header__welcome-subtitle text-light">How are you today?</div>
                    </div>
                    <div className="quickview">
                        <div className="quickview__item">
                            <div className="quickview__item-total">41</div>
                            <div className="quickview__item-description">
                                <i className="far fa-calendar-alt"></i>
                                <span className="text-light">Events</span>
                            </div>
                        </div>
                        <div className="quickview__item">
                            <div className="quickview__item-total">64</div>
                            <div className="quickview__item-description">
                                <i className="far fa-comment"></i>
                                <span className="text-light">Messages</span>
                            </div>
                        </div>
                        <div className="quickview__item">
                            <div className="quickview__item-total">27&deg;</div>
                            <div className="quickview__item-description">
                                <i className="fas fa-map-marker-alt"></i>
                                <span className="text-light">Austin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardMainHeader;
