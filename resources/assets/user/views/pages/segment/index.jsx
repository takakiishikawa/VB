import React, {Component} from 'react';
import Sidebar from '../../components/sidebar';
import './Segment.scss';

class Segment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            segments: [],
            selectedSegment: null
        };
    }

    selectedSegment = (id) => {
        this.setState({selectedSegment: id});
    }

    getSegmentRange = (segment_id, major_segment_id) => {
        console.log(segment_id, major_segment_id, 'segment_id, major_segment_id')
        const thousand = major_segment_id * 1000;
        const major_segment_id_minus_one = major_segment_id - 1;
        const segmentNumber = segment_id - major_segment_id_minus_one * 10;
        const end = thousand + segmentNumber * 100;
        const start = end - 99;

        return `${start} - ${end}`;
    } 

    render() {
        const {major_segment_id, segments} = this.props;
        const {selectedSegment} = this.state;
        console.log(segments, major_segment_id,  'segments')

        return (
            <div className="segment">
                <Sidebar />
                <div className="segment__list">
                        <div className="segment__list__item">
                            VB {major_segment_id * 1000}
                        </div>
                    {segments.map((segment) => (
                        <div key={segment.id} className="segment__list__item" onClick={() => this.selectedSegment(segment.id)}>
                            {this.getSegmentRange(segment.id, major_segment_id)}
                        </div>
                    ))}
                </div>
                <div className="segment__content">
                    {selectedSegment && <div>Selected Segment: VB {selectedSegment*1000}を表示中!</div>}

                </div>
            </div>
        );
    }
}

export default Segment;
