import React from 'react';
import { forwardRef } from 'react';

//ESTILO
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import api from '../service/api';

//MATERIAL UI COMPONENTES
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Icon from '@material-ui/core/Icon';

//IMPORT BOOTSTRAP
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Modal,
  Navbar,
  Nav,
  Form,
  Button,
  InputGroup
} from 'react-bootstrap';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class Tabela extends React.Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      usuario: '',
      semestres: '',
      selectedOption: null,
      array: '',
      id_curso: '',
      disciplinas: [],
      numberRowPerPage: 5,
      showModal: false,
      showAlerta: false,
      arrayLaboratorios: [],
      habilitarBtn: true,
      horasTotais: '',
      ultimoClique: '',
      primeiroClique: true,
      primeiroClique2: true,
      h1: false,
      horasTeoricas: '',
      horasPraticas: '',
      idAtualizar: ''
    }
  }

  async carregarLaboratorios() {
    const response = await api.post('/disciplina/buscarLaboratorios');

    console.log("o que vem de laboratórios: ", response.data);

    await response.data.map((item) => {
      this.setState({ arrayLaboratorios: [...this.state.arrayLaboratorios, { value: item.nome, label: item.nome }] })
    })

  }

  async componentDidMount() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    await this.setState({ usuario: usuario })


    const response = await api.post("/disciplina/buscarCurso", {
      id_usuario: this.state.usuario.id_usuario
    })

    this.setState({ id_curso: response.data[0].id_curso })

    const response2 = await api.post("/disciplina/buscarSemestre", {
      id_course: response.data[0].id_curso
    })

    this.setState({ semestres: response2.data[0].semestres })
    var rows = [];
    for (var i = 1; i <= this.state.semestres; i++) {
      this.setState({ array: [...this.state.array, { value: i, label: i }] })
      this.setState({ carregou: true })
    }
  }

  handleChange = async selectedOption => {
    await this.setState({ selectedOption });

    const response = await api.post("/disciplina/obter", {
      id_course: this.state.id_curso, fase: this.state.selectedOption.value
    })

    await this.setState({ disciplinas: response.data, habilitarBtn: false });

  };

  inserirHoras(rowData) {
    console.log("row data: ", rowData);

    this.setState({
      horasTotais: parseInt(rowData.horas_totais),
      idAtualizar: rowData.id_spa_curriculo_disciplina,
      showModal: true,
    })

  }

  handleHoras = async (event) => {
    console.log("ultimo clique: ", this.state.ultimoClique);

    if (this.state.h2) {
      if (this.state.horasTotais == 0)
        return;
      let subtracao = this.state.horasTotais - 1
      await this.setState({ horasTotais: subtracao, ultimoClique: event.target.value })
      return;
    }

    if (this.state.primeiroClique) {
      let horas = event.target.value;
      this.setState({ ultimoClique: horas })
      let subtracao = this.state.horasTotais - 1
      await this.setState({ horasTotais: subtracao, primeiroClique: false, h1: true, horasPraticas: this.state.ultimoClique })
    } else {
      if (this.state.horasTotais == 0)
        return;
      if (parseInt(this.state.ultimoClique) < parseInt(event.target.value)) {
        let subtracao = this.state.horasTotais - 1
        await this.setState({ horasTotais: subtracao, ultimoClique: event.target.value, horasPraticas: event.target.value })
      }
      else {
        let soma = this.state.horasTotais + 1
        await this.setState({ horasTotais: soma, ultimoClique: event.target.value, horasPraticas: event.target.value })
      }
    }

  }

  handleHoras2 = async (e) => {
    if (this.state.h1) {
      if (this.state.horasTotais == 0)
        return;
      let subtracao = this.state.horasTotais - 1
      await this.setState({ horasTotais: subtracao, ultimoClique: e.target.value, horasTeoricas: e.target.value })
      return;
    }

    if (this.state.primeiroClique2) {
      let horas = e.target.value;
      this.setState({ ultimoClique: horas })
      let subtracao = this.state.horasTotais - 1
      await this.setState({ horasTotais: subtracao, primeiroClique2: false, h2: true, horasPraticas: this.state.ultimoClique })
    } else {
      if (this.state.horasTotais == 0)
        return;
      if (parseInt(this.state.ultimoClique) < parseInt(e.target.value)) {
        let subtracao = this.state.horasTotais - 1
        await this.setState({ horasTotais: subtracao, ultimoClique: e.target.value, horasTeoricas: e.target.value })
      }
      else {
        let soma = this.state.horasTotais + 1
        await this.setState({ horasTotais: soma, ultimoClique: e.target.value, horasTeoricas: e.target.value })
      }
    }

  }

  async cadastrar(){
    await api.post("/disciplina/atualizarHorasTeP", {
      horasPraticas: this.state.horasPraticas,
      horasTeoricas: this.state.horasTeoricas,
      idAtualizar: this.state.idAtualizar,
    })

    const response = await api.post("/disciplina/obter", {
      id_course: this.state.id_curso, fase: this.state.selectedOption.value
    })

    await this.setState({ disciplinas: response.data, showModal: false });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <Select id="cadastro_turmas_input_1"
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.array}
          style={{ marginBottom: 20 }}
        />

        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false, ultimoClique: '', primeiroClique: true, primeiroClique2: true, horasTeoricas: '', horasPraticas: '' })}
          size="m"
        >
          <Modal.Header closeButton>Cadastrar Laboratório</Modal.Header>
          <Modal.Body
            style={{
              background: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ marginTop: 5, marginBottom: 50, }}>
              <Form>
                <Form.Group controlId="formBasicEmail" style={{ textAlign: 'center' }}>
                  <Form.Label>Horas Totais</Form.Label>
                  <FormControl style={{ width: '50%', marginLeft: '25%', textAlign: 'center', alignItems: 'center' }} value={this.state.horasTotais + 'hrs'} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" style={{ marginTop: 5, marginBottom: 50, flexDirection: 'row', display: 'flex' }}>
                  <FormControl onChange={this.handleHoras} type="number" max="4" placeholder="Horas Práticas" style={{ width: '30%', marginLeft: '10%', textAlign: 'center', alignItems: 'center' }} />
                  <FormControl onChange={this.handleHoras2} type="number" max="4" placeholder="Horas Téoricas" style={{ width: '30%', marginLeft: '20%', textAlign: 'center', alignItems: 'center' }} />
                </Form.Group>
                <Modal.Footer>
                  <Button disabled={this.state.habilitarBtn} variant="success" onClick={() => this.cadastrar()}>
                    Cadastrar
                  </Button>
                </Modal.Footer>
              </Form>
            </div>
          </Modal.Body>
        </Modal>

        <MaterialTable
          icons={tableIcons}
          rowsPerPage={10}
          actions={[
            {
              header: 'Laboratório',
              icon: 'edit',
              tooltip: 'Save User',
              onClick: (event, rowData) => {
                this.inserirHoras(rowData)
              }
            }
          ]}
          columns={[
            { title: "ID", field: "id_disciplina" },
            { title: "Código", field: "codigo" },
            { title: "Nome", field: "nome" },
            { title: "Hrs/Práticas", field: "horas_praticas" },
            { title: "Hrs/Teóricas", field: "horas_teoricas" },
            { title: "Créditos", field: "horas_totais" },
            // { title: "Laboratório", field: "botoes", actions: botoes },

          ]}
          localization={{
            header: {
              actions: 'Laboratório'
            },
          }}
          data={this.state.disciplinas}
          title="Disciplinas Ofertadas"
        />
      </div >
    )
  }
}

Tabela.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tabela);