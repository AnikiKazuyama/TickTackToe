import React, { Fragment } from 'react';
import { Route, Switch, Link, Redirect } from "react-router-dom";

import AuthContainer from '../containers/AuthContainer';

import "../../public/css/widgets.scss";
import "../../public/css/default.scss";

export default class Root extends React.Component{


    render(){
        return(
            <Switch>
                <Route path = '/auth' component = { AuthContainer }/>
                <Route path = '/user' render = {() => {return <div>user</div>} } />
                <Redirect from = '/' to ='/auth' />
            </Switch>
        );
    }
}