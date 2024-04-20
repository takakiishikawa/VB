import React, {Component} from 'react';
import {connect} from 'react-redux';
import WordChallenge from './';
import {fetchWordResult, getWordResult} from '../../../../state/modules/segment';


class WordChallengeContainer extends Component {
    componentDidMount() {
        this.props.fetchWordResult(this.props.segmentId);
        console.log(1);
    }

    render() {
        console.log(2);
        return (
            <WordChallenge {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    wordResult: getWordResult(state),
});

const mapDispatchToProps = {
    fetchWordResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(WordChallengeContainer);