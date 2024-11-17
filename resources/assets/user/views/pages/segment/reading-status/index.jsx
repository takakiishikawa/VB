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
        if (majorSegmentId == 1) {
            const countEnd = segmentId * 100 - 90 + (index * 10);
            const countStart = countEnd - 9;
            return `${countStart} - ${countEnd}`;
        }
        // major_segment_id が 2 以上の場合（1001-2000などの範囲）
        else {
            const countEnd = majorSegmentId*1000 + (segmentId-1)*100 + (index+1)*10;
            const countStart = countEnd - 9;
            return `${countStart} - ${countEnd}`;
        }
    }

    render() {
        const {readingStatus, majorSegmentId, segmentId} = this.props;
        const resumeFlag = readingStatus.filter(item => item.read_status === 1).length > 0;
        
        return (
            <div>
                <CyclebarContainer  segmentId={segmentId} />
                <div className="container">
                    <table className="reading-table">
                        <thead>
                            <tr>
                                <th className="vb">単語</th>
                                <th className="title">タイトル</th>
                                <th className="theme">タグ</th>
                                <th className="status">未読 / 既読</th>
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
                                                    className={`statusButton ${status}`}
                                                >
                                                    {status}
                                                </Link>
                                            : 
                                            <button
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
            </div>
        )
    }
}

export default ReadingStatus;