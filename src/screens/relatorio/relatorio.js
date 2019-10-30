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
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap'


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
            arrayFases: [],
            arrayCurso: [],
            habilitarSemestre: false,
            arrayProfessores: '',
            arrayProfessorRelatorio: '',
        }
    }

    async obterCursos() {
        const response = await api.get('/curriculo/obterCursos');
        let i = 0;
        for (i = 0; i < response.data.length; i++) {
            this.setState({ arrayCurso: [...this.state.arrayCurso, { value: response.data[i].id_curso, label: response.data[i].descricao_curso }] })
        }
    }

    async componentDidMount() {
        this.obterCursos();

    }

    // selecionar professor para fazer o relatório por professor disciplina
    disciplinaProfessor = async professorDisciplinaOption => {
        await this.setState({ professorDisciplinaOption });

        const r = await api.post('/relatorios/disciplinaProfessor', {
            id_professor: professorDisciplinaOption.value
        })

        this.setState({ arrayProfessorRelatorio: r.data })
        console.log("resposta da rota ", this.state.arrayProfessorRelatorio);
        

    };

    handleChangeCursos = async selectedOptionCursos => {
        await this.setState({ selectedOptionCursos });

        const r = await api.post("/disciplina/buscarSemestre", {
            id_course: selectedOptionCursos.value
        })
        for (var i = 1; i <= r.data[0].semestres; i++) {
            this.setState({ arrayFases: [...this.state.arrayFases, { value: i, label: i + "º Semestre" }], habilitarSemestre: true })
        }
    };

    async buscarProfessor() {
        const rProfessor = await api.post('/relatorios/todosProfessores');
        rProfessor.data.map(item => {
            this.setState({ arrayProfessores: [...this.state.arrayProfessores, { value: item.id_professor, label: item.nome }] })
        })
        this.setState({ buscarProf: true })
    }


    render() {
        const columns = [
            {
                dataField: 'nome',
                text: 'Nome',
            },
            {
                dataField: 'nome_disciplina',
                text: 'Nome',
            },
            {
                dataField: 'dia_semana',
                text: 'Dia da semana',
            },

        ];
        const { classes } = this.props;
        const { selectedOptionCursos, selectedOptionSemestre, professorDisciplinaOption } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Header />
                </AppBar>

                <main className={classes.content}>
                    <input type="radio" onClick={() => this.buscarProfessor()} />
                    <p>Filtrar por professor</p>
                    {this.state.buscarProf ?
                        <Select id="cadastro_turmas_input_1"
                            value={professorDisciplinaOption}
                            onChange={this.disciplinaProfessor}
                            options={this.state.arrayProfessores}
                            className={classes.select}
                            placeholder={'Selecione o professor'}
                        />
                        : null}
                    {/* <Select id="cadastro_turmas_input_1"
                        value={selectedOptionCursos}
                        onChange={this.handleChangeCursos}
                        options={this.state.arrayCurso}
                        className={classes.
                            select}
                        placeholder={'Curso'}
                    />

                    <Select id="cadastro_turmas_input_1"
                        value={selectedOptionSemestre}
                        onChange={this.selectedOptionCursos}
                        options={this.state.arrayFases}
                        className={classes.
                            select}
                        placeholder={'Semestre'}
                        isDisabled={false}
                    /> */}
                
                <Button>Gerar Relatório</Button>

                </main>
                
                <BootstrapTable
                    keyField="id"
                    pagination={paginator()}
                    data={this.state.arrayProfessorRelatorio}
                    columns={columns}
                />

            </div>
        );
    }
}

Definicao.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Definicao);
