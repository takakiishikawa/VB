import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchWordList, getWordList, incrementWordCount, getWordCount, addAnswerList, fetchAnswerList, resetAnswerList, resetWordCount} from '../../../state/modules/word';
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
                wordCount={this.props.wordCount}
                incrementWordCount={this.props.incrementWordCount}
                addAnswerList={this.props.addAnswerList}
                fetchAnswerList={this.props.fetchAnswerList}
                resetAnswerList={this.props.resetAnswerList}
                resetWordCount={this.props.resetWordCount}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    wordList: getWordList(state),
    wordCount: getWordCount(state),
});

const mapDispatchToProps = {
    fetchWordList,
    incrementWordCount,
    addAnswerList,
    fetchAnswerList,
    resetAnswerList,
    resetWordCount,
}

export default connect(mapStateToProps, mapDispatchToProps)(WordContainer);