import { Container, Box, makeStyles, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, TextField, InputAdornment, Button, IconButton, Tooltip } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    styleTablehead: {
        color: 'white',
        backgroundColor: "black",
        align: 'center'
    }
}))
const TarjetaExistencia = (props) => {
    const {history}=props
    const classes = useStyles()
    // console.log(props)
    var aux = props.location.pathname
    aux = aux.split("/")
    // console.log(aux)
    const [tarjeta, setTarjeta] = useState([])

    useEffect(() => {
        getTarjeta()
    }, [])

    //--------------------GET TARJETA--------------------------------
    const getTarjeta = async () => {
        const result = await ipcRenderer.invoke("get-tarjetaExistencia", aux[4])
        setTarjeta(JSON.parse(result))
    }
    //------------------------BUSCADOR------------------------------
    const [buscador, setBuscador] = useState("")
    const buscarInfoTarjeta = (buscador) => {
        try {
            // return function(x){
            //     var fecha=x.numeroIngreso;
            //     console.log(fecha)
            //     // if(x.registerDate){
            //     //     fecha=x.registerDate.includes()
            //     // }
            //     // return fecha || !buscador
            // }
            return function (x) {
                return x.registerDate.includes(buscador) ||
                    x.numeroIngreso.toLowerCase().includes(buscador) ||
                    x.numeroIngreso.includes(buscador) ||
                    x.saldoExistencia.includes(buscador) ||
                    !buscador
            }
        } catch (error) {

        }
    }
    //---------------------------PDF GENERATE-------------------------
    var image = sello
    const pdfGenerate = () => {
        const doc = new jsPDF()
        doc.setFontSize(22)
        doc.text(`Tabla de Existencia`, 85, 25)
        doc.addImage(image, 20, 10, 35, 20)
        doc.setFontSize(13)
        doc.text(`Kadex N°:   ${aux[4]}`, 15, 35)
        doc.text(`Unidad:   ${aux[7]}`, 120, 35)
        doc.text(`Articulo:   ${aux[5]}`, 15, 42)
        doc.text(`Stock Minimo :   ${aux[6]}`, 50, 49)
        doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 55 } })
        window.open(doc.output('bloburi'))
    }
    //--------------------------------------------------------------
    const irAtras=()=>{
        history.push(`/listaSubmateriales/${aux[2]}/${aux[3]}`)
    }
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    console.log(tarjeta)
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem' }} variant='h5' align='center'>TARJETA DE EXISTENCIA {aux[5]}</Typography>
                <Grid  container justifyContent='flex-end'>
                    <Tooltip title='atras'>
                        <IconButton style={{ color: 'black' }} onClick={irAtras}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6}>
                        <Typography>Kardex N°: {aux[4]}</Typography>
                        <Typography>Articulo: {aux[5]}</Typography>
                        <Typography>Stock Minino: {aux[6]} "saldo inicio"</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography >Unidad: {aux[7]}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginBottom: '0.5rem' }}>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            {tarjeta &&
                                <TextField
                                    // style={{width:'100%'}}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <>
                                                <Typography variant='subtitle1' style={{ marginRight: '0.5rem' }}>Buscar</Typography>
                                                <InputAdornment position='start'>
                                                    <SearchIcon />
                                                </InputAdornment>

                                            </>
                                        )
                                    }}
                                    onChange={e => setBuscador(e.target.value)}
                                />
                            }
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} sm={6} justifyContent='flex-end'>
                        <Button variant='contained' color='primary' size='small' onClick={pdfGenerate}>imprimir</Button>
                    </Grid>
                </Grid>
                <Paper component={Box} p={1}>
                    <TableContainer>
                        <Table id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead}>Fecha</TableCell>
                                    <TableCell className={classes.styleTablehead}>Pedido de Vale N°</TableCell>
                                    <TableCell className={classes.styleTablehead}>Ingreso N°</TableCell>
                                    <TableCell className={classes.styleTablehead}>Seccion</TableCell>
                                    <TableCell className={classes.styleTablehead}>Entradas</TableCell>
                                    <TableCell className={classes.styleTablehead}>Salidas</TableCell>
                                    <TableCell className={classes.styleTablehead}>Saldo en Existecia</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tarjeta.length > 0 ? (
                                    tarjeta.filter(buscarInfoTarjeta(buscador)).map((t, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{t.registerDate}</TableCell>
                                            <TableCell>{t.numVale}</TableCell>
                                            <TableCell>{t.numeroIngreso}</TableCell>
                                            <TableCell>{ }</TableCell>
                                            <TableCell>{t.cantidadF}</TableCell>
                                            <TableCell>{t.cantidadS}</TableCell>
                                            <TableCell>{t.saldoExistencia}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan='7' align='center'>no se encuentran datos</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </Container>
    )
}

export default TarjetaExistencia
