import React, {Component, ReactNode} from 'react';
import './dashboard-layout.scss';

const defaultProps = {
};

type Props = {
    children: ReactNode;
};

class DashboardSideNav extends Component<Props, {}> {
    static defaultProps = defaultProps;

    render() {
        const { children, ...p } = this.props;
        const baseClass = 'dashboard-sidenav';
        return (

                <aside className={`${baseClass}`}>
                    <div className={`${baseClass}__brand`}>
                        <i className={`fas fa-feather-alt ${baseClass}__brand-icon`}></i>
                        <a className={`${baseClass}__brand-link`} href="#">Blue<span className="text-light">Wind</span></a>
                        <i className="fas fa-times sidenav__brand-close"></i>
                    </div>
                    <div className={`${baseClass}__profile`}>
                        <div className={`${baseClass}__profile-avatar`}></div>
                        <div className={`${baseClass}__profile-title text-light`}>Seb</div>
                    </div>
                    <div className="row row--align-v-center row--align-h-center">
                        <ul className="navList">
                            <li className="navList__heading">Students<i className="far fa-file-alt"></i></li>
                            <li>
                                <div className="navList__subheading row row--align-v-center">
                                    <span className="navList__subheading-icon"><i
                                        className="fas fa-briefcase-medical"></i></span>
                                    <span className="navList__subheading-title">Student list</span>
                                </div>
                                <ul className="subList subList--hidden">
                                    <li className="subList__item">medical</li>
                                    <li className="subList__item">vision</li>
                                    <li className="subList__item">dental</li>
                                </ul>
                            </li>
                            <li>
                                <div className="navList__subheading row row--align-v-center">
                                    <span className="navList__subheading-icon"><i
                                        className="fas fa-plane-departure"></i></span>
                                    <span className="navList__subheading-title">travel</span>
                                </div>
                                <ul className="subList subList--hidden">
                                    <li className="subList__item">domestic</li>
                                    <li className="subList__item">foreign</li>
                                    <li className="subList__item">misc</li>
                                </ul>
                            </li>
                            <li>
                                <div className="navList__subheading row row--align-v-center">
                                    <span className="navList__subheading-icon"><i className="far fa-angry"></i></span>
                                    <span className="navList__subheading-title">taxes</span>
                                </div>
                                <ul className="subList subList--hidden">
                                    <li className="subList__item">current</li>
                                    <li className="subList__item">archives</li>
                                </ul>
                            </li>

                            <li className="navList__heading">lessons<i className="far fa-envelope"></i></li>
                            <li>
                                <div className="navList__subheading row row--align-v-center">
                                    <span className="navList__subheading-icon"><i
                                        className="fas fa-envelope"></i></span>
                                    <span className="navList__subheading-title">inbox</span>
                                </div>
                                <ul className="subList subList--hidden">
                                    <li className="subList__item">primary</li>
                                    <li className="subList__item">social</li>
                                    <li className="subList__item">promotional</li>
                                </ul>
                            </li>


                        </ul>
                    </div>
                </aside>
        );
    }
}

export default DashboardSideNav;
