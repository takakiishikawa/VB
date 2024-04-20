import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchWordList, getWordList} from '../../../state/modules/word';
import Word from './';

class WordContainer extends Component {
    componentDidMount() {
        const {segmentId} = this.props.match.params;
        this.props.fetchWordList(segmentId);
    }  

    render() {
        const {segmentId, majorSegmentId} = this.props.match.params;
        return (
            <Word
                wordList={this.props.wordList}
                segmentId={segmentId}
                majorSegmentId={majorSegmentId}    
            />
        )
    }
}

const mapStateToProps = (state) => ({
    wordList: getWordList(state),
});

const mapDispatchToProps = {
    fetchWordList,
}

export default connect(mapStateToProps, mapDispatchToProps)(WordContainer);