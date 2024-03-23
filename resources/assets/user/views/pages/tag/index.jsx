import React, {Component} from 'react';
import Header from '../../components/header';
import './Tag.scss';

class Tag extends Component {
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
                <h1>Tag Title</h1>
            </div>
        );
    }
}

export default Tag;