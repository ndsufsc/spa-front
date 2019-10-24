import React, { Component } from 'react';

// import { Container } from './styles';
import { Modal, Form, Button } from 'react-bootstrap'
import Remove from '@material-ui/icons/Remove';
import api from '../../service/api';

export default class Modais extends Component {
    state = {
        nomeProfessor: '',
    }


    async componentDidUpdate(prevProps) {
        if (this.props.professor !== prevProps.professor) {
            console.log("entrou: ", this.props.professor);

            this.setState({ nomeProfessor: this.props.professor.slice(-1).pop().nome })
            console.log("nome professor: ", this.state.nomeProfessor);

        }
    }

    deletarHorario = async (self) => {
        const response = await api.post('/disciplina/buscarDisciplinaTurmaSala', {
            id_curriculo_disciplina: self.schedule.id_curriculo_disciplina[self.pos]
        })

        console.log("response do buscar disciplina: ", response.data);

        var arrayDelete = [];

        response.data.map(item => { arrayDelete.push(item.id_turma_sala) });

        await api.post('/disciplina/deleteProfessorTurmaSala', { id_turma_sala: self.schedule.id_turma_sala[self.pos] });
        await api.post('/disciplina/deleteArrayIdTurmaSala', { arrayDelete: arrayDelete });
        self.atualizar();
    }

    async inserirProfessor(professor) {
        const self = this.props;

        console.log("professor inserção: ", professor.slice(-1).pop().nome);
        console.log("id professor inserção: ", professor.slice(-1).pop().id_professor);

        console.log("schedule: ", this.props.schedule.id_turma_sala[self.pos]);
        await api.post('/disciplina/inserirProfessorTurmaSala', {
            id_professor: professor.slice(-1).pop().id_professor,
            id_turma_sala: this.props.schedule.id_turma_sala[self.pos]
        })

        window.location.reload();
    }

    render() {
        const self = this.props;
        const state = this.state;
        return (
            <div
            >
                {self.schedule != null ?
                    <Modal
                        show={self.show}
                        onHide={() => self.close()}
                        style={{ marginTop: '10%', width: '100%' }}
                    >
                        <Modal.Header closeButton style={{ fontSize: 16, fontWeight: 'bold' }}>{self.schedule.nome_disciplina[self.pos]}</Modal.Header>
                        <Modal.Body
                            style={{
                                // background: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ marginTop: 10, marginBottom: 50 }}>
                                <p>
                                    <Form>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Dia da semana</Form.Label>
                                            <Form.Control type="text" defaultValue={self.schedule.dia_semana[self.pos] + "ª"} />
                                            <Form.Label style={{ marginTop: 10 }}>Horário</Form.Label>
                                            <Form.Control type="text" defaultValue={self.schedule.label} />
                                            <Form.Label style={{ marginTop: 10 }}>Turma</Form.Label>
                                            <Form.Control type="text" defaultValue={self.schedule.turmaCodigo[self.pos]} />
                                        </Form.Group>
                                    </Form>
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => (this.deletarHorario(this.props), self.close())}>Deletar</Button>
                            {self.professor != null ?
                                <Button variant="success" onClick={() => this.inserirProfessor(self.professor)}>Inserir</Button>
                                :
                                null}
                        </Modal.Footer>
                    </Modal>
                    : null}

            </div>
        )
    }
}
