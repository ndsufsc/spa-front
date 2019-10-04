import React, { Component } from 'react';

// import { Container } from './styles';
import { Modal } from 'react-bootstrap'

export default class Modais extends Component {
    state={

    }


    async componentWillReceiveProps(props) {
        console.log("props schedule: ", props.schedule);
        
    }
 
    render() {
        const self = this.props
        return (
            <div>
                <Modal
                    show={self.show}
                    onHide={() => self.close()}
                    size="lg"
                    style={{ marginTop: '5%' }}
                >
                    <Modal.Header closeButton>Carregando...</Modal.Header>
                    <Modal.Body
                        style={{
                            // background: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ marginTop: 50, marginBottom: 50 }}>
                            <p>
                                Oi
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
