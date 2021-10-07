import { Button, Dialog, Paper, Box, Container, Grid, Tooltip, TableCell, makeStyles, Typography, TableContainer, Table, TableHead, TableRow, TableBody, IconButton, InputAdornment, TextField, MenuItem } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import RegisterSubMaterial from '../Registros/RegisterSubMaterial'
import InfoIcon from '@material-ui/icons/Info';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ImageIcon from '@material-ui/icons/Image';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const ListaSubmateriales = (props) => {
    const classes = useStyles()
    // console.log(props)
    const { history } = props
    var url = props.location.pathname
    url = url.split("/")
    // console.log(url)
    var array = []
    var dos;
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [subMaterial, setSubMaterial] = useState([])
    const [subMaterialTotal, setSubMaterialTotal] = useState([])
    const [unidadMedida, setUnidadMedida] = useState([])
    const [openImage, setOpenImage] = useState(false)
    const [openImageDelete, setOpenImageDelete] = useState(false)
    const [changeData, setChangeData] = useState({
        _id: "",
        nameSubMaterial: '',
        nameMaterial: "",
        codMaterial: "",
        unidadMedida: '',
        image: '',
        codSubMaterial: "",
    })

    useEffect(() => {
        getSubMaterial()
        getSubMaterialTotal()
        getUnidadMedida()
    }, [])

    //---------------GET SUB-MATERIALES------------------------
    const getSubMaterial = async () => {
        const result = await ipcRenderer.invoke('get-submaterial', url[2])
        setSubMaterial(JSON.parse(result))
        const result2 = await ipcRenderer.invoke("get-subMaterial-total", url[2])
        setSubMaterialTotal(JSON.parse(result2))
    }
    //-------------------EDIT SUB MATERIAL -----------------------
    const openModalImage = (e) => {
        setChangeData(e)
        setPreview(e.image)
        setOpenImage(true)
    }
    const closeModalImage = () => {
        setOpenImage(false)
    }
    const editSubMaterial = async (e) => {
        e.preventDefault()
        var data = {
            _id: changeData._id,
            nameSubMaterial: changeData.nameSubMaterial,
            nameMaterial: changeData.nameMaterial,
            codMaterial: changeData.codMaterial,
            unidadMedida: changeData.unidadMedida,
            codSubMaterial: changeData.codSubMaterial,
            image: preview
        }
        const result = await ipcRenderer.invoke('edit-submaterial', data)
        closeModalImage()
        getSubMaterial()
        getSubMaterialTotal()
        console.log(JSON.parse(result))

        // console.log(data)

    }
    //-------------------GET SUB - MATERIALES TOTAL -----------------------
    const getSubMaterialTotal = async () => {
        const result = await ipcRenderer.invoke("get-subMaterial-total", url[2])
        setSubMaterialTotal(JSON.parse(result))

    }
    //-------------------DELETE SUB - MATERIAL-----------------------
    const openModalImageDelete = (e) => {
        setChangeData(e)
        setOpenImageDelete(true)
    }
    const closeModalImageDelete = () => {
        setOpenImageDelete(false)
    }
    const deleteSubMaterial = async (e) => {
        e.preventDefault()
        // const id=changeData_id
        const result = await ipcRenderer.invoke('delete-submaterial', changeData)
        closeModalImageDelete()
        getSubMaterial()
        getSubMaterialTotal()
        console.log(JSON.parse(result))

    }

    //---------------------IR A TARJETA DE EXISTENCIA------------------------------
    const irTarjeta = (e) => {
        // console.log(e)
        const codMaterial = e.codMaterial
        const codSubMaterial = e.codSubMaterial
        const nameMaterial = e.nameMaterial
        const nameSubMaterial = e.nameSubMaterial
        const saldoInicial = e.saldoInicial
        const unidadMedida = e.unidadMedida
        history.push('/tarjetaExistencia/' + codMaterial + '/' + nameMaterial + '/' + codSubMaterial + '/' + nameSubMaterial + "/" + saldoInicial + "/" + unidadMedida)

    }
    const irkardex = (e) => {
        // console.log(e)
        const codMaterial = e.codMaterial
        const codSubMaterial = e.codSubMaterial
        const nameMaterial = e.nameMaterial
        const nameSubMaterial = e.nameSubMaterial
        const saldoInicial = e.saldoInicial
        const unidadMedida = e.unidadMedida
        history.push('/kardexValorado/' + codMaterial + '/' + nameMaterial + '/' + codSubMaterial + '/' + nameSubMaterial + "/" + saldoInicial + "/" + unidadMedida)

    }
    //---------------------------------------------------

    for (var i = 0; i < subMaterial.length; i++) {
        dos = { ...subMaterialTotal[i], ...subMaterial[i] }
        // console.log(dos)
        array.push(dos)
    }

    //---------------------------BUSCADOR---------------------------------------------
    const [buscador, setBuscador] = useState("")

    const buscarSubMaterial = (buscador) => {
        return function (x) {
            return x.codSubMaterial.includes(buscador) ||
                x.nameSubMaterial.toLowerCase().includes(buscador) ||
                x.unidadMedida.toLowerCase().includes(buscador) ||
                x.nameSubMaterial.includes(buscador) ||
                x.unidadMedida.includes(buscador) ||
                !buscador

        }
    }
    //--------------------------------------PDF GENERATE---------------------------------
    var images = sello
    const pdfGenerate = () => {
        const doc = new jsPDF()
        document.getElementById('desaparecer1').style.display = 'none'
        document.getElementById('desaparecer2').style.display = 'none'
        doc.text(`${url[3]}`, 80, 25)
        doc.addImage(images, 20, 10, 35, 20)
        doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 35 } })
        document.getElementById('desaparecer1').style.display = 'revert'
        document.getElementById('desaparecer2').style.display = 'revert'
        window.open(doc.output('bloburi'))
    }
    //-----------------------HANDLE CHANGE-----------------------
    const handleChange = (e) => {
        // console.log(e)
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            // document.getElementById('img').style.display = 'none'
            // document.getElementById('img2').style.display = 'block'
            if (file.type.includes('image')) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setPreview(reader.result)
                    setImage(e.target.files[0])
                    // console.log(preview)
                    // console.log(image)
                }
            }
            else { console.log('no funciona') }
        }
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //-------------------GET UNIDAD DE MEDIDA------------------------
    const getUnidadMedida = async () => {
        const result = await ipcRenderer.invoke('get-unidadMedida')
        setUnidadMedida(JSON.parse(result))

    }
    //----------------------------------------------
    //---------------------------------------------------
    //---------------------------------------------------


    // console.log(subMaterialTotal)
    // console.log(subMaterial)
    // console.log(array)
    // console.log(changeData)

    return (
        <>
            <Container maxWidth={false} >
                <div style={{ paddingLeft: 240 }}>
                    <Typography style={{ paddingTop: '5rem', marginBottom: '1rem' }} align='center' variant='h5'>{url[3]}</Typography>
                    <Grid className={classes.spacingBot} container justifyContent='flex-end'>
                        <Tooltip title='atras'>
                            <IconButton style={{ color: 'black' }} component={Link} to="/listaProduct">
                                <ArrowBackIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid container>
                        <Grid item xs={8} sm={4}>
                            <RegisterSubMaterial url={url} uno={getSubMaterial} />
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Paper>
                                {array &&
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
                        <Grid item xs={8} sm={4} container justifyContent='flex-end' alignItems='flex-start'>
                            <Button size='small' variant='contained' color='primary' onClick={pdfGenerate}>imprimir</Button>
                        </Grid>
                    </Grid>
                    <Paper component={Box} p={1}>
                        <TableContainer>
                            <Table id='id-table' style={{ minWidth: 1000 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>{url[2]}</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Nombre</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Unidad</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Saldo Inicial</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Saldo Actual</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Precio Total</TableCell>
                                        <TableCell style={{ color: 'white', backgroundColor: "black" }}>Precio Unitario</TableCell>
                                        <TableCell id='desaparecer1' style={{ color: 'white', backgroundColor: "black" }}>Tarjeta/Kardex</TableCell>
                                        <TableCell id='desaparecer2' style={{ color: 'white', backgroundColor: "black" }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {array.length > 0 ? (
                                        array.filter(buscarSubMaterial(buscador)).map(s => (
                                            <TableRow key={s._id}>
                                                <TableCell>{s.codSubMaterial}</TableCell>
                                                <TableCell>{s.nameSubMaterial}</TableCell>
                                                <TableCell>{s.unidadMedida}</TableCell>
                                                <TableCell>{s.saldoInicial}</TableCell>
                                                <TableCell>{s.saldoActual}</TableCell>
                                                <TableCell>{s.precioTotal}</TableCell>
                                                <TableCell>{s.precioUnitario}</TableCell>
                                                <TableCell>
                                                    <Grid container justifyContent='space-evenly'>
                                                        <Tooltip title='edit'>
                                                            <IconButton size='small' style={{ color: 'green' }} onClick={() => openModalImage(s)}>
                                                                <ImageIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='tarjeta'>
                                                            <IconButton size='small' onClick={() => irTarjeta(s)}>
                                                                <InfoIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title='kardex' >
                                                            <IconButton size='small' onClick={() => irkardex(s)}>
                                                                <CreditCardIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell>
                                                    <Grid container justifyContent='space-evenly'>
                                                        <Tooltip title='delete'>
                                                            <IconButton size='small' style={{ color: 'red' }} onClick={() => openModalImageDelete(s)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan='8'>no existe informacion</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </Container>
            <Dialog
                open={openImage}
                onClose={closeModalImage}
                maxWidth='md'
            >
                <Paper component={Box} p={2} /*style={{ background: '#bdbdbd', width: '300px', height: '300px' }}*/>
                    {/* <Typography className={classes.spacingBot} variant='subtitle1' align='center'>EDITAR SUB-MATERIAL</Typography> */}
                    <form onSubmit={editSubMaterial}>
                        {/* <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled
                                    name='nameMaterial'
                                    label='Tipo de Material'
                                    variant='outlined'
                                    fullWidth
                                    size='small'
                                    className={classes.spacingBot}
                                    defaultValue={changeData.nameMaterial}
                                    required
                                />
                                <TextField
                                    name='nameSubMaterial'
                                    label='Nombre del Material'
                                    variant='outlined'
                                    className={classes.spacingBot}
                                    fullWidth
                                    size='small'
                                    defaultValue={changeData.nameSubMaterial}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    name='unidadMedida'
                                    label='Unidad de Medida'
                                    variant='outlined'
                                    className={classes.spacingBot}
                                    select
                                    fullWidth
                                    size='small'
                                    onChange={handleChange}
                                    value={changeData.unidadMedida}
                                    required
                                >
                                    {unidadMedida.map((m, index) => (
                                        <MenuItem key={index} value={m.nameUnidadMedida} >{m.nameUnidadMedida}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div align='center' className={classes.spacingBot}>
                                    <Paper component={Box} p={1} style={{ background: '#bdbdbd', width: '150px', height: '150px' }}>
                                        <img id='img' src={changeData.image} style={{ width: '100%', height: '100%' }} alt='#' />
                                        <img id='img' src={preview} style={{ width: '100%', height: '100%' }} alt='#' />
                                        <img id='img2' src={preview} style={{ width: '100%', height: '100%', display: 'none' }} alt='#' />
                                    </Paper>
                                    <input
                                        name='image'
                                        type='file'
                                        accept='image/*'
                                        id='file-image'
                                        style={{ display: 'none' }}
                                        // value={changeData.image}
                                        onChange={handleChange}
                                    // required

                                    />
                                    <label htmlFor='file-image'>
                                        <Button size='small' style={{ marginTop: '1rem' }} variant='contained' color='primary' component='span'>cargar</Button>
                                    </label>
                                </div>
                            </Grid>
                        </Grid> */}
                        <div align='center' className={classes.spacingBot}>
                                    <Paper component={Box} p={1} style={{ background: '#bdbdbd', width: '250px', height: '250px' }}>
                                        {/* <img id='img' src={changeData.image} style={{ width: '100%', height: '100%' }} alt='#' /> */}
                                        <img id='img' src={preview} style={{ width: '100%', height: '100%' }} alt='#' />
                                        {/* <img id='img2' src={preview} style={{ width: '100%', height: '100%', display: 'none' }} alt='#' /> */}
                                    </Paper>
                                    <input
                                        name='image'
                                        type='file'
                                        accept='image/*'
                                        id='file-image'
                                        style={{ display: 'none' }}
                                        // value={changeData.image}
                                        onChange={handleChange}
                                    // required

                                    />
                                    <label htmlFor='file-image'>
                                        <Button style={{ marginTop: '1rem',fontSize:'xx-small' }} variant='contained' color='primary' component='span'>cargar</Button>
                                    </label>
                                </div>
                        <Grid container justifyContent='space-evenly'>
                            <Button style={{fontSize:'xx-small'}} variant='contained' color='primary' type='submit' >aceptar</Button>
                            <Button style={{fontSize:'xx-small'}} variant='contained' color='secondary' onClick={closeModalImage} >cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openImageDelete}
                onClose={closeModalImageDelete}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot} >¿ Estas seguro de Elinimar " {changeData.nameSubMaterial} " y toda su informacion? </Typography>
                    <Grid container justifyContent='space-evenly'>
                        <Button style={{ fontSize: "xx-small" }} variant='contained' color='primary' onClick={deleteSubMaterial} >aceptar</Button>
                        <Button style={{ fontSize: "xx-small" }} variant='contained' color='secondary' onClick={closeModalImageDelete} >cancelar</Button>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default ListaSubmateriales
