import { Container, Box, makeStyles, Paper, Dialog, Typography, TableContainer, Table, TableRow, TableCell, TableBody, TableHead, IconButton, Grid, InputAdornment, TextField, Button, Tooltip } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import RegisterMaterial from '../Registros/RegisterMaterial'
import TableChartIcon from '@material-ui/icons/TableChart';
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const ListaProduct = (props) => {
    const classes = useStyles()
    const { history } = props
    const [material, setMaterial] = useState([])
    const [buscador, setBuscador] = useState("")
    const [openEditMaterial, setOpenEditMaterial] = useState(false)
    const [openDeleteMaterial, setOpenDeleteMaterial] = useState(false)
    const [changeData, setChangeData] = useState({
        _id: '',
        codMaterial: '',
        nameMaterial: '',
    })

    useEffect(() => {
        getMateriales()
    }, [])

    //-------------GET MATERIALES-----------------------------
    const getMateriales = async () => {
        const result = await ipcRenderer.invoke('get-material')
        setMaterial(JSON.parse(result))
    }
    //-------------EDIT MATERIAL-----------------------------
    const openModalEditMaterial = (e) => {
        setChangeData(e)
        setOpenEditMaterial(true)
    }
    const closeModalEditMaterial = () => {
        setOpenEditMaterial(false)
    }
    const editMaterial=async(e)=>{
        e.preventDefault()
        // const id=changeData._id
        const result=await ipcRenderer.invoke("edit-material",changeData)
        console.log(JSON.parse(result))
        getMateriales()
        closeModalEditMaterial()
    }
    //-------------DELETE MATERIAL-----------------------------
    const openModalDeleteMaterial=(e)=>{
        setChangeData(e)
        setOpenDeleteMaterial(true)
    }
    const closeModalDeleteMaterial=()=>{
        setOpenDeleteMaterial(false)
    }
    const deleteMateerial=async(e)=>{
        e.preventDefault()
        // const id=changeData._id
        const result=await ipcRenderer.invoke("delete-material",changeData)
        getMateriales()
        closeModalDeleteMaterial()
        console.log(JSON.parse(result))
    }
    //-------------COLOR DE TABLAS-----------------------------
    const getTableColor = (e) => {
        // console.log(e)
        if (e % 2 !== 0) {
            return { backgroundColor: '#e1f5fe' }
        }
    }
    //--------------------HANDLE CHANGE--------------------------
    const handleChange = (e) => {
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value
        })
    }
    //--------------------IR A SUB-MATERIALES--------------------------
    const irSubMateriales = (e) => {
        const code = e.codMaterial
        const nameMaterial = e.nameMaterial
        history.push('/listaSubmateriales/' + code + '/' + nameMaterial)
    }
    //-----------------------BUSCADOR---------------------------
    const buscarMaterial = (buscador) => {
        return function (x) {
            return x.codMaterial.includes(buscador) ||
                x.nameMaterial.toLowerCase().includes(buscador) ||
                x.nameMaterial.includes(buscador) ||
                !buscador

        }
    }
    var data = [
        { id: '1', name: 'uno' },
        { id: '2', name: 'dos' },
        { id: '3', name: 'tres' },
        { id: '4', name: 'cuanto' },
        { id: '5', name: 'cinco' },
        { id: '6', name: 'seis' },
        { id: '7', name: 'siete' },
    ]
    //--------------------IMPRIMIR-----------------------------
    const pdfGenerate = () => {
        // const doc = new jsPDF('p','pt','letter')
        const doc = new jsPDF()
        // document.getElementById('desaparecer').style.display='none'
        document.getElementById('desaparecer1').style.display = 'none'
        document.getElementById('desaparecer2').style.display = 'none'
        doc.setFontSize(20)
        doc.text(`Tabla de Materiales`, 75, 20);
        doc.setFontSize(10)
        doc.text("Sub-Tabla de Materiales", 90, 30);
        // ${"#id-titulo"}.css("font-size", "10px")
        // doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 25 } })
        doc.autoTable({
            head: [[
                { content: 'N°', styles: { cellWidth: 30 } },
                { content: 'Codigo', styles: { cellWidth: 50 } },
                { content: 'Material' }
            ]],
            body: material.map((d, index) => ([[index + 1], [d.codMaterial], [d.nameMaterial]])),
            styles: { halign: 'center' },
            startY: 35,

            // body:[[{content:'Text', styles:{halign:'center',lineWidth:1,} },{content:'nose'}],[{content:'hola'}]],

        })
        document.getElementById('desaparecer1').style.display = 'revert'
        document.getElementById('desaparecer2').style.display = 'revert'
        window.open(doc.output('bloburi'))
        // doc.save('ListaMateriales.pdf')

    }
    // console.log(material)
    // console.log(changeData)
    return (
        <>
            <Container style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom: '2rem' }} variant='h5' align='center' >Lista de Productos</Typography>
                <Grid container style={{ marginBottom: '0.5rem' }}>
                    <Grid item xs={8} sm={4} >
                        <RegisterMaterial uno={getMateriales} />
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper>
                            {material &&
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
                        <Table id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>N°</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Codigo</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Material</TableCell>
                                    <TableCell id='desaparecer1' style={{ color: 'white', backgroundColor: "black" }} align='center'>Sub-Materiales</TableCell>
                                    <TableCell id='desaparecer2' style={{ color: 'white', backgroundColor: "black" }} align='center'>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {material.length > 0 ? (
                                    material.filter(buscarMaterial(buscador)).map((m, index) => (
                                        <TableRow key={m._id} style={getTableColor(index)}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{m.codMaterial}</TableCell>
                                            <TableCell>{m.nameMaterial}</TableCell>
                                            <TableCell align='center'>
                                                <Tooltip title='sub-materiales'>
                                                    <IconButton size='small' onClick={() => irSubMateriales(m)}>
                                                        <TableChartIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Grid container justifyContent='space-evenly'>
                                                    <Tooltip title='edit'>
                                                        <IconButton size='small' style={{color:'green'}} onClick={() => openModalEditMaterial(m)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title='delete'>
                                                        <IconButton size='small' style={{color:'red'}} onClick={() => openModalDeleteMaterial(m)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan='4'>no existen datos</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
            <Dialog
                open={openEditMaterial}
                onClose={closeModalEditMaterial}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <Typography align='center' variant='subtitle1'>EDITAR MATERIAL</Typography>
                    <form onSubmit={editMaterial}>
                        <Grid container direction='column'>
                            <TextField
                                name='codMaterial'
                                label='Codigo de Material'
                                variant='outlined'
                                size='small'
                                value={changeData.codMaterial}
                                className={classes.spacingBot}
                                // onChange={handleChange}
                                required
                            />
                            <TextField
                                name='nameMaterial'
                                label='Codigo de Material'
                                variant='outlined'
                                size='small'
                                defaultValue={changeData.nameMaterial}
                                className={classes.spacingBot}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid container justifyContent='space-evenly'>
                            <Button style={{fontSize:'xx-small'}} variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button style={{fontSize:'xx-small'}} variant='contained' color='secondary' onClick={closeModalEditMaterial}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
            <Dialog
                open={openDeleteMaterial}
                onClose={closeModalDeleteMaterial}
                maxWidth='xs'
            >
                <Paper component={Box} p={2}>
                    <Typography className={classes.spacingBot} align='center' variant='subtitle1'>¿Estas seguro de eliminar " {changeData.nameMaterial} " y todos sus registros?</Typography>
                    <Grid container justifyContent='space-evenly'>
                            <Button style={{fontSize:'xx-small'}} variant='contained' color='primary' onClick={deleteMateerial}>aceptar</Button>
                            <Button style={{fontSize:'xx-small'}} variant='contained' color='secondary' onClick={closeModalDeleteMaterial}>cancelar</Button>
                        </Grid>
                </Paper>
            </Dialog>
        </>
    )
}

export default ListaProduct
