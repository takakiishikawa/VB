import React, {Component} from 'react';
import axios from 'axios';
import Header from '../common/header';

class MajorSegment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            major_segment: []
        };
    }

    logout = () => {
        axios.post('/logout', {},{
            withCredentails:true
        }).then(response => {
            window.location.href = '/login'
        }).catch(error => {
            console.log(error);
        })
    }
    
    render() {
        return (
            <div>
                <Header />
                <h1>Page Title</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}
export default MajorSegment;