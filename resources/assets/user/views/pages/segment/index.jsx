import React, {Component} from 'react';
import UserMenu from '../../components/user-menu';
import SegmentSidebarContainer from '../../components/sidebar/segment-sidebar/SegmentSidebarContainer';

import './Segment.scss';

class Segment extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {majorSegmentId, segmentId, userSegmentStatuses} = this.props;
        const status = userSegmentStatuses[segmentId];

        return (
            <div className="sidebar-container">
                <SegmentSidebarContainer
                    majorSegmentId={majorSegmentId}
                    userSegmentStatuses={userSegmentStatuses}
                />
                <div className="main-container">
                    <UserMenu />
                    <div>
                        {status}
                    </div>
                </div>
            </div>
        );
    }
}

export default Segment;
