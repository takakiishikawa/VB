import React, {Component} from 'react';
import Sidebar from '../../components/sidebar';
import './Word.scss';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aritcle: []
        };
    }

    render() {
        return (
            <div>
                <Sidebar />
                <h1>Word Title</h1>
            </div>
        );
    }
}

export default Word;