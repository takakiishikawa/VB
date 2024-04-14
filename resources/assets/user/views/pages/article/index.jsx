import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Article.scss';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aritcle: []
        };
    }

    render() {
        const articleList = this.props.articleList;
        console.log(articleList, 'articleList');
        
        return (
            <div>
                <div className="header">
                    {console.log(1)}
                    <Link to="/" className="header__back">
                        <ArrowBackIcon style={{fontSize:27, color: "#222222"}} />
                    </Link>
                    <div className="header__progress-bar">
                        <div className="header__progress-bar__completed">
                        </div>
                        <div className="header__progress-bar__uncompleted">
                        </div>
                    </div>
                </div>
                <h1>Article Title</h1>
            </div>
        );
    }
}

export default Article;