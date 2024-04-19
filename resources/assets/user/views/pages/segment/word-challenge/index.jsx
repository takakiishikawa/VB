import React, {Component} from 'react';
import CyclebarContainer from '../../../components/cyclebar/CyclebarContainer';


class WordChallenge extends Component {
    render() {
        const {segmentId} = this.props;

        return (
            <div className="container">
                <CyclebarContainer segmentId={segmentId} />
            </div>
        )
    }
}

export default WordChallenge;