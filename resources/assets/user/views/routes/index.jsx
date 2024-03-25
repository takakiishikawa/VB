import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MajorSegmentContainer from '../pages/major-segment/MajorSegmentContainer';
import Segment from '../pages/segment';
import Tag from '../pages/tag';
import Article from '../pages/article';
import Word from '../pages/word';
import Profile from '../components/profile';
import PageNotFound from '../components/page-not-found';
import './global.scss';

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<MajorSegmentContainer />} />
          <Route exact path="/segment/:id" element={<Segment />} />
          <Route exact path="/tag" element={<Tag />} />
          <Route exact path="/article" element={<Article />} />
          <Route exact path="/word" element={<Word />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    )
  }
}

export default AppRoutes;
