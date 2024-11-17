import React, {Component} from 'react';
import './Cyclebar.scss';

class Cyclebar extends Component {
    cycleStatusClass = (currentCycle, index) => {
        if (currentCycle > index+1) {
            return 'completed';
        } else if (currentCycle === index+1) {
            return 'unlocked';
        } else {
            return 'locked';
        }
    }

    render() {
        const cycleList = ['精読1', '精読2', '精読3', '単語1', '単語2', '単語3'];
        const currentCycle = this.props.segmentCycle.cycle;

        return (
            <div className="cycle-bar">
            {cycleList.map((item, index) => {
                return (
                    <div key={index} >
                        <div className="cycle-bar__item">
                            <div className={`cycle-bar__item-circle ${this.cycleStatusClass(currentCycle, index)}`}>{index+1}</div>
                            <div className='cycle-bar__item-name'>{item}</div>
                        </div>
                        {cycleList.length > index+1 &&
                            <div className="cycle-bar__line"></div> 
                        }
                    </div>
                )
            })}
        </div>
        )
    }
}

export default Cyclebar;