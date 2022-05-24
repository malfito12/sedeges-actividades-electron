import { Button, Container, Paper, Box, MenuItem, TableRow, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, Typography, Grid, InputAdornment, TextField, Tooltip, IconButton, Dialog, AppBar, Toolbar, Tabs, Tab } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UnidadMedida from '../Registros/UnidadMedida'
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    },
    spacingPaper: {
        marginBottom: '1rem',
        padding: 0
    }
}))
const ListaAlmacen = () => {
    const classes = useStyles()
    const [almacen, setAlmacen] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [unidadMedida, setUnidadMedida] = useState([])
    const [changeData, setChangeData] = useState({
        // _id:'',
        cantidad: '',
        nameMaterial: '',
        nameSubMaterial: '',
        precio: '',
        precioUnitario: '',
        procedenciaDestino: '',
        registerDate: '',
        unidadMedida: '',
    })

    useEffect(() => {
        getAlmacen()
        getUnidadMedida()
    }, [])

    //-----------------GET ALAMACEN--------------------------
    const getAlmacen = async () => {
        try {
            const result = await ipcRenderer.invoke(`get-almacen-all`)
            setAlmacen(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarMaterialAlmacen = (buscador) => {
        return function (x) {
            return x.registerDate.includes(buscador) ||
                x.typeRegister.toLowerCase().includes(buscador) ||
                x.typeRegister.includes(buscador) ||
                x.nameSubMaterial.toLowerCase().includes(buscador) ||
                x.nameSubMaterial.includes(buscador) ||
                x.unidadMedida.toLowerCase().includes(buscador) ||
                x.unidadMedida.includes(buscador) ||
                x.codSubMaterial.toLowerCase().includes(buscador) ||
                x.codSubMaterial.includes(buscador) ||
                !buscador
        }

    }
    //--------------------------------------PDF GENERATE---------------------------------
    const pdfGenerate = () => {
        const doc = new jsPDF({ orientation: 'portrait', unit: 'in', format: [11, 7] })
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.height()
        document.getElementById('desaparecer').style.display = 'none'
        doc.setFontSize(15)
        doc.setFont('Courier', 'Bold');
        doc.addImage(`${sello}`, 0.5, 0.3, 1.5, 0.7)
        doc.text(`Materiales Almacen`, pageWidth / 2, 1, 'center')
        doc.autoTable({
            headStyles: {
                fillColor: [50, 50, 50],
                cellPadding: 0.05
            },
            bodyStyles: {
                cellPadding: 0.05
            },
            head: [[
                { content: 'N°' },
                { content: 'Fecha', styles: { halign: 'center' } },
                { content: 'Tipo de Registro', styles: { halign: 'center' } },
                { content: 'Descripción', styles: { halign: 'center' } },
                { content: 'Cantidad', styles: { halign: 'center' } },
                { content: 'Precio', styles: { halign: 'center' } },
                { content: 'Unidad Medida', styles: { halign: 'center' } },
                { content: 'Cod-Kardex', styles: { halign: 'center' } },
            ]],
            body: almacen.map((d, index) => ([
                { content: index + 1 },
                { content: d.registerDate ? d.registerDate : "", styles: { halign: 'center' } },
                { content: d.typeRegister ? d.typeRegister : "", styles: { halign: 'center' } },
                { content: d.nameSubMaterial ? d.nameSubMaterial : "" },
                { content: d.cantidad ? d.cantidad : "", styles: { halign: 'right' } },
                { content: d.precio ? d.precio : "", styles: { halign: 'right' } },
                { content: d.unidadMedida ? d.unidadMedida : "", styles: { halign: 'center' } },
                { content: d.codSubMaterial ? d.codSubMaterial : "", styles: { halign: 'center' } },
            ])),
            styles: { fontSize: 7, font: 'courier', fontStyle: 'bold' },
            startY: 1.3,
        })
        var pages = doc.internal.getNumberOfPages()
        for (var i = 1; i <= pages; i++) {
            var horizontalPos = pageWidth / 2
            var verticalPos = pageHeight - 0.2
            doc.setFontSize(8)
            doc.setPage(i)
            doc.text(`${i} de ${pages}`, horizontalPos, verticalPos, { align: 'center' })
        }
        document.getElementById('desaparecer').style.display = 'revert'
        window.open(doc.output('bloburi'))
    }
    //-----------------------EDIT SUB-MATERIAL------------------------
    const openModalEdit = (e) => {
        setChangeData(e)
        setOpenEdit(true)
    }
    const closeModalEdit = () => {
        setOpenEdit(false)
    }
    const editSubMaterial = async (e) => {
        e.preventDefault()
        const id = changeData._id
        const result = await ipcRenderer.invoke("edit-entradas-salidas", changeData)
        console.log(JSON.parse(result))
        const n = new Notification('Registro Editado', {/* body:'nose',*/ })
        n.onClick = () => { }
        closeModalEdit()
        getAlmacen()

    }
    //--------------------HANDLE CHANGE--------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //--------------------GET UNIDAD MEDIDA------------------------------
    const getUnidadMedida = async () => {
        try {
            const result = await ipcRenderer.invoke("get-unidadMedida")
            setUnidadMedida(JSON.parse(result))
        } catch (error) {
            console.log(error)
        }
    }
    //-----------------------------------------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------
    // console.log(almacen)
    // console.log(changeData)
    return (
        <>
            <Typography style={{ paddingTop: '2rem', marginBottom: '1rem', color: 'white' }} align='center' variant='h6'>ALMACEN</Typography>
            <div align='center' className={classes.spacingBot}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    size='small'
                    style={{
                        color: 'white',
                        background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
                        marginRight: '1rem',
                    }}
                    variant='contained'
                    component={Link}
                    to='/listaIngresoAlmacen'
                >ingresos almacen</Button>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    size='small'
                    style={{
                        color: 'white',
                        background: 'linear-gradient(45deg, #d84315 30%, #ff7043 90%)',
                    }}
                    variant='contained'
                    component={Link}
                    to='/listaSalidaAlmacen'
                >salidas almacen</Button>
            </div>
            <Container maxWidth='lg'>
                <Grid container direction='row' justifyContent='flex-end' alignItems='center' style={{ marginBottom: '0.5rem' }}>
                    <div>
                        {almacen &&
                            <TextField
                                style={{ background: 'white', borderRadius: 5, marginRight: '1rem' }}
                                variant='outlined'
                                size='small'
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
                    </div>
                </Grid>
                {/* ------------------------------------------------------------------------- */}
                <Paper component={Box} p={0.3}>
                    <TableContainer style={{ maxHeight: 500 }}>
                        <Table id='id-table' stickyHeader size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Fecha</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Tipo de Registro</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Descripcion</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Cantidad</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Precio</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Unidad de Medida</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Kardex</TableCell>
                                    <TableCell id='desaparecer' style={{ color: 'white', backgroundColor: "black" }}></TableCell>
                                    {/* <TableCell style={{ color: 'white', backgroundColor: "black" }}>Precio Bs</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {almacen.length > 0 ? (
                                    almacen.filter(buscarMaterialAlmacen(buscador)).map((a, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{a.registerDate}</TableCell>
                                            <TableCell>{a.typeRegister}</TableCell>
                                            <TableCell>{a.nameSubMaterial}</TableCell>
                                            <TableCell>{a.cantidad}</TableCell>
                                            <TableCell>{a.precio}</TableCell>
                                            <TableCell>{a.unidadMedida}</TableCell>
                                            <TableCell>{a.codSubMaterial}</TableCell>
                                            <TableCell>
                                                <Tooltip title='edit'>
                                                    <IconButton size='small' style={{ color: 'green' }} onClick={() => openModalEdit(a)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align='center' colSpan='7' >no existen datos</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
            {/* ------------------------------------------------------------------*/}
            <Dialog
                open={openEdit}
                onClose={closeModalEdit}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center'>Editar Registro</Typography>
                    <form onSubmit={editSubMaterial}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='nameMaterial'
                                    label='Nombre de Material'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    defaultValue={changeData.nameMaterial}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='nameSubMaterial'
                                    label='Nombre de Sub-Material'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    defaultValue={changeData.nameSubMaterial}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='cantidad'
                                    label='Cantidad'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    defaultValue={changeData.cantidad}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='precio'
                                    label='Precio'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    defaultValue={changeData.precio}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='precioUnitario'
                                    label='Precio Unitario'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    defaultValue={changeData.precioUnitario}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='procedenciaDestino'
                                    label='Procedencia o Destino'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    className={classes.spacingBot}
                                    defaultValue={changeData.procedenciaDestino}
                                    onChange={handleChange}
                                />
                                <TextField
                                    name='unidadMedida'
                                    label='Unidad de Medida'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                    select
                                    className={classes.spacingBot}
                                    value={changeData.unidadMedida}
                                    onChange={handleChange}
                                >
                                    {unidadMedida && unidadMedida.map((u, index) => (
                                        <MenuItem key={index} value={u.nameUnidadMedida} >{u.nameUnidadMedida}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name='registerDate'
                                    label='Fecha de Registro'
                                    variant='outlined'
                                    size='small'
                                    type='date'
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    className={classes.spacingBot}
                                    defaultValue={changeData.registerDate}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalEdit}>cancelar</Button>
                        </Grid>
                    </form>

                </Paper>
            </Dialog>
        </>
    )
}

export default ListaAlmacen
