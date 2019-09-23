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
import { Close } from '@material-ui/icons';

//COMPONENTES
import Header from '../../components/header';
import Card from '../../components/card';
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
    marginTop: 0,
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
  delete: {

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
    backgroundColor: '#d32f2f',
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
    backgroundColor: '#7b1fa2',
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
      selectedTurma: '',
      itemChecked: false,
      index: '',
      arrayAux: [],
      carregouHorario: false,
      carregouMatutino: false,
      arrayLinhas: [1, 2, 3, 4, 5],
      arrayColunas: [1, 2, 3, 4, 5, 6],
      //matutino
      schedulesMatutino: [{ id: 1, label: '7:30 - 8:20', linha: 1, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesMatutino2: [{ id: 2, label: '8:20 - 9:10', linha: 2, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesMatutino3: [{ id: 3, label: '9:10 - 10:00', linha: 3, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesMatutino4: [{ id: 4, label: '10:10 - 11:00', linha: 4, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesMatutino5: [{ id: 5, label: '11:00 - 11:50', linha: 5, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      //vespertino
      schedulesVespertino: [{ id: 1, label: '13:30 - 14:20', linha: 6, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesVespertino2: [{ id: 2, label: '14:20 - 15:10', linha: 7, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesVespertino3: [{ id: 3, label: '15:10 - 16:00', linha: 8, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesVespertino4: [{ id: 4, label: '16:20 - 17:10', linha: 9, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesVespertino5: [{ id: 5, label: '17:10 - 18:00', linha: 10, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      //noturno
      schedulesNoturno: [{ id: 1, label: '18:30 - 19:20', linha: 11, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesNoturno2: [{ id: 2, label: '19:20 - 20:10', linha: 12, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesNoturno3: [{ id: 3, label: '20:20 - 21:10', linha: 13, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] }],
      schedulesNoturno4: [{ id: 4, label: '21:10 - 22:00', linha: 14, classes: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false] },],
      usuario: '',
      disabled: [false, false, false, false, false, false, false],
      index: '',
      arrayQuadro: '',
      turmaSelecionada: '',
      horas_praticas: '',
      horas_teoricas: '',
      boolean_hrs_praticas: false,
      boolean_tp: false
    }
  }

  handleChangeSemestre = async selectedOptionSemestre => {

    await this.setState({ selectedOptionSemestre, selectedTurma: [], arrayAux: [] });


    const response = await api.post("/disciplina/obter", {
      id_course: this.state.id_curso, fase: this.state.selectedOptionSemestre.value
    })

    this.setState({ disciplinas: '', carregouDisciplina: false, turmas: '', carregouTurma: false });

    for (var i = 0; i < response.data.length; i++) {
      var nome = response.data[i].codigo;
      nome += ' - ';
      nome += response.data[i].nome;
      await this.setState({ disciplinas: [...this.state.disciplinas, { nome: nome, hrs_totais: response.data[i].horas_totais, id_curriculo_disciplina: response.data[i].id_spa_curriculo_disciplina, id_disciplina: response.data[i].id_disciplina }], carregouDisciplina: true })
    }
  };

  //buscar turma
  async handleChangeDisciplina(item, index) {
    console.log("ITEM: ", item);


    this.setState({ selectedTurma: [], arrayAux: [] })

    const response = await api.post("/disciplina/buscarCurso", {
      id_usuario: this.state.usuario.id_usuario
    })

    const response2 = await api.post("/disciplina/buscarTurmas", {
      id_course: response.data[0].id_curso, fase: this.state.selectedOptionSemestre.value
    })

    this.setState({ id_disciplina: response.data[0].id_curso })
    this.setState({ selectedDisciplina: { nome: item.nome, horas_totais: item.hrs_totais, id_curriculo_disciplina: item.id_curriculo_disciplina, id_disciplina: item.id_disciplina } });

    this.setState({ turmas: '', carregouTurma: false });

    for (var i = 0; i < response2.data.length; i++) {
      await this.setState({ turmas: [...this.state.turmas, { id_turma: response2.data[i].id_turmas, turma: response2.data[i].codigo }], carregouTurma: true })
    }

    const response3 = await api.post("/disciplina/buscarHoras", {
      id_disciplina: this.state.selectedDisciplina.id_disciplina
    })

    console.log("response 3 das horas: ", response3.data);
    for (let j = 0; j < response3.data.length; j++) {
      if (response3.data[j].horas_praticas != 0)
        this.setState({ horas_praticas: response3.data[j].horas_praticas })
      if (response3.data[j].horas_teoricas != 0)
        this.setState({ horas_teoricas: response3.data[j].horas_teoricas })

    }

    // console.log("horas teóricas: ", this.state.horas_teoricas);
    // console.log("horas práticas: ", this.state.horas_praticas);

    if (this.state.horas_praticas != null) {
      this.setState({ boolean_hrs_praticas: true })
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
    console.log("item: ", item);


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
    this.setState({ turmaSelecionada: item.id_turma })
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

  //diminui a quantidade de créditos
  async diminuirCreditos() {

    if (this.state.selectedDisciplina.horas_totais != 0) {
      await this.setState({ selectedDisciplina: { nome: this.state.selectedDisciplina.nome, horas_totais: parseInt(this.state.selectedDisciplina.horas_totais) - 1, id_curriculo_disciplina: this.state.selectedDisciplina.id_curriculo_disciplina } })
    }

    if (this.state.boolean_tp == false && this.state.selectedDisciplina.horas_praticas != 0) {
      if (this.state.horas_praticas > 0) {
        await this.setState({ horas_praticas: parseInt(this.state.horas_praticas) - 1 })
      } else {
        await this.setState({ boolean_tp: true })
      }
    } else if (this.state.boolean_tp == true && this.state.selectedDisciplina.horas_teoricas != 0) {
      if (this.state.horas_teoricas > 0) {
        await this.setState({ horas_teoricas: parseInt(this.state.horas_teoricas) - 1 })
      } else {
        await this.setState({ boolean_tp: false })
      }
    }

    console.log(this.state.boolean_tp);
    
  }

  // verifica a quantidade de créditos
  verificaCreditos() {
    if (this.state.selectedDisciplina.horas_totais <= 0) {
      this.state.disabled[this.state.index] = true
      alert("Horas totais de créditos preenchidas");
      return 1;
    }
  }

  setClass(scheduleId, classIndex, pos) {

    if (pos == 1) {
      this.setState({
        schedulesMatutino: this.state.schedulesMatutino.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.turma = this.state.turmaSelecionada
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return (schedule)
        })
      })
    }

    if (pos == 2) {
      this.setState({
        schedulesMatutino2: this.state.schedulesMatutino2.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.turma = this.state.turmaSelecionada
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }

    if (pos == 3) {
      this.setState({
        schedulesMatutino3: this.state.schedulesMatutino3.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.turma = this.state.turmaSelecionada
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }

    if (pos == 4) {
      this.setState({
        schedulesMatutino4: this.state.schedulesMatutino4.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.turma = this.state.turmaSelecionada
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }

    if (pos == 5) {
      this.setState({
        schedulesMatutino5: this.state.schedulesMatutino5.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.turma = this.state.turmaSelecionada
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }

    if (pos == 6) {
      this.setState({
        schedulesVespertino: this.state.schedulesVespertino.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 7) {
      this.setState({
        schedulesVespertino2: this.state.schedulesVespertino2.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 8) {
      this.setState({
        schedulesVespertino3: this.state.schedulesVespertino3.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 9) {
      this.setState({
        schedulesVespertino4: this.state.schedulesVespertino4.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 10) {
      this.setState({
        schedulesVespertino5: this.state.schedulesVespertino5.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 11) {
      this.setState({
        schedulesNoturno: this.state.schedulesNoturno.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 12) {
      this.setState({
        schedulesNoturno2: this.state.schedulesNoturno2.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 13) {
      this.setState({
        schedulesNoturno3: this.state.schedulesNoturno3.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
    if (pos == 14) {
      this.setState({
        schedulesNoturno4: this.state.schedulesNoturno4.map(schedule => {
          if (schedule.id === scheduleId) {
            if (this.verificaCreditos() == 1)
              return (schedule);
            schedule.classes[classIndex] = this.state.selectedDisciplina.nome.substring(0, 7)
            schedule.id_curriculo_disciplina[classIndex] = this.state.selectedDisciplina.id_curriculo_disciplina
            schedule.semestre = this.state.selectedOptionSemestre.value
            schedule.turma = this.state.turmaSelecionada
            schedule.carregou[classIndex] = true
            this.diminuirCreditos();
            schedule.boolean_tp[classIndex] = this.state.boolean_tp
          }
          return schedule
        })
      })
    }
  }

  async salvarGrade() {
    await this.setState({
      arrayQuadro: [{
        mat1: this.state.schedulesMatutino, mat2: this.state.schedulesMatutino2,
        mat3: this.state.schedulesMatutino3, mat4: this.state.schedulesMatutino4,
        mat5: this.state.schedulesMatutino5,
        vesp1: this.state.schedulesVespertino, vesp2: this.state.schedulesVespertino2,
        vesp3: this.state.schedulesVespertino3, vesp4: this.state.schedulesVespertino4,
        vesp5: this.state.schedulesVespertino5,
        not1: this.state.schedulesNoturno, not2: this.state.schedulesNoturno2,
        not3: this.state.schedulesNoturno3, not4: this.state.schedulesNoturno4
      }]
    })

    console.log("primeiro horário matutino: ", this.state.arrayQuadro);

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
        
        <main className={classes.content}>

          <div>
            <center><strong>CADASTRO DE TURMAS</strong><br/>Engenharia de Computação<br/><i>1º Semestre</i></center>
          </div>

          <br />
          <br />
          <Table striped bordered hover
            style={{ width: '100%', textAlign: 'center', backgroundColor: '#fff' }}
          >
            <thead>
              <tr>
                <th colspan='7' class='text-center'>Matutino</th>
              </tr>
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

              {this.state.schedulesMatutino.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 1)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={this.state.selectedTurma} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesMatutino2.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 2)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>

                  ))}
                </tr>
              ))
              }

              {this.state.schedulesMatutino3.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 3)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesMatutino4.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 4)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesMatutino5.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 5)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }
            </tbody>
          </Table>
          <Table striped bordered hover
            style={{ width: '100%', textAlign: 'center', backgroundColor: '#fff' }}
          >
            <thead>
              <tr>
                <th colspan='7' class='text-center'>Vespertino</th>
              </tr>
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
              {this.state.schedulesVespertino.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 6)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesVespertino2.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 7)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesVespertino3.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 8)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesVespertino4.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => { schedule.carregou[index] ? console.log("deletar posição: ", index) : this.setClass(schedule.id, index, 9) }}>{!_class ? '' : _class}

                      {schedule.carregou[index] ?
                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesVespertino5.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 10)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }
            </tbody>
          </Table>
          <Table striped bordered hover
            style={{ width: '100%', textAlign: 'center', backgroundColor: '#fff' }}
          >
            <thead>
              <tr>
                <th colspan='7' class='text-center'>Noturno</th>
              </tr>
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
              {this.state.schedulesNoturno.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 11)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesNoturno2.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 12)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesNoturno3.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 13)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

              {this.state.schedulesNoturno4.map(schedule => (
                <tr> <td>{schedule.label}</td>
                  {schedule.classes.map((_class, index) => (
                    <td style={{ cursor: 'pointer' }} onClick={() => this.setClass(schedule.id, index, 14)}>

                      {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={'000000'} teorica={schedule.boolean_tp[index]} />}

                      {schedule.carregou[index] ?

                        <Close color="action" style={{ fontSize: 20 }} />
                        : null
                      }

                    </td>
                  ))}
                </tr>
              ))
              }

            </tbody>
          </Table>
        </main>

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
                <div className={classes.infoCardDiv}>
                  <p className={classes.cardsRestantes}>RESTANTES: <b>{this.state.selectedDisciplina.horas_totais}</b></p>
                  <Delete className={classes.delete} color="action" style={{ fontSize: 25 }} onClick={() => self.handleDelete()} />
                </div>
                {this.state.carregouComponente ?
                  <div style={{ cursor: 'pointer' }} className={1 === 1 ? classes.cardTeorico : classes.cardPratico}>
                      <p className={classes.disciplina}>{this.state.selectedDisciplina.nome}</p>
                      <p className={classes.turma}>{this.state.selectedTurma}</p>
                      <p className={classes.turma}>{1 === 1 ? 'TEÓRICA' : 'PRÁTICA'}</p>
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
            {/*<div class='buttonsDiv'>
              <Button className={classes.button} variant="contained" size="large" color="primary">Salvar</Button>
              <Button onClick={() => this.salvarGrade()} className={classes.button} variant="contained" size="large" color="primary">Salvar e Concluir</Button>
            </div>*/}
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
