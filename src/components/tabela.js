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
      numberRowPerPage: 5
    }
  }

  async componentDidMount() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    await this.setState({ usuario: usuario })
    await this.setState({ id_curso: usuario.curso })

    console.log("usuario: ", this.state.usuario)

    const response = await api.post("/disciplina/buscarSemestre", {
      id_course: this.state.usuario.curso
    })

    this.setState({ semestres: response.data[0].semestres })
    var rows = [];
    for (var i = 1; i <= this.state.semestres; i++) {
      this.setState({ array: [...this.state.array, { value: i, label: i }] })
      this.setState({ carregou: true })
    }

  }


  handleChange = async selectedOption => {
    await this.setState({ selectedOption });

    const response = await api.post("/disciplina/obter", {
      codigo_curso: this.state.id_curso, fase: this.state.selectedOption.value
    })

    await this.setState({ disciplinas: response.data });

    console.log("disciplinas: ", response.data);


  };

  render() {
    const { selectedOption } = this.state;
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);
    return (
      <div>
        <Select id="cadastro_turmas_input_1"
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.array}
        />
        <MaterialTable
          icons={tableIcons}
          rowsPerPage={10}
          columns={[
            { title: "ID", field: "id_disciplina" },
            { title: "Código", field: "codigo" },
            { title: "Nome", field: "nome" },
            { title: "Hrs/Teórica", field: "hr_aula_semanais_teorica" },
            { title: "Hrs/Prática", field: "hr_aula_semanais_pratica" },

          ]}
          data={this.state.disciplinas}
          title="Disciplinas Ofertadas"
        />
      </div>
    )
  }
}

Tabela.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tabela);