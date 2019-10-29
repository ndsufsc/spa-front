import React from 'react';
import Select from 'react-select'

//ESTILO
// import './definicao.css';

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
import Tabela from '../../components/tabela';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

//COMPONENTES
import Header from '../../components/header';
import api from '../../service/api';

//ROTEAMENTO
import { Link } from 'react-router-dom'
//MATERIAL ICONS
import { Delete } from '@material-ui/icons';
import { Close } from '@material-ui/icons';
// load
import { ClipLoader, BounceLoader } from 'react-spinners';
//react bootstrap

import { Table, Modal } from 'react-bootstrap'
//COMPONENTES CRIADOS
import GradeConsulta from '../../components/gradeConsulta';


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
        marginTop: 120,
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
    select2: {
        marginTop: 20,
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

class Definicao extends React.Component {

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
            selectedProfessor: '',
            selectedTurma: '',
            arrayProfessores: '',
            arrayP: [],
            professorInfo: [{ nome: '', bool: '' }],
            fase_curso: ''
        }
    }

    handleChangeSemestre = async selectedOptionSemestre => {
        await this.setState({ selectedOptionSemestre });

        const response = await api.post("/disciplina/obter", {
            codigo_curso: this.state.id_curso, fase: this.state.selectedOptionSemestre.value
        })

        this.setState({ disciplinas: '', carregouDisciplina: false, turmas: '', carregouTurma: false, fase_curso: this.state.selectedOptionSemestre.value });

        for (var i = 0; i < response.data.length; i++) {
            var nome = response.data[i].codigo;
            nome += ' - ';
            nome += response.data[i].nome;
            await this.setState({ disciplinas: [...this.state.disciplinas, { nome: nome, id_disciplina: response.data[i].id_disciplina }], carregouDisciplina: true })
        }

    };


    handleChangeProfessor = async selectedOptionProfessor => {
        await this.setState({ selectedOptionProfessor });
        await this.setState({ selectedProfessor: selectedOptionProfessor.label });

        await this.setState({ professorInfo: [...this.state.professorInfo, { nome: this.state.selectedProfessor, id_professor: selectedOptionProfessor.value }] });
        console.log("professor info: ", this.state.professorInfo);

        this.handleChangeComponente();

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

            const responseProfessor = await api.post("/disciplina/buscaProfessores", {
                id_departamento: this.state.usuario.id_departamento
            })

            await this.setState({ arrayProfessores: responseProfessor.data })

            this.state.arrayProfessores.map((item => {
                this.setState({ arrayP: [...this.state.arrayP, { label: item.nome, value: item.id_professor }] })
            }))


        }

    };

    render() {

        const { selectedOptionSemestre, selectedOptionProfessor } = this.state;
        const self = this;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Header />
                </AppBar>
            </div>
        );
    }
}

Definicao.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Definicao);
