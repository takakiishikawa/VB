import React, {Component} from 'react';
import SegmentSidebar from '.';
import {fetchSegments, getSegments} from '../../../../state/modules/segment';
import {getSidebarState} from '../../../../state/modules/sidebar';
import {connect} from 'react-redux';

class SegmentSidebarContainer extends Component {
    componentDidMount() {
        this.props.fetchSegments(this.props.majorSegmentId);
    }

    render(){
        const {segments, majorSegment, userSegmentStatuses} = this.props;

        return (
            <SegmentSidebar
                segments={segments}
                majorSegment={majorSegment}
                userSegmentStatuses={userSegmentStatuses}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    segments: getSegments(state),
    majorSegment: getSidebarState(state),
})

const mapDispatchToProps = {
    fetchSegments,
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentSidebarContainer);
