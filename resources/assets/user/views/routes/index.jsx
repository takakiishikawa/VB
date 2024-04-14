import React,{Component} from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import MajorSegmentContainer from '../pages/major-segment/MajorSegmentContainer';
import SegmentContainer from '../pages/segment/SegmentContainer';
import Theme from '../pages/theme';
import Analytics from '../pages/analytics';
import Article from '../pages/article';
import Word from '../pages/word';
import Profile from '../components/profile';
import Concept from '../components/concept';
import PageNotFound from '../components/page-not-found';
import './global.scss';


class AppRoutes extends Component {
  render (){
    return (
      <HashRouter>
            <Switch>
                <Route exact path="/" component={MajorSegmentContainer} />
                <Route exact path="/segment/:majorSegmentId/:segmentId" component={SegmentContainer} />
                <Route exact path="/segment/:majorSegmentId/:segmentId/article/:articleId" component={Article} />
                <Route exact path="/word" component={Word} />
                <Route exact path="/Theme" component={Theme} />
                <Route exact path="/analytics" component={Analytics} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/concept" component={Concept} />
                <Route exact path="*" component={PageNotFound} />
              </Switch>
      </HashRouter>
    )
  }
};

export default AppRoutes;
