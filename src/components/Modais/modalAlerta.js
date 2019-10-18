import React, { Component } from 'react';

// import { Container } from './styles';
import { Modal, Form, Button } from 'react-bootstrap'
import Remove from '@material-ui/icons/Remove';
import api from '../../service/api';

export default class ModalAleta extends Component {

    state = {
        abrirModal: false
    }

    async deletarHorario(self) {
        await api.post('/disciplina/deleteArrayIdTurmaSala', { arrayDelete: self.schedule.id_turma_sala })
    }

    render() {
        const self = this.props;
        return (
            <div
            >
                <Modal
                    show={self.modalOpen}
                    onHide={() => self.close()}
                    style={{ marginTop: '5%', width: '100%' }}
                >
                    <Modal.Header closeButton style={{ fontSize: 16, fontWeight: 'bold' }}>Alerta!</Modal.Header>
                    <Modal.Body
                        style={{
                            // background: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ marginTop: 10, marginBottom: 50 }}>
                            <p>
                                Ainda faltam créditos para serem alocados!
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
