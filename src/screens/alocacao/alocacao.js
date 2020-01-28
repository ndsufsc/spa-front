import React from 'react';

//COMPONENTES MATERIAL UI
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

//COMPONENTES
import Header from '../../components/header';
import Tabela from '../../components/tabela';
import api from '../../service/api';

//ROTEAMENTO
import { Link, Redirect } from 'react-router-dom'

const styles = theme => ({
  button: {
    marginRight: 20,
  },
  h4: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    marginTop: 20,
  },
  botaoSalvar: {
    marginRight: 10,
  },
})

class Alocacao extends React.Component {

  constructor() {
    super()
    this.state = {
      arrayTurmas: [],
      arraySalas: [],
      txtSalas: '',
      txtturmas: '',
      leitura: '',
      verificar: false,
    }
  }

  componentDidMount = async () => {

    if (localStorage.getItem('login') == 'on') {

      const response = await api.post("/disciplina/buscarTurmasAlocacao")

      var txtTurmas = '';

      for (var i = 0; i < response.data.length; i++) {

        this.setState({ arrayTurmas: [...this.state.arrayTurmas, response.data[i]] })

        txtTurmas += this.state.arrayTurmas[i].codigo_disciplina + ' ' + this.state.arrayTurmas[i].codigo_turma + ' ' + this.state.arrayTurmas[i].qtde_alunos + ' ' + this.state.arrayTurmas[i].qtde_alunos + ' {' + this.state.arrayTurmas[i].dia_semana + ' ' + this.state.arrayTurmas[i].descricao + ' ' + this.state.arrayTurmas[i].qtde_aulas + ' : ' + this.state.arrayTurmas[i].id_tipo_sala + '} \n';

      }

      await this.setState({ txtTurmas: txtTurmas })

      var txtSalas = '';

      const response2 = await api.post("/disciplina/buscarSalas")

      for (var i = 0; i < response2.data.length; i++) {

        this.setState({ arraySalas: [...this.state.arraySalas, response2.data[i]] })

        txtSalas += this.state.arraySalas[i].sigla + ' ' + this.state.arraySalas[i].capacidade + ' ' + this.state.arraySalas[i].id_tipo_sala + ' 1 1 1 \n';

      }

      await this.setState({ txtSalas: txtSalas })

      // await api.post("/disciplina/gerarArquivo", {
      //   txtturmas: txtTurmas,
      //   txtsalas: txtSalas,

      // });
    }

  };

  async gerarSalas() {
    await api.post("/relatorios/gerarSalas", {
      txtSalas: this.state.txtSalas
    })
  }

  async gerarTurmas() {
    await api.post("/relatorios/gerarTurmas", {
      txtTurmas: this.state.txtTurmas
    })
  }

  async alocar() {
    await api.post("/relatorios/gerarAlocacao");
  }

  async lerArquivoTeste() {
    await api.post("/relatorios/lerArquivoTeste");
  }

  async lerAlocar() {
    const r = await api.post("/relatorios/lerAlocacao");
    var text = r.data.contents;
    var linha = text.split("\r\n");
    var coluna = text.split("|");
    var array = [];
    var i = 0;
    coluna.map((item, index) => {
      if (index < 6) {
        array[index] = item;
      }
      // while (index % 7 != 0) {
      //   array[i++] = item
      // }

      // if(index % 7 != 0){

      // if(item.replace(/\s/g, '') != "----"){


      // console.log("item["+index+"]: ", item);
      // }
      // }
    })
    // coluna.map(item => {
    //   if(item != '----')
    //     console.log("item: ", item);
    // })

    await this.setState({ leitura: linha, verificar: true })
  }

  render() {
    return (

      <>
        <Header
        />
        <div style={{ width: '100%', height: '100%', justifyContent: 'center', textAlign: 'center' }}>
          <Button onClick={() => this.gerarSalas()}>Gerar Sala</Button>
          <Button onClick={() => this.gerarTurmas()}>Gerar Turma</Button>
          <Button onClick={() => this.alocar()}>Gerar Alocação</Button>
          <Button onClick={() => this.lerArquivoTeste()}>Ler arquivo</Button>
          {this.state.verificar ?
            this.state.leitura.map(item => {
              return (
                <div>

                </div>
              )
            })
            : null
          }
        </div>
      </>

    );

  };

}

Alocacao.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Alocacao);