import React, {Component} from 'react';
import './ReadingStatus.scss';

class ReadingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    statusClass = (cycle, index) => {
        console.log(cycle, index)
        if (cycle > index+1) {
            return 'completed';
        } else if (cycle === index+1) {
            return 'unlocked';
        } else {
            return 'locked';
        }
    }

    vbCount = (majorSegmentId, segmentId, index) => {
        const countEnd = majorSegmentId*1000 + segmentId*100 + (index+1) *10;
        const countStart =countEnd -9;
        return `${countStart} -${countEnd}`;

    }

    render() {
        const {readingStatus, segmentCycle, majorSegmentId, segmentId} = this.props;
        const cycle = segmentCycle.cycle;
        const cycleList = ['R1', 'R2', 'R3', 'W1', 'W2', 'W3'];
        
        return (
            <div className="container">
                <div className="cycle-bar">
                    {cycleList.map((item, index) => {
                        return (
                            <div key={index} >
                                <div className="cycle-bar__item">
                                    <div className={`cycle-bar__item-circle ${this.statusClass(cycle, index)}`}>{index+1}</div>
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
                            <th className="tag">Tag</th>
                            <th className="status">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {readingStatus.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="vb">{this.vbCount(majorSegmentId, segmentId, index)}</td>
                                    <td className="title">{item.title}</td>
                                    <td className="tag">{item.article_theme}</td>
                                    <td className="status">{item.read_status}</td>
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


