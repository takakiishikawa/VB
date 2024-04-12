import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchReadingStatus, getReadingStatus} from '../../../../state/modules/segment';
import ReadingStatus from './';

class ReadingStatusContainer extends Component {
    componentDidMount() {
        const {segmentId} = this.props;
        console.log(1);
        this.props.fetchReadingStatus(segmentId);
    }
    render() {
        return (
            <ReadingStatus {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    readingStatus: getReadingStatus(state),

})


const mapDispatchToProps = {
    fetchReadingStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingStatusContainer);