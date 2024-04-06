import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getSidebarState} from '../../../../state/modules/sidebar';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import './TopSidebar.scss';


class TopSidebar extends Component {
    render() {
        const pathName = this.props.location.pathname;
        const {majorSegment} = this.props;
        console.log(majorSegment, "majorSegment")

        return(
            <div className="sidebar">
                <div className="sidebar__container">
                    <Link to="/" className="sidebar__logo">
                        VB
                    </Link>
                    <nav className="sidebar__nav">
                        <Link to="/" className={`sidebar__nav__item ${pathName === "/" ? "active" : ""} `}>
                            <span className="sidebar__nav__item-icon"><HomeIcon /></span>
                            <span className="sidebar__nav__item-text">Home</span>
                        </Link>

                        <Link to="/tag" className={`sidebar__nav__item ${pathName === "/tag" ? "active" : ""}`}>
                            <span className="sidebar__nav__item-icon"><FormatListBulletedIcon /></span>
                            <span className="sidebar__nav__item-text">Tag</span>
                        </Link>
                        <Link to="/analytics" className={`sidebar__nav__item ${pathName === "/analytics" ? "active" : ""} `}>
                            <span className="sidebar__nav__item-icon"><QueryStatsIcon /></span>
                            <span className="sidebar__nav__item-text">Analytics</span>
                        </Link>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    majorSegment: getSidebarState(state),
});


export default withRouter(connect(mapStateToProps)(TopSidebar));
