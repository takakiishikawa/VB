import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {fetchUser, getUser} from '../../../state/modules/user';
import {connect} from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import './Sidebar.scss';


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    logout = () => {
        axios.post('/logout', {}, {
            withCredentials: true
        }).then(response => {
            window.location.href = '/login'
        }).catch(error => {
            console.log(error);
        });
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    render() {
        const {username} = this.props;
        const {isMenuOpen} = this.state;
        const pathName = location.pathname;

        return(
            <div>
                <div className="sidebar">
                    <div className="sidebar__container">
                        <div className="sidebar__logo">
                            VB
                        </div>
                        <nav className="sidebar__nav">
                            <div className={`sidebar__nav__item ${pathName === "/" ? "active" : ""} `}>
                                <span className="sidebar__nav__item-icon"><HomeIcon /></span>
                                <Link to="/" className="sidebar__nav__item-text">Home</Link>
                            </div>
                            <div className={`sidebar__nav__item  ${pathName === "/tag" ? "active" : ""} `}>
                                <span className="sidebar__nav__item-icon"><FormatListBulletedIcon /></span>
                                <Link to="/tag" className="sidebar__nav__item-text">Tag</Link>
                            </div>
                            <div className={`sidebar__nav__item ${pathName === "/analytics" ? "active" : ""} `}>
                                <span className="sidebar__nav__item-icon"><QueryStatsIcon /></span>
                                <Link to="/analytics" className="sidebar__nav__item-text">Analytics</Link>
                            </div>
                        </nav>
                    </div>
                </div>
                <div>
                    <div className={`sidebar__user-menu ${isMenuOpen ? "sidebar__user-menu--open" : ""}`}>
                        <button onClick={this.toggleMenu}>
                            {username}
                            <span className="arrow-down">▽</span>
                        </button>
                        {isMenuOpen && (
                            <div className="sidebar__popup-Menu">
                                <Link to="/profile">
                                    <div className="sidebar__popup-Menu-item">Profile</div>
                                </Link>
                                <div className="sidebar__popup-Menu-item" onClick={this.logout}>Logout</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    username: getUser(state),
});

const mapDispatchToProps = {
    fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);


