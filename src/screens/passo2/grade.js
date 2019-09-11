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
      qtdeSemestre: '',
      disciplinas: '',
    }
  }

  handleChange = async selectedOption => {
    await this.setState({ selectedOption });
    
    const response = await api.post("/disciplina/obter", {
      codigo_curso: this.state.id_curso, fase: this.state.selectedOption.value
    })

    this.setState({disciplinas: ''});

    for (var i = 0; i < response.data.length; i++) {
      var nome = response.data[i].codigo;
      nome += ' - ';
      nome += response.data[i].nome;
      await this.setState({disciplinas: [...this.state.disciplinas, nome]})
    }

  };

  componentDidMount = async () => {
    if (localStorage.getItem('login') == 'on') {
      var usuario = JSON.parse(localStorage.getItem('usuario'))
 
      this.setState({ id_curso: usuario.curso });
 
      const response = await api.post("/disciplina/buscarSemestre", {
        id_course: usuario.curso
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

    const { selectedOption } = this.state;

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
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.array}
        />

        <ul>
          <li>
          {/* {this.state.disciplinas.map((item => { */}
          <input type="checkbox" name={this.state.disciplinas} />
          <label>{this.state.disciplinas}</label>
          {/* }
          )
          )} */}
        </li>
        </ul>

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
