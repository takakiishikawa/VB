import React,{Component} from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import MajorSegmentContainer from '../pages/major-segment/MajorSegmentContainer';
import SegmentContainer from '../pages/segment/SegmentContainer';
import Tag from '../pages/tag';
import Article from '../pages/article';
import Word from '../pages/word';
import Profile from '../components/profile';
import PageNotFound from '../components/page-not-found';
import './global.scss';


class AppRoutes extends Component {
  render (){
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={MajorSegmentContainer} />
          <Route path="/segment:id" component={Tag} />
          
          <Route path="/tag" component={Tag} />
          <Route path="/article" component={Article} />
          <Route path="/word" component={Word} />
          <Route path="/profile" component={Profile} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </HashRouter>
    )
  }
};

export default AppRoutes;


/*
const AppRoutes = () => (
    <Switch>
      <Route path="/" component={MajorSegmentContainer} />
      <Route path="/segment/:id" component={SegmentContainer} />
      <Route path="/tag" component={Tag} />
      <Route path="/article" component={Article} />
      <Route path="/word" component={Word} />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={PageNotFound} />
  </Switch>
)
*/
