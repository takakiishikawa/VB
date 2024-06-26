import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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

    statusClass = (status) => {
        //status1: unlocked, status2: completed, statusnull: locked
        return (status == 1 || status == 2 || status == 3) ? "unlocked"
            : status == 4 ? "completed"
                : "locked";
    }

    iconCreate = (status) => {
        return (status == 1 || status == 2 || status == 3) ? <LockOpenIcon className={`sidebar__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
            : status == 4 ? <CheckCircleOutlineIcon className={`sidebar__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
                : <LockIcon className={`sidebar__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
    }

    preventLink = (event) => {
        event.preventDefault();
        event.stopPropagation();
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
        const {majorSegment, segments, userSegmentStatuses} = this.props;

        return (
            //ほかsegmentcomponent画面遷移、lockedのprevntLink, segmentCへのstatus + segment_id受け渡し
            <div className="sidebar">
                <div className="sidebar__container">
                    <Link to="/" className="sidebar__logo">
                        VB
                    </Link>
                    <Link to="/" className="sidebar__back" style={{textDecoration: "none"}}>
                        <ArrowBackIcon className="sidebar__back-icon" />
                        <span className="sidebar__back-text">Back To Home</span>
                    </Link>
                    <div className="sidebar__title">
                        VB {majorSegment*1000}
                    </div>
                    {segments.map((segment) => {
                        const status = userSegmentStatuses[segment.id];
                        return (
                            <Link 
                                to={`/segment/${majorSegment}/${segment.id}`} 
                                className={`sidebar__item ${this.statusClass(status)} `}
                                key={segment.id}
                                style={{textDecoration: "none"}}
                                onClick={!status ? this.preventLink : null}
                            >
                                {this.iconCreate(status)}
                                <span className="sidebar__item-text">{this.getSegmentRange(segment.id, majorSegment)}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
            
        )
    }
}

export default SegmentSidebar;
