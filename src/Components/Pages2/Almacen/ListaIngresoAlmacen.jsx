import { Container, makeStyles, Paper, Box, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, TextField, InputAdornment, Button } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'

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
const ListaIngresoAlmacen = () => {
    const classes = useStyles()
    const [ingresoAlmacen, setIngresoAlmacen] = useState([])

    useEffect(() => {
        getIngresoAlmacen()
    }, [])

    //----------------GET INGRESO ALMACEN---------------------
    const getIngresoAlmacen = async () => {
        const result = await ipcRenderer.invoke(`get-ingresoAlmacen`)
        setIngresoAlmacen(JSON.parse(result))
    }
    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarIngresosAlmacen = (buscador) => {
        return function (x) {
            return x.numFactura.includes(buscador) ||
                x.numFactura.toLowerCase().includes(buscador) ||
                x.registerDate.includes(buscador) ||
                x.unidadMedida.toLowerCase().includes(buscador) ||
                x.unidadMedida.includes(buscador) ||
                x.nameSubMaterial.toLowerCase().includes(buscador) ||
                x.nameSubMaterial.includes(buscador) ||
                x.numeroIngreso.toLowerCase().includes(buscador) ||
                x.numeroIngreso.includes(buscador) ||
                x.codSubMaterial.toLowerCase().includes(buscador) ||
                x.codSubMaterial.includes(buscador) ||
                !buscador
        }

    }
    //--------------------------------------PDF GENERATE---------------------------------
    var image=sello
    const pdfGenerate =()=>{
        const doc= new jsPDF()
        doc.text(`Ingreso de Materiales a Almacen`,70,25)
        // document.getElementById('desaparecer').style.display='none'
        // doc.text(`Tabla de ${data[0].numFactura}`,20,15)
        doc.addImage(image,25,10,35,20)
        doc.autoTable({html:"#id-table", styles: { halign: 'center' }, margin:{top:35}})
        // document.getElementById('desaparecer').style.display='revert'
        window.open(doc.output('bloburi'))
    }
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    // console.log(ingresoAlmacen)
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom: '2rem' }} align='center' variant='h5'>INGRESOS ALMACEN</Typography>
                <Grid container spacing={3} style={{ marginBottom: '0.5rem' }}>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            {ingresoAlmacen &&
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
                        <Button size='small' variant='contained' color='primary' onClick={pdfGenerate}>imprimir</Button>
                    </Grid>
                </Grid>
                <Paper component={Box} p={1}>
                    <TableContainer>
                        <Table border='1' id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Item del Pedido</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>N° Registro</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>N° Factura</TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2' align='center'>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Unidad</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Descripcion</TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2' align='center'>Registro de Existencia</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Fecha</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead}>Facturada</TableCell>
                                    <TableCell className={classes.styleTablehead}>Recibida</TableCell>
                                    <TableCell className={classes.styleTablehead}>kardex</TableCell>
                                    <TableCell className={classes.styleTablehead}>Bs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ingresoAlmacen.length > 0 ? (
                                    ingresoAlmacen.filter(buscarIngresosAlmacen(buscador)).map((i, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{i.numeroIngreso}</TableCell>
                                            <TableCell>{i.numFactura}</TableCell>
                                            <TableCell>{i.cantidadF}</TableCell>
                                            <TableCell>{i.cantidadR}</TableCell>
                                            <TableCell>{i.unidadMedida}</TableCell>
                                            <TableCell>{i.nameSubMaterial}</TableCell>
                                            <TableCell>{i.codSubMaterial}</TableCell>
                                            <TableCell>{i.precio}</TableCell>
                                            <TableCell>{i.registerDate}</TableCell>
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

export default ListaIngresoAlmacen
