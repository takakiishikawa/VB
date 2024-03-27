import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MajorSegmentContainer from '../pages/major-segment/MajorSegmentContainer';
import SegmentContainer from '../pages/segment/SegmentContainer';
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
          <Route path="/" element={<MajorSegmentContainer />} />
          <Route path="/segment/:id" element={<SegmentContainer/>} />
          <Route path="/tag" element={<Tag />} />
          <Route path="/article" element={<Article />} />
          <Route path="/word" element={<Word />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    ) 
  }
}

export default AppRoutes;
