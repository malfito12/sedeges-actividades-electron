import { Container, Box, makeStyles, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, InputAdornment, TextField, Button, Tooltip, IconButton, AppBar, Toolbar } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import UnidadMedida from '../Registros/UnidadMedida';
import PrintIcon from '@material-ui/icons/Print';

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    styleTablehead: {
        color: 'white',
        backgroundColor: "black",
        align: 'center',
        fontSize: 'small',
        padding: 0,
    }
}))
const KardexValorado = (props) => {
    const { history } = props
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
        try {
            const result = await ipcRenderer.invoke("get-kardexValorado", aux[4])
            setKardex(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarInfoKardex = (buscador) => {
        return function (x) {
            return x.registerDate.includes(buscador) ||
                x.procedenciaDestino.toLowerCase().includes(buscador) ||
                x.procedenciaDestino.includes(buscador) ||
                x.precioUnitario.includes(buscador) ||
                !buscador
        }
    }
    //---------------------------GENERAR PDF---------------------------------------------
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [14, 7] })
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.height()

        doc.setFontSize(16)
        doc.setFont('Courier', 'Bold');
        doc.addImage(`${sello}`, 0.5, 0.3, 1.5, 0.7)
        doc.text(`Tajeta de Existencia Kardex valorado`, pageWidth / 2, 1, 'center')
        doc.setFontSize(13)
        doc.text(`N°: ....`, 10, 1.2)
        doc.text(`Aticulo: ${aux[5]}`, 3, 1.4)
        doc.text(`Sector: INGENIO CACHITAMBO`, 3, 1.6)
        doc.text(`Unidad :  ${aux[7]}`, 9, 1.4)
        doc.autoTable({
            headStyles: {
                fillColor: [50, 50, 50]
            },
            bodyStyles: {
                cellPadding: 0.01
            },

            head: [
                [
                    { content: '', colSpan: 3, styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Entradas', colSpan: 2, styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Salidas', colSpan: 2, styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Saldos', colSpan: 2, styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Precio Unitario', rowSpan: 2, styles: { lineWidth: 0.01, halign: 'center', valign: 'middle' } },
                ],
                [
                    { content: 'Fecha', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Nota de Remision M.R.V.S.V.C.', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Procedencia - Destino', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Cantidad', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Valor Bs.', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Cantidad', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Valor Bs.', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Cantidad', styles: { lineWidth: 0.01, halign: 'center' } },
                    { content: 'Valor Bs.', styles: { lineWidth: 0.01, halign: 'center' } },
                ]
            ],
            body: kardex.map((d) => ([
                { content: d.registerDate },
                { content: d.remision ? d.remision : '' },
                { content: d.procedenciaDestino ? d.procedenciaDestino : '' },
                { content: d.cantidadF ? d.cantidadF : '', styles: { halign: 'right' } },
                { content: d.precio ? d.precio : '', styles: { halign: 'right' } },
                { content: d.cantidadS ? d.cantidadS : '', styles: { halign: 'right' } },
                { content: d.precioS ? d.precioS : '', styles: { halign: 'right' } },
                { content: d.totalCantidad ? d.totalCantidad : '', styles: { halign: 'right' } },
                { content: d.totalValor ? d.totalValor : '', styles: { halign: 'right' } },
                { content: d.precioUnitario ? d.precioUnitario : '', styles: { halign: 'right' } },
            ])),
            styles: { fontSize: 10, font: 'courier', fontStyle: 'bold' },
            startY: 1.7,
        })
        var pages = doc.internal.getNumberOfPages()
        for (var i = 1; i <= pages; i++) {
            var horizontalPos = pageWidth / 2
            var verticalPos = pageHeight - 0.2
            doc.setFontSize(8)
            doc.setPage(i)
            doc.text(`${i} de ${pages}`, horizontalPos, verticalPos, { align: 'center' })
        }
        window.open(doc.output('bloburi'))
        // doc.save('ListaMateriales.pdf')

    }
    //-------------------------------------------------------------------
    const irAtras = () => {
        history.push(`/listaSubmateriales/${aux[2]}/${aux[3]}`)
    }
    //-------------------------------------------------------------------
    // console.log(kardex)
    return (
        <>
            <Container maxWidth='md' style={{ paddingTop: '2rem', marginBottom: '1rem' }}>
                <Paper component={Box} p={1}>
                    <Typography variant='h5' align='center'>Tarjeta de Existencia Kardex Valorado</Typography>
                    <Grid container >
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
                </Paper>
            </Container>
            <Container maxWidth='lg'>
                <Grid container direction='row' justifyContent='flex-end' alignItems='center' style={{ marginBottom: '0.5rem' }}>
                    {kardex &&
                        <TextField
                            style={{ background: 'white', borderRadius: 5, marginRight: '1rem' }}
                            variant='outlined'
                            size='small'
                            // fullWidth
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
                    <IconButton
                        component="span"
                        style={{
                            color: 'white',
                            background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
                            marginRight: '0.5rem',
                        }}
                        onClick={pdfGenerate}>
                        <Tooltip title='imprimir'>
                            <PrintIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        style={{
                            color: 'white',
                            background: 'linear-gradient(45deg, #0277bd 30%, #82b1ff 90%)',
                            marginRight: '0.5rem',
                        }}
                        onClick={irAtras}
                        to="/listaProduct">
                        <Tooltip title='atras'>
                            <ArrowBackIcon />
                        </Tooltip>
                    </IconButton>
                </Grid>
                <Paper component={Box} p={0.3}>
                    <TableContainer style={{ maxHeight: 500 }}>
                        <Table border='1' id='id-table' style={{ minWidth: 1000 }} stickyHeader size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead} align='center' colSpan='3'></TableCell>
                                    <TableCell className={classes.styleTablehead} align='center' colSpan='2'>Entradas</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center' colSpan='2'>Salidas</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center' colSpan='2'>Saldos</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center' rowSpan='2'>Precio Unitario</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead} align='center'>Fecha</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>nota de remision M.R.V.S.V.C</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Procedencia o Destino</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Valor Bs.</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Valor Bs.</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Valor Bs.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {kardex.length > 0 ? (
                                    kardex.filter(buscarInfoKardex(buscador)).map((k, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{k.registerDate}</TableCell>
                                            <TableCell>{ }</TableCell>
                                            <TableCell>{k.procedenciaDestino}</TableCell>
                                            <TableCell align='right'>{k.cantidadF}</TableCell>
                                            <TableCell align='right'>{k.precio}</TableCell>
                                            <TableCell align='right'>{k.cantidadS}</TableCell>
                                            <TableCell align='right'>{k.precioS}</TableCell>
                                            <TableCell align='right'>{k.totalCantidad}</TableCell>
                                            <TableCell align='right'>{k.totalValor}</TableCell>
                                            <TableCell align='right'>{k.precioUnitario}</TableCell>
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
            </Container>

        </>
    )
}

export default KardexValorado
