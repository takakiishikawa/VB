import React, {Component} from 'react';
import Header from '../../components/header';
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
        console.log(this.props, 'this.props')
        return (
            <div>
                <Header />
                <div className="major-segment">
                    {/* onClick追加する */}
                    {major_segments && major_segments.map((segment)=>{
                        const statusClassName = `major-segment__item ${this.statusClass(segment.id)}`;
                        const isClose = this.statusClass(segment.id).includes("close");
                        return (
                            <div key={segment.id} className={statusClassName}>
                                {isClose ? (
                                    <div>
                                        VB {segment.id*1000}
                                    </div>
                                ) : (
                                    <Link to={`./segment/${segment.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                        {console.log(1)}
                                        <div>
                                            VB {segment.id*1000}
                                            {console.log(this.statusClass(segment.id).includes("completed"))}
                                            {this.statusClass(segment.id).includes("completed") && <span className="completed-icon">✔</span>}
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
