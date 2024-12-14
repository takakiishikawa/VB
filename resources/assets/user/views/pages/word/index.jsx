import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
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
            answerWord: null
        };
    }

    componentDidMount() {
        const {segmentId} = this.props;
        document.addEventListener('keydown', this.handleKeyDown);
        if (this.props.wordCount === 100) {
            this.props.fetchAnswerList(segmentId);
            this.props.resetAnswerList();
            this.props.resetWordCount();
            this.props.history.push(`/segment/${this.props.majorSegmentId}/${segmentId}`);
        }
    }

    componentDidUpdate() {
        const {segmentId} = this.props;
        if (this.props.wordCount === 100) {
            this.props.fetchAnswerList(segmentId);
            this.props.resetAnswerList();
            this.props.resetWordCount();
            this.props.history.push(`/segment/${this.props.majorSegmentId}/${segmentId}`);
        }
        
        // 単語が変わったときに音声再生
        if (prevProps.wordCount !== this.props.wordCount && this.props.wordList[this.props.wordCount]) {
            this.playText(this.props.wordList[this.props.wordCount].word);
        }     
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    //text to speech
    playText = async (fullText) => {
        const TTS_API_KEY = import.meta.env.VITE_GOOGLE_TTS_API_KEY || process.env.REACT_APP_GOOGLE_TTS_API_KEY;

        try {
            const response = await axios.post(
                'https://texttospeech.googleapis.com/v1/text:synthesize',
                {
                    input: {
                        text: fullText
                    },
                    voice: {
                        languageCode: 'en-US',
                        ssmlGender: 'FEMALE',        // 男性の声の方が一般的に聞き取りやすい
                        name: 'en-US-Neural2-H'
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        pitch: 0,
                        speakingRate: 1,
                        volumeGainDb: 1,
                        effectsProfileId: [
                            'headphone-class-device' // ヘッドホン用に最適化
                        ]
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        key: TTS_API_KEY
                    }
                }
            );
            
            const audio = new Audio(`data:audio/mp3;base64,${response.data.audioContent}`);
            //Chromeの自動再生の取り決め回避
            audio.muted = true; // 最初はミュート
            await audio.play();
            audio.muted = false; // 再生開始後にミュート解除

        } catch (error) {
            console.error('Failed to play audio:', error.response?.data || error);
        }
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
        console.log(1)
        const {wordList, wordCount} = this.props;
        const {answerWord} = this.state;
        const correctWord = wordList[wordCount].word;
        console.log(2)
        if (answerWord == correctWord) {
            this.props.addAnswerList({
                word: correctWord,
                testPass: true
            });
            console.log(3)
            this.nextWord();
        } else {
            this.props.addAnswerList({
                word: correctWord,
                testPass: false
            }); 
            this.goArticle(userArticleId);
        }
    }

    nextWord() {
        console.log(4)
        this.props.incrementWordCount();
        this.setState({
            answerWord: null
        });
    }

    goArticle(userArticleId) {
        this.props.incrementWordCount();
        //記事のx番目、を抽出したいので、一の位を出す
        const articleId = userArticleId % 10;
        this.setState({
            answerWord: null
        }, () => {
            this.props.history.push({
                pathname: `/segment/${this.props.majorSegmentId}/${this.props.segmentId}/article/${articleId + 1}`,
                state: {type: 'word'}
            });
        });
    }

    render() {
        console.log(6)
        const {wordList, segmentId, majorSegmentId, wordCount} = this.props;
        console.log(this.props, ' tet')
        const currentWord = wordList[wordCount];

        console.log(7)

        if (!currentWord) {
            return;
        }
        
        console.log(8)

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
                                    <span className={`${item && "question__parse-item"}`} key={index}>
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