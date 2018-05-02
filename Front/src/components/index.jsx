import React, { Fragment } from 'react';
import { Route, Switch, Link } from "react-router-dom";

import AuthContainer from '../containers/AuthContainer';

import "../../public/css/widgets.scss";
import "../../public/css/default.scss";

export default class Root extends React.Component{


    render(){
        return(
            <Switch>
                <Route exact path = '/' render = { () => {
                    return(
                        <div>
                            <div>Добро пожаловать в игру крестики нолики, для продолжения вам необходимо авторизироваться</div>
                            <Link to = '/auth'>Войти</Link>
                            <Link to = '/auth/registration'>Зарегистрироваться</Link>
                        </div>  
                    );
                }}/>
                <Route path = '/auth' component = { AuthContainer } />
            </Switch>
        );
    }
}