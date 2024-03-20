import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
    render() {
        return(
            <header className="header">
                <h2 className="header__title">
                    Profile Info
                </h2>
                <p className="header__subtitle">
                    Update your account's
                </p>
            </header>
        );
    }
}

export default Header;