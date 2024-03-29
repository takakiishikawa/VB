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
                <p className="xxx">yyy</p>
            </div>
        );
    }
}

export default Tag;