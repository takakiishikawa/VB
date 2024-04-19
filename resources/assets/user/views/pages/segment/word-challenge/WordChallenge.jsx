import React, {Component} from 'react';
import {connect} from 'react-redux';
import WordChallenge from './';


class WordChallengeContainer extends Component {
    render() {
        return (
            <WordChallenge {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WordChallengeContainer);