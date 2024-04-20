import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Progressbar from '../../components/progressbar';
import './Word.scss';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordCount: 0,
            answerWord: null,
            answerList: []
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        const {wordList} = this.props;
        const {wordCount} = this.state;
        const currentWord = wordList[wordCount];
        //37: left, 38: up, 39: right, 40: down
        if (event.keyCode === 37) {
            this.setState({
                answerWord: currentWord.jpList[0].name,
            }, () => {
                this.confirmAnswer();
            });
        } else if (event.keyCode === 38) {
            this.setState({
                answerWord: currentWord.jpList[1].name,
            }, () => {
                this.confirmAnswer();
            });
        } else if(event.keyCode === 39) {
            this.setState({
                answerWord: currentWord.jpList[2].name,
            }, () => {
                this.confirmAnswer();
            });
        } else if (event.keyCode === 40) {
            this.confirmAnswer();
        }
    }

    confirmAnswer = () => {
        const {wordList} = this.props;
        const {wordCount, answerWord} = this.state;
        const correctWord = wordList[wordCount].word;
        console.log(answerWord, 'answerWord');
        console.log(correctWord, 'correctWord');
        if (answerWord == correctWord) {
            this.nextWord();
        } else {
            this.goArticle();
        }
    }

    nextWord() {
        const {wordCount} = this.state;
        this.setState({
            wordCount: wordCount + 1,
            answerWord: null
        });
    }

    goArticle() {
        
    }


    render() {
        const {wordList, segmentId, majorSegmentId} = this.props;
        const {wordCount} = this.state;
        const currentWord = wordList[wordCount];
        console.log(currentWord, 'currentWord');
        console.log(wordList, 'wordList');

        if (!currentWord) {
            return;
        }
        
        return (
            <div>
                <div className="header">
                    <Link
                        to={`/segment/${majorSegmentId}/${segmentId}`}
                        className="header__back"
                        onClick={() => this.props.updateMiddleReadingStatus(segmentId, articleCount)}
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

export default Word;