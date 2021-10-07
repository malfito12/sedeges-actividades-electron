import { Button, Container, Paper, Box,MenuItem, TableRow, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, Typography, Grid, InputAdornment, TextField, Tooltip, IconButton, Dialog } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'
import EditIcon from '@material-ui/icons/Edit';

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const ListaAlmacen = () => {
    const classes = useStyles()
    const [almacen, setAlmacen] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [unidadMedida,setUnidadMedida]=useState([])
    const [changeData,setChangeData]=useState({
        // _id:'',
        cantidad:'',
        nameMaterial:'',
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
        const result = await ipcRenderer.invoke(`get-almacen-all`)
        setAlmacen(JSON.parse(result))
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
    var image = sello
    const pdfGenerate = () => {
        const doc = new jsPDF()
        doc.text(`Materiales Almacen`, 90, 25)
        // document.getElementById('desaparecer').style.display='none'
        // doc.text(`Tabla de ${data[0].numFactura}`,20,15)
        doc.addImage(image, 25, 10, 35, 20)
        doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 33 } })
        // document.getElementById('desaparecer').style.display='revert'
        window.open(doc.output('bloburi'))
    }
    //-----------------------EDIT SUB-MATERIAL------------------------
    const openModalEdit = (e) => {
        setChangeData(e)
        console.log(e)
        setOpenEdit(true)
    }
    const closeModalEdit = () => {
        setOpenEdit(false)
    }
    const editSubMaterial =async (e) => {
        e.preventDefault()
        const id=changeData._id
        const result=await ipcRenderer.invoke("edit-entradas-salidas",changeData)
        console.log(JSON.parse(result))
        const n= new Notification('Registro Editado',{/* body:'nose',*/})
        n.onClick=()=>{}
        closeModalEdit()
        getAlmacen()
        
    }
    //--------------------HANDLE CHANGE--------------------------
    const handleChange=(e)=>{
        setChangeData({
            ...changeData,
            [e.target.name]:e.target.value
        })
    }
    //--------------------GET UNIDAD MEDIDA------------------------------
    const getUnidadMedida=async()=>{
        const result=await ipcRenderer.invoke("get-unidadMedida")
        setUnidadMedida(JSON.parse(result))

    }
    //-------------------------------------------------------
    //-------------------------------------------------------
    // console.log(almacen)
    console.log(changeData)
    return (
        <>
            <Container maxWidth={false}>
                <div style={{ paddingLeft: 240 }}>
                    <Typography style={{ paddingTop: '5rem', marginBottom: '2rem' }} align='center' variant='h5'>ALMACEN</Typography>
                    <div align='center' className={classes.spacingBot}>
                        <Button style={{ marginRight: '1rem' }} variant='contained' color='primary' component={Link} to='/listaIngresoAlmacen'>ingresos almacen</Button>
                        <Button variant='contained' color='primary' component={Link} to='/listaSalidaAlmacen'>salidas almacen</Button>
                    </div>
                    <Grid container spacing={3} style={{ marginBottom: '0.5rem' }}>
                        <Grid item xs={12} sm={6}>
                            <Paper>
                                {almacen &&
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
                            <Table id='id-table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Fecha</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Tipo de Registro</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Descripcion</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Cantidad</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Precio</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Unidad de Medida</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Kardex</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}></TableCell>
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
                                                        <IconButton size='small' style={{color:'green'}} onClick={() => openModalEdit(a)}>
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
                </div>
            </Container>
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
                                    {unidadMedida&&unidadMedida.map((u,index)=>(
                                        <MenuItem key={index} value={u.nameUnidadMedida} >{u.nameUnidadMedida}</MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name='registerDate'
                                    label='Fecha de Registro'
                                    variant='outlined'
                                    size='small'
                                    type='date'
                                    InputLabelProps={{shrink:true}}
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
