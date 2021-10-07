import { Container, makeStyles, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, TextField, InputAdornment, Button } from '@material-ui/core'
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
const ListaSalidaAlmacen = () => {
    const classes = useStyles()
    const [salidaAlmacen, setSalidaAlmacen] = useState([])

    useEffect(() => {
        getSalidaAlmacen()
    }, [])

    //---------------GET SALIDA ALMACEN------------------------
    const getSalidaAlmacen = async () => {
        const result = await ipcRenderer.invoke("get-salidaAlmacen")
        setSalidaAlmacen(JSON.parse(result))
    }
    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarMaterialSalidas = (buscador) => {
        return function (x) {
            return x.registerDate.includes(buscador) ||
                x.unidadMedida.toLowerCase().includes(buscador) ||
                x.unidadMedida.includes(buscador) ||
                x.nameSubMaterial.includes(buscador) ||
                x.nameSubMaterial.toLowerCase().includes(buscador) ||
                x.codSubMaterial.includes(buscador) ||
                x.codSubMaterial.toLowerCase().includes(buscador) ||
                !buscador
        }
        
    }
    //--------------------------------------PDF GENERATE---------------------------------
    var image=sello
    const pdfGenerate =()=>{
        const doc= new jsPDF()
        doc.text(`Saldia de Materiales de Almacen`,70,25)
        // document.getElementById('desaparecer').style.display='none'
        // doc.text(`Tabla de ${data[0].numFactura}`,20,15)
        doc.addImage(image,25,10,35,20)
        doc.autoTable({html:"#id-table", styles: { halign: 'center' }, margin:{top:35}})
        // document.getElementById('desaparecer').style.display='revert'
        window.open(doc.output('bloburi'))
    }
    //--------------------------------------------------------
    //--------------------------------------------------------
    //--------------------------------------------------------
    // console.log(salidaAlmacen)
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom: '2rem' }} align='center' variant='h5'>SALIDAS ALMACEN</Typography>
                <Grid container spacing={3} style={{ marginBottom: '0.5rem' }}>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            {salidaAlmacen &&
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
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Item de Salida</TableCell>
                                    {/* <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>N° Registro</TableCell> */}
                                    {/* <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>N° Factura</TableCell> */}
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Unidad</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Descripcion</TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2' align='center'>Registro de Existencia</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center'>Fecha</TableCell>
                                </TableRow>
                                <TableRow>
                                    {/* <TableCell className={classes.styleTablehead}>Facturada</TableCell>
                                    <TableCell className={classes.styleTablehead}>Recibida</TableCell> */}
                                    <TableCell className={classes.styleTablehead}>kardex</TableCell>
                                    <TableCell className={classes.styleTablehead}>Bs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {salidaAlmacen.length > 0 ? (
                                    salidaAlmacen.filter(buscarMaterialSalidas(buscador)).map((s, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{s.cantidadS}</TableCell>
                                            <TableCell>{s.unidadMedida}</TableCell>
                                            <TableCell>{s.nameSubMaterial}</TableCell>
                                            <TableCell>{s.codSubMaterial}</TableCell>
                                            <TableCell>{s.precioS}</TableCell>
                                            <TableCell>{s.registerDate}</TableCell>
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

export default ListaSalidaAlmacen
