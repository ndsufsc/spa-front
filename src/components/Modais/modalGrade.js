import React, { Component } from 'react';

// import { Container } from './styles';
import { Modal, Form, Button } from 'react-bootstrap'
import Remove from '@material-ui/icons/Remove';
import api from '../../service/api';

export default class Modais extends Component {
    state = {

    }

    async deletarHorario(self){
        await api.post('/disciplina/deleteArrayIdTurmaSala', {arrayDelete: self.schedule.id_turma_sala})
    }
   
    render() {
        const self = this.props;
        return (
            <div
            >
                {self.schedule != null ?
                    <Modal
                        show={self.show}
                        onHide={() => self.close()}
                        style={{ marginTop: '5%', width: '100%' }}
                    >
                        <Modal.Header closeButton style={{fontSize: 16, fontWeight: 'bold'}}>{self.schedule.nome_disciplina[self.pos]}</Modal.Header>
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
                                            <Form.Control type="text" defaultValue={self.schedule.dia_semana[self.pos]+"ª"}/>
                                            <Form.Label style={{marginTop: 10}}>Horário</Form.Label>
                                            <Form.Control type="text" defaultValue={self.schedule.label}/>
                                            <Form.Label style={{marginTop: 10}}>Turma</Form.Label>
                                            <Form.Control type="text" defaultValue={self.schedule.turma[self.pos]}/>
                                        </Form.Group>
                                    </Form>
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => this.deletarHorario(this.props)}>Deletar</Button>
                        </Modal.Footer>
                    </Modal>
                    : null}

            </div>
        )
    }
}
