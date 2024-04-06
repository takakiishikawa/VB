import React, {Component} from 'react';
import Segment from '.';
import {fetchSegments, getSegments} from '../../../state/modules/segment';
import {connect} from 'react-redux';

class SegmentContainer extends Component {

    render(){
        const majorSegmentId = this.props.match.params.id;

        return (
            <Segment
                majorSegmentId={majorSegmentId}
            />
        )
    }
}

const mapToStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapToStateToProps, mapDispatchToProps)(SegmentContainer);