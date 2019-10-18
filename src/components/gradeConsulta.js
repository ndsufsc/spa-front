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

class GradeConsulta extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schedulesMatutino: [{ id: 1, label: '7:30 - 8:20', linha: 1, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino2: [{ id: 2, label: '8:20 - 9:10', linha: 2, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino3: [{ id: 3, label: '9:10 - 10:00', linha: 3, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino4: [{ id: 4, label: '10:10 - 11:00', linha: 4, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino5: [{ id: 5, label: '11:00 - 11:50', linha: 5, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            //vespertino
            schedulesVespertino: [{ id: 1, label: '13:30 - 14:20', linha: 6, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino2: [{ id: 2, label: '14:20 - 15:10', linha: 7, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino3: [{ id: 3, label: '15:10 - 16:00', linha: 8, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino4: [{ id: 4, label: '16:20 - 17:10', linha: 9, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino5: [{ id: 5, label: '17:10 - 18:00', linha: 10, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            //noturno
            schedulesNoturno: [{ id: 1, label: '18:30 - 19:20', linha: 11, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesNoturno2: [{ id: 2, label: '19:20 - 20:10', linha: 12, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesNoturno3: [{ id: 3, label: '20:20 - 21:10', linha: 13, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesNoturno4: [{ id: 4, label: '21:10 - 22:00', linha: 14, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            carregou: false,
            carregou1: true,
            scheduleMatutinoR: [],
            arrayTurmasSalvas: '',
            close: false,
            teste: '',
            openModalGrade: false,
            selectedDisciplina: '',
            boolean_tp: true,
            horas_praticas: '',
            horas_teoricas: '',
            horas_totais: '',
            schedulesMatutinoM: [],
            schedulesMatutino2M: [],
            schedulesMatutino3M: [],
            schedulesMatutino4M: [],
            schedulesMatutino5M: [],
            schedulesVespertinoM: [],
            schedulesVespertino2M: [],
            schedulesVespertino3M: [],
            schedulesVespertino4M: [],
            schedulesVespertino5M: [],
            schedulesVespertino5M: [],
            schedulesNoturnoM: [],
            schedulesNoturno2M: [],
            schedulesNoturno3M: [],
            schedulesNoturno4M: [],
            //matutino
            schedulesMatutinoP: [{ id: 1, label: '7:30 - 8:20', linha: 1, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino2P: [{ id: 2, label: '8:20 - 9:10', linha: 2, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino3P: [{ id: 3, label: '9:10 - 10:00', linha: 3, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino4P: [{ id: 4, label: '10:10 - 11:00', linha: 4, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesMatutino5P: [{ id: 5, label: '11:00 - 11:50', linha: 5, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            //vespertino
            schedulesVespertinoP: [{ id: 1, label: '13:30 - 14:20', linha: 6, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino2P: [{ id: 2, label: '14:20 - 15:10', linha: 7, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino3P: [{ id: 3, label: '15:10 - 16:00', linha: 8, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino4P: [{ id: 4, label: '16:20 - 17:10', linha: 9, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesVespertino5P: [{ id: 5, label: '17:10 - 18:00', linha: 10, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            //noturno
            schedulesNoturnoP: [{ id: 1, label: '18:30 - 19:20', linha: 11, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesNoturno2P: [{ id: 2, label: '19:20 - 20:10', linha: 12, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesNoturno3P: [{ id: 3, label: '20:20 - 21:10', linha: 13, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
            schedulesNoturno4P: [{ id: 4, label: '21:10 - 22:00', linha: 14, classes: [null, null, null, null, null, null], id_turma_sala: [null, null, null, null, null, null], dia_semana: [null, null, null, null, null, null], nome_disciplina: [null, null, null, null, null, null], id_curriculo_disciplina: [null, null, null, null, null, null], turma: [null, null, null, null, null, null], semestre: '', carregou: [false, false, false, false, false, false], boolean_tp: [false, false, false, false, false, false], turmaCodigo: [0, 0, 0, 0, 0, 0], tipo_aula: [null, null, null, null, null, null] }],
        }
    }

    async componentDidMount() {
        this.setClass(0, 0, 1);
    }

    // async componentWillReceiveProps(prevProps) {
    //     if (this.props.horas_praticas !== prevProps.horas_praticas || this.props.horas_teoricas !== prevProps.horas_teoricas || this.props.disciplina !== prevProps.disciplina) {
    //         console.log("props disciplina: ", this.props.disciplina);
    //         if (this.props.horas_teoricas != 0 || this.props.horas_praticas != 0) {
    //             this.setState({ horas_praticas: this.props.horas_praticas, horas_teoricas: this.props.horas_teoricas, selectedDisciplina: this.props.disciplina })
    //         }
    //     }
    // }

    async componentDidUpdate(prevProps) {
        if (this.props.horas_praticas !== prevProps.horas_praticas || this.props.horas_teoricas !== prevProps.horas_teoricas || this.props.disciplina !== prevProps.disciplina
            || this.props.fase !== prevProps.fase
            ) {
            // if (this.props.horas_praticas != 0 || this.props.horas_praticas != 0) {
            this.setState({ horas_praticas: this.props.horas_praticas, horas_teoricas: this.props.horas_teoricas, selectedDisciplina: this.props.disciplina })
            this.componentDidMount();
            // }
        }
    }

    closeModal = async () => {
        await this.setState({ openModalGrade: false })
        await this.setState({ teste: this.teste() })

    }

    att = async () => {
        await this.setClass(0, 0, 1, true);
    }

    teste(schedule, pos) {
        return (
            <ModalGrade show={this.state.openModalGrade} schedule={schedule} pos={pos} professor={this.props.professor} close={this.closeModal} atualizar={this.att} />
        )
    }

    async setar(schedule, pos) {
        await this.setState({ openModalGrade: true })
        this.setState({ teste: this.teste(schedule, pos) })

    }

    verificaCreditos() {
        const self = this.state;

        if (this.state.selectedDisciplina.horas_totais <= 0) {
            alert("Horas totais de créditos preenchidas");
            this.setState({ boolean_tp: true })
            this.props.atualizarRadio(true);
            this.props.limparTurma();
            this.props.salvarGrade(this.state.schedulesMatutinoM, this.state.schedulesMatutino2M, this.state.schedulesMatutino3M, this.state.schedulesMatutino4M, this.state.schedulesMatutino5M, this.state.schedulesVespertinoM, this.state.schedulesVespertino2M, this.state.schedulesVespertino3M, this.state.schedulesVespertino4M, this.state.schedulesVespertino5M, this.state.schedulesNoturnoM, this.state.schedulesNoturno2M, this.state.schedulesNoturno3M, this.state.schedulesNoturno4M);
            return 1;
        }
    }

    async diminuirCreditos() {

        if (this.state.selectedDisciplina.horas_totais != 0) {

            await this.setState({ selectedDisciplina: { nome: this.props.disciplina.nome, horas_totais: parseInt(this.state.selectedDisciplina.horas_totais) - 1, id_curriculo_disciplina: this.props.disciplina.id_curriculo_disciplina } })
        }
        if (this.state.boolean_tp == false && this.state.horas_praticas >= 0 && this.state.horas_teoricas >= 0) {
            if (this.state.horas_praticas > 0) {
                await this.setState({ horas_praticas: parseInt(this.state.horas_praticas) - 1 })
            } else {
                await this.setState({ boolean_tp: true })

            }
        } else if (this.state.boolean_tp == true && this.state.horas_teoricas != 0) {
            if (this.state.horas_teoricas > 0) {
                await this.setState({ horas_teoricas: parseInt(this.state.horas_teoricas) - 1 })
            } else {
            }
            if (this.state.horas_teoricas == 0) {
                await this.setState({ boolean_tp: false })
                this.verificaCreditos();
            }
            if (this.state.horas_praticas == 0) {
                await this.setState({ boolean_tp: false })
                this.verificaCreditos();
            }
        }
        this.props.atualizarRestante(this.state.selectedDisciplina.horas_totais);
    }

    preencherGradeNova(classIndex, pos) {
        console.log("classIndex: ", classIndex);
        
        const self = this.props;
        if (pos == 1) {
            this.setState({
                schedulesMatutinoP: this.state.schedulesMatutinoP.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 2) {
            this.setState({
                schedulesMatutino2P: this.state.schedulesMatutino2P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 3) {
            this.setState({
                schedulesMatutino3P: this.state.schedulesMatutino3P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 4) {
            this.setState({
                schedulesMatutino4P: this.state.schedulesMatutino4P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 5) {
            this.setState({
                schedulesMatutino5P: this.state.schedulesMatutino5P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 6) {
            this.setState({
                schedulesVespertinoP: this.state.schedulesVespertinoP.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 7) {
            this.setState({
                schedulesVespertino2P: this.state.schedulesVespertino2P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 8) {
            this.setState({
                schedulesVespertino3P: this.state.schedulesVespertino3P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 9) {
            this.setState({
                schedulesVespertino4P: this.state.schedulesVespertino4P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 10) {
            this.setState({
                schedulesVespertino5P: this.state.schedulesVespertino5P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 11) {
            this.setState({
                schedulesNoturnoP: this.state.schedulesNoturnoP.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 12) {
            this.setState({
                schedulesNoturno2P: this.state.schedulesNoturno2P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 13) {
            this.setState({
                schedulesNoturno3P: this.state.schedulesNoturno3P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        if (pos == 14) {
            this.setState({
                schedulesNoturno4P: this.state.schedulesNoturno4P.map(schedule => {
                    schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                    schedule.turma[classIndex] = self.turmaSelecionada
                    schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                    schedule.semestre = self.semestre
                    schedule.carregou[classIndex] = true
                    schedule.turmaCodigo[classIndex] = self.turmaCodigo
                    schedule.boolean_tp[classIndex] = this.state.boolean_tp
                    if (this.state.boolean_tp == true) {
                        schedule.tipo_aula[classIndex] = 1
                    } else {
                        schedule.tipo_aula[classIndex] = 2
                    }
                    return (schedule)
                })
            })
        }
        
        this.setState({ schedulesMatutinoM: this.state.schedulesMatutinoP })
        this.setState({ schedulesMatutino2M: this.state.schedulesMatutino2P })
        this.setState({ schedulesMatutino3M: this.state.schedulesMatutino3P })
        this.setState({ schedulesMatutino4M: this.state.schedulesMatutino4P })
        this.setState({ schedulesMatutino5M: this.state.schedulesMatutino5P })
        this.setState({ schedulesVespertinoM: this.state.schedulesVespertinoP })
        this.setState({ schedulesVespertino2M: this.state.schedulesVespertino2P })
        this.setState({ schedulesVespertino3M: this.state.schedulesVespertino3P })
        this.setState({ schedulesVespertino4M: this.state.schedulesVespertino4P })
        this.setState({ schedulesVespertino5M: this.state.schedulesVespertino5P })
        this.setState({ schedulesNoturnoM: this.state.schedulesNoturnoP })
        this.setState({ schedulesNoturno2M: this.state.schedulesNoturno2P })
        this.setState({ schedulesNoturno3M: this.state.schedulesNoturno3P })
        this.setState({ schedulesNoturno4M: this.state.schedulesNoturno4P })

    }


    //criar outras variáveis de schedules, no momento que for setar, passar o classindex para outra função para poder preencher na posição classindex
    verificarPosicao(scheduleId, classIndex, pos) {

        const self = this.props;

        console.log("self semestre: ", self.semestre);
        

        if (pos == 1) {
            this.setState({
                scheduleMatutino: this.state.schedulesMatutino.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 2) {
            this.setState({
                schedulesMatutino2: this.state.schedulesMatutino2.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 3) {
            this.setState({
                schedulesMatutino3: this.state.schedulesMatutino3.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 4) {
            this.setState({
                schedulesMatutino4: this.state.schedulesMatutino4.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 5) {
            this.setState({
                schedulesMatutino5: this.state.schedulesMatutino5.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 6) {
            this.setState({
                schedulesVespertino: this.state.schedulesVespertino.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 7) {
            this.setState({
                schedulesVespertino2: this.state.schedulesVespertino2.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 8) {
            this.setState({
                schedulesVespertino3: this.state.schedulesVespertino3.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 9) {
            this.setState({
                schedulesVespertino4: this.state.schedulesVespertino4.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 10) {
            this.setState({
                schedulesVespertino5: this.state.schedulesVespertino5.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 11) {
            this.setState({
                schedulesNoturno: this.state.schedulesNoturno.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 12) {
            this.setState({
                schedulesNoturno2: this.state.schedulesNoturno2.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 13) {
            this.setState({
                schedulesNoturno3: this.state.schedulesNoturno3.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }
        if (pos == 14) {
            this.setState({
                schedulesNoturno4: this.state.schedulesNoturno4.map(schedule => {
                    if (schedule.id === scheduleId) {
                        if (schedule.classes[classIndex] != null) {
                            this.setar(schedule, classIndex)
                            return (schedule)
                        }
                        if (!this.props.selecionouTurma && this.props.disciplina.nome != undefined) {
                            alert("Selecione a turma primeiro!")
                            return (schedule);
                        }
                        if (this.verificaCreditos() == 1) {
                            return (schedule);
                        }
                        this.preencherGradeNova(classIndex, pos);
                        schedule.classes[classIndex] = self.disciplina.nome.substring(0, 7)
                        schedule.turma[classIndex] = self.turmaSelecionada
                        schedule.id_curriculo_disciplina[classIndex] = self.disciplina.id_curriculo_disciplina
                        schedule.semestre = self.semestre
                        schedule.carregou[classIndex] = true
                        schedule.turmaCodigo[classIndex] = self.turmaCodigo
                        this.diminuirCreditos();
                        schedule.boolean_tp[classIndex] = this.state.boolean_tp
                        if (this.state.boolean_tp == true) {
                            schedule.tipo_aula[classIndex] = 1
                        } else {
                            schedule.tipo_aula[classIndex] = 2
                        }
                        return (schedule)
                    }
                })
            })
        }

    }

    async setClass(scheduleId, classIndex, pos, reload) {
        const response = await api.post('/disciplina/carregarTurmasSalvas', {
            id_semestre: 1,
            fase: this.props.fase,
            id_course: 12
        })
        await this.setState({ arrayTurmasSalvas: response.data })

        console.log("array turmas salvas: ", this.state.arrayTurmasSalvas);

        if (reload)
            window.location.reload();

        var arrayTurmasSalvas = this.state.arrayTurmasSalvas;

        if (pos == 1) {

            for (let i = 0; i < arrayTurmasSalvas.length; i++) {
                if (arrayTurmasSalvas[i].id_horario_inicio == 1 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino: this.state.schedulesMatutino.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana

                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 2 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino2: this.state.schedulesMatutino2.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 3 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino3: this.state.schedulesMatutino3.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 4 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino4: this.state.schedulesMatutino4.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 5 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesMatutino5: this.state.schedulesMatutino5.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 6 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesVespertino: this.state.schedulesVespertino.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 7 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesVespertino2: this.state.schedulesVespertino2.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 8 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesVespertino3: this.state.schedulesVespertino3.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 9 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesVespertino4: this.state.schedulesVespertino4.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 10 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesVespertino5: this.state.schedulesVespertino5.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 11 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesNoturno: this.state.schedulesNoturno.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 12 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesNoturno2: this.state.schedulesNoturno2.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 13 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesNoturno3: this.state.schedulesNoturno3.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
                if (arrayTurmasSalvas[i].id_horario_inicio == 14 && arrayTurmasSalvas[i].qtde_aulas > 0) {
                    this.setState({
                        schedulesNoturno4: this.state.schedulesNoturno4.map(schedule => {
                            schedule.id_turma_sala[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_turma_sala
                            schedule.classes[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo
                            schedule.id_curriculo_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].id_curriculo_disciplina
                            schedule.nome_disciplina[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].nome
                            schedule.turma[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].codigo_turma
                            schedule.tipo_aula[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].teorico
                            schedule.dia_semana[arrayTurmasSalvas[i].dia_semana - 2] = arrayTurmasSalvas[i].dia_semana
                            return (schedule)
                        })
                    })
                    arrayTurmasSalvas[i].qtde_aulas--;
                    arrayTurmasSalvas[i].id_horario_inicio++;
                }
            }
        }
        console.log("schedules matutino: ", this.state.schedulesMatutino);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* modal teste */}
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
                <Table borderless style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent' }}>
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
                                    <td className={classes.tdDrop} onClick={() => this.verificarPosicao(schedule.id, index, 9)}>

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
