import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import { Close } from '@material-ui/icons';


const styles = theme => ({
    cardTeorico: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#2196f3',
        width: 140,
        minHeight: 55,
        borderRadius: 5,
        boxShadow: "1px 1px 3px #9E9E9E",
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        alignSelf: 'center',
        cursor: 'pointer',
        padding: 5,
    },
    cardPratico: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#0d47a1',
        width: 140,
        minHeight: 55,
        borderRadius: 5,
        boxShadow: "1px 1px 3px #9E9E9E",
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        alignSelf: 'center',
        cursor: 'pointer',
        padding: 5,
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
})

class Card extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={this.props.teorica == true ? classes.cardTeorico : classes.cardPratico}>
                <div />
                <div>
                    <p className={classes.disciplina}>{this.props.nomeDisciplina}</p>
                    <p className={classes.turma}>{this.props.nomeTurma}</p>
                    <p className={classes.turma}>{this.props.teorica === true ? 'TEÓRICA' : 'PRÁTICA'}</p>
                </div>
                <Close onClick={() => console.log("clicou")
                } style={{ fontSize: 20, color: '#fff' }} />
            </div>
        )
    }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);