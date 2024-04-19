import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchReadingStatus, getReadingStatus, fetchSegmentCycle, getSegmentCycle} from '../../../../state/modules/segment';
import ReadingStatus from './';

class ReadingStatusContainer extends Component {
    componentDidMount() {
        this.props.fetchReadingStatus(this.props.segmentId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.segmentId !== this.props.segmentId) {
            this.props.fetchReadingStatus(this.props.segmentId);
        }
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