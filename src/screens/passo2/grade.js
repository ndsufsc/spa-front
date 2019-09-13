import React from 'react';
import Select from 'react-select'

//ESTILO
import './grade.css';

//COMPONENTES MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//COMPONENTES
import Header from '../../components/header';
import api from '../../service/api';

//ROTEAMENTO
import { Link } from 'react-router-dom'

const drawerWidth = "25%";

const styles = theme => ({
  root: {
    // display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '8%'
  },
  toolbar: theme.mixins.toolbar,
})

class Grade extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedOption: null,
      id_curso: '',
      array: [{ value: '', label: '' }],
      carregou: '',
      carregouDisciplina: '',
      carregouTurma: '',
      qtdeSemestre: '',
      disciplinas: [],
      turmas: [],
      selectedDisciplina: '',
      selectedTurma: '',
    }
  }

  handleChangeSemestre = async selectedOptionSemestre => {
    await this.setState({ selectedOptionSemestre });

    const response = await api.post("/disciplina/obter", {
      codigo_curso: this.state.id_curso, fase: this.state.selectedOptionSemestre.value
    })

    this.setState({ disciplinas: '', carregouDisciplina: false, turmas: '', carregouTurma: false });

    for (var i = 0; i < response.data.length; i++) {
      var nome = response.data[i].codigo;
      nome += ' - ';
      nome += response.data[i].nome;
      await this.setState({ disciplinas: [...this.state.disciplinas, { nome: nome, id_disciplina: response.data[i].id_disciplina }], carregouDisciplina: true })
    }

  };

  async handleChangeDisciplina(item, index) {

    const response = await api.post("/disciplina/buscarTurmas", {
      id_disciplina: item.id_disciplina
    })

    this.setState({ selectedDisciplina: item.nome });

    this.setState({ turmas: '', carregouTurma: false });

    for (var i = 0; i < response.data.length; i++) {
      await this.setState({ turmas: [...this.state.turmas, { id_turma: response.data[i].id_plano_ensino, turma: response.data[i].turma }], carregouTurma: true })
    }

    console.log("Index: ", index);

  };

  async handleDelete() {

    this.setState({ selectedDisciplina: '' });
    this.setState({ selectedTurma: '' });

    await this.setState({ carregouComponente: false })
    await this.setState({ carregouGerar: false })
    await this.setState({ carregouTurma: false })

  };

  async handleChangeTurma(item) {
    this.setState({ selectedTurma: [...this.state.selectedTurma, item.turma] });
    await this.setState({ carregouGerar: true })

  };

  async handleChangeComponente(item) {

    await this.setState({ carregouComponente: true })

  };

  componentDidMount = async () => {
    if (localStorage.getItem('login') == 'on') {
      var usuario = JSON.parse(localStorage.getItem('usuario'))

      this.setState({ id_curso: usuario.id_curso });

      const response = await api.post("/disciplina/buscarSemestre", {
        id_course: usuario.id_curso
      })

      await this.setState({ qtdeSemestre: response.data[0].semestres, })
      var rows = [];
      for (var i = 1; i <= this.state.qtdeSemestre; i++) {
        this.setState({ array: [...this.state.array, { value: i, label: i }] })
        this.setState({ carregou: true })
      }

    }

  };

  render() {

    const { selectedOptionSemestre } = this.state;
    const self = this;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Header />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >

          <div style={{ marginTop: 150 + 'px' }}></div>

          {this.state.carregouComponente ?
            <div style={{ display: 'flex', flexDirection: 'row' }}><div>{this.state.selectedTurma + ' - ' + this.state.selectedDisciplina}</div>
              <button onClick={() => self.handleDelete()}>X</button></div>
            : null
          }

          <Select id="cadastro_turmas_input_1"
            value={selectedOptionSemestre}
            onChange={this.handleChangeSemestre}
            options={this.state.array}
          />


          {this.state.carregouDisciplina ?
            this.state.disciplinas.map(function (item, index) {
              return (
                <div
                  style={{ flexDirection: 'row', display: 'flex', marginTop: 10 }}
                >
                  <input style={{ marginRight: 10 }} onClick={() => self.handleChangeDisciplina(item, index)} name="input" value={index} type="radio" />
                  <p>{item.nome}</p>
                </div>
              )
            })
            : null
          }

          {this.state.carregouTurma ?
            this.state.turmas.map(function (item) {
              return (
                <div> <input onClick={() => self.handleChangeTurma(item)} type="checkbox" />
                  <p >{item.turma}</p></div>
              )
            })
            : null
          }

          {this.state.carregouGerar ?
            <div><button onClick={() => self.handleChangeComponente()}>Gerar Componente</button></div>
            : null
          }




        </Drawer>

        <main className={classes.content}>

          <div id="under_header">
            <center><strong>Cadastro de turmas - Engenharia de Computação - 1 semestre</strong></center>
          </div>

          <br />

          <div class="row" id="row">

            <div class="col-sm-9">
              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><strong>Horários</strong></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">
                  <center><strong>Segunda</strong></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">
                  <center><strong>Terça</strong></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">
                  <center><strong>Quarta</strong></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">
                  <center><strong>Quinta</strong></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">
                  <center><strong>Sexta</strong></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">
                  <center><strong>Sábado</strong></center>
                </div>

                <div class="row" id="row">
                  <br />
                  <div class="col-sm-1"></div>

                  <div class="col-sm" id="cadastro_turmas_retangulo_horario">
                    <center><strong>Matutino</strong></center>
                  </div>

                  <br />
                </div>

                <br />

              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>7:30 - 8:20</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>8:20 - 9:10</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>9:10 - 10:00</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>10:10 - 11:00</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>11:00 - 11:50</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_horario">
                  <center><strong>Vespertino</strong></center>
                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>13:30 - 14:20</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>14:20 - 15:10</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>15:10 - 16:00</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>16:20 - 17:10</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>17:10 - 18:00</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_horario">
                  <center><strong>Noturno</strong></center>
                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>18:30 - 19:20</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>19:20 - 20:10</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>20:20 - 21:10</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>

              <div class="row" id="row">
                <br />
                <div class="col-sm-1"></div>

                <div class="col-sm" id="cadastro_turmas_retangulo_1">
                  <center><h6>21:10 - 22:00</h6></center>
                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <div class="col-sm" id="cadastro_turmas_retangulo">

                </div>

                <br />
              </div>
            </div>
          </div>


          <br />

        </main>

      </div>
    );
  }
}

Grade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grade);
