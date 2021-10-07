import { Container, Box, MenuItem, Grid, makeStyles, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, Dialog } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
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
    const [openModal, setOpenModal] = useState(false)
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
        const result = await ipcRenderer.invoke('get-material')
        setMaterial(JSON.parse(result))
    }
    //-------------------POST ENTRADA DE MATERIALES--------------------------
    const openModalRegister = () => {
        setOpenModal(true)
    }
    const closeModalRegister = () => {
        setOpenModal(false)
    }
    const postEntradas = async (e) => {
        e.preventDefault()
        const result = await ipcRenderer.invoke('post-entradas', uno)
        console.log(JSON.parse(result))
        openModalRegister()

    }
    //---------------------GET NUMERO DE INGRESO-------------------------
    const getNumeroIngreso = async () => {
        const result = await ipcRenderer.invoke(`get-numeroIngreso`)
        setNumeroIngreso(JSON.parse(result))
    }
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------GET UNIDAD DE MEDIDA---------------------
    const getUnidadMedida = async () => {
        const result = await ipcRenderer.invoke('get-unidadMedida')
        setUnidadMedida(JSON.parse(result))
    }
    //------------------GET SUB-MATERIALES--------------------------
    const getSubMaterial = async (e) => {
        const result = await ipcRenderer.invoke('get-submaterial', e)
        setSubMaterial(JSON.parse(result))
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
    console.log(uno)
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
    var image = sello
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
        numIn = "IAC-" + aux+" /"+quebrado[13]+quebrado[14]
        // numIn = aux
    } catch (error) {
        aux2++;
        aux2 = aux2.toString()
        numIn = "IAC-" + aux2+" /"+quebrado[13]+quebrado[14]
        // numIn = aux2

    }
    const pdfGenerate = () => {
        try {
            const doc = new jsPDF()
            // doc.setFont('helvetica')
            doc.setFontSize(17)
            doc.text(`INGRESO DE MATERIALES A ALMACEN`, 70, 30)
            doc.addImage(image, 20, 10, 35, 25)
            doc.setFontSize(13)
            doc.text(`Potosi :  ${uno[0].registerDate}`, 70, 40)
            // doc.text(`N°:  ${uno[0].numNIT}`, 140, 30)
            doc.text(`N°:  ${numIn}`, 150, 17)
            doc.text(`Factura : ${uno[0].numFactura}`, 15, 51)
            doc.text(`De :  ${uno[0].deDonde}`, 100, 51)
            doc.text(`Pedido N° : ..........................`, 15, 58)
            doc.text(`Fecha del Pedido : ..........`, 80, 58)
            doc.text(`Seccion : .................`, 140, 58)
            doc.text(`Carro F.C. N° : ..........................`, 15, 65)
            doc.text(`Carta Parte N° : ..........`, 80, 65)
            doc.text(`Cantidad de Bultos : .................`, 140, 65)
            doc.text(`Peso : ..........`, 15, 72)
            doc.text(`Transportado en : .................`, 80, 72)
            doc.text(`Recibido : ..........................`, 15, 79)
            doc.text(`Liquidacion N° : ..........`, 80, 79)
            doc.text(`Fecha hoja de costo : .................`, 140, 79)
            // doc.autoTable({ html: "#id-table", styles: { halign: 'center', lineWidth: 1 }, margin: { top: 80 } })
            // doc.autoTable({
            //     head: [
            //         [
            //             { content: 'Item de pedido', styles: { cellWidth: 20, rowSpan: 2, colSpan: 1 } },
            //             { content: 'Cantidad', styles: { cellWidth: 35, colSpan: 2, rowSpan: 1 } },
            //             { content: 'Unidad', styles: { cellWidth: 20, rowSpan: 2, colSpan: 1 } },
            //             { content: 'Descripción', styles: { cellWidth: 70 } },
            //             { content: 'Registro de Existencia', styles: { cellWidth: 37, rowSpan: 2, colSpan: 1 } },
            //         ],
            //         [
            //             { content: ' ', styles: { cellWidth: 20 } },
            //             { content: 'Facturada', styles: { cellWidth: 10 } },
            //             { content: 'Recibida', styles: { cellWidth: 10 } }
            //         ]
            //     ],
            //     styles: { lineWidth: 1 },
            //     startY: 110

            // })
            doc.autoTable({
                head: [[
                    { content: 'Item de pedido', styles: { cellWidth: 20 } },
                    { content: 'Cantidad', styles: { cellWidth: 40 } },
                    { content: 'Unidad', styles: { cellWidth: 20 } },
                    { content: 'Descripción', styles: { cellWidth: 60 } },
                    { content: 'Registro de Existencia', styles: { cellWidth: 41 } },
                ]],
                startY: 90,
                styles: { halign: 'center' },
                // styles: { lineWidth: 1 },
            })
            doc.autoTable({
                head: [[
                    { content: ' ', styles: { cellWidth: 20 } },
                    { content: 'Facturada', styles: { cellWidth: 20 } },
                    { content: 'Recibida', styles: { cellWidth: 20 } },
                    { content: ' ', styles: { cellWidth: 20 } },
                    { content: ' ', styles: { cellWidth: 60 } },
                    { content: 'Kardex', styles: { cellWidth: 20.5 } },
                    { content: 'Monto Bs', styles: { cellWidth: 20.5 } },
                ]],
                body: uno.map((d, index) => (
                    [
                        [index + 1],
                        [d.cantidadF],
                        [d.cantidadR],
                        [d.unidadMedida],
                        [d.nameSubMaterial],
                        [d.codSubMaterial],
                        [d.precio],
                    ]
                )),
                startY: 100,
                styles: { halign: 'center' },
                // styles: { lineWidth: 1 },
            })

            doc.text(`.....................................`, 30, 260)
            doc.text(`Enc. Recepciones`, 35, 265)
            doc.text(`........................................`, 87, 265)
            doc.text(`Vo. Bo. Superintendente`, 87, 270)
            doc.text(`....................................`, 140, 260)
            doc.text(`Jefe de Almacen`, 145, 265)
            window.open(doc.output('bloburi'))
        } catch (error) {
            alert('no se ecuentran datos para imprimir, llena antes la tabla !!!!!!')
        }
    }
    // console.log(material)
    // console.log(changeData)
    // console.log(uno)
    // console.log(subMaterial)
    return (
        <>
            <Container maxWidth={false}>
                <div style={{ paddingLeft: 240 }}>
                    <Typography className={classes.spacingBot} style={{ paddingTop: '5rem', marginBottom: '2rem' }} variant='h5' align='center'>Ingreso de Materiales</Typography>
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
                                    label='Valor o Precio $us'
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
                                    label='Precio Unitario'
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
                        <div align='center' style={{ marginTop: '1rem' }} className={classes.spacingBot}>
                            <Button size='small' variant='contained' color='primary' type='submit' >insertar</Button>
                        </div>
                    </form>
                    <Paper>
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
                    <div align='center' style={{ marginTop: '1rem' }} className={classes.spacingBot}>
                        <Button variant='contained' color='primary' onClick={postEntradas} size='small' >Registrar</Button>
                        <Button style={{ marginLeft: '4rem' }} variant='contained' color='primary' size='small' onClick={pdfGenerate} >imprimir</Button>
                    </div>
                </div>
            </Container>
            <Dialog
                open={openModal}
                onClose={closeModalRegister}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <div align='center'>
                        <Typography>Entrada Registrada</Typography>
                        <Button onClick={closeModalRegister} variant='contained' size='small' color='primary'>aceptar</Button>
                    </div>
                </Paper>
            </Dialog>
        </>
    )
}

export default IngresoMateriales
