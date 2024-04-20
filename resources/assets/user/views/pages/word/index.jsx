import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Progressbar from '../../components/progressbar';
import './Word.scss';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordCount: 10,
        };
    }

    render() {
        const {wordList, segmentId, majorSegmentId} = this.props;
        const {wordCount} = this.state;
        console.log(wordList, 'wordList');
        
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
            </div>
        );
    }
}

export default Word;