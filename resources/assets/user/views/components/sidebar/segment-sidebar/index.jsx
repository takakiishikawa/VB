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
        if (major_segment_id === 1) {
            const end = segment_id * 100;
            const start = end - 99;
            return `${start} - ${end}`;
        }
        // major_segment_id が 2 以上の場合（1001-2000などの範囲）
        else {
            const baseStart = (major_segment_id - 1) * 1000 + 1;
            const segmentNumber = segment_id - (major_segment_id - 1) * 10;
            const start = baseStart + (segmentNumber - 1) * 100;
            const end = start + 99;
            return `${start} - ${end}`;
        }
    
    } 

    render() {
        const {majorSegment, segments, userSegmentStatuses} = this.props;

        return (
            //ほかsegmentcomponent画面遷移、lockedのprevntLink, segmentCへのstatus + segment_id受け渡し
            <div className="sidebar">
                <div className="sidebar__container">
                    <Link to="/" className="sidebar__logo">
                        ボキャビル
                    </Link>
                    <Link to="/" className="sidebar__back" style={{textDecoration: "none"}}>
                        <ArrowBackIcon className="sidebar__back-icon" />
                        <span className="sidebar__back-text">前のページへ戻る</span>
                    </Link>
                    <div className="sidebar__title">
                        範囲：{majorSegment*1000-999} ~ {majorSegment*1000}
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
                                <span className="sidebar__item-text">単語：{this.getSegmentRange(segment.id, majorSegment)}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
            
        )
    }
}

export default SegmentSidebar;
