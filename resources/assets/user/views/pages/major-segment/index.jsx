import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../components/header';
import './MajorSegment.scss';

class MajorSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major_segment: []
        };
    }

    render() {
        return (
            <div>
                <Header />
                <h1>Page Title</h1>
            </div>
        );
    }
}

export default MajorSegment;