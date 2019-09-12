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
        display: 'flex',
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
    },
    toolbar: theme.mixins.toolbar,
})

class Grade extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedOption: null,
      id_curso: '',
      array: [{value: '', label: ''}],
      carregou: '',
      carregouDisciplina: '',
      carregouTurma: '',
      qtdeSemestre: '',
      disciplinas: [],
      turmas: [],
    }
  }

  handleChangeSemestre = async selectedOptionSemestre => {
    await this.setState({ selectedOptionSemestre });
    
    const response = await api.post("/disciplina/obter", {
      codigo_curso: this.state.id_curso, fase: this.state.selectedOptionSemestre.value
    })

    this.setState({disciplinas: ''});

    for (var i = 0; i < response.data.length; i++) {
      var nome = response.data[i].codigo;
      nome += ' - ';
      nome += response.data[i].nome;
      await this.setState({disciplinas: [...this.state.disciplinas, {nome: nome, id_disciplina: response.data[i].id_disciplina}], carregouDisciplina: true})
    }

  };

  async handleChangeDisciplina(item, index) {
    
    const response = await api.post("/disciplina/buscarTurmas", {
      id_disciplina: item.id_disciplina
    })

    for (var i = 0; i < response.data.length; i++) {
      await this.setState({turmas: [...this.state.turmas, {nome: response.data[i].id_plano_ensino, turma: response.data[i].turma}], carregouTurma: true})
    }

    console.log("Index: ", index);

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
        this.setState({array: [...this.state.array, {value: i, label: i}] })
        this.setState({ carregou: true })
      }
 
    }

  };
  
  render(){

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

        <div style={{marginTop: 150 + 'px'}}></div>

        <Select id="cadastro_turmas_input_1"
          value={selectedOptionSemestre}
          onChange={this.handleChangeSemestre}
          options={this.state.array}
        />

        
        { this.state.carregouDisciplina ? 
          this.state.disciplinas.map(function(item, index) {
            return(
            <div> <input onClick={() => self.handleChangeDisciplina(item, index)}  type="checkbox"/>
            <p >{item.nome}</p></div>
           )
          })
          : null
        }

        { this.state.carregouTurma ? 
          this.state.turmas.map(function(item) {
            return(
            <div> <input type="checkbox"/>
            <p >{item.turma}</p></div>
           )
          })
          : null
        }
        

        

      </Drawer>

      <main className={classes.content}>
      </main>

    </div>
    );
  }
}

Grade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grade);
