import React, { Fragment } from 'react';
import { Route } from "react-router-dom";

import AuthContainer from '../containers/AuthContainer';

import "../../public/css/widgets.scss";
import "../../public/css/default.scss";

export default class Root extends React.Component{


    render(){
        return(
            <Route path ='/' component = { AuthContainer } />
        );
    }
}