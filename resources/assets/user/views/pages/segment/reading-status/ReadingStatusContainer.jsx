import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchReadingStatus, getReadingStatus, fetchSegmentCycle, getSegmentCycle} from '../../../../state/modules/segment';
import ReadingStatus from './';

class ReadingStatusContainer extends Component {
    componentDidMount() {
        const {segmentId} = this.props;
        this.props.fetchReadingStatus(segmentId);
        this.props.fetchSegmentCycle(segmentId);
    }
    render() {
        return (
            <ReadingStatus {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    readingStatus: getReadingStatus(state),
    segmentCycle: getSegmentCycle(state)

})


const mapDispatchToProps = {
    fetchReadingStatus,
    fetchSegmentCycle
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingStatusContainer);