
import App from '../screens/index/index';
import Login from '../screens/login/login';
import Revisao from '../screens/passo1/revisao';
import Grade from '../screens/passo2/grade';
import React from 'react';
import { Switch, Route } from 'react-router-dom';


function Router() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/index" exact={true} component={App} />
            <Route path="/revisao" exact={true} component={Revisao} />
            <Route path="/grade" exact={true} component={Grade} />
        </Switch>
    );
}

export default Router;