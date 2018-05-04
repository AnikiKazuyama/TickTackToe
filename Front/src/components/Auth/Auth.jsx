import React , { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./style.scss";

import LoginContainer from '../../containers/LoginContainer';
import RegistrationContainer from '../../containers/RegistrationContainer';
import RestoreContainer from '../../containers/RestoreContainer';

class Auth extends Component {

    render() {

        const { location } = this.props;
        const isLoggedIn = false;  // Чтобы заработал роут /auth переключи на false

        return isLoggedIn
               ?
               <Redirect to = '/user'/>
               :
               <TransitionGroup>
                <CSSTransition key={ location.key } classNames="fade" timeout={ 300 }>
                    <div className="wrapper">
                        <Switch location={ location }>
                            <Route exact path="/auth" component={ LoginContainer } />
                            <Route path="/auth/registration" component={ RegistrationContainer } />
                            <Route path="/auth/restore" component={ RestoreContainer } />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
    }

}

export default Auth;