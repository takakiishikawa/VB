import React, {Component} from 'react';
import Header from '../../components/header';
import {fetchMajorSegment, getMajorSegment} from '../../../state/modules/major-segment';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './MajorSegment.scss';

class MajorSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major_segments: []
        };
    }

    componentDidMount() {
        this.props.fetchMajorSegment();
    }

    render() {
        const {major_segments} = this.props;
        return (
            <div>
                <Header />
                <div className="major-segment">
                    {/* onClick追加する */}
                    {major_segments && major_segments.map((segment)=>(
                        <Link to={`./segment/${segment.id}`} key={segment.id} style={{textDecoration: 'none', color: 'inherit' }} >
                            <div key={segment.id} className="major-segment__item">
                                VB {segment.id*1000}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

const mapToStateProps = state => ({
    major_segments: getMajorSegment(state),
});

const mapDispatchToProps = {
    fetchMajorSegment,
};

export default connect(mapToStateProps, mapDispatchToProps)(MajorSegment);
