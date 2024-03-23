import React, {Component} from 'react';
import Header from '../../components/header';
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
                <Header />
                <h1>Word Title</h1>
            </div>
        );
    }
}

export default Word;