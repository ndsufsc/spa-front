import React from 'react';
import { forwardRef } from 'react';

//ESTILO
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

//MATERIAL UI COMPONENTES
import MaterialTable from "material-table";
import { AddBox,
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
         ViewColumn} from "@material-ui/icons";

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
  render(){
    return (
      <MaterialTable
            icons={tableIcons}
            columns={[
              { title: "Adı", field: "name" },
              { title: "Soyadı", field: "surname" },
              { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
              {
                title: "Doğum Yeri",
                field: "birthCity",
                lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
              }
            ]}
            data={[
              { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
            ]}
            title="Demo Title"
      />
    )
  }
}

Tabela.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tabela);