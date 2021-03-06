import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import { Close } from '@material-ui/icons';

import './cardProfessor.css';


const styles = theme => ({
    cardTeoricoNull: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#9e9e9e',
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
    cardPraticoNull: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#616161',
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
    divprof: {
        display: 'flex',
        width: 140,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: -5,
        marginBottom: -5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    divprof2: {
        display: 'flex',
        width: 140,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: -5,
        marginBottom: -5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

class CardProfessor extends React.Component {
    constructor() {
        super()
        this.state = {mostraClose: false}
    }

    handleMouseHover = () => {
        var atual = this.state.mostraClose
        this.setState({mostraClose: !atual})
    }
    
    render() {
        const { classes } = this.props;
        const self = this.props;
        console.log("props do que vem no card: ", this.props.teorica);
        
        return (
            <div id="iconp" 
                 className={this.props.teorica == true ? 
                    this.props.nomeProfessor == null ? classes.cardTeoricoNull : classes.cardTeorico
                : 
                    this.props.nomeProfessor == null ? classes.cardPraticoNull : classes.cardPratico}>
                <div />
                <div>
                    <p className={classes.disciplina}>{this.props.nomeDisciplina}</p>
                    <p className={classes.turma}>{this.props.nomeTurma}</p>
                    <p className={classes.turma}>{this.props.teorica === true ? 'TEÓRICA' : 'PRÁTICA'}</p>
                    {
                        this.props.nomeProfessor == null ?
                            null :
                            <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} id="divprof" className={this.state.mostraClose ? classes.divprof : classes.divprof2}>
                                <p className={classes.turma}>{this.props.nomeProfessor}</p>
                                {this.state.mostraClose ? <Close style={{ fontSize: 20, color: '#fff' }} /> : <div style={{width: 0}}/> }
                            </div>
                    }
                </div>
                <div style={{width: 0}}/>
            </div>
        )
    }
}

CardProfessor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardProfessor);