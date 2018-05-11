import React, { Fragment } from 'react';
import { Route, Switch, Link, Redirect } from "react-router-dom";

import AuthContainer from '../containers/AuthContainer';
import RoomContainer from '../containers/RoomContainer';
import User from './User';

import ApiService from '../utils/ApiService';

import "../../public/css/widgets.scss";
import "../../public/css/default.scss";

export default class Root extends React.Component {
    
    render() {
        return(
            <Switch>
                <Route path = '/auth' component = { AuthContainer }/>
                <Route path = '/user' component = { User } />
                <Route path = '/room' component = { RoomContainer }/>
            </Switch>
        );
    }
}