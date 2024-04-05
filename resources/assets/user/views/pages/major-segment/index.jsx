import React, {Component} from 'react';
import HelpIcon from '@mui/icons-material/Help';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/Lockopen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {Link} from 'react-router-dom';
import './MajorSegment.scss';

class MajorSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            majorSegments: [],
            userMajorSegmentStatuses: []
        };
    }

    statusClass = (status) => {
        return status == 1 ? "unlocked"
            : status == 2 ? "completed"
                : "locked";
    }


    iconCreate = (status) => {
        return status == 1 ? <LockOpenIcon className={`major-segment__wrapper__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
            : status == 2 ? <CheckCircleOutlineIcon className={`major-segment__wrapper__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
                : <LockIcon className={`major-segment__wrapper__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
    }

    render() {
        const {majorSegments, userMajorSegmentStatuses} = this.props;
        const activeMajorSegmentId = userMajorSegmentStatuses.find(item => item.status == 1)?.major_segment_id ?? null;
        return (
            <div>
                <div className="major-segment">
                    <div className="major-segment__container">
                        <div className="major-segment__wrapper">
                            <div className="major-segment__wrapper__text">Active</div>
                            <Link to={`/major-segment/${activeMajorSegmentId}`} className="major-segment__wrapper__item active">
                                <LockOpenIcon className="major-segment__wrapper__item-status-icon unlocked" style={{fontSize: 35}} />
                                <HelpIcon className="major-segment__wrapper__item-help-icon" style={{fontSize: 35}} />
                                <MenuBookIcon className="major-segment__wrapper__item-book-icon unlocked" style={{fontSize: 115}} />
                                <span className="major-segment__wrapper__item-level unlocked">Level {activeMajorSegmentId}</span>
                            </Link>
                        </div>
                        <div className="major-segment__wrapper all">
                            <div className="major-segment__wrapper__text">All</div>
                            <div className="major-segment__wrapper__list">
                                {majorSegments && majorSegments.map((majorSegment) => {
                                    //status1: unlocked, status2: completed, statusnull: locked
                                    const status = userMajorSegmentStatuses.find(item => item.major_segment_id === majorSegment.id)?.status ?? null;
                                    return (
                                        <Link to={`/segment/${majorSegment.id}`} className={`major-segment__wrapper__item ${this.statusClass(status)}`} key={majorSegment.id}>
                                            {this.iconCreate(status)}
                                            <HelpIcon className="major-segment__wrapper__item-help-icon" style={{fontSize: 25}} />
                                            <MenuBookIcon className={`major-segment__wrapper__item-book-icon ${this.statusClass(status)}`}  style={{fontSize: 85}} />
                                            <span className="major-segment__wrapper__item-level all">Level {majorSegment.id}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MajorSegment;
