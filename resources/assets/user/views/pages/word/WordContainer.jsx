import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchWordList, getWordList} from '../../../state/modules/word';
import Word from './';

class WordContainer extends Component {
    componentDidMount() {
        console.log(1, 'wordContainer')
        const {segmentId} = this.props.match.params;
        console.log(this.props.match.params, 'wordContainer')
        console.log(segmentId, 'wordContainer');
        this.props.fetchWordList(segmentId);
    }  

    render() {
        return (
            <Word {...this.props} />
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