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
import { css } from '@emotion/core';

//react bootstrap
import { Table, Modal } from 'react-bootstrap'

import Loading from '../../components/loading'

// load
import { ClipLoader, BounceLoader } from 'react-spinners';

//MATERIAL ICONS
import { Delete } from '@material-ui/icons';
import { Close } from '@material-ui/icons';

//COMPONENTES
import Header from '../../components/header';
import Card from '../../components/card';
import api from '../../service/api';
import GradeConsulta from '../../components/gradeConsulta';
import ModalAlerta from '../../components/Modais/modalAlerta'

//ROTEAMENTO
import { Link } from 'react-router-dom'

const drawerWidth = "25%";
//loading style
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
    marginTop: 80,
    width: '75%',
  },
  toolbar: theme.mixins.toolbar,
  spacer: {
    marginTop: 80,
  },
  select: {
    width: '90%',
    alignSelf: 'center',
  },
  cardView: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E7E7E7',
    minHeight: 130,
    width: '90%',
    marginTop: 80,
    marginBottom: 20,
    paddingBottom: 10,
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
    backgroundColor: '#757575',
    width: 200,
    minHeight: 90,
    borderRadius: 5,
    boxShadow: "1px 1px 3px #9E9E9E",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
  infoCardDiv: {
    display: 'flex',
    flex: 1,
    cursor: 'pointer',
    justifyContent: 'space-between',
    marginRight: 5,
    marginTop: 5,
    marginLeft: 5,
    flexDirection: 'row',
  },
  cardsRestantes: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    marginLeft: 5,
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
  cardTeorico: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2196f3',
    width: 200,
    minHeight: 90,
    borderRadius: 5,
    boxShadow: "1px 1px 3px #9E9E9E",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardPratico: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0d47a1',
    width: 200,
    minHeight: 90,
    borderRadius: 5,
    boxShadow: "1px 1px 3px #9E9E9E",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
  th: {
    width: 140,
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    color: '#3F51B5',
  },
  thHorario: {
    width: 120,
    textTransform: 'uppercase',
    color: '#3F51B5',
  },
  tdDrop: {
    cursor: 'pointer',
    backgroundColor: '#E7E7E7',
    borderRadius: 5,
    height: 55,
    width: 140,
  },
  tdHora: {
    color: '#707070',
    textTransform: 'uppercase',
  },
  botaoSalvar: {
    marginRight: 10,
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
      selectedDisciplina: { nome: '', hrs_totais: '', id_curriculo_disciplina: '', id_disciplina: '' },
      selectedTurma: {nome: '', id_turma: ''},
      itemChecked: false,
      index: '',
      arrayAux: [],
      carregouHorario: false,
      carregouMatutino: false,
      arrayLinhas: [1, 2, 3, 4, 5],
      arrayColunas: [1, 2, 3, 4, 5, 6],
      mostraClose: false,
      //matutino
      schedulesMatutino: [{ id: 1, label: '7:30 - 8:20', linha: 1, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesMatutino2: [{ id: 2, label: '8:20 - 9:10', linha: 2, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesMatutino3: [{ id: 3, label: '9:10 - 10:00', linha: 3, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesMatutino4: [{ id: 4, label: '10:10 - 11:00', linha: 4, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesMatutino5: [{ id: 5, label: '11:00 - 11:50', linha: 5, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      //vespertino
      schedulesVespertino: [{ id: 1, label: '13:30 - 14:20', linha: 6, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesVespertino2: [{ id: 2, label: '14:20 - 15:10', linha: 7, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesVespertino3: [{ id: 3, label: '15:10 - 16:00', linha: 8, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesVespertino4: [{ id: 4, label: '16:20 - 17:10', linha: 9, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesVespertino5: [{ id: 5, label: '17:10 - 18:00', linha: 10, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      //noturno
      schedulesNoturno: [{ id: 1, label: '18:30 - 19:20', linha: 11, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesNoturno2: [{ id: 2, label: '19:20 - 20:10', linha: 12, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesNoturno3: [{ id: 3, label: '20:20 - 21:10', linha: 13, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      schedulesNoturno4: [{ id: 4, label: '21:10 - 22:00', linha: 14, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
      usuario: '',
      disabled: [false, false, false, false, false, false, false],
      index: '',
      arrayQuadroMatutino: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroMatutino2: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroMatutino3: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroMatutino4: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroMatutino6: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroVespertino: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroVespertino2: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroVespertino3: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroVespertino4: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroVespertino5: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroNoturno: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroNoturno2: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroNoturno3: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      arrayQuadroNoturno4: { classes: [], id_curriculo_disciplina: [], turma: [], tipo_aula: [] },
      horas_praticas: '',
      horas_teoricas: '',
      boolean_hrs_praticas: false,
      boolean_tp: true,
      showLoading: false,
      turmaCodigo: '',
      horas_totais_t: '',
      showModalAlerta: false,
      carregandoDisciplina: true,
      selecionouTurma: false,
      fase_curso: 0,
    }
  }

  handleChangeSemestre = async selectedOptionSemestre => {

    await this.setState({ selectedOptionSemestre, selectedTurma: [], arrayAux: [] });

    const response = await api.post("/disciplina/obter", {
      id_course: this.state.id_curso, fase: this.state.selectedOptionSemestre.value
    })

    await this.setState({ disciplinas: '', carregouDisciplina: false, turmas: '', carregouTurma: false, fase_curso: this.state.selectedOptionSemestre.value });

    const response3 = await api.post("/disciplina/buscarDisciplinaSalva", {
      fase_curso: this.state.selectedOptionSemestre.value,
    })

    for (var i = 0; i < response.data.length; i++) {
      var nome = response.data[i].codigo;
      nome += ' - ';
      nome += response.data[i].nome;
      await this.setState({ disciplinas: [...this.state.disciplinas, { nome: nome, hrs_totais: response.data[i].horas_totais, id_curriculo_disciplina: response.data[i].id_spa_curriculo_disciplina, id_disciplina: response.data[i].id_disciplina, id_curriculo: response.data[i].id_curriculo }], carregouDisciplina: true })
    }

    if (response3.data != 0) {
      this.state.disciplinas.map((item, index) => {
        response3.data.map(item2 => {
          if (item.id_disciplina == item2.id_disciplina) {
            this.state.disabled[index] = true;
            this.forceUpdate();
          }
        })
      })
    }
    else {
      this.state.disabled.map((item, index) => {
        this.state.disabled[index] = false;
        this.forceUpdate();
      })

    }
  };

  //buscar turma
  async handleChangeDisciplina(item, index) {

    this.setState({ selectedTurma: [], arrayAux: [], showLoading: true })


    const response = await api.post("/disciplina/buscarCurso", {
      id_usuario: this.state.usuario.id_usuario
    })

    const response2 = await api.post("/disciplina/buscarTurmas", {
      id_course: response.data[0].id_curso, fase: this.state.selectedOptionSemestre.value
    });

    this.setState({ id_disciplina: response.data[0].id_curso })
    this.setState({ selectedDisciplina: { nome: item.nome, horas_totais: item.hrs_totais, id_curriculo_disciplina: item.id_curriculo_disciplina, id_disciplina: item.id_disciplina, id_curriculo: item.id_curriculo } });

    this.setState({ turmas: '', carregouTurma: false, horas_totais_t: this.state.selectedDisciplina.horas_totais });

    for (var i = 0; i < response2.data.length; i++) {
      await this.setState({ turmas: [...this.state.turmas, { id_turma: response2.data[i].id_turmas, turma: response2.data[i].codigo }], carregouTurma: true })
    }

    const response3 = await api.post("/disciplina/buscarHoras", {
      id_disciplina: this.state.selectedDisciplina.id_disciplina
    })

    for (let j = 0; j < response3.data.length; j++) {
      if (response3.data[j].horas_praticas != 0 && response3.data[j].horas_praticas != null)
        await this.setState({ horas_praticas: response3.data[j].horas_praticas })
      if (response3.data[j].horas_teoricas != 0 && response3.data[j].horas_praticas != null)
        await this.setState({ horas_teoricas: response3.data[j].horas_teoricas })
    }

    if (this.state.horas_praticas != null) {
      this.setState({ boolean_hrs_praticas: true })
    }

    this.setState({ showLoading: false })

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
        if (this.state.arrayAux[index] == true) {
          this.state.arrayAux[index] = false;
          this.state.selectedTurma.splice(index, 1);
          this.forceUpdate();
          this.handleChangeComponente();
          return;
        }
      }
    }
    this.state.selectedTurma[index] = item.turma;
    await this.setState({ carregouGerar: true })
    this.setState({ turmaSelecionada: item.id_turma, turmaCodigo: item.turma, selecionouTurma: true })
    this.state.arrayAux[index] = true;
    this.forceUpdate();
    this.handleChangeComponente();
  };

  async handleChangeComponente(item) {
    await this.setState({ carregouComponente: true })
  };

  disableRadio(t) {
    this.state.disabled[this.state.index] = true;
  }

  attRestante(v) {
    this.setState({ horas_totais_t: v })
  }


  componentDidMount = async () => {
    if (localStorage.getItem('login') == 'on') {
      var usuario = JSON.parse(localStorage.getItem('usuario'))
      this.setState({ usuario: usuario })

      const response = await api.post("/disciplina/buscarCurso", {
        id_usuario: usuario.id_usuario
      })

      this.setState({ id_curso: response.data[0].id_curso })

      const response2 = await api.post("/disciplina/buscarSemestre", {
        id_course: response.data[0].id_curso
      })

      await this.setState({ qtdeSemestre: response2.data[0].semestres, })
      var rows = [];
      for (var i = 1; i <= this.state.qtdeSemestre; i++) {
        this.setState({ array: [...this.state.array, { value: i, label: i + "º Semestre" }] })
        this.setState({ carregou: true })
      }

    }
  };


  armazenarSchedule(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14) {
    // fazer condições para ver qual preencherj
    console.log("s1: ", s1);
    console.log("s2: ", s2);
    console.log("s3: ", s3);
    console.log("s4: ", s4);
    

    this.setState({ schedulesMatutino: s1, schedulesMatutino2: s2, schedulesMatutino3: s3, schedulesMatutino4: s4, schedulesMatutino5: s5, schedulesVespertino: s6, schedulesVespertino2: s7, schedulesVespertino3: s8, schedulesVespertino4: s9, schedulesVespertino5: s10, schedulesNoturno: s11, schedulesNoturno2: s12, schedulesNoturno3: s13, schedulesNoturno4: s14 });
  }

  async salvarGrade() {

    if (this.state.horas_totais_t != 0) {
      await this.setState({ showModalAlerta: true })
      return;
    }

    for (let i = 0; i < 6; i++) {
      //matutino
      this.setState({ arrayQuadroMatutino: { classes: [...this.state.arrayQuadroMatutino.classes, this.state.schedulesMatutino[0].classes[i]], semestre: this.state.schedulesMatutino[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroMatutino.id_curriculo_disciplina, this.state.schedulesMatutino[0].id_curriculo_disciplina[i]], linha: this.state.schedulesMatutino[0].linha, turma: [...this.state.arrayQuadroMatutino.turma, this.state.schedulesMatutino[0].turma[i]], tipo_aula: [...this.state.arrayQuadroMatutino.tipo_aula, this.state.schedulesMatutino[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroMatutino2: { classes: [...this.state.arrayQuadroMatutino2.classes, this.state.schedulesMatutino2[0].classes[i]], semestre: this.state.schedulesMatutino2[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroMatutino2.id_curriculo_disciplina, this.state.schedulesMatutino2[0].id_curriculo_disciplina[i]], linha: this.state.schedulesMatutino2[0].linha, turma: [...this.state.arrayQuadroMatutino2.turma, this.state.schedulesMatutino2[0].turma[i]], tipo_aula: [...this.state.arrayQuadroMatutino2.tipo_aula, this.state.schedulesMatutino2[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroMatutino3: { classes: [...this.state.arrayQuadroMatutino3.classes, this.state.schedulesMatutino3[0].classes[i]], semestre: this.state.schedulesMatutino3[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroMatutino3.id_curriculo_disciplina, this.state.schedulesMatutino3[0].id_curriculo_disciplina[i]], linha: this.state.schedulesMatutino3[0].linha, turma: [...this.state.arrayQuadroMatutino3.turma, this.state.schedulesMatutino3[0].turma[i]], tipo_aula: [...this.state.arrayQuadroMatutino3.tipo_aula, this.state.schedulesMatutino3[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroMatutino4: { classes: [...this.state.arrayQuadroMatutino4.classes, this.state.schedulesMatutino4[0].classes[i]], semestre: this.state.schedulesMatutino4[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroMatutino4.id_curriculo_disciplina, this.state.schedulesMatutino4[0].id_curriculo_disciplina[i]], linha: this.state.schedulesMatutino4[0].linha, turma: [...this.state.arrayQuadroMatutino4.turma, this.state.schedulesMatutino4[0].turma[i]], tipo_aula: [...this.state.arrayQuadroMatutino4.tipo_aula, this.state.schedulesMatutino4[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroMatutino6: { classes: [...this.state.arrayQuadroMatutino6.classes, this.state.schedulesMatutino5[0].classes[i]], semestre: this.state.schedulesMatutino5[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroMatutino6.id_curriculo_disciplina, this.state.schedulesMatutino5[0].id_curriculo_disciplina[i]], linha: this.state.schedulesMatutino5[0].linha, turma: [...this.state.arrayQuadroMatutino6.turma, this.state.schedulesMatutino5[0].turma[i]], tipo_aula: [...this.state.arrayQuadroMatutino6.tipo_aula, this.state.schedulesMatutino5[0].tipo_aula[i]] } })

      //vespertino
      this.setState({ arrayQuadroVespertino: { classes: [...this.state.arrayQuadroVespertino.classes, this.state.schedulesVespertino[0].classes[i]], semestre: this.state.schedulesVespertino[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroVespertino.id_curriculo_disciplina, this.state.schedulesVespertino[0].id_curriculo_disciplina[i]], linha: this.state.schedulesVespertino[0].linha, turma: [...this.state.arrayQuadroVespertino.turma, this.state.schedulesVespertino[0].turma[i]], tipo_aula: [...this.state.arrayQuadroVespertino.tipo_aula, this.state.schedulesVespertino[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroVespertino2: { classes: [...this.state.arrayQuadroVespertino2.classes, this.state.schedulesVespertino2[0].classes[i]], semestre: this.state.schedulesVespertino2[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroVespertino2.id_curriculo_disciplina, this.state.schedulesVespertino2[0].id_curriculo_disciplina[i]], linha: this.state.schedulesVespertino2[0].linha, turma: [...this.state.arrayQuadroVespertino2.turma, this.state.schedulesVespertino2[0].turma[i]], tipo_aula: [...this.state.arrayQuadroVespertino2.tipo_aula, this.state.schedulesVespertino2[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroVespertino3: { classes: [...this.state.arrayQuadroVespertino3.classes, this.state.schedulesVespertino3[0].classes[i]], semestre: this.state.schedulesVespertino3[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroVespertino3.id_curriculo_disciplina, this.state.schedulesVespertino3[0].id_curriculo_disciplina[i]], linha: this.state.schedulesVespertino3[0].linha, turma: [...this.state.arrayQuadroVespertino3.turma, this.state.schedulesVespertino3[0].turma[i]], tipo_aula: [...this.state.arrayQuadroVespertino3.tipo_aula, this.state.schedulesVespertino3[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroVespertino4: { classes: [...this.state.arrayQuadroVespertino4.classes, this.state.schedulesVespertino4[0].classes[i]], semestre: this.state.schedulesVespertino4[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroVespertino4.id_curriculo_disciplina, this.state.schedulesVespertino4[0].id_curriculo_disciplina[i]], linha: this.state.schedulesVespertino4[0].linha, turma: [...this.state.arrayQuadroVespertino4.turma, this.state.schedulesVespertino4[0].turma[i]], tipo_aula: [...this.state.arrayQuadroVespertino4.tipo_aula, this.state.schedulesVespertino4[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroVespertino5: { classes: [...this.state.arrayQuadroVespertino5.classes, this.state.schedulesVespertino5[0].classes[i]], semestre: this.state.schedulesVespertino5[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroVespertino5.id_curriculo_disciplina, this.state.schedulesVespertino5[0].id_curriculo_disciplina[i]], linha: this.state.schedulesVespertino5[0].linha, turma: [...this.state.arrayQuadroVespertino5.turma, this.state.schedulesVespertino5[0].turma[i]], tipo_aula: [...this.state.arrayQuadroVespertino5.tipo_aula, this.state.schedulesVespertino5[0].tipo_aula[i]] } })

      //noturno
      this.setState({ arrayQuadroNoturno: { classes: [...this.state.arrayQuadroNoturno.classes, this.state.schedulesNoturno[0].classes[i]], semestre: this.state.schedulesNoturno[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroNoturno.id_curriculo_disciplina, this.state.schedulesNoturno[0].id_curriculo_disciplina[i]], linha: this.state.schedulesNoturno[0].linha, turma: [...this.state.arrayQuadroNoturno.turma, this.state.schedulesNoturno[0].turma[i]], tipo_aula: [...this.state.arrayQuadroNoturno.tipo_aula, this.state.schedulesNoturno[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroNoturno2: { classes: [...this.state.arrayQuadroNoturno2.classes, this.state.schedulesNoturno2[0].classes[i]], semestre: this.state.schedulesNoturno2[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroNoturno2.id_curriculo_disciplina, this.state.schedulesNoturno2[0].id_curriculo_disciplina[i]], linha: this.state.schedulesNoturno2[0].linha, turma: [...this.state.arrayQuadroNoturno2.turma, this.state.schedulesNoturno2[0].turma[i]], tipo_aula: [...this.state.arrayQuadroNoturno2.tipo_aula, this.state.schedulesNoturno2[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroNoturno3: { classes: [...this.state.arrayQuadroNoturno3.classes, this.state.schedulesNoturno3[0].classes[i]], semestre: this.state.schedulesNoturno3[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroNoturno3.id_curriculo_disciplina, this.state.schedulesNoturno3[0].id_curriculo_disciplina[i]], linha: this.state.schedulesNoturno3[0].linha, turma: [...this.state.arrayQuadroNoturno.turma, this.state.schedulesNoturno3[0].turma[i]], tipo_aula: [...this.state.arrayQuadroNoturno3.tipo_aula, this.state.schedulesNoturno3[0].tipo_aula[i]] } })
      this.setState({ arrayQuadroNoturno4: { classes: [...this.state.arrayQuadroNoturno4.classes, this.state.schedulesNoturno4[0].classes[i]], semestre: this.state.schedulesNoturno4[0].semestre, id_curriculo_disciplina: [...this.state.arrayQuadroNoturno4.id_curriculo_disciplina, this.state.schedulesNoturno4[0].id_curriculo_disciplina[i]], linha: this.state.schedulesNoturno4[0].linha, turma: [...this.state.arrayQuadroNoturno4.turma, this.state.schedulesNoturno4[0].turma[i]], tipo_aula: [...this.state.arrayQuadroNoturno4.tipo_aula, this.state.schedulesNoturno4[0].tipo_aula[i]] } })
      await console.log("")
    }

    var vetorGrade = [];
    vetorGrade = [this.state.arrayQuadroMatutino, this.state.arrayQuadroMatutino2, this.state.arrayQuadroMatutino3, this.state.arrayQuadroMatutino4, this.state.arrayQuadroMatutino6, this.state.arrayQuadroVespertino, this.state.arrayQuadroVespertino2, this.state.arrayQuadroVespertino3, this.state.arrayQuadroVespertino4, this.state.arrayQuadroVespertino5, this.state.arrayQuadroNoturno, this.state.arrayQuadroNoturno2, this.state.arrayQuadroNoturno3, this.state.arrayQuadroNoturno4];

    await api.post('/disciplina/salvarTurmas', {
      vetorGrade: vetorGrade,
      id_semestre: 1
    })

    window.location.reload();
  }

  handleMouseHover = () => {
    var atual = this.state.mostraClose
    this.setState({ mostraClose: !atual })
  }

  closeModal = () => {
    this.setState({ showModalAlerta: false })
  }

  limparTurma = () => {
    this.setState({ selecionouTurma: false })
    console.log("selecionou turmaaa: ", this.state.selecionouTurma);

  }

  render() {

    const { selectedOptionSemestre } = this.state;
    const self = this;
    const { classes } = this.props;
    return (
      //body
      <div className={classes.root}>
        {/* // modal de alertas */}
        <ModalAlerta modalOpen={this.state.showModalAlerta} close={this.closeModal} />

        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Header botaoSalvar={<Button size="medium" color="inherit" className={classes.botaoSalvar}>Salvar</Button>}
            botaoSalvarContinuar={<Button onClick={() => this.salvarGrade()} size="medium" color="inherit" className={classes.botaoSalvar}>Salvar e Ir</Button>}
          />
        </AppBar>
        <main className={classes.content}>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 25 }}>
            <h4 style={{ fontSize: 18, color: '#000' }}>Engenharia de Computação</h4>
            <h4 style={{ fontSize: 18, color: '#000' }}><i>1º Semestre</i></h4>
          </div>

          {this.state.semestre != null ?
            <GradeConsulta
              disciplina={this.state.selectedDisciplina}
              turmaCodigo={this.state.turmaCodigo}
              horas_praticas={this.state.horas_praticas}
              horas_teoricas={this.state.horas_teoricas}
              semestre={1}
              index={this.state.index}
              atualizarRadio={(t) => this.disableRadio(t)}
              atualizarRestante={(v) => this.attRestante(v)}
              salvarGrade={(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14) => this.armazenarSchedule(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14)}
              turmaSelecionada={this.state.turmaSelecionada}
              selecionouTurma={this.state.selecionouTurma}
              limparTurma={this.limparTurma}
              fase={this.state.fase_curso}
            />
            :
            <GradeConsulta
              disciplina={this.state.selectedDisciplina}
              turmaCodigo={this.state.turmaCodigo}
              horas_praticas={this.state.horas_praticas}
              horas_teoricas={this.state.horas_teoricas}
              index={this.state.index}
              atualizarRadio={(t) => this.disableRadio(t)}
              atualizarRestante={(v) => this.attRestante(v)}
              salvarGrade={(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14) => this.armazenarSchedule(s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14)}
              turmaSelecionada={this.state.turmaSelecionada}
              selecionouTurma={this.state.selecionouTurma}
              limparTurma={this.limparTurma}
              semestre={1}
              fase={this.state.fase_curso}
            />
          }
        </main>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <Loading loading={this.state.showLoading} />
          <div className={classes.spacer}></div>

          <div className={classes.contentdrawer}>

            <div className={classes.generator}>

              <div className={classes.cardView}>
                <div className={classes.infoCardDiv}>
                  <p className={classes.cardsRestantes}>RESTANTES: <b>{this.state.horas_totais_t}</b></p>
                  <Delete className={classes.delete} color="action" style={{ fontSize: 25 }} onClick={() => self.handleDelete()} />
                </div>
                {this.state.carregouComponente ?
                  <div id="iconDrawer"
                    style={{ cursor: 'pointer' }}
                    className={this.state.boolean_tp === true ? classes.cardTeorico : classes.cardPratico}
                    onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}>
                    <p className={classes.disciplina}>{this.state.selectedDisciplina.nome}</p>
                    <p className={classes.turma}>{this.state.selectedTurma.nome}</p>
                    <p className={classes.turma}>{this.state.boolean_tp === true ? 'TEÓRICA' : 'PRÁTICA'}</p>
                  </div>
                  : <div style={{ cursor: 'pointer' }} className={classes.card}>
                    <p className={classes.disciplina}>Selecione a Disciplina</p>
                    <p className={classes.turma}>Selecione a Turma</p>
                    <p className={classes.turma}>TIPO</p>
                  </div>
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
                            <Radio color="primary" disabled={this.state.disabled[index]} onClick={() => this.setState({ index: index })}
                              className={classes.radio} />
                          }
                          label={item.nome}
                          onClick={() => !this.state.disabled[index] ? self.handleChangeDisciplina(item, index) : null} />
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
            </div>
          </div>
        </Drawer>

      </div>
    );
  }
}

Grade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grade);
