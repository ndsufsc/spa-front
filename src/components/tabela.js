import React from 'react';
import { forwardRef } from 'react';

//ESTILO
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import api from '../service/api';

//MATERIAL UI COMPONENTES
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
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
  select: {
    width: '100%',
  },
  divtabela: {
    width: '65%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  divSelect: {
    width: '25%',
    marginLeft: '5%',
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 50,
  }
})

class Tabela extends React.Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      usuario: '',
      semestres: '',
      selectedOption: null,
      // array select
      array: '',
      arrayLaboratorios: '',

      id_curso: '',
      disciplinas: [],
      numberRowPerPage: 5,
      showModal: false,
      showAlerta: false,
      habilitarBtn: true,
      horasTotais: '',
      ultimoClique: '',
      primeiroClique: true,
      primeiroClique2: true,
      h1: false,
      horasTeoricas: '',
      horasPraticas: '',
      idAtualizar: '',
      modalLaboratorio: false
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

  handleChange = async (e, n) => {
    if(n == 1)
      await this.setState({ selectedOption: e.value });
    else{
      await this.setState({ selectedOption2: e });
      //seto o id para o laboratório que vou colocar na tabela de cu
      console.log("laboratórios: ", this.state.selectedOption2);
      
    }
    const response = await api.post("/disciplina/obter", {
      id_course: this.state.id_curso, fase: this.state.selectedOption
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

  async buscarLaboratorios() {
    const response = await api.get('/salas/buscarTodosLaboratorios');
    console.log("response: ", response.data);

    for (let i = 0; i < response.data.length; i++) {
      this.setState({ arrayLaboratorios: [...this.state.arrayLaboratorios, { value: response.data[i].id_salas, label: response.data[i].nome }] })
    }
  }

  async cadastrar() {

    if (this.state.horasPraticas > 0 && this.state.horasTeoricas > 0) {
      await api.post("/disciplina/atualizarHorasTeP", {
        horasPraticas: this.state.horasPraticas,
        horasTeoricas: this.state.horasTeoricas,
        idAtualizar: this.state.idAtualizar,
        id_teorico_pratico: 3
      })
    }
    const response = await api.post("/disciplina/obter", {
      id_course: this.state.id_curso, fase: this.state.selectedOption.value
    })



    await this.setState({ disciplinas: response.data, showModal: false });

    if (this.state.horasPraticas > 0) {
      this.buscarLaboratorios();
      this.setState({ modalLaboratorio: true })
    }
  }

  async cadastrarLaboratorio(){
    console.log("id atualizar: ", this.state.idAtualizar);
    console.log("laboratorio slecionado: ", this.state.selectedOption2.label);

    const idLaboratorio = await api.post("/disciplina/buscarLab", {
      descricao: this.state.selectedOption2.label
    })

    console.log("idLaborotorio do id do lab: ", idLaboratorio.data[0].id_tipo_sala);
    
    await api.post("/disciplina/attTipoSala", {
      id_curriculo_disciplina: this.state.idAtualizar,
      idLaboratorio: idLaboratorio.data[0].id_tipo_sala
    })
    
  }

  render() {
    const { selectedOption } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false, ultimoClique: '', primeiroClique: true, primeiroClique2: true, horasTeoricas: '', horasPraticas: '' })}
          size="m"
        >
          <Modal.Header closeButton>Cadastrar Horas</Modal.Header>
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

        <Modal
          show={this.state.modalLaboratorio}
          onHide={() => this.setState({ modalLaboratorio: false })}
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
                <Select id="cadastro_turmas_input_1"
                  onChange={(e) => this.handleChange(e, 2)}
                  options={this.state.arrayLaboratorios}
                  className={classes.select}
                  placeholder="Selecione o Semestre"
                />
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.state.habilitarBtn} variant="success" onClick={() => this.cadastrarLaboratorio()}>
              Cadastrar Laboratório
            </Button>
          </Modal.Footer>
        </Modal>

        <div className={classes.main}>
          <div className={classes.divSelect} style={{ zIndex: 200 }}>
            <Select id="cadastro_turmas_input_1"
              value={selectedOption}
              onChange={(e) => this.handleChange(e,1)}
              options={this.state.array}
              className={classes.select}
              placeholder="Selecione o Semestre"
            />
          </div>

          <div className={classes.divtabela} style={{ zIndex: 1 }}>
            <MaterialTable
              className={classes.tabela}
              icons={tableIcons}
              columns={[
                { title: "ID", field: "id_disciplina" },
                { title: "Código", field: "codigo" },
                { title: "Nome", field: "nome" },
                { title: "Hrs/Práticas", field: "horas_praticas" },
                { title: "Hrs/Teóricas", field: "horas_teoricas" },
                { title: "Créditos", field: "horas_totais" },
                // { title: "Laboratório", field: "botoes", actions: botoes },

              ]}
              actions={[
                {
                  header: 'Laboratório',
                  icon: Edit,
                  tooltip: 'Editar Laboratório',
                  onClick: (event, rowData) => {
                    this.inserirHoras(rowData)
                  }
                }
              ]}
              localization={{
                header: {
                  actions: 'Laboratório'
                },
              }}
              data={this.state.disciplinas}
              title=""
            />
          </div>
        </div>
      </div >
    )
  }
}

Tabela.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tabela);