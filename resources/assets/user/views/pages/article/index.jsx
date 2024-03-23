import React, {Component} from 'react';
import Header from '../../components/header';
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
                <Header />
                <h1>Article Title</h1>
            </div>
        );
    }
}

export default Article;