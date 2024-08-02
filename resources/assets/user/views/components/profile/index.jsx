import React, {Component} from 'react';
import UserMenu from '../../components/user-menu';
import TopSidebar from '../../components/sidebar/top-sidebar';
import './Profile.scss';


class Profile extends Component {

    render() {
        return (
            <div className="sidebar-container">
                <TopSidebar />
                <div className="main-container">
                    <UserMenu />
                    <h1>Profile</h1>
                </div>
            </div>
        );
    }
}

export default Profile;