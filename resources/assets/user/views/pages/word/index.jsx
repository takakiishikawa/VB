import React, {Component} from 'react';

import './Word.scss';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aritcle: []
        };
    }

    render() {
        const {wordList} = this.props;
        console.log(wordList, 'wordList');
        
        return (
            <div>

                <h1>Word Title</h1>
            </div>
        );
    }
}

export default Word;