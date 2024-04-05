import React,{Component} from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import Sidebar from '../components/sidebar';
import MajorSegmentContainer from '../pages/major-segment/MajorSegmentContainer';
import SegmentContainer from '../pages/segment/SegmentContainer';
import Tag from '../pages/tag';
import Analytics from '../pages/analytics';
import Article from '../pages/article';
import Word from '../pages/word';
import UserMenu from '../components/user-menu';
import Profile from '../components/profile';
import Concept from '../components/concept';
import PageNotFound from '../components/page-not-found';
import './global.scss';


class AppRoutes extends Component {
  render (){
    return (
      <HashRouter>
        <div className="sidebar-container">
          <Sidebar />
          <div className="main-container">
            <UserMenu />
            <Switch>
                <Route exact path="/" component={MajorSegmentContainer} />
                <Route exact path="/segment/:id" component={SegmentContainer} />
                <Route exact path="/tag" component={Tag} />
                <Route exact path="/analytics" component={Analytics} />
                <Route exact path="/article" component={Article} />
                <Route exact path="/word" component={Word} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/concept" component={Concept} />
                <Route exact path="*" component={PageNotFound} />
              </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
};

export default AppRoutes;
