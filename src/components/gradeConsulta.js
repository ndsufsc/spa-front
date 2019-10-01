import React, { Component } from 'react';

//react bootstrap
import { Table } from 'react-bootstrap'

//Componentes
import Card from '../components/card';

//api
import api from '../service/api';

const drawerWidth = "25%";

const classes = theme => ({
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

export default class GradeConsulta extends Component {

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
        }
    }

    async componentDidMount() {
        const response = await api.post('/disciplina/verificarPreCadastro');

        console.log("response do verificar pre cadastro: ", response.data);


        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].id_horario_inicio == 1) {
                if (response.data[i].qtde_aulas == 4) {
                    let arrayAux = [];
                    arrayAux.push(response.data[i])
                    await this.setState({ schedulesMatutinoR: arrayAux, carregou: true })
                    if (response.data[i].dia_semana == 2)
                        this.setClass(1, 4, 1);
                    if (response.data[i].dia_semana == 3)
                        this.setClass(2, 4, 2);
                }
            }
            if (response.data[i].id_horario_inicio == 2) {
                if (response.data[i].qtde_aulas == 4) {
                    let arrayAux = [];
                    arrayAux.push(response.data[i])
                    await this.setState({ schedulesMatutinoR: arrayAux, carregou: true })
                    this.setClass(1, 4, 1)
                }
            }
            if (response.data[i].id_horario_inicio == 3) {
                if (response.data[i].qtde_aulas == 4) {
                    let arrayAux = [];
                    arrayAux.push(response.data[i])
                    await this.setState({ schedulesMatutinoR: arrayAux, carregou: true })
                    this.setClass(1, 4, 1)
                }
            }
            if (response.data[i].id_horario_inicio == 4) {
                if (response.data[i].qtde_aulas == 4) {
                    let arrayAux = [];
                    arrayAux.push(response.data[i])
                    await this.setState({ schedulesMatutinoR: arrayAux, carregou: true })
                    this.setClass(1, 4, 1)
                }
            }
            if (response.data[i].id_horario_inicio == 5) {
                if (response.data[i].qtde_aulas == 4) {
                    let arrayAux = [];
                    arrayAux.push(response.data[i])
                    await this.setState({ schedulesMatutinoR: arrayAux, carregou: true })
                    this.setClass(1, 4, 1)
                }
            }
        }

    }


    async setClass(scheduleId, classIndex, pos) {
        const response = await api.post('/disciplina/verificarPreCadastro');

        console.log("scheduleId: ", scheduleId);
        console.log("classIndex: ", classIndex);
        console.log("pos: ", pos);

        var qtde = 0;

        if (pos == 1) {

            for (let i = 0; i < response.data.length - 1; i++) {
                if (response.data[i].id_horario_inicio == 1) {
                    if (response.data[i].qtde_aulas == 1 && response.data[i + 1].qtde_aulas == 1 && response.data[i].id_curriculo_disciplina == response.data[i + 1].id_curriculo_disciplina)
                        qtde++;
                }
            }

            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].id_horario_inicio == 1) {
                    this.setState({
                        schedulesMatutino: this.state.schedulesMatutino.map(schedule => {
                            schedule.classes[i] = response.data[i].id_curriculo_disciplina
                            return (schedule)
                        })
                    })
                }
                if (response.data[i].id_horario_inicio == 2) {
                    this.setState({
                        schedulesMatutino2: this.state.schedulesMatutino2.map(schedule => {
                            schedule.classes[response.data[i].dia_semana-2] = response.data[i].id_curriculo_disciplina
                            return (schedule)
                        })
                    })
                }
                if (response.data[i].id_horario_inicio == 3) {
                    this.setState({
                        schedulesMatutino3: this.state.schedulesMatutino3.map(schedule => {
                            schedule.classes[response.data[i].dia_semana-2] = response.data[i].id_curriculo_disciplina
                            return (schedule)
                        })
                    })
                }
                if (response.data[i].id_horario_inicio == 4) {
                    this.setState({
                        schedulesMatutino4: this.state.schedulesMatutino4.map(schedule => {
                            schedule.classes[response.data[i].dia_semana-2] = response.data[i].id_curriculo_disciplina
                            return (schedule)
                        })
                    })
                }
                if (response.data[i].id_horario_inicio == 5) {
                    this.setState({
                        schedulesMatutino5: this.state.schedulesMatutino5.map(schedule => {
                            schedule.classes[response.data[i].dia_semana-2] = response.data[i].id_curriculo_disciplina
                            return (schedule)
                        })
                    })
                }

                //     for (let i = 0; i < response.data.length - 1; i++) {
                //         if (response.data[i].qtde_aulas == 4) {
                //             for (let j = 0; j < 4; j++) {
                //                 if (j == 0) {
                //                     this.setState({
                //                         schedulesMatutino: this.state.schedulesMatutino.map(schedule => {
                //                             for (let j = 0; j < classIndex; j++) {
                //                                 if (response.data[i].dia_semana == 2)
                //                                     schedule.classes[0] = response.data[i].id_curriculo_disciplina

                //                             }
                //                             return (schedule)
                //                         })
                //                     })
                //                 }
                //                 if (j == 1) {
                //                     this.setState({
                //                         schedulesMatutino2: this.state.schedulesMatutino.map(schedule => {
                //                             if (schedule.id === scheduleId) {
                //                                 if (response.data[i].dia_semana == 2)
                //                                     schedule.classes[0] = response.data[i].id_curriculo_disciplina

                //                             }
                //                             return (schedule)
                //                         })
                //                     })
                //                 }
                //                 if (j == 2) {
                //                     this.setState({
                //                         schedulesMatutino3: this.state.schedulesMatutino.map(schedule => {
                //                             for (let j = 0; j < classIndex; j++) {
                //                                 if (response.data[i].dia_semana == 2)
                //                                     schedule.classes[0] = response.data[i].id_curriculo_disciplina

                //                             }
                //                             return (schedule)
                //                         })
                //                     })
                //                 }
                //                 if (j == 3) {
                //                     this.setState({
                //                         schedulesMatutino4: this.state.schedulesMatutino.map(schedule => {
                //                             for (let j = 0; j < classIndex; j++) {
                //                                 if (response.data[i].dia_semana == 2)
                //                                     schedule.classes[0] = response.data[i].id_curriculo_disciplina

                //                             }
                //                             return (schedule)
                //                         })
                //                     })
                //                 }

                //             }
                //         }
                //     }
                // }
                // if (pos == 2) {
                //     console.log("entrou na 2");
                //     for (let i = 0; i < response.data.length; i++) {
                //         if (response.data[i].id_horario_inicio == 1) {
                //             if (response.data[i].qtde_aulas == 4) {
                //                 for (let j = 0; j < 4; j++) {
                //                     if (j == 0) {
                //                         this.setState({
                //                             schedulesMatutino: this.state.schedulesMatutino.map(schedule => {
                //                                 if (response.data[i].dia_semana == 3) {
                //                                     console.log("entrando aqui");

                //                                     schedule.classes[1] = response.data[i].id_curriculo_disciplina
                //                                 }

                //                                 return (schedule)
                //                             })
                //                         })
                //                     }
                //                     if (j == 1) {
                //                         this.setState({
                //                             schedulesMatutino2: this.state.schedulesMatutino.map(schedule => {
                //                                 if (response.data[i].dia_semana == 3)
                //                                     schedule.classes[1] = response.data[i].id_curriculo_disciplina

                //                                 return (schedule)
                //                             })
                //                         })
                //                     }
                //                     if (j == 2) {
                //                         this.setState({
                //                             schedulesMatutino3: this.state.schedulesMatutino.map(schedule => {
                //                                 if (response.data[i].dia_semana == 3)
                //                                     schedule.classes[1] = response.data[i].id_curriculo_disciplina

                //                                 return (schedule)
                //                             })
                //                         })
                //                     }
                //                     if (j == 3) {
                //                         this.setState({
                //                             schedulesMatutino4: this.state.schedulesMatutino.map(schedule => {
                //                                 if (response.data[i].dia_semana == 3)
                //                                     schedule.classes[1] = response.data[i].id_curriculo_disciplina

                //                                 return (schedule)
                //                             })
                //                         })
                //                     }

                //                 }
                //             }
                //         }
                //     }
            }
        }
    }

    render() {
        return (
            <div>
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
                                    <td className={classes.tdDrop}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 2)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 3)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 4)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 5)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 6)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 7)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 8)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => { schedule.carregou[index] ? console.log("deletar posição: ", index) : this.setClass(schedule.id, index, 9) }}>{!_class ? '' : _class}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 10)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 11)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 12)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 13)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
                                    <td className={classes.tdDrop} onClick={() => this.setClass(schedule.id, index, 14)}>

                                        {!_class ? '' : <Card nomeDisciplina={_class} nomeTurma={schedule.turmaCodigo[index]} teorica={schedule.boolean_tp[index]} />}

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
