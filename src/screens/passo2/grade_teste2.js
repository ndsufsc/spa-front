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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { Table } from 'react-bootstrap'

//MATERIAL ICONS
import { Delete } from '@material-ui/icons';

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
    backgroundColor: 'blue',
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
  spacer: {
    marginTop: 140,
  },
  select: {
    width: '90%',
    alignSelf: 'center',
  },
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E7E7E7',
    minHeight: 100,
    width: '90%',
    marginTop: 0,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 5,
    cursor: 'default'
  },
  informativo: {
    fontFamily: 'Roboto',
    color: '#707070',
    textAlign: 'center',
    marginBottom: -5,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1976D2',
    width: 200,
    minHeight: 90,
    borderRadius: 5,
    boxShadow: "1px 1px 3px #9E9E9E",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -25,
  },
  checkbox: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  formControl: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 10,
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  radio: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  fab: {
    margin: theme.spacing(1),
    width: '90%',
    alignSelf: 'center',
  },
  formcontrollabel: {
    fontFamily: 'Roboto',
  },
  contentdrawer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  generator: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginRight: 20,
    marginBottom: 10,
  },
  disciplina: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    margin: 0,
    padding: 0,
    fontSize: 14,
  },
  turma: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 400,
    textAlign: 'center',
    margin: 0,
    padding: 0,
    fontSize: 12,
  },
  delete: {
    cursor: 'pointer',
    alignSelf: 'flex-end',
    marginRight: 5,
    marginTop: 5,
  },
  codigodisciplina: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontSize: 12,
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
})

