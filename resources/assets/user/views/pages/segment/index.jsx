import React, {Component} from 'react';
import Header from '../../components/header';
import './Segment.scss';

class Segment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            segment: []
        };
    }

    render() {
        return (
            <div>
                <Header />
                <h1>Segment Title</h1>
            </div>
        );
    }
}

export default Segment;