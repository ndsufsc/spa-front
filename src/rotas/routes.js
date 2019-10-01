
import App from '../screens/index/index';
import Login from '../screens/login/login';
import Revisao from '../screens/passo1/revisao';
import Grade from '../screens/passo2/grade';
import Definicao from '../screens/passo3/definicao';
import Tabela from '../components/tabela';
import Alocacao from '../screens/alocacao/alocacao';
import React from 'react';
import { Switch, Route } from 'react-router-dom';


function Router() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/index" exact={true} component={App} />
            <Route path="/revisao" exact={true} component={Revisao} />
            <Route path="/grade" exact={true} component={Grade} />
            <Route path="/tabela" exact={true} component={Tabela} />
            <Route path="/definicao" exact={true} component={Definicao} />
            <Route path="/alocacao" exact={true} component={Alocacao} />
        </Switch>
    );
}

export default Router;