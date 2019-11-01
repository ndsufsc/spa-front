import React from 'react';
import Select from 'react-select'

//ESTILO
// import './definicao.css';

//COMPONENTES MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//COMPONENTES
import Header from '../../components/header';
import api from '../../service/api';

const drawerWidth = "25%";

const styles = theme => ({
    root: {
        // display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: 'none',
    },
    formControl: {
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 10,
    },
    formcontrollabel: {
        fontFamily: 'Roboto',
    },
    button: {
        marginRight: 20,
        marginBottom: 10,
    },
    formGroup: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    controllerDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: 150,
        alignItems: 'center',
        marginBottom: 20,
    },
    filterDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginRight: 80,
        marginBottom: 20,
    },
    radio: {
        marginBottom: -10,
        marginTop: 0,
    },
    margin: {
        flex:  1,
        width: '25%'
    },
    selectGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    select: {
        marginBottom: 15,
        width: '100%'
    },
    table: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    }
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
            tipoRelatorio: 'Turma/Semestre',
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

    handleChangeRelatorio = event => {
        this.setState({ tipoRelatorio: event.target.value});
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
        const { tipoRelatorio } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Header />
                </AppBar>

                <div className={classes.controllerDiv}>
                    <div className={classes.filterDiv}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Selecione o relatório desejado:</FormLabel>
                            
                            <RadioGroup className={classes.formGroup} 
                                        aria-label="relatorio" 
                                        name="relatorio" 
                                        value={tipoRelatorio} 
                                        onChange={this.handleChangeRelatorio}>
                                
                                <FormControlLabel className={classes.radio} 
                                                value="Turma/Semestre" 
                                                control={<Radio name="rel" color="primary"/>} 
                                                label="Turma/Semestre" />
                                <FormControlLabel className={classes.radio}
                                                value="Disciplina/Professor" 
                                                control={<Radio name="rel" color="primary"/>} 
                                                label="Disciplina/Professor" />
                                <FormControlLabel className={classes.radio}
                                                value="Grade Semestral Curso/Fase" 
                                                control={<Radio name="rel" color="primary"/>} 
                                                label="Grade Semestral Curso/Fase" />
                                <FormControlLabel className={classes.radio}
                                                value="Sala" 
                                                control={<Radio name="rel" color="primary"/>} 
                                                label="Carga horárioa por semestre" />
                                <FormControlLabel className={classes.radio}
                                                value="Disciplina Teórica/Prática" 
                                                control={<Radio name="rel" color="primary"/>} 
                                                label="Disciplina Teórica/Prática" />
                                <FormControlLabel className={classes.radio}
                                                value="Professor/Departamento" 
                                                control={<Radio name="rel" color="primary"/>} 
                                                label="Professor/Departamento" />
                            </RadioGroup>

                        </FormControl>

                        <div className={classes.selectGroup}>
                            <FormLabel component="legend">Filtre seu resultado:</FormLabel>
                            <Select id="cadastro_turmas_input_1"
                                value={professorDisciplinaOption}
                                onChange={this.disciplinaProfessor}
                                options={this.state.arrayProfessores}
                                className={classes.select}
                                placeholder={'Selecione o professor'}
                            />
                            <Select id="cadastro_turmas_input_1"
                                value={professorDisciplinaOption}
                                onChange={this.disciplinaProfessor}
                                options={this.state.arrayProfessores}
                                className={classes.select}
                                placeholder={'Selecione o professor'}
                            />
                            <Select id="cadastro_turmas_input_1"
                                value={professorDisciplinaOption}
                                onChange={this.disciplinaProfessor}
                                options={this.state.arrayProfessores}
                                className={classes.select}
                                placeholder={'Selecione o professor'}
                            />
                            
                        </div>
                    </div>

                    <Button variant="contained" size="large" color="primary" className={classes.margin}>
                        Gerar Relatório
                    </Button>
                </div>
                
                <div className={classes.table}>
                    <BootstrapTable
                        keyField="id"
                        pagination={paginator()}
                        data={this.state.arrayProfessorRelatorio}
                        columns={columns}
                    />
                </div>
                
                {/*<input type="radio" onClick={() => this.buscarProfessor()} />
                
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
                />*/} 
            </div>
        );
    }
}

Definicao.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Definicao);
