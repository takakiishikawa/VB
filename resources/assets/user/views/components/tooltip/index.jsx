import React, {Component} from 'react';
import './Tooltip.scss';

class Tooltip extends Component {
    render(){
        const {levelSentence, majorSegmentId, className, wordList} = this.props;

        return (
            <div className={`tooltip ${className}`}>
                {((className == "help-icon") || (className == "help-icon-all")) && (
                    <div className="tooltip__help-icon">
                        <span className="tooltip__help-icon-text">
                            Vocabulary {majorSegmentId*1000-999} ~ {majorSegmentId*1000}
                        </span>
                        <span className="tooltip__help-icon-text">
                            {levelSentence}
                        </span>
                    </div>
                )}
                {className == "word" && (
                    <div className="tooltip__word">
                        <div className="tooltip__word__parse">
                            {wordList.parse.map((item, index) => {
                                return (
                                    <span className="tooltip__word__parse-item" key={index}>
                                        {item}
                                    </span>
                                )
                            })}
                        </div>
                        <div className="tooltip__word__jp">
                            {wordList.jp}
                        </div>
                        <div className="tooltip__word__meaning">
                            {wordList.meaning}
                        </div>

                    </div>
                )}
            </div>
        )
    }
}

export default Tooltip;
