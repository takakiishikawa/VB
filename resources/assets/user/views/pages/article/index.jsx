import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {updateReadingStatus, updateMiddleReadingStatus} from '../../../state/modules/segment';
import './Article.scss';
import Tooltip from '../../components/tooltip';
import Progressbar from '../../components/progressbar';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleCount: 0,
            showTooltipId: null
        };
    }


    componentDidMount = () => {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (
            (prevProps.articleList !== this.props.articleList && this.props.articleList.length > 0) ||
            prevState.articleCount !== this.state.articleCount
        ) {
            const articleInfo = this.props.articleList[this.state.articleCount];
            const fullText = `${articleInfo.title}. ${articleInfo.article}`;
            this.playText(fullText);
        }

        if (this.state.articleCount === this.props.articleList.length) {
            this.props.updateReadingStatus(this.props.segmentId);
            this.props.history.push(`/segment/${this.props.majorSegmentId}/${this.props.segmentId}`);
    
        }
    }

    componentWillUnmount = () => {
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
                        ssmlGender: 'MALE',        // 男性の声の方が一般的に聞き取りやすい
                        name: 'en-US-Neural2-D'
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
        const {type} = this.props.history.location.state || {};

        if (event.keyCode === 39) {
            if (type == 'word') {
                this.nextWord();
            } else {
                this.nextArticle();
            }
        } else if (event.keyCode === 37) {
            if (type == 'word') {
                this.nextWord();
            } else {
                this.backArticle();
            }
        }
    }

    nextArticle = () => {
        this.setState({
            articleCount: this.state.articleCount + 1,
        });
    }

    backArticle = () => {
        if (this.state.articleCount > 1) {
            this.setState({
                articleCount: this.state.articleCount - 1,
            });
        }
    }
    
    showTooltip = (index) => {
        this.setState({
            showTooltipId: index
        });
    }

    hideTooltip = () => {
        this.setState({
            showTooltipId: null
        });
    }

    highlightedArticle = (articleInfo) => {

        const words = articleInfo.article.split(/(\s+|[.,!?;])/);
        return words.map((item, index) => {
            const wordListArray = Object.values(articleInfo.wordList);
            const cleanItem = item.toLowerCase().replace(/[.,!?;]/g, '');  // 比較用のトークンをクリーンアップ

            const isWordInList = wordListArray.some(item2 => item2.word == cleanItem);
            const wordArray = wordListArray.filter(item => item.word == cleanItem);
            const wordDetail = wordArray[0];
                if (isWordInList) {
                    return (
                        <span key={index}>
                            <span
                                className="content__article__highlight"
                                key={index}
                                onMouseEnter={() => this.showTooltip(index)}
                                onMouseLeave={() => this.hideTooltip()}
                            >
                                <span className="content__article__highlight-word" key={index}>
                                    {item}
                                    {this.state.showTooltipId === index &&
                                        <Tooltip
                                            className="word"
                                            wordList={wordDetail}
                                        />
                                    }
                                </span>
                            </span>
                        </span>
                    )
                } else {
                    return (
                        <span key={index}>
                            {item}
                        </span>
                    )
                }
        })
    }

    nextWord = () => {
        this.props.history.push(`/segment/${this.props.majorSegmentId}/${this.props.segmentId}/word`);
    }

    render() {
        const {articleCount} = this.state;
        const {articleList, segmentId, majorSegmentId} = this.props;
        const articleInfo = articleList[articleCount];
        const {type} = this.props.history.location.state || {};

        if (!articleInfo) {
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
                    {type !== 'word' ?
                        <Progressbar
                            articleCount={articleCount}
                            articleList={articleList}
                        />
                    : null }
                </div>
                <div className="content">
                    <div>
                        <div className="content__theme">
                            {articleInfo.article_theme}
                        </div>
                    </div>
                    <div className="content__title">
                        {articleInfo.title}
                    </div>
                    <div className="content__article">
                        {this.highlightedArticle(articleInfo)}
                    </div>
                </div>

                <div className="next">
                    {type == 'word' ?
                        <ArrowForwardIcon
                            onClick={this.nextWord}
                            style={{
                                fontSize: 30,
                                color: "#FFFFFF",
                                backgroundColor: "#3F51B5",
                                borderRadius: 8,
                                padding: 6,
                                cursor: "pointer",
                            }}
                        />
                    : (
                        <>
                            <ArrowBackIcon
                                onClick={this.nextArticle}
                                style={{
                                    fontSize: 30,
                                    color: "#FFFFFF",
                                    backgroundColor: "#3F51B5",
                                    borderRadius: 8,
                                    padding: 6,
                                    cursor: "pointer",
                                }}
                            />
                            <ArrowForwardIcon
                                onClick={this.nextArticle}
                                style={{
                                    fontSize: 30,
                                    color: "#FFFFFF",
                                    backgroundColor: "#3F51B5",
                                    borderRadius: 8,
                                    padding: 6,
                                    cursor: "pointer",
                                }}
                            />
                        </>
                    )
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateReadingStatus,
    updateMiddleReadingStatus
}

export default withRouter(connect(null, mapDispatchToProps)(Article));