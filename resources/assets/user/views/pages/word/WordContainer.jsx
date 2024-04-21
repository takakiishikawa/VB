import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchWordList, getWordList, incrementWordCount, getWordCount, addAnswerList, getAnswerList} from '../../../state/modules/word';
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
                //後でfetchAnswerListに変更する
                answerList={this.props.answerList}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    wordList: getWordList(state),
    wordCount: getWordCount(state),
    answerList: getAnswerList(state)
});

const mapDispatchToProps = {
    fetchWordList,
    incrementWordCount,
    addAnswerList
}

export default connect(mapStateToProps, mapDispatchToProps)(WordContainer);