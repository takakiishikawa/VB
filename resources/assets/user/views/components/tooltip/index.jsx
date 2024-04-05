import React, {Component} from 'react';
import './Tooltip.scss';

class Tooltip extends Component {
    render(){
        const {levelSentence, majorSegmentId, className} = this.props;

        return (
            <div className={`tooltip ${className}`}>
                <div className="tooltip__container">
                    <span className="tooltip__container-text">
                        Vocabulary {majorSegmentId*1000-999} ~ {majorSegmentId*1000}
                    </span>
                    <span className="tooltip__container-text">
                        {levelSentence}
                    </span>
                </div>
            </div>
        )
    }
}

export default Tooltip;
