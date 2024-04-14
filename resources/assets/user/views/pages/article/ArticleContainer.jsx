import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchArticleList} from '../../../state/modules/article';
import Article from './Article';

class ArticleContainer extends Component {
    componentDidMount() {
        const {segmentId, articleId} = this.props.match.params;
        this.props.fetchArticleList(segmentId, articleId);
    }

    render() {
        return (
            <Article articleList={this.props.articleList} />
        )
    }
}

const mapDispatchToProps = {
    fetchArticleList
};

const mapStateToProps = (state) => ({
    articleList: state.article.articleList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);