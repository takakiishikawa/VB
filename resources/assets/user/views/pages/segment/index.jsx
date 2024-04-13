import React, {Component} from 'react';
import UserMenu from '../../components/user-menu';
import SegmentSidebarContainer from '../../components/sidebar/segment-sidebar/SegmentSidebarContainer';
import GenerateArticle from './generate-article';
import ReadingStatusContainer from './reading-status/ReadingStatusContainer';
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
        console.log(12);

        return (
            <div className="sidebar-container">
                <SegmentSidebarContainer
                    majorSegmentId={majorSegmentId}
                    userSegmentStatuses={userSegmentStatuses}
                />
                <div className="main-container">
                    <UserMenu />
                    <div className="segment">
                        {status == 1 && 
                            <GenerateArticle
                                segmentId={segmentId}
                            />}
                        {status == 2 && 
                            <ReadingStatusContainer
                                segmentId={segmentId}
                                majorSegmentId={majorSegmentId}
                            />}
                        {(status == 3 || status == 4) && 
                            <WordChallenge
                                
                            />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Segment;
