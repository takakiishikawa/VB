import React, {Component} from 'react';
import Sidebar from '../../components/sidebar';
import './Article.scss';

class Article extends Component {
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
                <h1>Article Title</h1>
            </div>
        );
    }
}

export default Article;