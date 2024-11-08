import React, {Component} from 'react';
import './Progressbar.scss';

class Progressbar extends Component {

    calcCompletedProgress = (articleCount, articleList) => {
        const defaultProgress = 10 - articleList.length;
        return articleCount * 10 + defaultProgress * 10 + '%';
    }

    calcUncompletedProgress = (articleCount, articleList) => {
        const defaultProgress = 10 - articleList.length;
        return 100 - (articleCount * 10 + defaultProgress * 10) + '%';
    }

    calcWordCompletedProgress = (wordCount) => {
        return wordCount + '%';
    }

    calcWordUncompletedProgress = (wordCount) => {
        return 100 - wordCount + '%';
    }

    render() {
        const {articleCount, articleList, wordCount} = this.props;

        return (
            <>
                {typeof articleCount !== 'undefined' ? 
                    <div className="progress-bar">
                        <div className="progress-bar__completed" style={{width: this.calcCompletedProgress(articleCount, articleList)}}/>
                        <div className={`progress-bar__uncompleted ${articleCount == 0 && "radius"} `} style={{width: this.calcUncompletedProgress(articleCount, articleList)}}/>
                        <div>{articleCount} / 10</div>
                    </div>
                : null}
                {typeof wordCount !== 'undefined' ?
                    <div className="progress-bar">
                        <div className="progress-bar__completed" style={{width: this.calcWordCompletedProgress(wordCount)}}/>
                        <div className={`progress-bar__uncompleted ${wordCount == 0 && "radius"} `} style={{width: this.calcWordUncompletedProgress(wordCount)}}/>
                        <div>{wordCount} / 100</div>
                    </div>
                : null}
            </>
        )
    }
}

export default Progressbar;