import React from 'react';
import './home.scss';
import {StudentList} from "../student/student.list";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@material-ui/core/SvgIcon/SvgIcon";

type Props = {
    children?: never
}

export const HomePage: React.FC<Props> = () => {

    const test = Array.from (Array(400).keys());

    return (
        <div className="test">
            {test.map(v => {
                return (<div key={v}>{v}</div>);
            })}
        </div>
    );

    return (
        <div className="test">
        <div className="grid-container">
            <header className="header">
                <div className="header__search">
                    <input type="search" placeholder="Search" />
                </div>
                <div className="header__avatar">Your face</div>
            </header>
            <aside className="sidenav">
                <StudentList handleEdit={() =>{}} handleDelete={() => {}} handleSearchChange={() => {}}/>
            </aside>
            <main className="main">
                <div className="main-header">
                    <div className="main-header__heading">Hello User</div>
                    <div className="main-header__updates">Recent Items</div>
                </div>
                <div className="main-overview">
                    <div className="overviewcard">
                        <div className="overviewcard__icon">Overview</div>
                        <div className="overviewcard__info">Card</div>
                    </div>
                    <div className="overviewcard">
                        <div className="overviewcard__icon">Overview</div>
                        <div className="overviewcard__info">Card</div>
                    </div>
                    <div className="overviewcard">
                        <div className="overviewcard__icon">Overview</div>
                        <div className="overviewcard__info">Card</div>
                    </div>
                    <div className="overviewcard">
                        <div className="overviewcard__icon">Overview</div>
                        <div className="overviewcard__info">Card</div>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <div className="footer__copyright">&copy; 2018 MTH</div>
                <div className="footer__signature">Made with love by pure genius</div>
            </footer>
        </div>
        </div>
    );
};
