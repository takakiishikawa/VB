import React, {Component} from 'react';
import HelpIcon from '@mui/icons-material/Help';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/Lockopen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Tooltip from '../../components/tooltip';
import UserMenu from '../../components/user-menu';
import Sidebar from '../../components/sidebar';
import levelSentence from './level-sentence';
import {fetchSidebarState} from '../../../state/modules/sidebar';
import './MajorSegment.scss';

class MajorSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            majorSegments: [],
            userMajorSegmentStatuses: [],
            showTooltipId: null
        };
    }

    statusClass = (status) => {
        //status1: unlocked, status2: completed, statusnull: locked
        return status == 1 ? "unlocked"
            : status == 2 ? "completed"
                : "locked";
    }


    iconCreate = (status) => {
        return status == 1 ? <LockOpenIcon className={`major-segment__wrapper__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
            : status == 2 ? <CheckCircleOutlineIcon className={`major-segment__wrapper__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
                : <LockIcon className={`major-segment__wrapper__item-status-icon ${this.statusClass(status)}`}  style={{fontSize: 25}} />
    }

    preventLink = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    showTooltip = (id) => {
        this.setState({
            showTooltipId: id
        })
    }

    hideTooltip = () => {
        this.setState({
            showTooltipId:null
        })
    }

    render() {
        const {majorSegments, userMajorSegmentStatuses} = this.props;
        const activeMajorSegmentId = userMajorSegmentStatuses.find(item => item.status == 1)?.major_segment_id ?? null;
        
        return (
            <div className="sidebar-container">
                <Sidebar />
                <div className="main-container">
                    <UserMenu />
                    <div className="major-segment">
                        <div className="major-segment__container">
                            <div className="major-segment__wrapper">
                                <Tooltip />
                                <div className="major-segment__wrapper__text">Active</div>
                                <Link 
                                    to={`/major-segment/${activeMajorSegmentId}`} 
                                    className="major-segment__wrapper__item active"
                                    onClick={() => this.props.fetchSidebarState(activeMajorSegmentId)}
                                >
                                    <LockOpenIcon className="major-segment__wrapper__item-status-icon unlocked" style={{fontSize: 35}} />
                                    <div className="major-segment__wrapper__item-help-container"
                                        onClick={this.preventLink}
                                        //0: unique id for active major segment
                                        onMouseEnter={() => this.showTooltip(0)}
                                        onMouseLeave={() => this.hideTooltip()}
                                    >
                                        <HelpIcon
                                            className="major-segment__wrapper__item-help-icon"
                                            style={{fontSize: 35}}
                                        />
                                        {this.state.showTooltipId === 0 ?
                                            <Tooltip 
                                                levelSentence={levelSentence[activeMajorSegmentId]}
                                                majorSegmentId={activeMajorSegmentId}
                                                className="help-icon"
                                            /> : null }
                                    </div>
                                    <MenuBookIcon className="major-segment__wrapper__item-book-icon unlocked" style={{fontSize: 115}} />
                                    <span className="major-segment__wrapper__item-level unlocked">Level {activeMajorSegmentId}</span>
                                </Link>
                            </div>
                            <div className="major-segment__wrapper all">
                                <div className="major-segment__wrapper__text">All</div>
                                <div className="major-segment__wrapper__list">
                                    {majorSegments && majorSegments.map((majorSegment) => {
                                        const status = userMajorSegmentStatuses.find(item => item.major_segment_id === majorSegment.id)?.status ?? null;
                                        return (
                                            <Link 
                                                to={`/segment/${majorSegment.id}`} 
                                                className={`major-segment__wrapper__item ${this.statusClass(status)}`} 
                                                key={majorSegment.id}
                                                onClick={(e) => this.statusClass(status)=="locked" ? this.preventLink(e) : this.props.fetchSidebarState(majorSegment.id)}
                                            >
                                                {this.iconCreate(status)}
                                                <div className="major-segment__wrapper__item-help-container all"
                                                    onClick={this.preventLink}
                                                    onMouseEnter={() => this.showTooltip(majorSegment.id)}
                                                    onMouseLeave={() => this.hideTooltip()}
                                                >
                                                    <HelpIcon className="major-segment__wrapper__item-help-icon" style={{fontSize: 25}} onClick={this.preventLink} />
                                                    {this.state.showTooltipId === majorSegment.id ? 
                                                        <Tooltip 
                                                            levelSentence={levelSentence[majorSegment.id]}
                                                            majorSegmentId={majorSegment.id}
                                                            className="help-icon-all"
                                                        /> : null}
                                                </div>
                                                <MenuBookIcon className={`major-segment__wrapper__item-book-icon ${this.statusClass(status)}`}  style={{fontSize: 85}} />
                                                <span className="major-segment__wrapper__item-level all">Level {majorSegment.id}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    fetchSidebarState,
}

export default connect(null, mapDispatchToProps)(MajorSegment);