import React, {Component} from 'react';
import Segment from '.';
import {fetchSegments, getSegments} from '../../../state/modules/segment';
import {connect} from 'react-redux';

class SegmentContainer extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchSegments(id);
    }

    render(){
        const major_segment_id = this.props.match.params.id;

        return (
            <Segment
                segments={this.props.segments}
                major_segment_id={major_segment_id}
            />
        )
    }
}

const mapToStateToProps = state => ({
    segments: getSegments(state),
});

const mapDispatchToProps = {
    fetchSegments,
};

export default connect(mapToStateToProps, mapDispatchToProps)(SegmentContainer);