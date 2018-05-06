import React from 'react';
import { Redirect } from 'react-router-dom';

import ApiService from '../utils/ApiService';

import AuthContainer from '../containers/AuthContainer';

async function IsAuth(component) {
    console.log(response);
    const response = await ApiService.isAuth();
    return component;
}

export default IsAuth;