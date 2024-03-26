import React, {Component} from 'react';
import Segment from '.';
import {fetchSegments, getSegments} from '../../../state/modules/segment';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

class SegmentContainer extends Component {
    componentDidMount() {
        const {id} = useParams();
        this.props.fetchSegements(id);
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