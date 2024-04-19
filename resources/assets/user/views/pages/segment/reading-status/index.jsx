import React, {Component} from 'react';
import './ReadingStatus.scss';
import {Link} from 'react-router-dom';
import CyclebarContainer from '../../../components/cyclebar/CyclebarContainer';

class ReadingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    vbCount = (majorSegmentId, segmentId, index) => {
        const countEnd = majorSegmentId*1000 + (segmentId-1)*100 + (index+1) *10;
        const countStart =countEnd -9;
        return `${countStart} -${countEnd}`;
    }

    render() {
        const {readingStatus, majorSegmentId, segmentId} = this.props;
        const resumeFlag = readingStatus.filter(item => item.read_status === 1).length > 0;
        
        return (
            <div className="container">
                <CyclebarContainer  segmentId={segmentId} />
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
                                        {status !== 'read' ?
                                            <Link
                                                to={`/segment/${majorSegmentId}/${segmentId}/article/${index+1}`}
                                                onClick={this.goArticle(index+1)}
                                                className={`statusButton ${status}`}
                                            >
                                                {status}
                                            </Link>
                                        : 
                                        <button
                                            onClick={this.goArticle(index+1)}
                                            className={`statusButton ${status}`}
                                        >
                                            {status}
                                        </button>}
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