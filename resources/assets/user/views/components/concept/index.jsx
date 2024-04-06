import React, {Component} from 'react';
import UserMenu from '../../components/user-menu';
import TopSidebar from '../../components/sidebar/top-sidebar';

class Concept extends Component {
    render() {
        return (
            <div className="sidebar-container">
                <TopSidebar />
                <div className="main-container">
                    <UserMenu />
                    <h1>Concept</h1>
                </div>
            </div>
        );
    }
}

export default Concept;