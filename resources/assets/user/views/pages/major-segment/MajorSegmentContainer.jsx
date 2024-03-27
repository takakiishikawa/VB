import React, {Component} from 'react';
import {fetchMajorSegment, getMajorSegment} from '../../../state/modules/major-segment';
import {fetchUserMajorSegmentStatuses, getUserMajorSegmentStatuses} from '../../../state/modules/major-segment';
import {connect} from 'react-redux';
import MajorSegment from './';

class MajorSegmentContainer extends Component {
    componentDidMount() {
        this.props.fetchMajorSegment();
        this.props.fetchUserMajorSegmentStatuses();
    }
    render() {
        return (
            <MajorSegment
                major_segments={this.props.major_segments}
                user_major_segment_statuses={this.props.user_major_segment_statuses}
            />
        );
    }
}

const mapToStateProps = state => ({
    major_segments: getMajorSegment(state),
    user_major_segment_statuses: getUserMajorSegmentStatuses(state),
});

const mapDispatchToProps = {
    fetchMajorSegment,
    fetchUserMajorSegmentStatuses,
};

export default connect(mapToStateProps, mapDispatchToProps)(MajorSegmentContainer);

