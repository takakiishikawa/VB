import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Article.scss';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleCount: 1
        };
    }

    nextArticle = () => {
        this.setState({
            articleCount: this.state.articleCount + 1,
        });
    }

    render() {
        const {articleCount} = this.state;
        const {articleList} = this.props;

        const articleInfo = articleList[articleCount];
        if (!articleInfo) {
            return;
        }
        console.log(articleInfo, 'articleInfo')
        
        return (
            <div>
                <div className="header">
                    <Link to="/" className="header__back">
                        <ArrowBackIcon style={{fontSize:27, color: "#222222"}} />
                    </Link>
                    <div className="header__progress-bar">
                        <div className="header__progress-bar__completed" style={{width: `${articleCount*10}%`}}>
                        </div>
                        <div className="header__progress-bar__uncompleted" style={{width: `${100-articleCount*10}%`}}>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div>
                        <div className="content__theme">
                            {articleInfo.article_theme}
                        </div>
                    </div>
                    <div className="content__title">
                        {articleInfo.title}
                    </div>
                    <div className="content__article">
                        {articleInfo.article}
                    </div>
                </div>
                <div className="next">
                    <ArrowForwardIcon
                        onClick={this.nextArticle}
                        style={{
                            fontSize: 30,
                            color: "#FFFFFF",
                            backgroundColor: "#3F51B5",
                            borderRadius: 8,
                            padding: 6,
                            cursor: "pointer",
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Article;

/*
title, article, article_theme, wordList
    wordList: word, jp, meaning, parseList
*/