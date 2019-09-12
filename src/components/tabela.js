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
  Button
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
    }
  }

  async carregarLaboratorios(){
    const response = await api.post('/disciplina/buscarLaboratorios');

    console.log("o que vem de laboratórios: ", response.data);

    await response.data.map((item) => {
      this.setState({ arrayLaboratorios: [...this.state.arrayLaboratorios, { value: item.nome, label: item.nome }] })
    })

  }

  async componentDidMount() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    await this.setState({ usuario: usuario })
    await this.setState({ id_curso: usuario.id_curso })

    console.log("id curso: ", this.state.id_curso)

    const response = await api.post("/disciplina/buscarSemestre", {
      id_course: this.state.usuario.id_curso
    })

    this.setState({ semestres: response.data[0].semestres })
    var rows = [];
    for (var i = 1; i <= this.state.semestres; i++) {
      this.setState({ array: [...this.state.array, { value: i, label: i }] })
      this.setState({ carregou: true })
    }

    await this.carregarLaboratorios();

    console.log("habilitar btn: ", this.state.habilitarBtn);
    

  }


  handleChange = async selectedOption => {
    await this.setState({ selectedOption });

    const response = await api.post("/disciplina/obter", {
      codigo_curso: this.state.id_curso, fase: this.state.selectedOption.value
    })

    await this.setState({ disciplinas: response.data, habilitarBtn: false });


  };


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

        <Modal show={this.state.showAlerta} onHide={() => this.setState({ showAlerta: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Alerta</Modal.Title>
          </Modal.Header>
          <Modal.Body>Esta disciplina não possui horas de aula prática</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => this.setState({ showAlerta: false })}>
              Fechar
          </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
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
            <div style={{ marginTop: 5, marginBottom: 50 }}>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Selecione o laboratório</Form.Label>
                  <Select id="cadastro_turmas_input_1"
                    onChange={this.handleChange}
                    options={this.state.arrayLaboratorios}
                    placeholder="Laboratório"
                  />
                  {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
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
                if (rowData.hr_aula_semanais_pratica > 0) {
                  this.setState({ showModal: true })
                } else {
                  this.setState({ showAlerta: true })
                }

              }
            }
          ]}
          columns={[
            { title: "ID", field: "id_disciplina" },
            { title: "Código", field: "codigo" },
            { title: "Nome", field: "nome" },
            { title: "Hrs/Teórica", field: "hr_aula_semanais_teorica" },
            { title: "Hrs/Prática", field: "hr_aula_semanais_pratica" },
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