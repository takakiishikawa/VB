import React, {Component} from 'react';
import UserMenu from '../../components/user-menu';
import SegmentSidebarContainer from '../../components/sidebar/segment-sidebar/SegmentSidebarContainer';
import GenerateArticle from './generate-article';
import RaadingStatus from './reading-status';
import WordChallenge from './word-challenge';

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
                    <div className="segment">
                        {status == 1 && <GenerateArticle />}
                        {status == 2 && <RaadingStatus />}
                        {(status == 3 || status == 4) && <WordChallenge />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Segment;
