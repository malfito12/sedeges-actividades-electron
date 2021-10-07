import { Container, Paper, Table,TextField,Button, makeStyles, TableBody, TableContainer, TableCell, TableHead, TableRow, Typography, Grid, InputAdornment } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
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

const IngresosAlmacen = () => {
    const classes = useStyles()
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const result = await ipcRenderer.invoke('get-almacen')
            setData(JSON.parse(result))
        })()
    }, [])
//--------------------------------------PDF GENERATE---------------------------------
    var image=sello
    const pdfGenerate =()=>{
        const doc= new jsPDF()
        doc.text(`Materiales Almacen`,90,20)
        // document.getElementById('desaparecer').style.display='none'
        // doc.text(`Tabla de ${data[0].numFactura}`,20,15)
        doc.addImage(image,20,10,30,15)
        doc.autoTable({html:"#id-table", styles: { halign: 'center' }, margin:{top:30}})
        // document.getElementById('desaparecer').style.display='revert'
        window.open(doc.output('bloburi'))
    }
//---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarMaterial = (buscador) => {
        return function (x) {
            return x.numFactura.includes(buscador) ||
                x.registerDate.includes(buscador) ||
                x.unidadMedida.toLowerCase().includes(buscador) ||
                x.unidadMedida.includes(buscador) ||
                x.description.toLowerCase().includes(buscador) ||
                x.description.includes(buscador) ||
                x.numIngreso.includes(buscador) ||
                x.cod.includes(buscador) ||
                !buscador
        }
        
    }
    // console.log(data)
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom: '2rem' }} variant='h4' align='center'>Ingreso de Materiales Almacén</Typography>
                <Grid container spacing={3} style={{ marginBottom: '0.5rem' }}>
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
                        <Button size='small' variant='contained' color='primary' onClick={pdfGenerate}>imprimir</Button>
                    </Grid>
                </Grid>
                <Paper>
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
                                {data.filter(buscarMaterial(buscador)).map((d, index) => (
                                    <TableRow key={d._id}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{d.numIngreso}</TableCell>
                                        <TableCell>{d.numFactura}</TableCell>
                                        <TableCell>{d.cantF}</TableCell>
                                        <TableCell>{d.cantR}</TableCell>
                                        <TableCell>{d.unidadMedida}</TableCell>
                                        <TableCell>{d.description}</TableCell>
                                        <TableCell>{d.cod}</TableCell>
                                        <TableCell>{d.priceEntrada}</TableCell>
                                        <TableCell>{d.registerDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </Container>
    )
}

export default IngresosAlmacen
