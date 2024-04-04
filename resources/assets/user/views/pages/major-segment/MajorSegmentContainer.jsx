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
                majorSegments={this.props.majorSegments}
                userMajorSegmentStatuses={this.props.userMajorSegmentStatuses}
            />
        );
    }
}

const mapToStateProps = state => ({
    majorSegments: getMajorSegment(state),
    userMajorSegmentStatuses: getUserMajorSegmentStatuses(state),
});

const mapDispatchToProps = {
    fetchMajorSegment,
    fetchUserMajorSegmentStatuses,
};

export default connect(mapToStateProps, mapDispatchToProps)(MajorSegmentContainer);

