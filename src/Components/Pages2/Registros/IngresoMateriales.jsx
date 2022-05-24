import { Container, Box, MenuItem, Grid, makeStyles, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'
import ArchiveIcon from '@material-ui/icons/Archive';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import { ErrorPrintIngresoMat, ErrorRegisterIngresoMat, SuccessRegisterIngresoMat } from '../../Atoms/Alerts/Alerts'


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
const IngresoMateriales = () => {
    const classes = useStyles()
    const [material, setMaterial] = useState([])
    const [subMaterial, setSubMaterial] = useState([])
    const [unidadMedida, setUnidadMedida] = useState([])
    const [numeroIngreso, setNumeroIngreso] = useState([])
    const [openAlertPrintError, setOpenAlertPrintError] = useState(false)
    const [openAlertRegisterError, setOpenAlertRegisterError] = useState(false)
    const [openAlertRegisterSuccess, setOpenAlertRegisterSuccess] = useState(false)
    const [changeData, setChageData] = useState({
        typeRegister: 'entrada',
        numFactura: '',
        nameMaterial: '',
        nameSubMaterial: '',
        cantidadF: '',
        cantidadR: '',
        deDonde: '',
        unidadMedida: '',
        precio: '',
        precioUnitario: '',
        procedenciaDestino: '',
        registerDate: '',
        // image: ''
    })

    useEffect(() => {
        getMaterial()
        getUnidadMedida()
        getNumeroIngreso()
    }, [])

    //------------GET MATERIAL-------------------------------
    const getMaterial = async () => {
        try {
            const result = await ipcRenderer.invoke('get-material')
            setMaterial(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //-------------------POST ENTRADA DE MATERIALES--------------------------
    const postEntradas = async (e) => {
        e.preventDefault()
        if (uno.length > 0) {
            try {
                const result = await ipcRenderer.invoke('post-entradas', uno)
                console.log(JSON.parse(result))
                openCloseAlertRegisterSuccess()
                setTimeout(() => { setOpenAlertRegisterSuccess(false) }, 4000)
            } catch (error) {
                console.log(error)
                openCloseAlertRegisterError()
                setTimeout(() => { setOpenAlertRegisterError(false) }, 4000)
            }
        } else {
            openCloseAlertRegisterError()
            setTimeout(() => { setOpenAlertRegisterError(false) }, 4000)
        }

    }
    //---------------------GET NUMERO DE INGRESO-------------------------
    const getNumeroIngreso = async () => {
        try {
            const result = await ipcRenderer.invoke(`get-numeroIngreso`)
            setNumeroIngreso(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------GET UNIDAD DE MEDIDA---------------------
    const getUnidadMedida = async () => {
        try {
            const result = await ipcRenderer.invoke('get-unidadMedida')
            setUnidadMedida(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //------------------GET SUB-MATERIALES--------------------------
    const getSubMaterial = async (e) => {
        try {
            const result = await ipcRenderer.invoke('get-submaterial', e)
            setSubMaterial(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
        // console.log(e)
    }
    //-------------------TABLA AUXILIAR--------------------------
    const [uno, setUno] = useState([])
    var dos;
    const introducir = (e) => {
        e.preventDefault()
        var aux = changeData.nameSubMaterial
        var aux2 = changeData.nameMaterial
        aux = aux.split("/")
        aux2 = aux2.split("/")
        const nuevo = { nameSubMaterial: aux[1], codSubMaterial: aux[0], nameMaterial: aux2[1], codMaterial: aux2[0] }
        dos = { ...changeData, ...nuevo }

        setUno([...uno, dos])
        document.getElementById('cantidadF').value = ""
        document.getElementById('cantidadR').value = ""
        document.getElementById('precio').value = ""
        document.getElementById('precioUnitario').value = ""
    }
    // console.log(uno)
    //-------------------HANDLECHANGE--------------------------
    const handleChange = (e) => {
        // console.log(aux)
        if (e.target.name === 'nameMaterial') {
            var aux = e.target.value
            aux = aux.split("/")
            getSubMaterial(aux[0])
        }
        setChageData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    // console.log(numeroIngreso)
    //----------------------PDF GENERATE------------------------
    var aux;
    var aux2 = 0;
    var numIn;
    var quebrado = new Date()
    quebrado = quebrado.toString()
    quebrado = quebrado.split("")
    try {
        aux = numeroIngreso[0].numeroIngreso
        aux = aux.split("-")
        aux = parseInt(aux[1])
        aux = aux + 1
        aux = aux.toString()
        numIn = "IAC-" + aux + " /" + quebrado[13] + quebrado[14]
        // numIn = aux
    } catch (error) {
        aux2++;
        aux2 = aux2.toString()
        numIn = "IAC-" + aux2 + " /" + quebrado[13] + quebrado[14]
        // numIn = aux2

    }
    const pdfGenerate = async () => {
        if (uno.length > 0) {
            const doc = new jsPDF({ orientation: 'portrait', unit: 'in', format: [11, 7] })
            var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.height()
            doc.setFontSize(14)
            doc.setFont('Courier', 'Bold');
            doc.addImage(`${sello}`, 0.5, 0.3, 1.3, 0.5)
            doc.text(`INGRESO DE MATERIALES A ALMACEN`, pageWidth / 2, 1, 'center')
            doc.setFontSize(8)
            // // doc.text(`N°:  ${uno[0].numNIT}`, 140, 30)
            doc.text(`N°: ${numIn}`, 5, 0.7)
            doc.text(`Potosi : ${uno[0].registerDate}`, 2, 1.2)
            doc.text(`Factura : ${uno[0].numFactura}`, 0.6, 1.35)
            doc.text(`Pedido N° : `, 0.6, 1.5)
            doc.text(`Carro F.C. N° : `, 0.6, 1.65)
            doc.text(`Peso : `, 0.6, 1.8)
            doc.text(`Recibido : `, 0.6, 1.95)
            doc.text(`De :  ${uno[0].deDonde}`, 2.6, 1.35)
            doc.text(`Fecha del Pedido : `, 2.6, 1.5)
            doc.text(`Carta Parte N° : `, 2.6, 1.65)
            doc.text(`Transportado en :`, 2.6, 1.8)
            doc.text(`Liquidacion N° :`, 2.6, 1.95)
            doc.text(`Seccion : `, 4.6, 1.5)
            doc.text(`Cantidad de Bultos : `, 4.6, 1.65)
            doc.text(`Fecha hoja de costo : `, 4.6, 1.8)
            doc.autoTable({
                headStyles: {
                    fillColor: [50, 50, 50],
                    cellPadding: 0.01
                },
                bodyStyles: {
                    cellPadding: 0.01
                },
                head: [
                    [
                        { content: 'Item de Pedido', rowSpan: 2, styles: { halign: 'center', valign: 'middle', cellWidth: 0.5 } },
                        { content: 'Cantidad', colSpan: 2, styles: { halign: 'center', cellWidth: 1 } },
                        { content: 'Unidad', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
                        { content: 'Descipción', rowSpan: 2, styles: { valign: 'middle', halign: 'center' } },
                        { content: 'Registro de Existencia', colSpan: 2, styles: { halign: 'center' } },
                    ],
                    [
                        { content: 'Facturada', styles: { halign: 'center' } },
                        { content: 'Recibida', styles: { halign: 'center' } },
                        { content: 'Kardex', styles: { halign: 'center' } },
                        { content: 'Monto Bs.', styles: { halign: 'center' } },
                    ]
                ],
                body: uno.map((d, index) => ([
                    { content: index + 1, styles: { halign: 'right' } },
                    { content: d.cantidadF ? d.cantidadF : "", styles: { halign: 'right' } },
                    { content: d.cantidadR ? d.cantidadR : "", styles: { halign: 'right' } },
                    { content: d.unidadMedida ? d.unidadMedida : "", styles: { halign: 'center' } },
                    { content: d.nameSubMaterial ? d.nameSubMaterial : "", styles: { halign: 'center' } },
                    { content: d.codSubMaterial ? d.codSubMaterial : "", styles: { halign: 'center' } },
                    { content: d.precio ? d.precio : "", styles: { halign: 'right' } },
                ])),
                styles: { fontSize: 8, font: 'courier', fontStyle: 'bold' },
                startY: 2.2,
            })

            doc.text(`Enc. Recepciones`, pageWidth / 6, doc.lastAutoTable.finalY + 0.95, 'left')
            doc.text(`Vo. Bo. Superintendente`, pageWidth / 2, doc.lastAutoTable.finalY + 1, 'center')
            doc.text(`Jefe de Almacen`, pageWidth / 1.2, doc.lastAutoTable.finalY + 0.95, 'right')
            var pages = doc.internal.getNumberOfPages()
            for (var i = 1; i <= pages; i++) {
                var horizontalPos = pageWidth / 2
                var verticalPos = pageHeight - 0.2
                doc.setFontSize(8)
                doc.setPage(i)
                doc.text(`${i} de ${pages}`, horizontalPos, verticalPos, { align: 'center' })
            }
            window.open(doc.output('bloburi'))
        } else {
            openCloseAlertPrintError()
            setTimeout(() => { setOpenAlertPrintError(false); }, 4000)
            // console.log('no se ecuentran datos para imprimir, llena antes la tabla !!!!!!')
        }
    }
    // ------------------ALERTS---------------------------
    const openCloseAlertPrintError = () => {
        setOpenAlertPrintError(!openAlertPrintError)
    }
    const openCloseAlertRegisterError = () => {
        setOpenAlertRegisterError(!openAlertRegisterError)
    }
    const openCloseAlertRegisterSuccess = () => {
        setOpenAlertRegisterSuccess(!openAlertRegisterSuccess)
    }

    // console.log(material)
    // console.log(changeData)
    // console.log(subMaterial)
    return (
        <>
            {/* ------------------------------------------------------------------*/}
            <Typography className={classes.spacingBot} style={{ paddingTop: '2rem', marginBottom: '1rem', color: 'white' }} variant='h6' align='center'>INGRESO DE MATERIALES</Typography>
            <Container maxWidth='md'>
                <form id='registerForm' onSubmit={introducir}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='numFactura'
                                label='N° de Factura'
                                variant='outlined'
                                className={classes.spacingBot}
                                fullWidth
                                size='small'
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                            <TextField
                                name='nameMaterial'
                                label='Material'
                                variant='outlined'
                                size='small'
                                select
                                fullWidth
                                className={classes.spacingBot}
                                value={changeData.nameMaterial}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            >
                                {material && material.map((m, index) => (
                                    <MenuItem key={m._id} value={`${m.codMaterial}/${m.nameMaterial}`} >{m.nameMaterial}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                name='nameSubMaterial'
                                label='Nombre Sub-Material'
                                variant='outlined'
                                fullWidth
                                size='small'
                                select
                                className={classes.spacingBot}
                                value={changeData.nameSubMaterial}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            >
                                {subMaterial && subMaterial.map((m, index) => (
                                    <MenuItem key={m._id} value={`${m.codSubMaterial}/${m.nameSubMaterial}`}>{m.nameSubMaterial}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id='cantidadF'
                                name='cantidadF'
                                label='Cantidad Facturada'
                                variant='outlined'
                                fullWidth
                                type='number'
                                size='small'
                                className={classes.spacingBot}
                                inputProps={{ step: 'any' }}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                            <TextField
                                id='cantidadR'
                                name='cantidadR'
                                label='Cantidad Recibida'
                                variant='outlined'
                                fullWidth
                                type='number'
                                size='small'
                                className={classes.spacingBot}
                                inputProps={{ step: 'any' }}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='deDonde'
                                label='De'
                                variant='outlined'
                                fullWidth
                                size='small'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                            <TextField
                                name='unidadMedida'
                                label='Unidad de Medida'
                                variant='outlined'
                                fullWidth
                                size='small'
                                select
                                value={changeData.unidadMedida}
                                className={classes.spacingBot}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            >
                                {unidadMedida && unidadMedida.map((u, index) => (
                                    <MenuItem key={index} value={u.nameUnidadMedida}>{u.nameUnidadMedida}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id='precio'
                                name='precio'
                                label='Valor o Precio Bs.'
                                variant='outlined'
                                fullWidth
                                type='number'
                                size='small'
                                className={classes.spacingBot}
                                inputProps={{ step: 'any' }}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                            <TextField
                                id='precioUnitario'
                                name='precioUnitario'
                                label='Precio Unitario Bs.'
                                variant='outlined'
                                fullWidth
                                type='number'
                                size='small'
                                className={classes.spacingBot}
                                inputProps={{ step: 'any' }}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                            <TextField
                                name='procedenciaDestino'
                                label='Procedencia o Destino'
                                variant='outlined'
                                fullWidth
                                size='small'
                                className={classes.spacingBot}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                            <TextField
                                name='registerDate'
                                label='fecha de Ingreso'
                                variant='outlined'
                                fullWidth
                                type='date'
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                className={classes.spacingBot}
                                onChange={handleChange}
                                style={{ background: 'white', borderRadius: 5 }}
                                required
                            />
                        </Grid>
                    </Grid>
                    <div align='center' style={{ marginTop: '1rem' }} >
                        <Button
                            size='small'
                            endIcon={<ArchiveIcon />}
                            variant='contained'
                            type='submit'
                            style={{
                                color: 'white',
                                background: 'linear-gradient(45deg, #0277bd 30%, #0097a7 90%)',
                            }} >insertar</Button>
                    </div>
                </form>
                {/* ---------------------ALERTS---------------------------- */}
                <div style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                    <ErrorPrintIngresoMat open={openAlertPrintError} setOpen={openCloseAlertPrintError} />
                    <ErrorRegisterIngresoMat open={openAlertRegisterError} setOpen={openCloseAlertRegisterError} />
                    <SuccessRegisterIngresoMat open={openAlertRegisterSuccess} setOpen={openCloseAlertRegisterSuccess} />
                </div>
                {/* ---------------------------------------------------- */}
                <Paper component={Box} p={0.3}>
                    <TableContainer>
                        <Table border='1' id='id-table' style={{ minWidth: 800 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center' style={{ width: '10%' }}>Item del Pedido</TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2' align='center' style={{ width: '20%' }}>Cantidad</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center' style={{ width: '15%' }}>Unidad</TableCell>
                                    <TableCell className={classes.styleTablehead} rowSpan='2' align='center' style={{ width: '35%' }}>Descripcion</TableCell>
                                    <TableCell className={classes.styleTablehead} colSpan='2' align='center' style={{ width: '20%' }}>Registro de Existencia</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead} align='center'>Facturada</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Recibida</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>kardex</TableCell>
                                    <TableCell className={classes.styleTablehead} align='center'>Bs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {uno.length > 0 ? (
                                    uno.map((u, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{u.cantidadF}</TableCell>
                                            <TableCell>{u.cantidadR}</TableCell>
                                            <TableCell>{u.unidadMedida}</TableCell>
                                            <TableCell>{u.nameSubMaterial}</TableCell>
                                            <TableCell>{u.codSubMaterial}</TableCell>
                                            <TableCell>{u.precio}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align='center' colSpan='7'>no se encuentran datos</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <div align='center' style={{ marginTop: '1rem' }} >
                    <Button
                        style={{
                            color: 'white',
                            background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)'
                        }}
                        variant='contained'
                        color='primary'
                        endIcon={<SaveIcon />}
                        onClick={postEntradas}
                        size='small'
                    >Registrar</Button>
                    <Button
                        style={{
                            color: 'white',
                            background: 'linear-gradient(45deg, #0277bd 30%, #0097a7 90%)',
                            marginLeft: '4rem'
                        }}
                        endIcon={<PrintIcon />}
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={pdfGenerate}
                    >imprimir</Button>
                </div>
            </Container>
        </>
    )
}

export default IngresoMateriales
