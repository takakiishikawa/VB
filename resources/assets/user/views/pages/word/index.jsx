import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Progressbar from '../../components/progressbar';
import ArticleContainer from '../article/ArticleContainer';
import './Word.scss';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerWord: null
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        const {wordList, wordCount} = this.props;
        const currentWord = wordList[wordCount];
        const userArticleId = currentWord.userArticleId;
        //37: left, 38: up, 39: right, 40: down
        if (event.keyCode === 37) {
            this.setState({
                answerWord: currentWord.jpList[0].name,
            }, () => {
                this.confirmAnswer(userArticleId);
            });
        } else if (event.keyCode === 38) {
            this.setState({
                answerWord: currentWord.jpList[1].name,
            }, () => {
                this.confirmAnswer(userArticleId);
            });
        } else if(event.keyCode === 39) {
            this.setState({
                answerWord: currentWord.jpList[2].name,
            }, () => {
                this.confirmAnswer(userArticleId);
            });
        } else if (event.keyCode === 40) {
            this.confirmAnswer(userArticleId);
        }
    }

    confirmAnswer = (userArticleId) => {
        const {wordList, wordCount} = this.props;
        const {answerWord} = this.state;
        const correctWord = wordList[wordCount].word;
        if (answerWord == correctWord) {
            this.props.addAnswerList({
                word: correctWord,
                testPass: true
            }, () => {
                console.log(this.props.answerList, 'answerList')
            });
            this.nextWord();
        } else {
            console.log(correctWord, 'correctWord')
            this.props.addAnswerList({
                word: correctWord,
                testPass: false
            }, () => {
                console.log(this.props.answerList, 'answerList')
            });
            this.goArticle(userArticleId);
        }
    }

    nextWord() {
        this.props.incrementWordCount();
        this.setState({
            answerWord: null
        });
    }

    goArticle(userArticleId) {
        this.props.incrementWordCount();
        this.setState({
            answerWord: null
        }, () => {
            this.props.history.push({
                pathname: `/segment/${this.props.majorSegmentId}/${this.props.segmentId}/article/${userArticleId}`,
                state: {type: 'word'}
            });
        });
    }


    render() {
        const {wordList, segmentId, majorSegmentId, wordCount} = this.props;
        const currentWord = wordList[wordCount];
        console.log(this.props.answerList, 'answerList');
        console.log(wordCount, 'wordCount');

        if (!currentWord) {
            return;
        }
        
        return (
            <div>
                <div className="header">
                    <Link
                        to={`/segment/${majorSegmentId}/${segmentId}`}
                        className="header__back"
                    >
                        <ArrowBackIcon style={{fontSize:27, color: "#222222"}} />
                    </Link>
                    <Progressbar
                        wordCount={wordCount}
                    />
                </div>
                <div className="word-challenge">
                    <div className="question">
                        <div className="question__parse">
                            {currentWord.parseList.map((item, index) => {
                                return (
                                    <span className="question__parse-item" key={index}>
                                        {item}
                                    </span>
                                )
                            })}
                        </div>
                        <div className="question__name">
                            {currentWord.word}
                        </div>
                    </div>
                    <div className="answer">
                        <div className="answer__row">
                            <div className="answer__item vertical">
                                <ArrowUpwardIcon style={{fontSize: 25, color: "#222222"}} />
                                <span className="answer__item-text">
                                    {currentWord.jpList[1].jp}
                                </span>
                            </div>
                        </div>
                        <div className="answer__row flex">
                            <div className="answer__item horizontal">
                                <ArrowBackIcon style={{fontSize: 25, color: "#222222"}} />
                                <span className="answer__item-text">
                                    {currentWord.jpList[0].jp}
                                </span>
                            </div>
                            <div className="answer__item horizontal">
                                <span className="answer__item-text">
                                    {currentWord.jpList[2].jp}
                                </span>
                                <ArrowForwardIcon style={{fontSize: 25, color: "#222222"}} />
                            </div>
                        </div>
                        <div className="answer__row">
                            <div className="answer__item vertical">
                                <span className="answer__item-text">
                                    ?
                                </span>
                                <ArrowDownwardIcon style={{fontSize: 25, color: "#222222"}} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, null)(Word));