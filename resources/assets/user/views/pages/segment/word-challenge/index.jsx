import React, {Component} from 'react';
import CyclebarContainer from '../../../components/cyclebar/CyclebarContainer';
import './WordChallenge.scss';


class WordChallenge extends Component {
    render() {
        const {segmentId} = this.props;
        const testResult = [65, 80, 95];

        return (
            <div>
                <CyclebarContainer segmentId={segmentId} />
                <div className="word">
                    <button className="word__start">
                        Start
                    </button>
                    <table className="word__result-table">
                        <thead>
                            <tr>
                                <th className="word__result-table__cycle">Cycle</th>
                                <th className="word__result-table__result">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testResult.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th className="word__result-table__cycle">{index+1}</th>
                                        <th className="word__result-table__result">{item} / 100</th>
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

export default WordChallenge;