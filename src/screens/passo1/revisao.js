import React from 'react';

//ESTILO
import './revisao.css';

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

  }
})

class Revisao extends React.Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      usuario: '',
    }
  }

  componentDidMount = async () => {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    await this.setState({ usuario: usuario })
    const response = await api.post('/disciplina/buscarEtapa', {
      id_usuario: usuario.id_usuario
    })

    if (response.data != 0) {
      this.setState({ step: response.data })
    }

    console.log("teste!");

  }
  async redirecionar(props) {

    await api.post('/disciplina/inserirEtapa', {
      id_usuario: this.state.usuario.id_usuario,
      etapa: 1,
      status: 0
    })

    props.history.push('/index')
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className='introducao'>
          <h4 className={classes.h4}>Revisar e alterar informações das disciplinas ofertadas</h4>
          <p>Nesta etapa você pode revisar as informações das disciplinas em cada semestre e alterar alguns campos como
          <b> capacidade máxima de alunos</b>, <b>número de turmas</b> e caso possua horas-aula práticas, a <b>sala</b> ou <b>laboratório </b>
            mais indicado para a realização da disciplina.
          <br /><br />Lembre-se sempre de <b>SALVAR</b> as alterações feitas para não perder seu progresso.</p>
        </div>
        <div className='tabelas'>
          <Tabela  />
        </div>
        {/*<div className='buttonsDiv'>
          <Button className={classes.button} variant="contained" size="large" color="primary">Salvar</Button>
          <Button onClick={() => this.redirecionar(this.props)} className={classes.button} variant="contained" size="large" color="primary">Salvar e Concluir</Button>
        </div>*/}
      </div>
    );
  }
}

Revisao.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Revisao);
