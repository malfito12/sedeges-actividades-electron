import { Button, Container, Grid, TextField, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react'
import sello from '../../images/sello.png'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    styleTablehead: {
        color: 'white',
        backgroundColor: "black",
        align: 'center'
    }
}))
const KardexVal = (props) => {
    const classes = useStyles()
    const [data, setData] = useState([])
    var a = props.location.pathname
    a = a.split("/")

    useEffect(() => {
        ipcRenderer.send('get-product-kardex-entrada', a[3])
        ipcRenderer.on('get-product-kardex-entrada', (e, args) => {
            const entrada = JSON.parse(args)
            setData(entrada)

        })
    }, [])

    //---------------------------GENERAR PDF---------------------------------------------
    var image=sello
    const pdfGenerate = () => {
        const doc = new jsPDF()
        doc.setFontSize(13)
        doc.text(`Tajeta de Existencia Kardex valorado`, 75, 20)
        doc.addImage(image,20,10,30,15)
        doc.text(`N°: ....`, 160, 25)
        doc.text(`Aticulo: ${a[3]}`, 15, 33)
        doc.text(`Sector: Ingenio Cachitambo`, 15, 39)
        doc.text(`Unidad :  ${a[7]}`, 100, 39)
        doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 45 } })
        window.open(doc.output('bloburi'))
        // doc.save('ListaMateriales.pdf')

    }

    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarMaterial = (buscador) => {
        return function (x) {
            return x.registerDate.includes(buscador) ||
                x.procedenciaDestino.toLowerCase().includes(buscador) ||
                x.procedenciaDestino.includes(buscador) ||
                !buscador
        }
    }
    // console.log(a)
    // console.log(data)

    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom: '1rem' }} variant='h4' align='center'>Tarjeta de Existencia Kardex Valorado</Typography>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6}>
                        <Typography>N°: </Typography>
                        <Typography>Articulo: {a[3]}</Typography>
                        <Typography>Sector: ingenio</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Almacen de: Cachitambo</Typography>
                        <Typography>Unidad: {a[7]}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            {data &&
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
                <Paper>
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
                                {data.length > 0 ? (data.filter(buscarMaterial(buscador)).map((d, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{d.registerDate}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{d.procedenciaDestino}</TableCell>
                                        <TableCell>{d.cantE}</TableCell>
                                        <TableCell>{d.precioE}</TableCell>
                                        <TableCell>{d.cantS}</TableCell>
                                        <TableCell>{d.precioS}</TableCell>
                                        <TableCell>{d.totalCantidad}</TableCell>
                                        <TableCell>{d.totalPrecio}</TableCell>
                                        <TableCell>{d.precioUnitario}</TableCell>
                                    </TableRow>
                                ))) : (<TableRow>
                                        <TableCell colSpan='10' align='center'>No se encuentran Datos</TableCell>
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

export default KardexVal
