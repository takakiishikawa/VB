import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchArticleList, getArticleList} from '../../../state/modules/article';
import Article from './';

class ArticleContainer extends Component {
    componentDidMount() {
        const {segmentId, articleId} = this.props.match.params;
        this.props.fetchArticleList(segmentId, articleId);
    }

    render() {
        const {segmentId, majorSegmentId} = this.props.match.params;
        return (
            <Article
                articleList={this.props.articleList}
                segmentId={segmentId}
                majorSegmentId={majorSegmentId}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    articleList: getArticleList(state)
});

const mapDispatchToProps = {
    fetchArticleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);