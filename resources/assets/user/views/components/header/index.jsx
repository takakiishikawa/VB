import React, { Component } from 'react';
import './Header.scss';
import logoImage from './vb-logo-black.png';
import axios from 'axios';
import {fetchUser, getUser} from '../../../state/modules/user';
import {connect} from 'react-redux';

class Header extends Component {
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
        console.log(this.props, 'this.props')

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
                        <span className="arrow-down">▽</span>
                    </button>
                    {isMenuOpen && (
                        <div className="header__popup-menu">
                            <div className="header__popup-menu__item">Profile</div>
                            <div className="header__popup-menu__item" onClick={this.logout}>Logout</div>
                        </div>
                    )}
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    username: getUser(state),
});

const mapDispatchToProps = {
    fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);