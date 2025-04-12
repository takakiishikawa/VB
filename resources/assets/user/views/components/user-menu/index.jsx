import React, {Component} from 'react';
import {fetchUser, getUser} from '../../../state/modules/user';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import UserMenuImage from "./user-menu-image.jpeg";
import "./UserMenu.scss";

class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            
        };
    }

    componentDidMount() {
        this.props.fetchUser();
        document.addEventListener('click', this.handleClickOutside, true);
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
            isOpen: !prevState.isOpen
        }));
    }

    handleClickOutside = (event) => {

        if (event.target.closest('.user-menu__item') || event.target.closest('.user-menu__popup-item-logout')) {
            return;
        }

        if (this.state.isOpen) {
            this.setState({ isOpen: false});
        }
    }


    render() {
        const username = this.props.username;
        const isOpen = this.state.isOpen;

        return (
            <div className="user-menu" >
                <div className="user-menu__container">
                    <div className={`user-menu__item ${isOpen ? "active" : ""}`} onClick={this.toggleMenu}>
                        <MenuIcon className="user-menu__item-humburger" style={{fontSize: 30}} />
                        <img src={UserMenuImage} alt="user-manu-image" className="user-menu__item-image"/>
                    </div>
                    {isOpen && (
                        <div className="user-menu__popup">
                            <Link to="/concept" className="user-menu__popup-item">コンセプト</Link>
                            <Link to="/profile" className="user-menu__popup-item">プロフィ-ル</Link>
                            <div className="user-menu__popup-item user-menu__popup-item-logout" onClick={this.logout}>ログアウト</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: getUser(state),
});

const mapDispatchToProps = {
    fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);

