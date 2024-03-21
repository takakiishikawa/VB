import React, { Component } from 'react';
import './Header.scss';
import logoImage from './vb-logo-black.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    render() {
        const username = 'Takaki';
        const { isMenuOpen } = this.state;

        return(
            <header className="header">
                <div className="header__logo">
                    <img src={logoImage} alt="logo" />
                </div>
                <nav className="header__top-menu">
                    <a href="/vb">VB</a>
                    <a href="/tag">Tag</a>
                </nav>
                <div className={`header__user-menu ${isMenuOpen ? "header__user-menu--open" : ""}`}>
                    <button onClick={this.toggleMenu}>
                        {username}
                        <span classname="arrow-down">▽</span>
                    </button>
                    {isMenuOpen && (
                        <div className="popup-menu">
                            <a href="/profile">Profile</a>
                            <a href="/logout">Logout</a>
                        </div>
                    )}
                </div>
            </header>
        );
    }
}

export default Header;
