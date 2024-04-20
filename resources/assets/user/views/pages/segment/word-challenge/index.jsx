import React, {Component} from 'react';
import CyclebarContainer from '../../../components/cyclebar/CyclebarContainer';
import './WordChallenge.scss';


class WordChallenge extends Component {
    render() {
        const {segmentId, wordResult} = this.props;
        const wordResultArray = wordResult && wordResult.map(item => item.test_score);

        return (
            <div>
                <CyclebarContainer segmentId={segmentId} />
                <div className="word">
                    <div className="word__start">
                        <button className="word__start__button">
                            Start
                        </button>
                    </div>
                    <table className="word__result-table">
                        <thead>
                            <tr>
                                <th className="word__result-table__cycle">Cycle</th>
                                <th className="word__result-table__result">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wordResultArray && wordResultArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="word__result-table__cycle">{index+1}</td>
                                        <td className="word__result-table__result">{item} / 100</td>
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