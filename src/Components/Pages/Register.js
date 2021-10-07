import { Button, Container, Box, Dialog, Grid, makeStyles, Paper, TextField, Typography, MenuItem } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

// const {ipcRenderer}=require('electron')
const ipcRenderer = window.require('electron').ipcRenderer
// import ipcRenderer from 'electron'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    spacingBott: {
        marginBottom: '1rem'
    }
}))

const Register = () => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const [register, setRegister] = useState({
        // numFactura: '',
        description: '',
        typeMat: '',
        // cantF: '',
        // typeRegister:'entrada',
        // priceEntrada: '',
        unidadMedida: '',
        registerDate: '',
        // procedencia:'',
    })
    // const [entrada,setEntrada]=useState({
    //     numFactura:'',
    //     cantF:'',
    //     description:'',
    //     registerDate:'',
    //     priceEntrada:'',
    //     procedencia:''
    // })

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }

    const mostrar = (e) => {
        e.preventDefault()
        // console.log(register)
        // ipcRenderer.send('new-product', register)
        ipcRenderer.send('new-product', register)
        // ipcRenderer.send('entrada-product',register)

        ipcRenderer.on('new-product-create', (e, args) => {
            console.log(args)
            // alert('producto registrado')
            openModalRegister()
            document.getElementById('registerForm').reset()
            document.getElementById('registerForm').focus()

        })
        // ipcRenderer.on('entrada-product',(e,args)=>{
        //     console.log('entrada registrada')
        // })
        // console.log(register)


    }
    //-------------------modal register-----------------------
    const openModalRegister = () => {
        setOpenModal(true)
    }
    const closeModalRegister = () => {
        setOpenModal(false)
    }
    //-------------------modal register-----------------------
    //-------------------modal register-----------------------
    //-------------------modal register-----------------------
    var data = [
        { cod: '01-00X', pag: '/P_01_00X', material: 'Reactivos para Flotacion' },
        { cod: '02-00X', pag: '/P_02_00X', material: 'Reactivos para Laboratorio' },
        { cod: '03-00X', pag: '/P_03_00X', material: 'Material de Laboratorio' },
        { cod: '04-00X', pag: '/P_04_00X', material: 'Correas' },
        { cod: '05-00X', pag: '/P_05_00X', material: 'Rodamiento' },
        { cod: '06-00X', pag: '/P_06_00X', material: 'Adapter' },
        { cod: '07-00X', pag: '/P_07_00X', material: 'Descanso' },
        { cod: '08-00X', pag: '/P_08_00X', material: 'Electrodo' },
        { cod: '09-00X', pag: '/P_09_00X', material: 'Disco' },
        { cod: '10-00X', pag: '/P_10_00X', material: 'Varillas de Bronce' },
        { cod: '11-00X', pag: '/P_11_00X', material: 'Aceites Liquidos Hidraulicos y de Transmisión' },
        { cod: '12-00X', pag: '/P_12_00X', material: 'Pintura' },
        { cod: '13-00X', pag: '/P_13_00X', material: 'Catalizador de Hormigon, Cemento y Estuco' },
        { cod: '14-00X', pag: '/P_14_00X', material: 'Pegamento y Adhesivos' },
        { cod: '15-00X', pag: '/P_15_00X', material: 'Metal Blando y Estaño' },
        { cod: '16-00X', pag: '/P_16_00X', material: 'Herramientas' },
        { cod: '17-00X', pag: '/P_17_00X', material: 'Gomas y Poliuretano' },
        { cod: '18-00X', pag: '/P_18_00X', material: 'EPPS' },
        { cod: '19-00X', pag: '/P_19_00X', material: 'Valvulas, LLaves, Codos, Teflon y Material de Plomeria' },
        { cod: '20-00X', pag: '/P_20_00X', material: 'Pernos' },
        { cod: '21-00X', pag: '/P_21_00X', material: 'Tira Fondos y Tornillos' },
        { cod: '22-00X', pag: '/P_22_00X', material: 'Fischer o Ramplus' },
        { cod: '23-00X', pag: '/P_23_00X', material: 'Tuerca' },
        { cod: '24-00X', pag: '/P_24_00X', material: 'Volandas' },
        { cod: '25-00X', pag: '/P_25_00X', material: 'Cubetas y Resortes' },
        { cod: '26-00X', pag: '/P_26_00X', material: 'Calvos y Alambres' },
        { cod: '27-00X', pag: '/P_27_00X', material: 'Grampas' },
        { cod: '28-00X', pag: '/P_28_00X', material: 'Lijas' },
        { cod: '29-00X', pag: '/P_29_00X', material: 'Material de Limpieza' },
        { cod: '30-00X', pag: '/P_30_00X', material: 'Alimentacion' },
        { cod: '31-00X', pag: '/P_31_00X', material: 'Mallas' },
        { cod: '32-00X', pag: '/P_32_00X', material: 'Ruedas y Llantas' },
        { cod: '33-00X', pag: '/P_33_00X', material: 'Barilla' },
        { cod: '34-00X', pag: '/P_34_00X', material: 'Sacos, Cajones, Bolsas, etc' },
        { cod: '35-00X', pag: '/P_35_00X', material: 'Cadenas' },
        { cod: '36-00X', pag: '/P_36_00X', material: 'Baldes, Jarras, Recipientes' },
        { cod: '37-00X', pag: '/P_37_00X', material: 'Otros' },
        { cod: '38-00X', pag: '/P_38_00X', material: 'Botiquin y Medicamentos' },
        { cod: '39-00X', pag: '/P_39_00X', material: 'Material Electrico Ferreteria' },
        { cod: '40-00X', pag: '/P_40_00X', material: 'Material Electrico' },
        { cod: '41-00X', pag: '/P_41_00X', material: 'Material Electrico Contacores' },
        { cod: '42-00X', pag: '/P_42_00X', material: 'Material Electrico Reles' },
        { cod: '43-00X', pag: '/P_43_00X', material: 'Material Electrico Termicos' },
        { cod: '44-00X', pag: '/P_44_00X', material: 'Material de Escritorio' },
        { cod: '45-00X', pag: '/P_45_00X', material: 'Filtros para Tractores y Vehiculos' },
        { cod: '46-00X', pag: '/P_46_00X', material: 'Oring y Retenes' },
        { cod: '47-00X', pag: '/P_47_00X', material: 'Otros y Varios' },
        { cod: '48-00X', pag: '/P_48_00X', material: 'Combustible' },
    ]

    var dataMedida=[
        {unidad:'Arroba'},
        {unidad:'Balde'},
        {unidad:'Block'},
        {unidad:'Bolsa'},
        {unidad:'Bote'},
        {unidad:'Caja'},
        {unidad:'Galon'},
        {unidad:'Hoja'},
        {unidad:'Juego'},
        {unidad:'Kilos'},
        {unidad:'Lata'},
        {unidad:'Litros'},
        {unidad:'Paquete'},
        {unidad:'Par'},
        {unidad:'Pieza'},
        {unidad:'Rollo'},
    ]

    console.log(register)
    return (
        <>
            <Container maxWidth={false}>
                <div style={{ marginLeft: 240 }}>
                    <Typography style={{ paddingTop: 80, paddingBottom:'5rem' }} variant='h4' align='center'>Registro de Productos</Typography>
                    <form id='registerForm' onSubmit={mostrar}>
                        <Container maxWidth='md'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='description'
                                        label='Nombre de Material'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        // defaultValue={register.description}
                                        required
                                        style={{background:'white',borderRadius:5}}
                                    />
                                    {/* <TextField
                                        name='cantF'
                                        label='Stock Minimo'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        type='number'
                                        // inputProps={{step:'any', maxLength:3}}
                                        inputProps={{step:'any'}}
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={register.stockMinimo}
                                        required
                                    /> */}
                                    <TextField
                                        name='typeMat'
                                        select
                                        label='Tipo de Material'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={register && register.typeMat}
                                        required
                                        style={{background:'white',borderRadius:5}}
                                    >
                                        {data.map(d => (
                                            <MenuItem key={d.cod} value={d.cod}>{d.material}</MenuItem>
                                        ))}
                                    </TextField>
                                    {/* <TextField
                                        name='procedencia'
                                        label='Procedencia'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={register.procedencia}
                                        required
                                    /> */}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    
                                    {/* <TextField
                                        name='priceEntrada'
                                        label='Precio Inicial'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        type='number'
                                        inputProps={{step:'any'}}
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={register.price}
                                        required
                                    /> */}
                                    {/* <TextField
                                        name='numFactura'
                                        label='N° de Factura'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={register.numFactura}
                                        required
                                    /> */}
                                    <TextField
                                        name='unidadMedida'
                                        label='Unidad de Medida'
                                        variant='outlined'
                                        size='small'
                                        select
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        value={register.unidadMedida}
                                        required
                                        style={{background:'white',borderRadius:5}}
                                    >
                                        {dataMedida.map((m,index)=>(
                                            <MenuItem key={index} value={m.unidad}>{m.unidad}</MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        name='registerDate'
                                        type='date'
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        className={classes.spacingBott}
                                        onChange={handleChange}
                                        defaultValue={register.registerDate}
                                        required
                                        style={{background:'white',borderRadius:5}}
                                    />
                                </Grid>
                            </Grid>

                        </Container>
                        <div align='center' style={{marginTop:'4rem'}}>
                            <Button variant='contained' color='primary' type='submit' >Registrar</Button>
                            {/* <Button variant='contained' color='primary' component={Link} to='/productsList'>Registrar</Button> */}
                        </div>
                    </form>

                </div>
            </Container>
            <Dialog
                open={openModal}
                onClose={closeModalRegister}
                maxWidth='sm'
            >
                <Paper component={Box} p={2}>
                    <div align='center'>
                        <Typography>Producto registrado</Typography>
                        <Button onClick={closeModalRegister} variant='contained' size='small' color='primary'>aceptar</Button>
                    </div>
                </Paper>
            </Dialog>
        </>
    )
}

export default Register
