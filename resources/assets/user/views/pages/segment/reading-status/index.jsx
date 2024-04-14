import React, {Component} from 'react';
import './ReadingStatus.scss';
//Button materialUI
import Button from '@mui/material/Button';

class ReadingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    cycleStatusClass = (cycle, index) => {
        if (cycle > index+1) {
            return 'completed';
        } else if (cycle === index+1) {
            return 'unlocked';
        } else {
            return 'locked';
        }
    }

    vbCount = (majorSegmentId, segmentId, index) => {
        const countEnd = majorSegmentId*1000 + (segmentId-1)*100 + (index+1) *10;
        const countStart =countEnd -9;
        return `${countStart} -${countEnd}`;
    }

    render() {
        const {readingStatus, segmentCycle, majorSegmentId, segmentId} = this.props;
        const cycle = segmentCycle.cycle;
        const cycleList = ['R1', 'R2', 'R3', 'W1', 'W2', 'W3'];
        const resumeFlag = readingStatus.filter(item => item.read_status === 1).length > 0;
        
        return (
            <div className="container">
                <div className="cycle-bar">
                    {cycleList.map((item, index) => {
                        return (
                            <div key={index} >
                                <div className="cycle-bar__item">
                                    <div className={`cycle-bar__item-circle ${this.cycleStatusClass(cycle, index)}`}>{index+1}</div>
                                    <div className='cycle-bar__item-name'>{item}</div>
                                </div>
                                {cycleList.length > index+1 &&
                                    <div className="cycle-bar__line"></div> 
                                }
                            </div>
                        )
                    })}
                </div>
                <table className="reading-table">
                    <thead>
                        <tr>
                            <th className="vb">VB</th>
                            <th className="title">Title</th>
                            <th className="theme">Theme</th>
                            <th className="status">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {readingStatus.map((item, index) => {
                            const status = item.read_status ===0 && resumeFlag ? 'resume' : !resumeFlag ? 'start' : 'read';
                            return (
                                <tr key={index}>
                                    <td className="vb">
                                        {this.vbCount(majorSegmentId, segmentId, index)}
                                    </td>
                                    <td className="title">
                                        {item.title}
                                    </td>
                                    <td className="theme">
                                        <span className="theme-name">{item.article_theme}</span>
                                    </td>
                                    <td className="status">
                                        <button
                                            onClick={this.startReading}
                                            className={`statusButton ${status}`}
                                        >
                                            {status}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    
                </table>
            </div>
        )
    }
}

export default ReadingStatus;