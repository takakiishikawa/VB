import React, {Component} from 'react';
import HelpIcon from '@mui/icons-material/Help';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
        return status == 1 ? <LockOpenIcon className={`major-segment__all__item-status-icon ${this.statusClass(status)}`} />
            : status == 2 ? <CheckCircleOutlineIcon className={`major-segment__all__item-status-icon ${this.statusClass(status)}`} />
                : <LockIcon className={`major-segment__all__item-status-icon ${this.statusClass(status)}`} />
    }

    render() {
        const {majorSegments, userMajorSegmentStatuses} = this.props;
        console.log(majorSegments, "majorSegments");
        console.log(userMajorSegmentStatuses, "userMajorSegmentStatuses");

        const activeMajorSegmentId = userMajorSegmentStatuses.find(item => item.status == 1)?.major_segment_id ?? null;
        return (
            <div>
                <div className="major-segment">
                    <div className="major-segment__open">
                        <p className="major-segment__open__text">Open</p>
                        <Link to={`/major-segment/${activeMajorSegmentId}`} className="major-segment__open__item">
                            <LockOpenIcon className="major-segment__open__item-locked-icon" />
                            <HelpIcon className="major-segment__open__item-help-icon" />
                            <MenuBookIcon className="major-segment__open__item-book-icon" />
                            <span className="major-segment__open__item-level">Level xx</span>
                        </Link>
                    </div>
                    <div className="major-segment__all">
                        <p className="major-segment__all__text">All</p>
                            {majorSegments && majorSegments.map((majorSegment) => {
                                //status1: unlocked, status2: completed, statusnull: locked
                                const status = userMajorSegmentStatuses.find(item => item.major_segment_id === majorSegment.id)?.status ?? null;
                                return (
                                    <Link to={`/segment/${majorSegment.id}`} className="major-segment__all__item" key={majorSegment.id}>
                                        {this.iconCreate(status)}
                                        <HelpIcon className="major-segment__all__item-help-icon" />
                                        <MenuBookIcon className={`major-segment__open__item-book-icon ${this.statusClass(status)}`} />
                                         <span className="major-segment__all__item-level">Level {majorSegment.id}</span>
                                    </Link>
                                )
                            })}
                    </div>
                </div>

            </div>
        );
    }
}

export default MajorSegment;
