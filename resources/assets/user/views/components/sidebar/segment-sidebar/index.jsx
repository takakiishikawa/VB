import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './SegmentSidebar.scss';

class SegmentSidebar extends Component {
    constructor(props) {
        super(props);
        this.stete = {
            selectedSegment: null
        }
    }

    render() {
        const {majorSegment, segments, userSegmentStatuses} = this.props;
        console.log(majorSegment, "majorSegment");
        console.log(segments, "segments");
        console.log(userSegmentStatuses, "userSegmentStatuses");

        return (
            <div className="sidebar">
                <div className="sidebar__container">
                    <Link to="/" className="sidebar__logo">
                        VB
                    </Link>
                    <div className="sidebar__back">
                        <ArrowBackIcon className="sidebar__back-icon" />
                        <span className="sidebar__back-text">Back To Home</span>
                    </div>
                    <div className="sidebar__vb-count">
                        VB {majorSegment*1000}
                    </div>
                    <div className="segment">
                        <div className="segment__item">


                        </div>

                    </div>

                </div>

            </div>
            
        )
    }
}



export default SegmentSidebar;

/*
    selectedSegment = (id) => {
        this.setState({selectedSegment: id});
    }

    getSegmentRange = (segment_id, major_segment_id) => {
        const thousand = major_segment_id * 1000;
        const major_segment_id_minus_one = major_segment_id - 1;
        const segmentNumber = segment_id - major_segment_id_minus_one * 10;
        const end = thousand + segmentNumber * 100;
        const start = end - 99;

        return `${start} - ${end}`;
    } 

    render() {
        const {major_segment_id, segments} = this.props;
        const {selectedSegment} = this.state;

        return (
            <div className="sidebar-container">
                <SegmentSidebar />
                <div className="main-container">
                    <UserMenu />
                    <div className="segment">
                        <div className="segment__list">
                                <div className="segment__list__item">
                                    VB {major_segment_id * 1000}
                                </div>
                            {segments.map((segment) => (
                                <div key={segment.id} className="segment__list__item" onClick={() => this.selectedSegment(segment.id)}>
                                    {this.getSegmentRange(segment.id, major_segment_id)}
                                </div>
                            ))}
                        </div>
                        <div className="segment__content">
                            {selectedSegment && <div>Selected Segment: VB {selectedSegment*1000}を表示中!</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
*/




/*
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

*/