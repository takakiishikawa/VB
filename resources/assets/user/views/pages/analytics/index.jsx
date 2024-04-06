import React , {Component} from 'react';
import UserMenu from '../../components/user-menu';
import Sidebar from '../../components/sidebar';

class Analytics extends Component {
    render() {
        return (
            <div className="sidebar-container">
                <Sidebar />
                <div className="main-container">
                    <UserMenu />
                    <h1>Analytics</h1>
                </div>
            </div>
        )
    }
}

export default Analytics;