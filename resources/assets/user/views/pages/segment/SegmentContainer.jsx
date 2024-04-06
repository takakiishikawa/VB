import React, {Component} from 'react';
import Segment from '.';
import {fetchUserSegmentStatuses, getUserSegmentStatuses} from '../../../state/modules/segment';
import {connect} from 'react-redux';

class SegmentContainer extends Component {
    componentDidMount(){
        const {majorSegmentId} = this.props.match.params;
        this.props.fetchUserSegmentStatuses(majorSegmentId);
    }
    

    render(){
        const {majorSegmentId, segmentId} = this.props.match.params;
        console.log(majorSegmentId, segmentId, 'test');
        console.log(this.props.match, 'test2');

        return (
            <Segment
                majorSegmentId={majorSegmentId}
                segmentId={segmentId}
                userSegmentStatuses={this.props.userSegmentStatuses}

            />
        )
    }
}

const mapToStateToProps = state => ({
    userSegmentStatuses: getUserSegmentStatuses(state),
});

const mapDispatchToProps = {
    fetchUserSegmentStatuses,
};

export default connect(mapToStateToProps, mapDispatchToProps)(SegmentContainer);