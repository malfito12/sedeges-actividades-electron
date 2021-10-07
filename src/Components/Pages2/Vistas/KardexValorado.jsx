import { Container, Box, makeStyles, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, InputAdornment, TextField, Button, Tooltip, IconButton } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
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
const KardexValorado = (props) => {
    const {history}=props
    const classes = useStyles()
    var aux = props.location.pathname
    aux = aux.split("/")
    // console.log(aux)
    const [kardex, setKardex] = useState([])

    useEffect(() => {
        getKardex()
    }, [])

    //--------------GET KARDEX VALORADO------------------------------------
    const getKardex = async () => {
        const result = await ipcRenderer.invoke("get-kardexValorado", aux[4])
        setKardex(JSON.parse(result))
    }
    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarInfoKardex = (buscador) => {
        return function (x) {
            return x.registerDate.includes(buscador) ||
                x.procedenciaDestino.toLowerCase().includes(buscador) ||
                x.procedenciaDestino.includes(buscador) ||
                x.precioUnitario.includes(buscador)||
                !buscador
        }
    }
    //---------------------------GENERAR PDF---------------------------------------------
    var image=sello
    const pdfGenerate = () => {
        const doc = new jsPDF()
        doc.setFontSize(18)
        doc.text(`Tajeta de Existencia Kardex valorado`, 75, 25)
        doc.addImage(image,25,10,35,20)
        doc.setFontSize(13)
        doc.text(`N°: ....`, 160, 32)
        doc.text(`Aticulo: ${aux[5]}`, 15, 38)
        doc.text(`Sector: INGENIO CACHITAMBO`, 15, 46)
        doc.text(`Unidad :  ${aux[7]}`, 100, 52)
        doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 60 } })
        window.open(doc.output('bloburi'))
        // doc.save('ListaMateriales.pdf')

    }
    //-------------------------------------------------------------------
    const irAtras=()=>{
        history.push(`/listaSubmateriales/${aux[2]}/${aux[3]}`)
    }
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
    // console.log(kardex)
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }} >
                <Typography style={{ paddingTop: '5rem' }} variant='h5' align='center'>Tarjeta de Existencia Kardex Valorado</Typography>
                <Grid  container justifyContent='flex-end'>
                    <Tooltip title='atras'>
                        <IconButton style={{ color: 'black' }} onClick={irAtras}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6}>
                        <Typography>N°: ... </Typography>
                        <Typography>Articulo: {aux[5]}</Typography>
                        <Typography>Sector: INGENIO</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Almacen de: CACHITAMBO</Typography>
                        <Typography>Unidad: {aux[7]}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            {kardex &&
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
                        <Button variant='contained' color='primary' size='small' style={{ marginBottom: '1rem' }} onClick={pdfGenerate}>imprimir</Button>
                    </Grid>
                </Grid>
                <Paper component={Box} p={1}>
                    <TableContainer>
                        <Table border='1' id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead} colSpan='3'></TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2'>Entradas</TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2'>Salidas</TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2'>Saldos</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2'>Precio Unitario</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead}>Fecha</TableCell>
                                    <TableCell className={classes.styleTablehead}>nota de remision M.R.V.S.V.C</TableCell>
                                    <TableCell className={classes.styleTablehead}>Procedencia o Destino</TableCell>
                                    <TableCell className={classes.styleTablehead}>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead}>Valor $us</TableCell>
                                    <TableCell className={classes.styleTablehead}>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead}>Valor $us</TableCell>
                                    <TableCell className={classes.styleTablehead}>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead}>Valor $us</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {kardex.length > 0 ? (
                                    kardex.filter(buscarInfoKardex(buscador)).map((k, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{k.registerDate}</TableCell>
                                            <TableCell>{}</TableCell>
                                            <TableCell>{k.procedenciaDestino}</TableCell>
                                            <TableCell>{k.cantidadF}</TableCell>
                                            <TableCell>{k.precio}</TableCell>
                                            <TableCell>{k.cantidadS}</TableCell>
                                            <TableCell>{k.precioS}</TableCell>
                                            <TableCell>{k.totalCantidad}</TableCell>
                                            <TableCell>{k.totalValor}</TableCell>
                                            <TableCell>{k.precioUnitario}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell></TableCell>
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

export default KardexValorado
