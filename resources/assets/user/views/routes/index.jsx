import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MajorSegment from '../pages/major-segment';
import Segment from '../pages/segment';
import PageNotFound from '../components/page-not-found';
import './global.scss';

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<MajorSegment />} />
          <Route exact path="/segment" element={<Segment />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    )
  }
}

export default AppRoutes;

