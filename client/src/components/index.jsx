import React, { Fragment } from 'react';
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AuthContainer from '../containers/AuthContainer';
import RoomContainer from '../containers/RoomContainer';
import ProfileContainer from '../containers/ProfileContainer';

import ApiService from '../utils/ApiService';

import "../../public/css/widgets.scss";
import "../../public/css/default.scss";

export default class Root extends React.Component {
    
    
    render() {
        const { location } = this.props;
        
        return(
            <Switch>
                <Route path = '/auth' component = { AuthContainer }/>
                <Route path = '/profile' component = { ProfileContainer } />
                <Route path = '/room/:id' component = { RoomContainer }/>
                <Redirect exact from = '/' to = { this.props.isExistSession != null ? this.props.isExistSession ? '/profile' : '/auth' : '/'} />
                <Route render = {() => <div>404</div> }/>
            </Switch>
        );
    }
}