import React, { Component } from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../../service/api'

class Login extends Component {
  state = {
    email_usuario: '',
    senha_usuario: ''
  };

  constructor() {
    super();

    this.InputEmail = this.InputEmail.bind(this);
    this.InputPassword = this.InputPassword.bind(this);
    //EDuardo esteve aqui
  }

  InputEmail(event) {
    this.setState({ email_usuario: event.target.value })
  }

  InputPassword(event) {
    this.setState({ senha_usuario: event.target.value })
  }
  async login() {


    const res = await api.post('/login/verificar', { siape: this.state.email_usuario, senha_usuario: this.state.senha_usuario })
      
    if (res.data.length >= 1) {
      localStorage.setItem('login', 'on');
      localStorage.setItem('usuario', JSON.stringify(res.data[0]));
      this.props.history.push("/index");
    }
    else alert('Login/senha invalidos');
  }
  render() {

    return (
      <div>
        <header>
          <div class="row" id="row">
            <div class="col-sm-2" id="coluna2">
              <a href="https://ufsc.br/" title="ufsc">
                <img src={require("../../assets/img/brasao.ufsc.svg")} alt="UFSC_Brasao" width="100%" height="100%" ></img>
              </a>
            </div>

            <div class="col-sm-7" id="coluna7">
              <h2 id="h2">Sistema de Planejamento Acadêmico</h2>
            </div>
          </div>
        </header>

        <br />

        <center>
          <form method="POST" enctype="application/json" action="//http:localhost:3333/login/verify">
            <div id="login">
              <br />
              <div><h3 id="h3">Login</h3></div>
              <br />
              <input placeholder="SIAPE" onChange={this.InputEmail} id="email_usuario" type="text" />
              <br />
              <br />
              <input placeholder="Senha" onChange={this.InputPassword} id="senha_usuario" type="password" />
              <br />
              <br />
              <button value="acessar" id="acessar" type="button" onClick={() => this.login()}>Acessar</button>
            </div>
          </form>
        </center>
      </div>
    );
  }
}

export default Login;


