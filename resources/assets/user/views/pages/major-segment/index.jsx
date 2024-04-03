import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import './MajorSegment.scss';

class MajorSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major_segments: [],
            user_major_segment_statuses: []
        };
    }

    statusClass = (id) => {
        const statusObj = this.props.user_major_segment_statuses.find(status => status.major_segment_id === id);
        return !statusObj ? "major-segment__item--close" : statusObj.status === "2" ? "major-segment__item--completed" : "";
    }

    render() {
        const {major_segments} = this.props;
        return (
            <div>

                <div className="major-segment">
                    {/* onClick追加する */}
                    {major_segments && major_segments.map((major_segment)=>{
                        const statusClassName = `major-segment__item ${this.statusClass(major_segment.id)}`;
                        const isClose = this.statusClass(major_segment.id).includes("close");
                        return (
                            <div key={major_segment.id} className={statusClassName}>
                                {isClose ? (
                                    <div>
                                        VB {major_segment.id*1000}
                                    </div>
                                ) : (
                                    <Link
                                        to={`/segment/${major_segment.id}`}
                                        style={{textDecoration: 'none', color: 'inherit'}}>
                                        <div>
                                            VB {major_segment.id*1000}
                                            {this.statusClass(major_segment.id).includes("completed") && <span className="completed-icon">✔</span>}
                                        </div>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MajorSegment;
