import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"


const styles = theme => ({
    cardTeorico: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#d32f2f',
        width: 200,
        minHeight: 90,
        borderRadius: 5,
        boxShadow: "1px 1px 3px #9E9E9E",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cardPratico: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#7b1fa2',
        width: 200,
        minHeight: 90,
        borderRadius: 5,
        boxShadow: "1px 1px 3px #9E9E9E",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
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
            <div style={{ cursor: 'pointer' }} className={this.props.teorica === 1 ? classes.cardTeorico : classes.cardPratico}>
                <p className={classes.disciplina}>{this.props.nomeDisciplina}</p>
                <p className={classes.turma}>{this.props.nomeTurma}</p>
                <p className={classes.turma}>{this.props.teorica === 1 ? 'TEÓRICA' : 'PRÁTICA'}</p>
            </div>
        )
    }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);