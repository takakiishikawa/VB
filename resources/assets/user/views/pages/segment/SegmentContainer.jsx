import React, {Component} from 'react';
import Segment from '.';
import {fetchSegments, getSegments} from '../../../state/modules/segment';
import {connect} from 'react-redux';

class SegmentContainer extends Component {
    componentDidMount() {
        console.log(this.props, 'props')
        this.props.fetchSegments(1);
    }

    render(){
        return (
            <Segment
                segments={this.props.segments}
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