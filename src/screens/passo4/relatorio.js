import React from 'react';
import Select from 'react-select'

//ESTILO
// import './definicao.css';

//COMPONENTES MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';
import Button from '@material-ui/core/Button';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// gerar pdf
import jsPDF from 'jspdf';
import { renderToString } from 'react-dom/server';

//COMPONENTES
import Header from '../../components/header';
import api from '../../service/api';

const drawerWidth = "25%";

const styles = theme => ({
    root: {
        // display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: 'none',
    },
    formControl: {
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 10,
    },
    formcontrollabel: {
        fontFamily: 'Roboto',
    },
    button: {
        marginRight: 20,
        marginBottom: 10,
    },
    formGroup: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    controllerDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: 150,
        alignItems: 'center',
        marginBottom: 20,
    },
    filterDiv: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginRight: 80,
        marginBottom: 20,
    },
    radio: {
        marginBottom: -10,
        marginTop: 0,
    },
    margin: {
        flex: 1,
        width: '25%'
    },
    selectGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    select: {
        marginBottom: 15,
        width: '100%'
    },
    table: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    }
})

const Prints = props => (
    <div>

        <table
            style={{ fontSize: 10, textAlign: 'center', justifyContent: 'center' }}
        >
            <thead>
                <tr style={{ width: '100%', marginTop: '2%', marginLeft: 100, fontSize: 10, textAlign: 'center', justifyContent: 'center' }}>
                    <th>Código</th>
                    <th>Curso</th>
                    <th>Dia</th>
                    <th>Horário</th>
                    <th>Quantidade de Alunos</th>
                    <th>Quantidade de Aulas</th>
                </tr>
            </thead>
            <tbody>
                {props.data.arrayRelatorio1.map(function (item) {
                    return (
                        <tr style={{ width: '100%', marginTop: '2%', marginLeft: 100, fontSize: 10, textAlign: 'center', justifyContent: 'center' }}>
                            <td>{item.codigo}</td>
                            <td>{item.descricao_curso}</td>
                            <td>{item.dia_semana}</td>
                            <td>{item.horario_inicio}</td>
                            <td>{item.qtde_alunos}</td>
                            <td>{item.qtde_aulas}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

class Definicao extends React.Component {

    constructor() {
        super()
        this.state = {
            selectedOption: null,
            id_curso: '',
            arrayFases: [],
            arrayCurso: [],
            habilitarSemestre: false,
            arrayProfessores: '',
            arrayProfessorRelatorio: '',
            tipoRelatorio: '1',
            select: [true, true, true],
            s1: true,
            s2: false,
            array1: '',
            array2: '',
            arrayRelatorio1: '',
            arrayRelatorio2: '',
            arrayRelatorio3: '',
        }
    }

    imprimir = () => {

        var niceimage = new Image();

        niceimage.src =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACkCAYAAABIIbYiAAAAAXNSR0IArs4c6QAAQABJREFUeAHtfQl8VNX59pt9TwYIm2zDpmJVgguiVjO4+7ctoGhrqzJU7aZAsP2qf2tLaEs/bb+WSNVuKpO2VlsXQtVW68JE3FArQVtEAUlkkZ3Jvs98z3NmzuTOzb2zJCGyvb/fmXvv2e85z3m3e+4dkWMUcwQCgUARwvKYGY9lOHpHIASSAziSXEfvSBy7c9sRIDAQNEgIlC22mY8lHJ0jAFC4iQwLch2dI3LsriNGAMBwIKywAIiO8kQUOEouko6S+7S9Tcz+TCQGEJwIRQhuhGjkS0pKGhAtw7G0I2wEABJaM7bUvvWTwPZv3WiV7jrChiLm7STHzHFkZ1hqd3vNa96QmhmXi7+u1iqLyyrySI47aoECNkExYznhdU/9TbZd/2Xx19fZzX2xXcKRGn/UAgUTSt2kG7V+8F/Zs+TH4fjWDR+Ezw0nNJstyxvyHFGnRxVQMLm0ZhYhkCOM0TNpFC/7li2N4CRRuMpS1OPQdRzpx6MKKJjM6QilCF4EN4Ki1g/WyyczLpOGF56Xxpf+paPDR+orFuREnNsi/oiMOqrMY3AAL2bRUr/YePxo2wke/877UGrrJHXkKHOeapjKY82RR+L10cZRChKdxKyp06RuxROye8liq6JOgI9K8RFPqUf8HUbeoOWkWomWrDPPkua310jzW2+qEFlNxNVRoaccNRzFvPI7tm0VBtIBz0PqSHAwJOfmSdZZZ6s4849R8TWnHcnXRxNHcRknsn37NuUrSc7LV1aOBgd1kYxJn5OU/HyVnfH+hnrJufASoX8l/8prjNUcNedHDUfBjM4xzmonAEHS5q/DfaP4yh+WATg2v/2mAgvTGU/q2LFNdt3xPXVu/IEy6zVeH6nnRwVHCYmdCP2k8cXnw3OaetwIoZ5C0Ci3PY4aSOQuJJrQzGeiStP1EXt5xHMUgMSJ2VtunsEWeGBJ6SdOkmzoI1RcSZrD0EOrxE59rToyTYOG5yGajPqPKbN6NA7XY2gS16L/EdyE99OxbZsCQMGVV0t7SKnV9+m44evKb0LdhDRo/kJ1zL34EnU0/BAktg8WDfkO+9Mj2uEGoJTYTeSOb9+kngxTqZWkJOng0YLoR8m96BJlGY31WnpoWWoWdJUKi+JHTNSRLnq44ruR3++X7AsvUtYMrRw7kLBg6/r/CvMPve93AuB1qysUccRzlaOOo3CyV/zt/0lH7UMyoL1NOsBNUu0BIC3JKQoLzSkpMrboj3Lm1Kl2YJl+JFtARzpQyFGqEZTr/v333pOtG34sWclviWta0NlmN+tW8c+9eqZkZA6RIeNul5NPPc+YhbubnACKzxh57LyHI4DVPBOhqIfFe1QM7YV30z+09KSAf6v0OjztGYBqI8jdo84dRoX6TUe5xfurR9wv/N8VGJtVGOJ+G1iscg/anN7Z2VmZk92B097ToAEN0tGh6qIfZUqojd5XfAjX0C8Ot9teuW/NS9venVpTt4tDQXGwHGAZgwFerMcG17aaos7Tm2MKdIzdtdNkzbvVvalGld2043I5O1UNXTEi1h7Eri/GGJWaO/zb/1Qsf3/Plmvvc5V8BekV5vTD7vq21ffdO+Khq1plWXGg+Mn5AR5XbH6FmNDEHWcEDi2KfqHW1tbA8t/eEvCtT0pIBDH/Sy8+EWD5fqRS46SjXb5ztJZj6PjtFYEZT98Z2Fa/5wFjnoN1ftBED25o+WbfjvnbG/emTy4cL+v2bFb3cG/Vk8Z7Idv2GSMO9nl6erqMHlskGz4eIvUN3XV5Y5w+55H5x46bIiz/WRBBgnZXIRRVbH5VfG0NUrV3k3zh6Tu+vbfZ914o/aB17aCIHnS6tOLj1e6VW15THXdk5Mq6tiBQ1u7ZaLwZW3Hz35p9cuv9HJeDQQ74RpbJT9K/K29uGi/1zZny42uel1c3jJKf/+Nq+dO37peC7Fb5ym/my3XnvCwjBx6QH676pSRXvovOMPQtFeSkS8WiL8WqtBQZipipfEPwOVVta6PU1O+Sm176xSkrrvgpReB0LLxq5ulr6nOgoLNOdHKBZ/1z4b76WhvUOTmL56L/DcfjhDvE3Lg5jzGS53VNbeJ9b1s4umj8YKnavCd83Rcn7548Tv6x4RRVlffDzXLvi8VS39kmy1+bJo7sZmmSTvn968VScpFXXvnPjr5o0rKOwQVZlvE6EmNEbjKH197ta3W04ioc04qPX5Xqup1OZ/4winKCpc+5dJ8DBXdRguAga9REjlKQniPeK+8VnpvIjWuPKa7bpXNoviyYOUUW/q5SZpw9Xig0PC+s75bPffFJUvXxHgUqR26GsJwdwIpGbZcFF70SrsN1wqbwOU/c576lris/HB8R/xlckJMQLOIaMSWieT2e1fWfCoDCfBz/0ohMfXBxMIAyg/3SOsmYvKFCa2dARp5dd73mBKwK+cczz0REV++qE4KAgTRg9m8i0vUFwbHqntkKRMw75ZZHdFK3Y/nrU8X74YRu8eaImn0DzVF9et3U1CSrXn5Jpl9wYVz1Lph8ldy7LqjrUfxwjA0AWoBKSuOqKIFMCQMFk+hE/WSDK8HiqoxthdKYjre+g+oHUC6V29epbBRBegWoCBF6NKtQLkIZIVBWv0IXxRkqG8XO0m8Wh4rA1QrQ2FFBToYQLCWzpkg5OE60vJ7XbN3xdtUflPjm5iZZ8+abcQOl9Ky5EEFVsm7vZqXQLr/odmO/FOcxRvTFeU+snplouBSTTuXpACcZYRED4hkUeS6+Qyg/Q74T4c0QNCYqwPUKBJcpPuJyJkRNJfSV2sZWFU9xQq5BQGhSnOTns6X0umk6SokoguwIIC5ILipFXGzU9SjO55x4qbgnXa6TeAznM0byHHPkMsfFe50wR0HFc1i566kFMmXwRAesGBfA4HKfdJksmDw7DIaZ486jgiULV9+vQGK6mXj7p/KV/vlNdSQYHOAY7l8GX9IyAsXX0CrTv/+Eylf1wNfUseL1zUKQMS0aZ1GZD80fxR2onGKSPegixYqiosEThIvRxKGZVhHMoYBBNuxEcIUCz7v7BBAZixLiKOisExUWsVLXiCLxfPAcWk2SMflDpazqCRlb/hXE/ZPJikqKrpbiEZPNiFdplWCd2hpaGdTaQ6VCB4vboVKqQcNcBIAVMV/JbytVXuY/HEESGpsFGPNVCOTUAfO9cjF6t5HZRFAB8pPbM78X9Xiq9mxy49yJQK6i5o/niVCiHMWtK3eNLFIKFZ0+zrxhSsxQZs598R6VhRyEN1t6VriIur533RNStvYJZdqRdVIcUdGFH0BXHTx2GxZrKyeyUPCK1pDRtLbKc6jHkVOUrllOjuGqbWt0sb8c52IsUKMIJ9c2Eq5nLn7Lo7g5ACIFGTmK8xjyOAzncZ8mChQPanYjjHHmDcchSNX1O8XRmiszxp4rdLIRLJolFhVOVJnY6VnP3iXMSyKnocZOoFHO6vwqsZc/RpBQnxmDEIuo/9iZ0bHKHqx0AmLhK/ersTnQWi8AjGqKi2/RVLc6N44bx3j6UyVqETKR1hA5vnGuVKEe/CQEFMjKarAuD9pZRBm5aOocpX3TqqHfhBxFmcPwFtLNzJsgezTeALnI9JFTlJNI95fcyUhoJ2FJSn3FThR5oeSaaQ123f/3/ffD0Xv27pWU3XXy7/puCnc4T3+fkCuXvHKfWlyO9FzFUQiY0jUeOdBSL2XnzwuLb3JvDRKOMeeHC5EcxciBenoPcQMFAHGikUUIYaFIM01T0aM3KqBoMUSQhOSs4iQEEkE0Nn94BEhY3uADUNUp8WohenRbVkdyjkW3TZPFj7ypfC3UTbQSuxjniwzWEMvfOu97svPTbRFV7RpzlUg3f2BEln6/KDv/VsWhOX4MGjDUD7nACAIuxLKqx2XyYDoig8odzWfSqiuXRvQZi9AbERHnRdxAQX0zEdx29c4c93kFFIqWGYXnSvkHzysld+6Ld6sVQVFDU1nfAK8JKiI/GuKNnIIONIoVK+WUcTPPGa8CgWHkLmUVa5VfhT4WTS+8/LLy4Orrz/KYFOiUN579s2UXyFUIirAvygAYGhDuSZdBfAefn9HJSTBpokg3LUJKBC52TeWUEvoi2jEIv2g5QmlooAKnM4hecguNZE60JipWfBbBm8MmJcVRCByinGn6Jpaed4vQIrIjbma+YMYNUtl+huIOc0IAoY8k6bKybsVcp46UFT/6YtivQl1j+u1QmA1WUdm3itUjgG6FEeHzPIg3Am+SXbffJqkjRqq3Bfk+Ml8rZTxJp/EdoLqnHserpVer95P5/g+/q8J4vjTGF8n4tmHTW3ihDNeMy734UlUHf5i/df16FZeM+pmHx6UrKuSOO38Qzmc8IWcueeXX4YeBTKOPipYnx59zwqNRsSW3MYHEWCXPawEShznS7joujhISOzNYycxnf6DEBz2vRDlZIX0oVK4IHnd+0PnDOJpunov/N6irPPMDpehSfhJIMSkEYVowpddPE9ep0xQnoYgxcxRyGbr0CQaml61YK0XjBoctH3IiPieyIr6ozrcASQQJJ7VpzZt4gyNJgUGXYdqg+bepyyaAQb/ETmCwTBrSCaDBd5UqMLTjvSGCh/mYp337VuQZpd5dbh4RLK/jZbtuxfrIhclxZLCikj2/jm9MIwt7Iy+jX8XrR6HYUUSNm+KDIKG4IWCUD8XzFYVsnY/oJqp5kyQqXge+8Yz4vvlsOI7xXC3GlcA4kmZ1nOQxQ4JWC0Hg/cVsgGZkMJPpV/tPCBxt+bD88u9eYsrZdcmVz/d6yBU4cT5wkuyzpkkO3uXhZ7o08ZUOppuJnIWgaDC8opqCF99JBIcuQ5Dw2kytH3yAz2qsMUeHr7WeF46wOKHlaEUcV/qrGOjfwtYPYzav8SLWeVwcBZV4EAiWYm3u4lwppUWFExRYaPFQ617xhZ8olsdOGvOS21AsceMSH4uTEykTGSbf0vNuZXXdiPoJAz2uFYu+qBxo5BZ2ZH6azLIEF3UWMxFsxQjJeQUy9O5fqi8VcPWTC3DStUgIl1OWmIZvODbMfXRM44v/Qp2GB6Ao11lbG+RUyyKBRuDw5TKKp5yXV+kqIo5UUrkwtZLKcaTImYFFqhch58BIHOe5L9wTdkWQi9OIMPmqKoxlYp13v3ObEhA/biQtZ3LSr108hIkd3VL3qbLzCYC11z6onEWaVXJVUKklQEiUr3SyUbbSfKt2/zVcF0/Qlkyfcb1Utp0Rjqd+UvEGHoL10Z4U1me2hMKN4YTfQUnOLzBG2Z4b81KUWXzCy7asTrj7Z0ssdRSO3YDff0E919F+FJbhmC+/6A6lm/BxCrdwkMg5tNOT17Q0aSZzUVZ8YQmjSDUQrU6exEvxih7WV60r5WNuTrYmsj6inMilwsrOapbJIzmNBonR+mFeii8zEShgUxFEy6WvQBJRsc1FvCBhcWPenoDEpgsqmlyD1gtBQiuRY0zimNOByfHl2PNILk4HHYn5mJ8g4TiXTInwJZVhjIsRuAe3SBWI8ROv6KFy50WlqjrqGyR2Tmvj9MgSBNRdjBo43dC8KXbc7GhjHUaridd2ZLRg7PLoeP3EmMCi+OGDQbNYUjqMhUjSdfTnMcnfJulRGuR4q11s9ICDYyvAgBMHH5ncrRYtTeTFa8rDDjaCxugFN1lAXcqXCFlRSZTmVVJcQAFAqJ+sQKhCCCOQaOdN6D2cBAnRr1FN0UKQkPtQxmquwpbJErkS6LntayKotpR/XVk/VGa5K85MRoXXnNbf18kdjbLkAvtWg+Mc6XgTfGiBgCEguEBpYXLhcg8tgyaOfcUVYZGjo43HCuOF3XlcQEFhjcAwSHSFvIkVV/xEdZSgoF5CLrLy49dkymM3qZthXo1uPg8yyEpdTcSRpil1x56SD89tCBZuXiJpC6in9R0K5ehSoCKrH6iyTwQKOTLngCChzsItkVygJKbFWIj0pXhV5hg/MYECbuJGHc5o9bAzxg7RLGbHaToTzRRPGigzx3fXScx1axFnjo/nmmJn+W2XhJ1vLLP2/q8pB1x/6jjx9DXRPBQfJhESroKLk8CIAxzhMjihhIiLYgIFtTh1TTTVaK0Q2ZOhda8DB+FjbysiILQuo5xFUHAJJpY92ERRQ7OY/hOaxuQo3PB0JJPmIrHukaLKMAfeWPl1ejxAqdaZqWNQ1yCnYMeoiVPPoH1O9qeJ8pJcRRPTtMuezh9N5Do0j+1Wic6XyNHINejRpbWUiCKcSFv9ldc0uZbNGsdfZ+CGMKoDHGfOl3KOnhc0REJ5KnTeWMeYQIEM80AUOFBRKR5AFWgbXTva6AyinW/cI8FGjc42XpfjwVbpGmyogeZOC4gskqCbM+lSkRHMEUkhAysyMsGrmYufPuxBwlumA630KY9ymukh4ELk1lMrgBAYNJ31A1iWofFA4riHiPpJ16rVsTbHmEAJgWQLyh/Ayg97oIhUgoVaNc00goCdodLFFaBvgJ2mH4X5SdTQadvTQiJgVl1ZpuLNP9lJrVKw61VzdELXW6D8hzucUMn+zUzzWOQs20Y5ptyXQqemtmgIAiq2HD9OvtYBWYkRJBxjqgtM58NYA5EBOHE9BmEAQBOVu8QECiqhWexCMMo2XqrJp12vwUKzmJxEd9oIEis/CsWWHWUltYhj99uWyR0FadI2NENSfR2SvrvFMs+hEBlvP4PKuz1QeC8lRbNl8Vvlyo9CcU3A0JHGRUiw6LGkUksQaYBwDjQXNz2MnYNqF4TGib6UqECJ6pkNIc4VqkwdaAqTK7AjJHaW+0wIFp7zwZPuND205CRMs9ywZNBjVGVx/iS3+KVlVLYcuGiI7L9wiLQNyRROyqFA7EfLmCzxfX6Q7LtiOPqWIR2OeNZj9N5TxyPHVuMNkJCb0zym3sHHIySKKO5dYZrmIsxP4gYozeVVROjNw9C5J3S0PcS6g25L3mgK0wri6xiqM3gnS3MWbtejTkI0M466iBY9vOaNkF1qBde2dzYJya2dkv/OAak7Y4C0D82UXacUgLO0ij8zWQa8tEvSd7YJ8/QX+TNSpG1YutSeO1iSWzrRjxTVdMYnjZL/ti9mX8D2kT/o9bbrMyeZrgY+16ERoceTHJ3jrJ2ZHFv9cQDWRXBRfzRxE2Mz6+LRVaK6tcBRPKiRLMqSqIvwFQ1N9Mpqy4jgoXON+osWRQRJ1bUP6ey2R25cuuWmS+SEUfaP31m4OSlFnsseLvuTM2RHarZaXYwfCJk/sLNVLmvaiXPrVzqYr7fEdjdhot7KGIQ+pMuBlAyZ0F4vTejXKW0+KW7eLVnYvRaLtu1MlsIx37d8KGguyzGneNFjqhcd89Hs7YEFORdA8ZjbMV/bcpSQ2FEgoWnFZwlkZ1rmzTnxMtWxLXMeU/s1WXHwmcTqsDuZ/hOKolnP/jCMbHMH7K6HDGqSBTcH2aZdHsbfgRfjVn46SFbtduBYKLXtqZKbkyRv1xZCj8mUyfl4cu3cKZMLGsWR1hGtqrjTKvcWyKo9Dlnny5XKvQ5Vb6A9BYpzh5w0rFW1N2P4vrjre/PdNKn8T3zZCQb9VN5YgmKHILKyII35eM45DImhWlxG1U10WVugAGXVAMt0ZFzla6tXz28oLigTabHQyqEusqDoqrBjjZXy1QBHBjb7hh4cUlSt/cqDYbOMN8OOKk0d5wSg0aurO5bIkZNSXFgr04f4ZPEHTikAIMZktYBFpyrw1OD7J7wuPalGnNk9V359AOGsNz8X7hqBQnLmtEh1Y6aUTNwm7Etv2ghXbjjhQuXEGhxlhtSuUwWUrkt1xjg6RrWo4u59mtahMfdgnn2mIpaXtkBhblTiBVgqwc6K+Tagtsu5NYAfxOE1gxEIBJWZCApyFm5a0nVQIabuMmPcuebsPbomtyBYFk2qlrJNI1UdnNjajlQ1iWoi16VK6aQaKXLE5lTmTlQ3ZSqQsB5NrLu4MDjOZZOhtINr9TVI2BbHlM/NjESRs+isOXrCjUnqnIvRuAeIkdRXOOaGtyc8KnMcP1GtnlB5VZm2ZBhHPYRiiDoHiSYaO8XOWdHC1fcp8UOQsAyBRq7E6yhKllVVUeMIFq7opadsDk9gQWqHkKMwrKvF3tOaoVL+SdD5FLUyQyJFzZSXTldciUodAcLgBJcip2J7B4OT6C5Q7+DCopWjrU1yCIp06itm4jwY9wAxneUIEtYTEjs1YARVTAMzcCE4eG5HUTkKCq9CQVVBqPJwPewoUa3fDqRZprys4RzBEwKIaSTmJUCo4JIMnVbX+gc3gNOoerbOankkx5g1Yq8SCT/e4Aznof6y7OORanLPz6qTYTv80rEzBcF+GHadLPKjfWNVHZ8AbIFQbQ4A8HxwE4q7nnCocKfiPKHlMv2pheH9KPrNQfpWtBJbXRccZ4JHixqzP2X5SbfrFvklCicu6EsZizGfqROsjrYjFEKYSxeiKUtZaTS9dGc0WJjXyFXoRyFI2FlyJGNZ5iXQrAhtW0UnFMcVzkCqgi6hOUpBZ6d07kuRb5R/Tua/5ZNJe+2tou15ANb2AbJ6Up6q5+O9WZKf1Cmfzz4gp4+rVWJMJfTy56SJHTGVWXIVPc60KMldyNXpfKOjk9tPaQlRJ+FHdihm6LvinGkLieUNVlERur0l1PVZsW7BFigoyIrCRI6i95FQw6b7mBNvBAt1EHaQdv6A331BKU285g1pkPBam3Q99aOEOxXHyV0DtsnTLx4njzSny96hHZLX1ikbCvEkeXRA7nQOlLcnrAvWkgw1PdDFxZKTArJ45wR5B+UKOjplREu7bEtJl+P2dsq1bzXLtAMdsqNokOR9vllyzm1WdbSDM2VMaI+jV5FZ8vPiWxi0duhHMboc9AYmvcOei5PjS8BofZCtUeRbWUtIqgE3qYjsUferaECp6p49GENUsiN68gkWAkDtsgLa6U8h0skZCBINJuahH8Usxuza6U1866Y02Xu/Q5rXZcopqOj7LrwPPTBb/iKF+LMefEwQHyjeBt/Ht1dMknlvHZD8Vn9Ec0vOGyQbB6eLrzBN6jOSZWRam3w1c7fMn/KpDB/ul9rncqTptWwVdMGsU1tkRNkefdnnR44bx4+gIKcgabHDI3VH6nw85/xo4nUUXdCj80U72gIFKOPHW8pReI5VBTSvqqfuVM8fCAByG25QYmfZMe9Z96qj9qOwDj6viAckaDvsPLNq2ypunydfml7PkvTxwRVd/3yOJGf7ZcANeFXitBYp3AhQPN0pDQOz5IPCDnlrJMRIwC9rRmZKXmu+EkOcaNLjwwrkqfG5Up+aAg7klxMhns7Y1ia3rW5CaoHUTWiT/MsaJXPiAan9B/L9K/g4o3UznG7l+TJgjv2nw1QDvfzh2Nu5FBQoQi/h2TVD9cAwD2V2+YzxtkAJZSoFMufQVc/KxxYMV0glWmny8u1Ao/ig70R3gB0m8YbolOM190fQAtJ5aNOzvM4balNxoi4hoGNjH1s3pQuDpuRcP16uypQDf+QLWcEa54tPKopy5KOR6bI1M03qMjPk02EpcuGCHUqnoRlc/uZoqa9NESqsjqwOuebUnXJ7605pHpshDa9lqTZ0OwTMqDI8oAsBZl95gcoz5Pv7eySGdN/1kePOxcZx1OOm04xHIwcxx9dAdyEHom7DfFzYIRO5nAzBmN/uPCpQUEk1uEotuEQBTSs+saRiqn0o/LQFd7IRMNGIOs3CR0PPhJBR+1DovDODJFo9dmm0XGqfDCqcKYM7pOBSrPaTWqXemyONr2ahWJKkDOiUbHCW/Csa5XtFrZK2eYRU7ChU3lXWWwpHHf0wdKjRjCZNhvVEP0nJhO2SBdM7C+UGuvFHUJ+mSB04lgoQQXUI6ePxfCnHL/7GZAWk7QuHyOBbD0jepeRCPSeCg+Os9wHpmvhyOl+c0+DhXlkjEWBclNriNKYZvnBQaoyPdh4VKKGCBfxWGE0zrT3TgiFgqKPwdVKi1WpfCTvLLyzRi0uiQkWdRStZpv0RKg9/KHriJX9Dknz6o0I1QZLul/QhHdL8Xobs/3MBVnSbDLrpgKrP9wxExEs50laTJo6r6mXeuTtUE/SuUpWsbsyU0+Ar4Tl9L9qZRgedmZLz/JI2PAicBm+KBFqTpA1iJ/ucZsme1Crt+wGkf+bIrnsGATwByYHC2xviOzl0KxAUeg4IAAJI70cx1s9xN+4BYpo2k7k4Q5YPuUm1sVy086hAATcpYmGDSaXq0hNNx9mqbWvVxHOzDHeBG4lfNNAKb9iHEvrUOfNRfFkRlWAtKqzSjXF77h+gVnBSCspgwpILApKCiWx+D5cQQ3uWYbIggnIxWYOurZOGt7JCE+iXOdfWSkbBJ/Kz5pHKoiE4SKPxUPE7udsizF9yrUboQA2rs5SCzHzUgXKLmyRjbJvw2V8DONje1x1Mkpwzm6Xx7SwFYhWBn+E/3iupwzoSFkkcf377hGDRLgX6Ucjh6acyL1LGaQOCbVPUcLMYQWZYnHMwznOQXIVQilAD4PDckqICBSWcupS24fU1j1RcyV3YaZ4XwzQzEmWinQ+FnTcDUJdFh/Vp1CPFCpVWkh+WDE3Tobfvw7u/ARkIJdYHcUTx4G9IVuKBIiJrcosMnr9PcYH9jzgkqzkgI8fuk/G72qTSPUaKPTUyekCaXLWrQ7Y+OVTyXHjT7uk86dgVHKpUcKy8SxolA6KmY3eq0ke0Mst+UPwQlNkwmRvfgbs/ZHKT25CzfHLzUBn9h673blgmHio7b55y4xsBQNCQy1CH1HuUKeY5FySOMVUGzYU4FxbWD5lBBcJchB4DhZUoog1u9PhR3NBfQu5C5w+BxA6y87Tz2WGyQHxiNMxVtPueeomd1q7bi+e4B+avppTsgByHFUuQkFKHd0rhrT4V6p7LlnqApPm9TMUNaDIf97PdkpTml3MbUiVnQ4O8MAKrf1ODTB2UJl/4uEnyk5OlYz8A9nKW4kj5Z9ZL+ugOafs4XRoI0JClo9qCfyYXwMiDYmv0o2Se3Cot7wefDRUgrbkqQ4ko1cEEf8h9+a1ebonkuJM0aLhFksSx58vpHGcCRKerRPzYfG6UyYuxOD08saNYHCUMFIXc0BNhVkbQ0H1MImIp+5iHspM3svaZjWrDDDc2aeIuKzsuovN0HYMT3nUdeVb/fHZ4lTMl//JGBY7IXMGr/Msw8QhUQjWX4UrvPJAKUdAu0wb45cyGRrnz3eAEpJwE1z5AQi6SfUaL5JzVInt/75C6Z7qGi8prPpRmAoSgtKLCuXWy7bYgUJrWZsjgeT6rbHHHkRtwgdEKovXCBcetpwQR54PjzweFnAPtZ9EcnVaOjagvB0hKY3Wi686tcxZbR+MbXeg0OYh+bsO36bllgFyEqCd6eVO8IXId+lDMO/Pt6raK5ypOx6TWPpeLVZkW1hN0Xlo50YhKL7lBJ6wS6iwHnspVlgqV0I4u35Sqoj0kGQq+VC/1q8CN/pWrFOO8C2olFVZV3oXNYc4VrU1jGvtMGgauFy9xLEkEgCaeW4gPNe46zSpdlzcdubvNbYqzvIwKFFTCf1ksgxhZQGXI2GEiluAgEEhENwNFDtmeFi16XwrzcXsk2SHzBRVWcCYgPR5qg6d1988HSuHNPuG5mfz13R+E0zvbAgvIqICyXFJOp3RA/Az9/j7Z9TN4am0oBZwmY0y7NP0nWdq2pCnlmFlbPsTXFmmCw1xOlKi/xEsc75n4UhWPevc9x44PX82cmeNKkzkB4rMLV7z5owIlVEkZjgtoBpMoYqh9k2j20nTjbjdNvAEqsUaiPa/LU34SNAxkk4kQldLGNVky/Cd75dMfFiqdQ5eveylbci9skhYAoB7ch/qAVkCZh+AQcBN0XwKNwT2t7du6A07XxyM5T05xs7RWpwfNbxZGESrQDKnQTQZcXa+U2+RcpJmoHhaSJupHu+4ZKINvOYB6u+fV+cxH+qn40I/jrnST7fwGynMKFEYrkxvcCSJN5EZcmFqR1Yt87e6N+pldBRhB3LIwJlBQGZ1uNaXiGaMBQktHA4ZgYeDufM1F2FlyFooammpaC6fCS1GlxZUxv75BuyOdXclPwqEFEbL3gQEyCI4vLf9ZpuU/mfLxl4IblnQdSbBAAo1BC0qDg1YPrQ/qFhRDJIJKEyeR/hfqHw2FSWqbozqHR3Y/vK5B8AWgCAfU+Z77BghDHvIbuQz7aVR4WX/rxlT59PuDpd2XIvmwnOi8i0UUIxxfchS1HwXP0LjICBaSBgsBoT88TB2GSq1xwWo/imFxLsK8eji/qqIYPzGBEipfCra2XAPF6Eehxs2JZ8fk4qDLnlwjqKsEn/2wk+ZvozCPRnmMPqpkAsX5lx1qsnxP5amJocnJ5ztGSoJvI0AAAB/qiMQcZZo2KXBoq4hl7t8Ma+0abF20mDC68kvXjRHPGR8qfUQrxLSgNGAUBDOwZOC/MXOZFjxbopeWRMWXZnbbVjxghL6TKHEvCj2zijuEPndBxyU95ASFBgg5Cp8em724GiR8UGvSX0rQF4aYFLyTGNmAOs8VzrNfM2cjp6A+Qpc80csdV0Q7kU8dht9NISDM7/Sw4wnKU9W08o/MqVXn9MYOuXW/cnoZ+5U2uFOyTgbXADiGQAcZt3KbDP/pXmX1GEFCINCF78xuMRYPn+t45jMSAeN89FNVdwpED0GSBAdhUmpQnJDjkMNo/w6dcgO/Wif7HhpgrCahc04un8hrImAYuEC5tYNGBMeZY66/TcMxph+FJjNFFvPT6jQR/5ShyBRneRkvR5HBWY5b8Umutfqfp3RtVKL4bgnFCjkNRQ6RTdOZnSRpe56fRI9XedX1m4+cbMeV9UKu8umPBsMfskd23DlY/E1BzNNFn5yTAsfb/qiu89L1Y9QWRnP9xmtuxi5Zhw/RnP1fY7Q6N3IY7aPJmAj3/fa0cF/U0+sv18vupQNVmdSBnarvFH3kkIkQ/Vg0b7UYZ1mOLx1t3N7BxalNZM2pCQ6tBNMja1aAUQWVzWqEmBQ3UMBVqqirwIoZw1rJOfjNWaKa3ISuerr0NaKZhzv0KV9JQS5yuTqP7yeoW1jlHQiu0rQuA5aTSOapbVIwux5PiLveMibLJ8ehPlLwpQbJPh36TX7XfhPugSXF2sJIrsI8zM8HhlakAbP/j3iV5XF8YDgEWIJk2F17AeIhqhjFz6BvxNZJrNrQcXzSbnxar+P5SS5uUido+KefXLAaIOQqdE1YlCNIXJjXuBTauIES6pQHx0U8J9eg+DA61BZNdQMcWO3QuCmGqMyS3RFUZJ8a6SxvJCWuDBq7Mc3qnFyFHKMBXtPt8wdL8/ouZdSYnx5YhsJv+sSBla2Jr3Q8fPqH+jLqkU+O3e+cYAmU/Q9j+0JnEry3kc4/VkjlNntakGvQrc/+JkIcQ7vxMtbDfOTYS88PcgwLrmHMrs/LcVISL0hYKFGglO1rqb1qUGbBySxMlLJjSqHCRBs9f+QglJ0m5UmBiOYy2SXlKokDYrNNT6Vb/dBVzmc9Le9nqKfD6eP4RQBYFltTld4UaA9xJGxxNIKE3IGborUOYlW3MY47+8lVuHN/zuhd4SRaNQeeyJNAi0HNgyWUnB5QSmz9v7IlY2Kb0pUGuvHwMcEtkhxTuhSotJI4RuTYc0y+Eop6UpwAYdZyAMTNk0QoIaAQgV9aeefXdrXsf21Y9sBcKklUoCh6KC/JZXSHaULzMbgRKPpdZXaQCjDZI1eD6c8TVf9PmDQJx9fVebSfQOgBIn0eytxtx8RBJqUUchN1Mjypke71kvcmyKrzyHXjJ3IV7lMxAoVmdMH/NMqBJ3NhKsOyGd4OqyZdHHhCTavI35gCB+EgmfDy1vgbMuSk64Aebl9G8AN+TKJ+QvDwabHmNhxjjqUmcufyDUHTmXGcF+blg1vU2SOQsJ6EgMICf5/xs/fS7rtgXbu/81yCgXKRZhonnHtWqFTxC0zaUcQyJJptFFOUmbSCtInNtET8KcxvR3THkwiezBPa4JzLhK+iS7cgV5gxfG/Cr5aSq7jH4J3fD8ZEbD3glgEsHrUHl15c0ZiwV6/sut4tnpOrP3XBMdWvZwTHuUTtumchflRR+0aMjk1jheTuANPzs8af7zbGJ3Ju4JvxF2sPtN3F3JxsbSKrDdXoEDVtbprhjZLTkIUS5bTtiXya00aQEDh6dcTfg2BOOqy4Yhm4qdn5yA7F6lUq5m3Yj/bBcRbcYca3Bj01sAwsNiLF0y65Cd9tZj2aHLMb1HYGfc09t3TO8XkOzfPeEkU7x4djynEjYJQZjEVJC4djyzHmQqNjU3u/dbssyzIjcgvbVn7hZ4/CGHHotESPXXcdR0k05ES2Ocw66PdfrNvfWs/NqOpGqjfACoIMjXDAIY2skUSQ6P+TIcKp5FJUWT0o5CptbbNWUFVlNj98ikufCT2tFDlpI7BJJURlm0YorqCve3IsnVTdrRjBqk1dfcwdDs8vTGA+rY6H6qHv5Ft8Tp0LSH/qgoBg0K9n8P+QKPYJHP6HID21HFeOKUFFIvdhHDg8Wa0HgV72UoxvOc4TooSYJBqpQO0z2IJxm4GxRcpEIpnmMjupOx1+VoHM5D6xlNd5t3zr/WX/+zu+adFr0i+XJ6qb9LrhOCvg1wyasp9tHD/1lBxOtJlo2VB080ii0cAFNuXRm5QLghzazKl1HeZHK6H4ahznAjDe0HXMQ4+BwprJ+ohqEhGtbXc64Ki7MI1sk8Dh+yhUZjkQRgWXZY1fiiSgoBCXjxo2+LXnH/X9ftLELq7AvD0hOs34iqmdL6QndfZlmR8vzZOrblg9/8HaV5ZRlFOHIxEQxv+SNrapXfX6DQdaP/ShcLwp6rlgbfagVKIechWvsb5Y54kCxYUKV1lVarRomE6uoVgnblw9l8Arj2Yiy9RfYiYLZT6Irv01c/82aFhu7uDrr0uquecH9ZEPc8yVxHF9L3bcLxi/PY6c/Z+FYueCawb97d/v7/3y/33nT3ff885jtxu5LxcdfSTmxTUW/49EcR6LMxvuiFo9AVJmiIv7NCFlNoTCxVa180booueEB3WQeeobKdRFKCu1vc+yZKHcjE2vLQeF7v/w/w0m+eczz86Ghj2Prcxc+sHGhNQoFu1GhypI2FHP37JaPtnZ9gOe/+8Z19/R0NG8HRZl2+jcoX6OI/USers151ZlIIbIOfgva3GS9sL2CCRsIyGOojsFXcWNczZaoOOiHZ2eLyt2qneLczOO1mHMT5Xh6ZwiC71VofqSZ1424J3ypb4peQns4YjWl0Mpbc276TL75vxvbd+993fhfi07z42dMMt5TW5CUc3FROtFv/tNbqK+VxP6jx7mJZBqAaoClDE6PpF0LwI5iY/5eko9Wq5o1AOweNFoKcJMhALa8Owsb4wcg53Vn+/Sj8nJVeiQ0yAxPlXm6oHo+Uv13L9qkKBa8b/7hv/CGxY43vrjvb4JRxJYyCnn/TD/oQiQ4IYD815Rf9zJJ+/kJuTGJO4w5PhR/yA3WX7x7Wqcjf9MrzLih6C644yv7psy+Hj3WcMmPaPje3PsEUcJN7jsvOKCjLzL/P7ATfXtTYXheMMJlSo6hOhlJDD4dhvfyOe5HgT+16DBl8JnEFwFYfrJXXeNfa/q4dW/+tGuESNsNjKHMx8GJy9UZsivHprgfe7l/8wyrvQQp1bchMoqXQsECyeeC5D+EvqoxjmG++adeuX2ed5lJ0BURVvstfBSe8SfXAou3SuO0nOgLDuvBCxSmcrGuQFnyB2S5SgcljNo5MCMvFSCgdbQl8aes/PvW15Xth+tIAKDq4PeR4utB+QqvLEiBAfr55cil/z4u3Jc7u/l61/p3WuarO+zICquS/+QI+Mn3yfX3aDcUcZueHHhMkaYz/kRALXNg+I5BQCgTEpS4+TCGW1kjlnwnOOWhC8hdia5egsS9qPnQGHpe88vk6SkBTy1o9SklPc7Ap37kO7SeWjb0w9AsBg4iU6OevR6V8nfPN+QG678RM46LfggMGqBQySRXORPf58st93+G5ly2mkJ94pih49IwCEWy4JXSmWpyyHJfo5/N8SpygOBe5GvJOGGbAr0Diis1KB82bShoi8adXoF9kzkz6tcdgE9uKZ/zIxWtFvagf375Xe/fUDqdy6Tb1+/Xw5lcUSF9Xd/LpQTp3xHvvt/bpfU1GiSotutqgjqfHSucSsj/FFViKxAqEaoTLrvPKcEIFokqRjXBNJKBaB5r3rVdR/99B4o7Mi953vCyEZHTy4c++ruJl/J7mbfCN3PwDyvOtUeXRuPoc4eceS/gLZu+EDF8Z/I+VezpKamJnn/jdclreY9OW5ou+TjnWMrSsKT5SzDY36+7pnoY3/W24JHA83YMGWmZrwWEsAbAprY3paAyEcfZ8rg4VPltNNOl6zsbPWP6RmTPqeypR03Iu5/M6UrgY4449c3dVs4ViN4EQieSqPOg+s+o74BCroDRYz6igthJoKTFhA9tyR6afX2A14XPXqj8puY38RXf0ePfzXnn1Hz38r99XXhfzlnub4ibiQa93RiDjjuP6m+9rjwhuk+6wv+TDtj0kmSNnKU+jd2/vdyxomTwv98qh2Z3MposUvNqhua43gBmkqrDD2J6xVQAA4nGqWMdCM4EeIigojfTT0VnyevaJoiaWvewQdv3oyrbF9lOg7vBvEFsXiIL3rxTT9umu4vSh0xUlaePVIWDt8tXyw8Rf5+7a970rQPhchpygEab08q0GV6DBSAZCkqKdEVxXMkx+A/jZNb/LZtvSw5r1Am7WmVP634tNs31Fgf2TT/lbx1w3rJxHnW1GlQ7kWycaxb8YRw9bXjD6k1BcCBUvHX9vyb+7SRIxU34oDXPfW4ztLnR/7zOvvVgPviv6K3gxvq9vKvvFr131f+MNIulaa33sAnOfKlE/3U4tOuQx/gg4TXzxouxzW0y5+f+lQ533IvvlS1xfvvwf8re9HWXACm2q7NaPGJa1aoDSApwyGqtaMbJTD4F/YEB0WKJrKh9RiMFfg0JweEYBn9FbdwUIfe8ysMsNrBIG0AF8tlYnCSEJdaUKBkfUp+vgIJJ4qTQ8AwnWycgMybNVvSJ30QASTddl8e2S8CY+D829Qk8n7xFTjVBIHSCX3KX18vDveN4l9SJwVzblT3k4z+8x7rUZbnGlwsqEHCL2YQJPwQob+1TuXR+XifBF8OwKn1HtWo/Y8LSWsxd1N6ApYU+3qtU0Li5lHr1GAsB+vA7x+QXbd/Fyv/cbWyqW9oSsMqp0yeMfJMeR77Rv6b0Sqvji8Q93V3SfJHG9WNt328CXtKhkjT6krp3LtHUrBfo3Ud32sOkr+1VTgRBGEauEjGuPFqQuoe+7M45nxdGlGO8cmZmeBGJx000ZZ/1TWSfuJJIm34NFd6uupvK/QsTn7a2PH4RNjnJH0c/kMA/SUXSMrIULpXx57d0viPpyX/2utUmha9u39yp1w9YbcEOtqlwvc5GbGvSeXXY6ePHBOWqX3sEQUgLqbUwYPVmOk8Fke+pDRg8eLFFEcJkR73uAsBKC5kXmUuoDlHwwvPW94YUc9VTsCQRXMwYSlJLf4m5bJNy2Vg4XEyc9RU+Y7jDFU10xsBAq7YFgxIC7gEKRbLVpkOkR/eMy02UjKATi4QFIuj1H2pycWiIVfcdt016lg+dbD8e9M78u3k4+W8b94he5csliF3/wrHUlUPF0Y0oqglp8m/crYdp6kCR5kSrQ6rtLiBAoA4UAElBvUSJ4Ji8RQVduAg58jDqueAtUA+c+WRDXds34qBOhtcIj8IGNTFAaQMP5yAwDHoC+I4UXySCw2ad1uQGyGO1+TK2WcFxS65cCMWIse0tvwhJVZZzo4ImgLkJYclUA3kw3kZwr0ADc9jUkygACBFqIX6yEwEh7HGzaef3I178KapZFIs+DwPQU+ALIUSxpXBGyQQCBTSAaTHQ1lnngXuk7w3/fgTGsBya3LO+Xw1RE+Dv6mhauC35wefmgUr4k171//hgYJHl/w0XPV7nVSBu2gzHgecii8qLc6Kz+pp8Afk283tqoKhyV1DloOY8Sld13f98wW9isuR5GGBvT/5EcdPUWdz48n+hqYJ/oaGTIzBiM76+kLcT+Q7qzozjuQ01GOomKdjsWmigs8Fx7HsBMciN6deZkc5F14ix/3mQbtkDxIWx9Jbuu7SVA0AQu7hRnAhWFLNly6VtpAjTClWAASVSiKfSiiBQYAMnLdQcQ6f50G1ciwrQ2Rybp6kjx3XkD7xhE1ZRVPWJWdkPJc7a/absW7CWB/6XVpXW7vo7M+dII2R+AhnG4e7Pjc1WW5Ij1+XXwSgbAZgut7sCVenToqgZFes/1BHTkefvfoi1nHjhJGu7OkXXBbo8Lvat289tX3Lx5abtQgcimJyaC22WDfFOTkySSu76iL0kw+RTwMhBnmRvtiu3xFAwSA7kVmLlwjugfhuVPfU32TXHd9TnSC6ySq1tcIbiUecZLsubE8fMeKNtHHjKxzXz12OjpIr9JhwD+z3gVsvvVDSAOJTseJzEZELfejEUUGnFoFMtkyi+Es9/kT5cM1l0tiUJO+8ly43zG6SNesvl+JzvqlWaqfPVy0B//C2jz7MYJnmt9dIFb6PT9oFML7e4ZfLrr1Wbvh5eDKm2w24KhTjp2HlE6e27d2/pH1rzcXN/347Qy9GXUwbAwQNwUOLkhycINn/a3otImnkn/6quHxkrO1VNVJK0X9yxTCpJYXBnYEYN8LMcEqME7I6+g408VrrHDQJY7HC3IsvUUoXZOcOdKpY1XPD13V1vTkWsfA3Fy+RvMqXZeDECcr6oTi0oOmIW9XRgf/02eCQWVdvl93PZsmgs/HvYfUDlMik2ATNRahC8CJMRpDxfKwAhZuTNOyjj2R2F0iY3CvKnTH7PVTwRcwL78XbsW1rAZXYWgCBoFHuACxEtk3zmvdGncWOaB0RXHH6Xpyox4O2y3BkUHoMvtgQmIkLN4ILoQAhKhG1PnRKWS2hnGSFVLh4I0ZlFHULn76sxep7A2EWWP3pv1gK9F9jbKMcQHEbI3pzjjZXobyLdWzd+omMGjWap1Y0F+1yQAIEypPLT5ZrLg+LDnnshRvl2rlhuT4deb3I6kBF1QgR42TRzkLk5yD3mtAm52eFrmjX7bfJ+if+Kq+1++WctGQZAV0rGdySRI5uHH9dRh/JdSiGbBaNzmY81uDCi1AabCGUhE4V4dRlCGpAgGj8GcDDirUZ/SGhYhEH1CF1kOVVCG/gv3HeBFuuB3sehpu5CDd287ixMnbV67rMOraFQfXpiN4c0bYL5QmUWLQSbXIC6DwMdKKfTzx0klzzPx+Fy1kBJZTfhWOsNsL1hyvsxQm66Ebx5ZyHj6efI562Dqloxx9AYFyHY1ynpWJs8QcPx6d0gSZacxS7A9w3KtCYrCENDC/K81lRta4nQptDQhUSGMqYYcdN7pKWTR/eAn1jAq+j0XYM9jpYF28AGG8AJLg5BY4LcQOXQHHkTazrxGc5wTIbK1/+S07xBb8ItRet2kTT3HEWKDHkq8a503CtToeP7LIyjGnoMzlLJeKKjfGm8xnI40Benym+R5eox4P6qutWPvlTnJ97dVqqzAF3fkVxar+8gDFfAQ6Th2U/DWN9dkqKnI8j8lq2xznYs2Sx7Cv7pT/j5FM25F5y2YPQD1cgf7VlAURa14SELc5hzo7UVCdEhyvrjKknpo8e82X9XIVix9/Q9RmJTQDAt7T5iLLsLMEx0YTwpMzMNf6mlrtP2Ly1wq5DvYnHYB5AeYddHdxR9/N3H/3wN+9X/JN7w2rmPt4yOm/I7dw99/iDkyI4SuXGl8Q1/QJdVVVS2fRZktI5E6NfsGTqzdvvnHrdH3SizXEuBt5jk9bj6A8njCxtSE37Zl5nR/hNsU4sytUh0LyJuSCnIWgqcrtb3ul4Ms3nTeQkqcOPq/b9aXk5XtauSu+s946t9tkC2xYoxjvBBGzBtdMYt+sOuOehk2h6orVDToGFYQYH/B/1sBieghFXdvxGvNJ2kAh9LELVa+2qVy/J47UH9Vom/ocoML+yBHl5X444gMJq5wIsXmxBrMD55MvHnNX0l0t/mB1lh16PPKBsKB76cPyomUlJgRIAN4KzadDsw4Oiq9JTwlUNvvNHeN50U/jacDILgOY9RaXkqKlIxAS4cXAihImeWCNImDA7I1VOgJjRihXK1SQF/AvT2mpHH79xq/tggiTUMVfo2O2g36ojSLJS0h/FFkE3MhFYDmbGQElaZkzpyr2n1WoPKj5p9c+aNdnc6Kxf82Q9JioKgdcU3TeX5MrHb9rmSmtvHyt+bHvE10VZcwruxQXRZAQJ4/f9ukyo41jQUou4blFRgYIb5UBGVMRnF+QmdgQuuBKm1PQTNm1zTty0vSwaO7Oro4fxnPhupEHChKlDT2xovuWFr3bLhIjWzuER0QSPJXE3OzYs56Rm7uHG8RhgKbGsow8jx1bvrD5+87aStI56J7j2XGiHNBC6EY2QHbfc3C0eEU7Mc8x+RgUKKmEFDmPtO75zcze3PdGMxhYT3Sds2jpz4qZtXmOZfjqfbG6HG6SM35S7v3hhl6wMKu1qFdqCIrJCb/gSYDl3xEnzeU2w8JMTNjTDJr7Po7kgwbU9J2zcVsSFigbKzY1Qt9y3LOwUNCYvCjEFY1zEuS1QQgUXGHKv2/W9+RX6cbiKV9q/f+7xm7Y6wEFKiW5D/v4+XYgGF4dCJY61fClN6SS44OuuZww94RWcKgI4fDgpC11SxOpT4ctZ084+J3yNk3XI7zFG/GvG0se+dvxFbYzjflZyLguqQb1Oi/iDGsWFSnGf1l7PT9QvRqjRDe6/r0zqnvzrIlyv1HE4khmUGK7jP0XlNMn4JcgSBCetoI8mjDrw0cRRAQTPRxNHFMVf22eQk28HLCsO6IB3m+/mfZh7gjjeZ+AvD98Y8G+F2o3w+sr0QEtLC6NJ1QiW9/r2zg0P6/rx9738w2k3gsvcxqFwTeX3owkjvZy/DyeO2rLF6XCgrwzsM8eA9+m066stR0GBUqyiIoQyhOq21LSyJPFDvNQP6Cfl1K7PccYnzwlnhJWDd3Xv4H2E40IniHPjdFZj/b5tXWmKu3yCa3IojkFVV1rX2ZnDTvy68PUIED6d5Uj69flUjL1dOQ6dM6Pym4Td+m2puSXoqw/Bg+BGcEbrbapdIgpW6zSibyx0D319yB+Xupyw11zhfiYrkzZ8aT7BvVbMn5t/hlwpP9BpmZnKDAruLdCRVsfkgAd+iKAuElDeXo9VtkMlLqQeuDmn5j4Z59ycFo2jhPP2o+USbrNXJ3SMGWne6grjpdX548+kvmoVHzOuI8UbzpMEwPANvsOAEp3TuIByGNx3ZBcDSa6uCOVu77q0O+N/coeopSWJLzeHr3W85VG9/G1oI7WjyDLfYR55ZAIlSYmaGjU3AfEmOkdbtqbsSahMVxv4ekCSM6Gyh0nmIxMo81d74BTDnwrhhW5/ckyxw7mCgmfmIOZr+ylN9ntVW51JTmHbRyDZKrMwlchCC2zumX4Fn02abTTqLLZLRH2VVmko40D8ZKu0OOJWIU8BPAS27eo6vvvdhadqtwpcKsBN/BS4dTXHgm1N7qE3QjdWE02h1Jnsjr0cq561jUa9CHbksutstHi7yhhvVw5Jrmjl+ipt48aPArXr8XQKfpQHf5FFsWXLbdGmE2ERAl+o6ksqtRsHq3g0zH4sQFiF0FuK2rYtR7Hq2JEcx51w7z4Pj+xp7fCFKDFkCV7MxiKMQwkCOd1nQuiDEw2zH26EfiHbVdMvrR9Cjbz84hMycphf9WhoYSAPboYIsYvJoRdzFTKUInyWIFmA9rcguBH6jY4BBUO9efMmGZ3llpHHdaqB/58LWwb+8Ieta02zQJC4THH9egmgLpIr51gAAATHSURBVEeDZf3aaKixY0DBQLz9yj1y0vEdEeN/0efbnIhQb4hhgkpxXoTwmVEIJO7PqgPHgIKRT04d1G38d+xMYRzmJ6wPdMvTXxHoQwnacvdXe1btHO7KLK0Tj9WNJRL3+em3Zj770gMLr7iwPl2Xe/GVDHyfFdvdYz9+554WD4IPobfkNVcQAupSc7zFNcfCi1CN0BPy9qQQl5IXwY5cPanUrjLG29WHJFeUcl67conGQ3l1fO9buY88sCT7/WtnFNyhy6PtLVHar0KaQ+c9GEfU74nSPpN8CO6D0XZcdaLxowoodoPCmYhCTrtyfRGPdp1R2mbSQQeqvo9jOooeCYsjJ8oiWkdV9saLqiuJcZwZJZ0ij/tI+kLkRWkmmHQMKNGHKNokjIletE9SXVFq4YayqijpfZp0DChRhjPGaqVYcEUp3hdJ0cBY0RcNxFvHMaDEHqnKKFlWHGSwFNm13Z/chH043M3jyZioVXaDGSW+HAPtiZJuTGK+YmOE4dyB81XoQzWODGZiOifbh1CFUI3gReBL7Iw7/Ak3fzhYPehmj6g03hlC7XzGQxO0L+kAKlsUqw/RGoxVtq/Tj4meGCMaWvnuGNkSTXagQCmAsBaB54c8HQNKHFMEsFQg271xZE00SxEKrDocwHIMKHFOLcBSgqwL48yeSDaCZUUiBT6LvMeAksCoAyxlyD4FIZollECN4awucBV3+OoQPDncrR56J6t6MK7VPSijigAsbI8TS04wk+cIsciBDJNjZKJy64mR5zNLPlSAwgnvCVVh4lw9KdjbMiHAEDRxUUgP8SDzDJsCToIvVK9Nls8uOproiTYIRYl2GYPgilImWltRih0+SQAA3/OdiR5zO4AduUwJ60zX4csQRwtfH+yTaECpjtK43aqIUiTqxptobUWr83BM80TptMOUVm26Nl66jRcH+zwaULxRGqeM5uqIi0LonxMlszdK2tGcVBHl5hf0J1exBUpIVkZjk8vj6SjyOHGzy6PcMJOiDUiMooddcnECPY41LpwDZwL1HZys6IQbIRYtQgaHVQ8QPweB7upo5LEqq+NQkNzLjrw63+FwxE3EGk+X+T5QxmN386F4jm80bm2uskfXSbFKoRNVyBPLtPMhjxeBeUlOhJkIDoRoRGuHmn61XSa070LaKpv0SpRl+kEhtO1ExX01CRyPoigdrcW9dBuvUB+qUK4gSlkm+RC8CMzbE+JYentSUJVBR4sQDha5Y3UMDX9mHCVG2309JqV2Y4GGSvq6MYv6bNtnv2x1FN1poIwInauv+/BYjro9fVjf4VwVdcEyuxvAODGt3C69P+JjAoWdCE1oX4KFIHH3xw0eBm1Q/M7EePii9TU0Xp8ZWOICCm8AHfXgMB2hBqGnxEGZG7rpntZxJJXjeLgwHuTaMSk0bguRkeX6leIGCnuFjnpxKEJYjJBoZ7kaqLh6cDxGwQeLHI+4QKIHDPnLcM454Hj2GyUEFPYKHfUhlOLUiTAXYSWCHWgqkbYQYSzKuBGqcX40E8eJEzwdY+Hq6XiwHIIb9YxF4PhynA8qJfVl7dCkiXQHbsLbV/WiTgfqYr1WRNBWWSX0RVyMthNtogp99SVaKNH86LMr0TKh/ARftV3Z/w9navZL9IyNJQAAAABJRU5ErkJggg==';

        const pdf = new jsPDF({ lineHeight: 1.5 });
        const string = renderToString(<Prints data={this.state} />);
        pdf.addImage(niceimage, 'png', 10, 10, 18, 25);
        pdf.setFontSize(12);
        pdf.text('Sistema de Planejamento Acadêmico', 40, 20);
        pdf.text('Relatório de turma por semestre - Campus Araranguá', 40, 25);
        pdf.line(30, 30, 560, 30);
        // pdf.setLineWidth(2);
        pdf.setFont('helvetica');
        pdf.addImage(niceimage, 'png', 10, 10, 18, 25);
        pdf.fromHTML(string, 25, 40);
        pdf.addPage();
        pdf.save('relatorio_ufsc.pdf');
        // });
    };

    async obterCursos() {
        const response = await api.get('/curriculo/obterCursos');
        let i = 0;
        for (i = 0; i < response.data.length; i++) {
            this.setState({ array1: [...this.state.array1, { value: response.data[i].id_curso, label: response.data[i].descricao_curso }] })
        }
    }


    async obterSemestres() {
        const response = await api.post('/relatorios/selecionarTodosSemestres');
        let i = 0;
        for (i = 0; i < response.data.length; i++) {
            this.setState({ array2: [...this.state.array2, { value: response.data[i].id_semestre, label: response.data[i].descricao }] })
        }
    }

    async componentDidMount() {
        this.setState({ place1: 'o Curso', s1: false })
        this.obterCursos();
        this.state.select = [this.state.s1, true, true];
        await this.forceUpdate();
        this.obterSemestres();
        this.setState({ place2: 'o Semestre', s1: false })
        this.state.select = [this.state.s1, this.state.s2, true];
        await this.forceUpdate();
    }

    // selecionar professor para fazer o relatório por professor disciplina
    disciplinaProfessor = async selectOption1 => {
        await this.setState({ selectOption1 });
        const r = await api.post('/relatorios/disciplinaProfessor', {
            id_professor: selectOption1.value
        })
        this.setState({ arrayProfessorRelatorio: r.data })

    };

    handleChangeCursos = async selectedOptionCursos => {
        await this.setState({ selectedOptionCursos });

        const r = await api.post("/disciplina/buscarSemestre", {
            id_course: selectedOptionCursos.value
        })
        for (var i = 1; i <= r.data[0].semestres; i++) {
            this.setState({ arrayFases: [...this.state.arrayFases, { value: i, label: i + "º Semestre" }], habilitarSemestre: true })
        }
    };


    async buscarTurmas() {
        const rTurmas = await api.post('/relatorios/buscarTurmas');
        rTurmas.data.map(item => {
            this.setState({ array1: [...this.state.array1, { value: item.id_turmas, label: item.codigo }], s1: false })
        })
        this.state.select = [this.state.s1, true, true];
        this.forceUpdate();
    }

    async obterProfessores() {
        const rProfessor = await api.post('/relatorios/todosProfessores');
        rProfessor.data.map(item => {
            this.setState({ array1: [...this.state.array1, { value: item.id_professor, label: item.nome }], s1: false })
        })
        this.state.select = [this.state.s1, true, true];
        this.forceUpdate();
    }

    async obterFases() {
        const response2 = await api.post("/disciplina/buscarSemestre", {
            id_course: this.state.selectOption1.value
        })

        var rows = [];
        for (var i = 1; i <= response2.data[0].semestres; i++) {
            this.setState({ array3: [...this.state.array3, { value: i, label: i + "º Semestre" }] })
            this.setState({ carregou: true })
        }

    }

    limparDados() {
        this.setState({
            array1: '',
            array2: '',
            array3: '',
            arrayRelatorio1: ''
        })
    }

    handleChangeRelatorio = async event => {
        await this.setState({ tipoRelatorio: event.target.value });
        const state = this.state;


        if (state.tipoRelatorio == 1) {
            await this.limparDados();
            this.setState({ place1: 'o Curso', s1: false })
            this.obterCursos();
            this.state.select = [this.state.s1, true, true];
            this.forceUpdate();
            this.obterSemestres();
            this.state.select = [this.state.s1, this.state.s2, true];
            this.forceUpdate();
        }
        if (state.tipoRelatorio == 2) {
            await this.limparDados();
            this.setState({ place1: 'o Professor', s1: false })
            this.obterCursos();
            this.state.select = [this.state.s1, true, true];
            this.forceUpdate();
            this.obterProfessores();
        }
        if (state.tipoRelatorio == 3) {
            await this.limparDados();
            this.setState({ place1: 'o Curso', s1: false })
            this.obterCursos();
            this.state.select = [this.state.s1, true, true];
            this.forceUpdate();

            this.setState({ place2: 'o Semestre', s1: false })
            this.obterSemestres();
            this.state.select = [this.state.s1, this.state.s2, true];
            this.forceUpdate();


        }

    }

    // onchanges
    onChange1 = async selectOption1 => {
        await this.setState({ selectOption1 });
        if (this.state.tipoRelatorio == 3) {
            this.setState({ place3: 'a Fase' })
            this.obterFases();
            this.state.select = [this.state.s1, this.state.s2, false];
            this.forceUpdate();
        }
    };
    onChange2 = async selectOption2 => {
        await this.setState({ selectOption2 });
    };
    onChange3 = async selectOption3 => {
        await this.setState({ selectOption3 });
    };


    //Gerar Relatório
    async gerarRelatorio(op) {
        if (op == 1) {
            const r1 = await api.post('/relatorios/turmaSemestre', {
                id_curso: this.state.selectOption1.value,
                id_semestre: this.state.selectOption2.value
            })
            this.setState({ arrayRelatorio1: r1.data })
            // this.imprimir()
        }
        if (op == 2) {
            const r2 = await api.post('/relatorios/disciplinaProfessor', {
                id_professor: this.state.selectOption1.value
            });
            this.setState({ arrayRelatorio2: r2.data })

        }
        //id_course, id_semestre, fase
        if (op == 3) {
            const r3 = await api.post('/relatorios/gradeSemestralCursoFase', {
                id_course: this.state.selectOption1.value,
                id_semestre: this.state.selectOption2.value,
                fase: this.state.selectOption3.value,
            });

            console.log("r3: ", r3.data);

            // this.setState({ arrayRelatorio3: r2.data })

        }

    }

    render() {
        const columns = [
            {
                dataField: 'codigo',
                text: 'Turma',
            },
            {
                dataField: 'descricao_curso',
                text: 'Curso',
            },
            {
                dataField: 'dia_semana',
                text: 'Dia da semana',
            },
            {
                dataField: 'horario_inicio',
                text: 'Horário de Início',
            },
            {
                dataField: 'qtde_alunos',
                text: 'Quantidade de Alunos',
            },
            {
                dataField: 'qtde_aulas',
                text: 'Quantidade de Aulas',
            },

        ];
        const columns2 = [
            {
                dataField: 'nome_professor',
                text: 'Nome',
            },
            {
                dataField: 'nome_disciplina',
                text: 'Disciplina',
            },
            {
                dataField: 'dia_semana',
                text: 'Dia da semana',
            },
            {
                dataField: 'qtde_alunos',
                text: 'Quantidade de Alunos',
            },
            {
                dataField: 'qtde_aulas',
                text: 'Quantidade de Aulas',
            },


        ];
        const columns3 = [
            {
                dataField: 'nome_professor',
                text: 'Nome',
            },
            {
                dataField: 'nome_disciplina',
                text: 'Disciplina',
            },
            {
                dataField: 'dia_semana',
                text: 'Dia da semana',
            },
            {
                dataField: 'qtde_alunos',
                text: 'Quantidade de Alunos',
            },
            {
                dataField: 'qtde_aulas',
                text: 'Quantidade de Aulas',
            },


        ];
        const { classes } = this.props;
        const { selectOption1, selectOption2, selectOption3 } = this.state;
        const { tipoRelatorio } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Header />
                </AppBar>

                <div className={classes.controllerDiv}>
                    <div className={classes.filterDiv}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Selecione o relatório desejado:</FormLabel>

                            <RadioGroup className={classes.formGroup}
                                aria-label="relatorio"
                                name="relatorio"
                                value={tipoRelatorio}
                                onChange={this.handleChangeRelatorio}
                            >

                                <FormControlLabel className={classes.radio}
                                    value="1"
                                    control={<Radio name="rel" color="primary" />}
                                    label="Turma/Semestre"
                                />
                                <FormControlLabel className={classes.radio}
                                    value="2"
                                    control={<Radio name="rel" color="primary" />}
                                    label="Disciplina/Professor"
                                />
                                <FormControlLabel className={classes.radio}
                                    value="3"
                                    control={<Radio name="rel" color="primary" />}
                                    label="Grade Semestral Curso/Fase" />
                                <FormControlLabel className={classes.radio}
                                    value="4"
                                    control={<Radio name="rel" color="primary" />}
                                    label="Carga horário por semestre" />
                                <FormControlLabel className={classes.radio}
                                    value="5"
                                    control={<Radio name="rel" color="primary" />}
                                    label="Disciplina Teórica/Prática" />
                                <FormControlLabel className={classes.radio}
                                    value="6"
                                    control={<Radio name="rel" color="primary" />}
                                    label="Professor/Departamento" />
                            </RadioGroup>

                        </FormControl>

                        <div className={classes.selectGroup}>
                            <FormLabel component="legend">Filtre seu resultado:</FormLabel>
                            <Select id="cadastro_turmas_input_1"
                                value={selectOption1}
                                onChange={this.onChange1}
                                options={this.state.array1}
                                className={classes.select}
                                placeholder={`Selecione a ${this.state.place1}`}
                                isDisabled={this.state.select[0]}
                            />
                            <Select id="cadastro_turmas_input_1"
                                value={selectOption2}
                                onChange={this.onChange2}
                                options={this.state.array2}
                                className={classes.select}
                                placeholder={`Selecione ${this.state.place2}`}
                                isDisabled={this.state.select[1]}
                            />
                            <Select id="cadastro_turmas_input_1"
                                value={selectOption3}
                                onChange={this.onChange3}
                                options={this.state.array3}
                                className={classes.select}
                                placeholder={`Selecione ${this.state.place3}`}
                                isDisabled={this.state.select[2]}
                            />

                        </div>
                    </div>

                    <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => this.gerarRelatorio(this.state.tipoRelatorio)}>
                        Gerar Relatório
                    </Button>
                </div>

                <div className={classes.table}>
                    {this.state.arrayRelatorio1.length != 0 ?
                        <BootstrapTable
                            keyField="id"
                            id="rel1"
                            pagination={paginator()}
                            data={this.state.arrayRelatorio1}
                            columns={columns}
                        />
                        : null}
                    {this.state.arrayRelatorio2.length != 0 ?
                        <BootstrapTable
                            keyField="id"
                            id="rel1"
                            pagination={paginator()}
                            data={this.state.arrayRelatorio2}
                            columns={columns2}
                            style={{ textAlign: 'center' }}
                        />
                        : null}
                    {this.state.arrayRelatorio3.length != 0 ?
                        <BootstrapTable
                            keyField="id"
                            id="rel1"
                            pagination={paginator()}
                            data={this.state.arrayRelatorio3}
                            columns={columns2}
                            style={{ textAlign: 'center' }}
                        />
                        : null}

                </div>
            </div>
        );
    }
}

Definicao.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Definicao);
