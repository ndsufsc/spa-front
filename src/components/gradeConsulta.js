import React from 'react';

//react bootstrap
import { Table } from 'react-bootstrap'

//Componentes
import Card from '../components/card';
import ModalGrade from '../components/Modais/modalGrade'
//api
import api from '../service/api';

import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

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

<<<<<<< HEAD

export default class GradeConsulta extends Component {
=======
class GradeConsulta extends React.Component {
>>>>>>> 12014df74e1b2c51b5d3afdc4a6b633abdbd6038

    constructor(props) {
        super(props);
        this.state = {
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
            carregou: false,
            carregou1: true,
            scheduleMatutinoR: [],
            arrayTurmasSalvas: '',
            close: false,
            teste: '',
            openModalGrade: false
        }
    }

    async componentDidMount() {
        this.setClass(0, 0, 1);
    }

    closeModal(){
        console.log("teste");
        
        this.setState({ openModalGrade: false })
    }

    teste(){
        return(
            <ModalGrade show={this.state.openModalGrade} close={this.closeModal}/>
        )
    }

    verificarPosicao(scheduleId, classIndex, pos) {
        if (pos == 1) {
            this.state.schedulesMatutino.map(schedule => {
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        this.setState({ openModalGrade: true, teste: this.teste() })
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 2) {
            this.state.schedulesMatutino2.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 3) {
            this.state.schedulesMatutino3.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 4) {
            this.state.schedulesMatutino4.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 5) {
            this.state.schedulesMatutino5.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 6) {
            this.state.schedulesVespertino.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 7) {
            this.state.schedulesVespertino2.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 8) {
            this.state.schedulesVespertino3.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 9) {
            this.state.schedulesVespertino4.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 10) {
            this.state.schedulesVespertino5.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 11) {
            this.state.schedulesNoturno.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 12) {
            this.state.schedulesNoturno2.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 13) {
            this.state.schedulesNoturno3.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }
        if (pos == 14) {
            this.state.schedulesNoturno4.map(schedule => {
                console.log(schedule);
                if (schedule.id === scheduleId) {
                    if (schedule.classes[classIndex] != null) {
                        alert("Este horário já está preenchido")
                        return (schedule);
                    } else {
                        return (schedule)
                    }
                }
            })
        }

    }

    async setClass(scheduleId, classIndex, pos) {
        const response = await api.post('/disciplina/carregarTurmasSalvas', {
            id_semestre: 1,
            fase: 1,
            id_course: 12
        })

        this.setState({ arrayTurmasSalvas: response.data })

        var arrayTurmasSalvas = this.state.arrayTurmasSalvas;

        var qtde = 0;

        if (pos == 1) {

            for (let i = 0; i < arrayTurmasSalvas.length; i++) {
                if (arrayTurmasSalvas[i].id_horario_inicio == 1 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino: this.state.schedulesMatutino.map(schedule => {

                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico

                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 2 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino2: this.state.schedulesMatutino2.map(schedule => {
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 3 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino3: this.state.schedulesMatutino3.map(schedule => {
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 4 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino4: this.state.schedulesMatutino4.map(schedule => {
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 5 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino5: this.state.schedulesMatutino5.map(schedule => {
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
            }
            console.log("MATUTINO 1: ", this.state.schedulesMatutino);

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.teste}
                <Table borderless
                    style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent' }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#FAFAFA' }}>
                            <th></th>
                            <th colspan='6' class='text-center' style={{ color: '#707070' }}>MATUTINO</th>
                        </tr>
                        <tr>
                            <th className={classes.thHorario}>Horários</th>
                            <th className={classes.th}>Segunda</th>
                            <th className={classes.th}>Terça</th>
                            <th className={classes.th}>Quarta</th>
                            <th className={classes.th}>Quinta</th>
                            <th className={classes.th}>Sexta</th>
                            <th className={classes.th}>Sábado</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* {this.state.carregou ? */}
                        {this.state.schedulesMatutino.map(schedule => (
                            <tr><td className={classes.tdHora}><b>7:30 - 8:20</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 1)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?
                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))}
                        {/* : null} */}

                        {this.state.schedulesMatutino2.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 2)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>

                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesMatutino3.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 3)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesMatutino4.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 4)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesMatutino5.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 5)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
                <Table borderless
                    style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent' }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#FAFAFA' }}>
                            <th></th>
                            <th colspan='6' class='text-center' style={{ color: '#707070' }}>VESPERTINO</th>
                        </tr>
                        <tr>
                            <th className={classes.thHorario}>Horários</th>
                            <th className={classes.th}>Segunda</th>
                            <th className={classes.th}>Terça</th>
                            <th className={classes.th}>Quarta</th>
                            <th className={classes.th}>Quinta</th>
                            <th className={classes.th}>Sexta</th>
                            <th className={classes.th}>Sábado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.schedulesVespertino.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 6)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesVespertino2.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 7)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesVespertino3.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 8)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesVespertino4.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => { schedule.carregou[index] ? console.log("deletar posição: ", index) : this.verificarPosicao(schedule.id, index, 9) }}>{!_class ? '' : _class}

                                        {schedule.carregou[index] ?
                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesVespertino5.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 10)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
                <Table borderless
                    style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent' }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#FAFAFA' }}>
                            <th></th>
                            <th colspan='6' class='text-center' style={{ color: '#707070' }}>NOTURNO</th>
                        </tr>
                        <tr>
                            <th className={classes.thHorario}>Horários</th>
                            <th className={classes.th}>Segunda</th>
                            <th className={classes.th}>Terça</th>
                            <th className={classes.th}>Quarta</th>
                            <th className={classes.th}>Quinta</th>
                            <th className={classes.th}>Sexta</th>
                            <th className={classes.th}>Sábado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.schedulesNoturno.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 11)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesNoturno2.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 12)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesNoturno3.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 13)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                        {this.state.schedulesNoturno4.map(schedule => (
                            <tr><td className={classes.tdHora}><b>{schedule.label}</b></td>
                                {schedule.classes.map((_class, index) => (
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 14)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.tipo_aula[index] == 1 ? true : false} />}

                                        {schedule.carregou[index] ?

                                            null
                                            : null
                                        }

                                    </td>
                                ))}
                            </tr>
                        ))
                        }

                    </tbody>
                </Table>
            </div>
        )
    }
}


GradeConsulta.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GradeConsulta);
