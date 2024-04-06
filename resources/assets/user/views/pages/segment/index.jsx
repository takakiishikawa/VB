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
        const {majorSegmentId} = this.props;

        return (
            <div className="sidebar-container">
                <SegmentSidebarContainer majorSegmentId={majorSegmentId} />
                <div className="main-container">
                    <UserMenu />
                    <div className="segment">
                        xxx
                    </div>
                </div>
            </div>
        );
    }
}

export default Segment;
