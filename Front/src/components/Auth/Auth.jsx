import React , { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./style.scss";

import LoginContainer from '../../containers/LoginContainer';
import RegistrationContainer from '../../containers/RegistrationContainer';

class Auth extends Component {

    render() {

        const { location } = this.props;

        return(
            <TransitionGroup>
                <CSSTransition key={ location.key } classNames="fade" timeout={ 300 }>
                    <div className="wrapper">
                        <Switch location={ location }>
                            <Route exact path="/" component={ LoginContainer } />
                            <Route path="/registration" component={ RegistrationContainer } />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }

}

export default Auth;