class Grade extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedOption: null,
      id_curso: '',
      array: [],
      carregou: '',
      carregouDisciplina: '',
      carregouTurma: '',
      qtdeSemestre: '',
      disciplinas: [],
      turmas: [],
      selectedDisciplina: '',
      selectedTurma: '',
      itemChecked: false,
      index: '',
      arrayAux: [],
      carregouHorario: false,
      arrayQuadro: '',
      arrayTeste: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      carregouMatutino: false,
      arrayLinhas: [1, 2, 3, 4, 5],
      arrayColunas: [1, 2, 3, 4, 5, 6],
      fullGrid: [{ label: 'Segunda', classes: [null, null, null, null, null, null] }]
    }
  }

  handleChangeSemestre = async selectedOptionSemestre => {
    await this.setState({ selectedOptionSemestre, selectedTurma: [], arrayAux: [] });

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
    this.setState({ selectedTurma: [], arrayAux: [] })

    const response = await api.post("/disciplina/buscarTurmas", {
      id_disciplina: item.id_disciplina
    })

    this.setState({ selectedDisciplina: item.nome });

    this.setState({ turmas: '', carregouTurma: false });

    for (var i = 0; i < response.data.length; i++) {
      await this.setState({ turmas: [...this.state.turmas, { id_turma: response.data[i].id_plano_ensino, turma: response.data[i].turma }], carregouTurma: true })
    }
    this.handleChangeComponente();
  };

  async handleDelete() {

    this.setState({ selectedDisciplina: '' });
    this.setState({ selectedTurma: '' });

    await this.setState({ carregouComponente: false })
    await this.setState({ carregouGerar: false })
    await this.setState({ carregouTurma: false })

  };
  //mudar de turma
  async handleChangeTurma(item, index) {

    if (this.state.arrayAux.length > 0) {
      for (let i = 0; i <= this.state.arrayAux.length; i++) {
        console.log("index: ", index)
        if (this.state.arrayAux[index] == true) {
          this.state.arrayAux[index] = false;
          this.state.selectedTurma.splice(index, 1);
          this.forceUpdate();
          this.handleChangeComponente();
          return;
        }
      }
    }
    // this.setState({ selectedTurma: [...this.state.selectedTurma, item.turma] });
    this.state.selectedTurma[index] = item.turma;
    await this.setState({ carregouGerar: true })
    this.state.arrayAux[index] = true;
    this.forceUpdate();
    this.handleChangeComponente();
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
        this.setState({ array: [...this.state.array, { value: i, label: i + "º Semestre" }] })
        this.setState({ carregou: true })
      }

    }

    console.log("array map: ", this.state.fullGrid);
    

  };

  async cadastrarHorario() {
    await this.setState({ arrayQuadro: [...this.state.arrayQuadro, { nome: this.state.selectedDisciplina }], carregouHorario: true })
    console.log("array quadro: ", this.state.arrayQuadro);

  }

  mostrarDisciplina(i, j) {
    console.log("i,j: ", i,j);
    
    this.state.arrayColunas[i] = this.state.selectedDisciplina
    this.forceUpdate();
    console.log("meu array: ", this.state.arrayColunas[i]);
  }

  handleInput(e, i,j) {
    this.state.arrayColunas[i] = this.state.selectedDisciplina;
    // this.state.arrayLinhas[j]= this.state.selectedDisciplina
    console.log("array colunas: ", this.state.arrayColunas);
    return 
    // this.forceUpdate();
  }


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


          <div className={classes.spacer}></div>

          <div className={classes.contentdrawer}>

            <div className={classes.generator}>

              <div className={classes.cardView}>
                <Delete className={classes.delete} color="action" style={{ fontSize: 25 }} onClick={() => self.handleDelete()} />
                {this.state.carregouComponente ?
                  <div className={classes.card}>
                    <p className={classes.disciplina}>{this.state.selectedDisciplina}</p>
                    <p className={classes.turma}>{this.state.selectedTurma}</p>
                  </div>
                  : <p className={classes.informativo}><i>{'Selecione a disciplina e a turma'}<br />{'para gerar o componente.'}</i></p>
                }
              </div>

              <Select id="cadastro_turmas_input_1"
                value={selectedOptionSemestre}
                onChange={this.handleChangeSemestre}
                options={this.state.array}
                className={classes.select}
                placeholder={'Semestre'}
              />


              {this.state.carregouDisciplina ?
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Selecione a disciplina:</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    className={classes.group}
                    value={null}
                    onChange={null}
                  >
                    {this.state.disciplinas.map((item, index) => {
                      return (
                        <FormControlLabel value={item.nome}
                          className={classes.formcontrollabel}
                          control={
                            <Radio color="primary" className={classes.radio} />
                          }
                          label={item.nome}
                          onClick={() => self.handleChangeDisciplina(item, index)} />
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                : null
              }

              {this.state.carregouTurma ?
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Selecione a turma: </FormLabel>
                  <FormGroup>
                    {
                      this.state.turmas.map(function (item, index) {
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox onChange={() => self.handleChangeTurma(item, index)} value={item.turma} color="primary" className={classes.checkbox} />
                            }
                            label={item.turma}
                            className={classes.formcontrollabel}
                          />
                        )
                      })
                    }
                  </FormGroup>
                  <FormHelperText>Para turmas compartilhadas selecione ambas antes de criar o componente.</FormHelperText>
                </FormControl>
                : null
              }

            </div>
            <div class='buttonsDiv'>
              <Button className={classes.button} variant="contained" size="large" color="primary">Salvar</Button>
              <Button onClick={null} className={classes.button} variant="contained" size="large" color="primary">Salvar e Concluir</Button>
            </div>
          </div>
        </Drawer>

        <main className={classes.content}>

          <div id="under_header">
            <center><strong>Cadastro de turmas - Engenharia de Computação - 1 semestre</strong></center>
          </div>

          <br />

          <br />
          <Table striped bordered hover
            style={{ width: '70%' }}
          >
            <thead>
              <tr>
                <th>Horários</th>
                <th>Segunda</th>
                <th>Terça</th>
                <th>Quarta</th>
                <th>Quinta</th>
                <th>Sexta</th>
                <th>Sábado</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.arrayLinhas.map((item2, j) => {
                return (
                  <tr key={j}> */}
                    {
                      this.state.arrayLinhas.map((item,j) => {
                        return(
                        <tr>
                          {item.map((item2) => {
                              <td>{item2}</td>
                          })
                          }

                        </tr>
                        )
                        })
                      }
                    {/* {this.state.arrayColunas.map((item, i) => {
                      return (
                        <td onClick={() => this.mostrarDisciplina(i, j)} key={i, j}>{this.state.arrayLinhas[i]}</td>
                      )
                    })}
                  </tr>
                ) */}
              }
              )}
              {/*   
                {this.state.carregouDisciplina ?
                  this.state.disciplinas.map((item, i) => {
                    return (
                        <td onClick={() => this.matutino(i)}>{this.state.selectedDisciplina}</td>
                    )
                  })
                  : null
                }
              </tr>
              <tr>
                <td>9:10 - 10:00</td>
                <td colSpan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>10:10 - 11:00</td>
                <td colSpan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>11:00 - 11:50</td>
                <td colSpan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr> */}
            </tbody>
          </Table>
        </main>

      </div>
    );
  }
}

Grade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grade);
