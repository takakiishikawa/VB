import React, {Component} from 'react';
import UserMenu from '../../components/user-menu';
import Sidebar from '../../components/sidebar';
import "./Profile.scss";


class Profile extends Component {

    render() {
        return (
            <div className="sidebar-container">
                <Sidebar />
                <div className="main-container">
                    <UserMenu />
                    <h1>Profile</h1>
                </div>
            </div>
        );
    }
}

export default Profile;