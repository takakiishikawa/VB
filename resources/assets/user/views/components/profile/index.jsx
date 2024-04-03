import React, {Component} from 'react';
import Sidebar from '../sidebar';

class Profile extends Component {

    render() {
        return (
            <div>
                <Sidebar />
                <h1>Profile</h1>
            </div>
        );
    }
}

export default Profile;