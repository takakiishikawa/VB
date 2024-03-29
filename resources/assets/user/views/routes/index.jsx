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
          <Route exact path="/" component={MajorSegmentContainer} />
          <Route exact path="/segment/:id" component={SegmentContainer} />
          <Route exact path="/tag" component={Tag} />
          <Route exact path="/article" component={Article} />
          <Route exact path="/word" component={Word} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="*" component={PageNotFound} />
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
