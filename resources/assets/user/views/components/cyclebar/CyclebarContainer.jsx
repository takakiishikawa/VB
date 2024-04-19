import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSegmentCycle, getSegmentCycle} from '../../../state/modules/segment';
import Cyclebar from './';

class CyclebarContainer extends Component {
    componentDidMount() {
        this.props.fetchSegmentCycle(this.props.segmentId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.segmentId !== this.props.segmentId) {
            this.props.fetchSegmentCycle(this.props.segmentId);
        }
    }

    render() {
        return (
            <Cyclebar {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    segmentCycle: getSegmentCycle(state)
});

const mapDispatchToProps = {
    fetchSegmentCycle
}

export default connect(mapStateToProps, mapDispatchToProps)(CyclebarContainer);