import { Container, Grid, makeStyles, MenuItem, Table, Paper, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { data } from '../../Data/data'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../Images/sedeges-logo.png'


const Home = () => {
    const styles = useStyles()
    const [changeDataLunes, setChangeDataLunes] = useState({
        dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '',
    })
    const [changeDataMartes, setChangeDataMartes] = useState({
        dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '',
    })
    const [changeDataMiercoles, setChangeDataMiercoles] = useState({
        dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '',
    })
    const [changeDataJueves, setChangeDataJueves] = useState({
        dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '',
    })
    const [changeDataViernes, setChangeDataViernes] = useState({
        dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '',
    })
    const [changeDataSabado, setChangeDataSabado] = useState({
        dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '',
    })
    const [changeDataDomingo, setChangeDataDomingo] = useState({
        dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '',
    })

    //-------------HANDLE CHANGE----------------------
    const handleChangeLunes = (e) => {
        setChangeDataLunes({ ...changeDataLunes, [e.target.name]: e.target.value })
    }
    const handleChangeMartes = (e) => {
        setChangeDataMartes({ ...changeDataMartes, [e.target.name]: e.target.value })
    }
    const handleChangeMiercoles = (e) => {
        setChangeDataMiercoles({ ...changeDataMiercoles, [e.target.name]: e.target.value })
    }
    const handleChangeJueves = (e) => {
        setChangeDataJueves({ ...changeDataJueves, [e.target.name]: e.target.value })
    }
    const handleChangeViernes = (e) => {
        setChangeDataViernes({ ...changeDataViernes, [e.target.name]: e.target.value })
    }
    const handleChangeSabado = (e) => {
        setChangeDataSabado({ ...changeDataSabado, [e.target.name]: e.target.value })
    }
    const handleChangeDomingo = (e) => {
        setChangeDataDomingo({ ...changeDataDomingo, [e.target.name]: e.target.value })
    }
    //------------GUARDAR-------------------------------------------
    const [saveLunes, setSaveLunes] = useState([])
    const [saveMartes, setSaveMartes] = useState([])
    const [saveMiercoles, setSaveMiercoles] = useState([])
    const [saveJueves, setSaveJueves] = useState([])
    const [saveViernes, setSaveViernes] = useState([])
    const [saveSabado, setSaveSabado] = useState([])
    const [saveDomingo, setSaveDomingo] = useState([])
    const saveDay = (e) => {
        // console.log(e)
        if (e === 'Lunes') {
            setSaveLunes({ ...changeDataLunes, dia: e })
        }
        else if (e === 'Martes') {
            setSaveMartes({ ...changeDataMartes, dia: e })
        }
        else if (e === 'Miercoles') {
            setSaveMiercoles({ ...changeDataMiercoles, dia: e })
        }
        else if (e === 'Jueves') {
            setSaveJueves({ ...changeDataJueves, dia: e })
        }
        else if (e === 'Viernes') {
            setSaveViernes({ ...changeDataViernes, dia: e })
        }
        else if (e === 'Sabado') {
            setSaveSabado({ ...changeDataSabado, dia: e })
        }
        else if (e === 'Domingo') {
            setSaveDomingo({ ...changeDataDomingo, dia: e })
        }
    }
    const newData = []
    newData.push(saveLunes)
    newData.push(saveMartes)
    newData.push(saveMiercoles)
    newData.push(saveJueves)
    newData.push(saveViernes)
    newData.push(saveSabado)
    newData.push(saveDomingo)
    // console.log(newData)
    //-----------------PDF GENERATE-------------------------------------
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.height()
        doc.addImage(`${sello}`, 12, 0.3, 1, 1)
        doc.setFontSize(14)
        doc.setFont('Courier', 'Bold');
        doc.text(`GOBIERNO AUTONOMO DEPARTAMENTAL DE POTOSI`, pageWidth / 2, 0.5, 'center')
        doc.text(`SECRETARIA DE DESARROLLO HUMANO`, pageWidth / 2, 0.7, 'center')
        doc.text(`SERVICIO DEPARTAMENTAL DE GESTION SOCIAL`, pageWidth / 2, 0.9, 'center')
        doc.text(`INSTANCIA TECNICA DEPARTAMENTAL DE POLITICA SOLCIAL`, pageWidth / 2, 1.1, 'center')
        doc.autoTable({
            head: [
                [
                    { content: 'DIAS' },
                    { content: 'DESAYUNO' },
                    { content: 'SOBRE ALIM.' },
                    { content: 'SOPA' },
                    { content: 'SEGUNDO' },
                    { content: 'POSTRE' },
                    { content: 'TE' },
                    { content: 'CENA' },
                ]
            ],
            body: newData.map((d) => ([
                { content: d.dia ? d.dia : '' },
                { content: d.desayuno ? d.desayuno : '' },
                { content: d.sobreAlimento ? d.sobreAlimento : '' },
                { content: d.sopa ? d.sopa : '' },
                { content: d.segundo ? d.segundo : '' },
                { content: d.postre ? d.postre : '' },
                { content: d.te ? d.te : '' },
                { content: d.cena ? d.cena : '' },
            ])),
            startY: 1.5
        })
        doc.setFontSize(9)
        doc.text(`Solicitado Por:`, pageWidth / 6, doc.lastAutoTable.finalY + 0.95, 'left')
        doc.text(`Aprobado Por:`, pageWidth / 2, doc.lastAutoTable.finalY + 1, 'center')
        doc.text(`Nutricionista:`, pageWidth / 2, doc.lastAutoTable.finalY + 1.1, 'center')
        doc.text(`Vo. Bo. por Jefe de Unidad`, pageWidth / 1.2, doc.lastAutoTable.finalY + 0.95, 'right')
        window.open(doc.output('bloburi'))
    }
    //-----------BORRAR TODO------------------------------
    const borrarTodo = (e) => {
        e.preventDefault()
        setChangeDataLunes({ dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '' })
        setChangeDataMartes({ dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '' })
        setChangeDataMiercoles({ dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '' })
        setChangeDataJueves({ dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '' })
        setChangeDataViernes({ dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '' })
        setChangeDataSabado({ dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '' })
        setChangeDataDomingo({ dia: '', desayuno: '', sobreAlimento: '', sopa: '', segundo: '', postre: '', te: '', cena: '' })
    }

    return (
        <>
            <Container maxWidth='lg'>
                <Typography className={styles.title} variant='h5' align='center'>HORARIO</Typography>
                <Paper component={Box} p={0.3} style={{ marginBottom: 15 }}>
                    <TableContainer id='table' style={{ borderRadius: 5 }}>
                        <Table style={{ minWidth: 1000 }}>
                            <TableHead >
                                <TableRow>
                                    <TableCell className={styles.styleTablehead} align='center'>DIAS</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'>DESAYUNO</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'>SOBRE ALIM.</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'>SOPA</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'>SEGUNDO</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'>POSTRE</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'>TE</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'>CENA</TableCell>
                                    <TableCell className={styles.styleTablehead} align='center'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((e, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ fontWeight: 'bold' }}>{e.dia}</TableCell>
                                        <TableCell>
                                            <TextField
                                                name={e.names.desayuno}
                                                variant='outlined'
                                                size='small'
                                                select
                                                label='Desayuno'
                                                fullWidth
                                                value={e.dia === 'Lunes' ? changeDataLunes.desayuno :
                                                    e.dia === 'Martes' ? changeDataMartes.desayuno :
                                                        e.dia === 'Miercoles' ? changeDataMiercoles.desayuno :
                                                            e.dia === 'Jueves' ? changeDataJueves.desayuno :
                                                                e.dia === 'Viernes' ? changeDataViernes.desayuno :
                                                                    e.dia === 'Sabado' ? changeDataSabado.desayuno :
                                                                        changeDataDomingo.desayuno}
                                                align='center'
                                                onChange={e.dia === 'Lunes' ? handleChangeLunes :
                                                    e.dia === 'Martes' ? handleChangeMartes :
                                                        e.dia === 'Miercoles' ? handleChangeMiercoles :
                                                            e.dia === 'Jueves' ? handleChangeJueves :
                                                                e.dia === 'Viernes' ? handleChangeViernes :
                                                                    e.dia === 'Sabado' ? handleChangeSabado :
                                                                        handleChangeDomingo}
                                            >
                                                {e.desayuno.map((d, index) => (
                                                    <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={e.names.sobreAlimento}
                                                variant='outlined'
                                                size='small'
                                                select
                                                label='Sobre Alimento'
                                                fullWidth
                                                value={e.dia === 'Lunes' ? changeDataLunes.sobreAlimento :
                                                    e.dia === 'Martes' ? changeDataMartes.sobreAlimento :
                                                        e.dia === 'Miercoles' ? changeDataMiercoles.sobreAlimento :
                                                            e.dia === 'Jueves' ? changeDataJueves.sobreAlimento :
                                                                e.dia === 'Viernes' ? changeDataViernes.sobreAlimento :
                                                                    e.dia === 'Sabado' ? changeDataSabado.sobreAlimento :
                                                                        changeDataDomingo.sobreAlimento}
                                                align='center'
                                                onChange={e.dia === 'Lunes' ? handleChangeLunes :
                                                    e.dia === 'Martes' ? handleChangeMartes :
                                                        e.dia === 'Miercoles' ? handleChangeMiercoles :
                                                            e.dia === 'Jueves' ? handleChangeJueves :
                                                                e.dia === 'Viernes' ? handleChangeViernes :
                                                                    e.dia === 'Sabado' ? handleChangeSabado :
                                                                        handleChangeDomingo}
                                            >
                                                {e.sobreAlimento.map((d, index) => (
                                                    <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={e.names.sopa}
                                                variant='outlined'
                                                size='small'
                                                select
                                                label='Sopa'
                                                fullWidth
                                                value={e.dia === 'Lunes' ? changeDataLunes.sopa :
                                                    e.dia === 'Martes' ? changeDataMartes.sopa :
                                                        e.dia === 'Miercoles' ? changeDataMiercoles.sopa :
                                                            e.dia === 'Jueves' ? changeDataJueves.sopa :
                                                                e.dia === 'Viernes' ? changeDataViernes.sopa :
                                                                    e.dia === 'Sabado' ? changeDataSabado.sopa :
                                                                        changeDataDomingo.sopa}
                                                align='center'
                                                onChange={e.dia === 'Lunes' ? handleChangeLunes :
                                                    e.dia === 'Martes' ? handleChangeMartes :
                                                        e.dia === 'Miercoles' ? handleChangeMiercoles :
                                                            e.dia === 'Jueves' ? handleChangeJueves :
                                                                e.dia === 'Viernes' ? handleChangeViernes :
                                                                    e.dia === 'Sabado' ? handleChangeSabado :
                                                                        handleChangeDomingo}
                                            >
                                                {e.sopa.map((d, index) => (
                                                    <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={e.names.segundo}
                                                variant='outlined'
                                                size='small'
                                                select
                                                label='Segundo'
                                                fullWidth
                                                value={e.dia === 'Lunes' ? changeDataLunes.segundo :
                                                    e.dia === 'Martes' ? changeDataMartes.segundo :
                                                        e.dia === 'Miercoles' ? changeDataMiercoles.segundo :
                                                            e.dia === 'Jueves' ? changeDataJueves.segundo :
                                                                e.dia === 'Viernes' ? changeDataViernes.segundo :
                                                                    e.dia === 'Sabado' ? changeDataSabado.segundo :
                                                                        changeDataDomingo.segundo}
                                                align='center'
                                                onChange={e.dia === 'Lunes' ? handleChangeLunes :
                                                    e.dia === 'Martes' ? handleChangeMartes :
                                                        e.dia === 'Miercoles' ? handleChangeMiercoles :
                                                            e.dia === 'Jueves' ? handleChangeJueves :
                                                                e.dia === 'Viernes' ? handleChangeViernes :
                                                                    e.dia === 'Sabado' ? handleChangeSabado :
                                                                        handleChangeDomingo}
                                            >
                                                {e.segundo.map((d, index) => (
                                                    <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={e.names.postre}
                                                variant='outlined'
                                                size='small'
                                                select
                                                label='Postre'
                                                fullWidth
                                                value={e.dia === 'Lunes' ? changeDataLunes.postre :
                                                    e.dia === 'Martes' ? changeDataMartes.postre :
                                                        e.dia === 'Miercoles' ? changeDataMiercoles.postre :
                                                            e.dia === 'Jueves' ? changeDataJueves.postre :
                                                                e.dia === 'Viernes' ? changeDataViernes.postre :
                                                                    e.dia === 'Sabado' ? changeDataSabado.postre :
                                                                        changeDataDomingo.postre}
                                                align='center'
                                                onChange={e.dia === 'Lunes' ? handleChangeLunes :
                                                    e.dia === 'Martes' ? handleChangeMartes :
                                                        e.dia === 'Miercoles' ? handleChangeMiercoles :
                                                            e.dia === 'Jueves' ? handleChangeJueves :
                                                                e.dia === 'Viernes' ? handleChangeViernes :
                                                                    e.dia === 'Sabado' ? handleChangeSabado :
                                                                        handleChangeDomingo}
                                            >
                                                {e.postre.map((d, index) => (
                                                    <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={e.names.te}
                                                variant='outlined'
                                                size='small'
                                                select
                                                label='Té'
                                                fullWidth
                                                value={e.dia === 'Lunes' ? changeDataLunes.te :
                                                    e.dia === 'Martes' ? changeDataMartes.te :
                                                        e.dia === 'Miercoles' ? changeDataMiercoles.te :
                                                            e.dia === 'Jueves' ? changeDataJueves.te :
                                                                e.dia === 'Viernes' ? changeDataViernes.te :
                                                                    e.dia === 'Sabado' ? changeDataSabado.te :
                                                                        changeDataDomingo.te}
                                                align='center'
                                                onChange={e.dia === 'Lunes' ? handleChangeLunes :
                                                    e.dia === 'Martes' ? handleChangeMartes :
                                                        e.dia === 'Miercoles' ? handleChangeMiercoles :
                                                            e.dia === 'Jueves' ? handleChangeJueves :
                                                                e.dia === 'Viernes' ? handleChangeViernes :
                                                                    e.dia === 'Sabado' ? handleChangeSabado :
                                                                        handleChangeDomingo}
                                            >
                                                {e.te.map((d, index) => (
                                                    <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={e.names.cena}
                                                variant='outlined'
                                                size='small'
                                                select
                                                label='Cena'
                                                fullWidth
                                                value={e.dia === 'Lunes' ? changeDataLunes.cena :
                                                    e.dia === 'Martes' ? changeDataMartes.cena :
                                                        e.dia === 'Miercoles' ? changeDataMiercoles.cena :
                                                            e.dia === 'Jueves' ? changeDataJueves.cena :
                                                                e.dia === 'Viernes' ? changeDataViernes.cena :
                                                                    e.dia === 'Sabado' ? changeDataSabado.cena :
                                                                        changeDataDomingo.cena}
                                                align='center'
                                                onChange={e.dia === 'Lunes' ? handleChangeLunes :
                                                    e.dia === 'Martes' ? handleChangeMartes :
                                                        e.dia === 'Miercoles' ? handleChangeMiercoles :
                                                            e.dia === 'Jueves' ? handleChangeJueves :
                                                                e.dia === 'Viernes' ? handleChangeViernes :
                                                                    e.dia === 'Sabado' ? handleChangeSabado :
                                                                        handleChangeDomingo}
                                            >
                                                {e.cena.map((d, index) => (
                                                    <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <Button size='small' color='primary' variant='contained' onClick={() => saveDay(e.dia)}>Guardar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Grid container justifyContent='space-evenly' alignItems='center' >
                    <Button size='small' variant='contained' color='primary' onClick={borrarTodo}>borrar todo</Button>
                    <Button size='small' variant='contained' color='secondary' onClick={pdfGenerate}>imprimir</Button>
                </Grid>
            </Container>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    title: {
        margin: '2rem',
        fontWeight: 600,
        fontSize: 30,
        color:'white'
    },
    styleTablehead: {
        color: 'white',
        backgroundColor: "black",
        paddingTop: 5,
        paddingBottom: 5,

    },
    styleTableBody: {
        padding: 0
    }
}))
export default Home