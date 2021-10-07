import { Container, Grid, Dialog, Box, Paper, Button, Typography, makeStyles, TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'
const ipcRenderer = window.require('electron').ipcRenderer


const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const cantidadFor = 48;
const SalidaMat = () => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const [changeData, setChangeData] = useState({
        description: '',
        typeMat: '',
        typeRegister: 'salida',
        cantSalida: '',
        registerDate: '',
        unidadMedida: '',
        destino:'',
        priceSalida:''

    })
    const [getData1, setGetData1] = useState([])
    const [getData2, setGetData2] = useState([])
    const [getData3, setGetData3] = useState([])
    const [getData4, setGetData4] = useState([])
    const [getData5, setGetData5] = useState([])
    const [getData6, setGetData6] = useState([])
    const [getData7, setGetData7] = useState([])
    const [getData8, setGetData8] = useState([])
    const [getData9, setGetData9] = useState([])
    const [getData10, setGetData10] = useState([])
    const [getData11, setGetData11] = useState([])
    const [getData12, setGetData12] = useState([])
    const [getData13, setGetData13] = useState([])
    const [getData14, setGetData14] = useState([])
    const [getData15, setGetData15] = useState([])
    const [getData16, setGetData16] = useState([])
    const [getData17, setGetData17] = useState([])
    const [getData18, setGetData18] = useState([])
    const [getData19, setGetData19] = useState([])
    const [getData20, setGetData20] = useState([])
    const [getData21, setGetData21] = useState([])
    const [getData22, setGetData22] = useState([])
    const [getData23, setGetData23] = useState([])
    const [getData24, setGetData24] = useState([])
    const [getData25, setGetData25] = useState([])
    const [getData26, setGetData26] = useState([])
    const [getData27, setGetData27] = useState([])
    const [getData28, setGetData28] = useState([])
    const [getData29, setGetData29] = useState([])
    const [getData30, setGetData30] = useState([])
    const [getData31, setGetData31] = useState([])
    const [getData32, setGetData32] = useState([])
    const [getData33, setGetData33] = useState([])
    const [getData34, setGetData34] = useState([])
    const [getData35, setGetData35] = useState([])
    const [getData36, setGetData36] = useState([])
    const [getData37, setGetData37] = useState([])
    const [getData38, setGetData38] = useState([])
    const [getData39, setGetData39] = useState([])
    const [getData40, setGetData40] = useState([])
    const [getData41, setGetData41] = useState([])
    const [getData42, setGetData42] = useState([])
    const [getData43, setGetData43] = useState([])
    const [getData44, setGetData44] = useState([])
    const [getData45, setGetData45] = useState([])
    const [getData46, setGetData46] = useState([])
    const [getData47, setGetData47] = useState([])
    const [getData48, setGetData48] = useState([])

    useEffect(() => {
        // for (var i = 0; i < cantidadFor; i++) {
        //     var uno = i + 1
        //     uno = uno.toString()
        //     var dos = '-00X'
        //     var tres = '0' + uno + dos
        //     ipcRenderer.send('get-product', tres)
        // }
        // ipcRenderer.on('01-00X', (e, args) => {
        //     const product = JSON.parse(args)
        //     setGetData1(product)
        // })
        (async () => {
    
            const result1 = await ipcRenderer.invoke('get-product', '01-00X')
            const result2 = await ipcRenderer.invoke('get-product', '02-00X')
            const result3 = await ipcRenderer.invoke('get-product', '03-00X')
            const result4 = await ipcRenderer.invoke('get-product', '04-00X')
            const result5 = await ipcRenderer.invoke('get-product', '05-00X')
            const result6 = await ipcRenderer.invoke('get-product', '06-00X')
            const result7 = await ipcRenderer.invoke('get-product', '07-00X')
            const result8 = await ipcRenderer.invoke('get-product', '08-00X')
            const result9 = await ipcRenderer.invoke('get-product', '09-00X')
            const result10 = await ipcRenderer.invoke('get-product', '10-00X')
            const result11 = await ipcRenderer.invoke('get-product', '11-00X')
            const result12 = await ipcRenderer.invoke('get-product', '12-00X')
            const result13 = await ipcRenderer.invoke('get-product', '13-00X')
            const result14 = await ipcRenderer.invoke('get-product', '14-00X')
            const result15 = await ipcRenderer.invoke('get-product', '15-00X')
            const result16 = await ipcRenderer.invoke('get-product', '16-00X')
            const result17 = await ipcRenderer.invoke('get-product', '17-00X')
            const result18 = await ipcRenderer.invoke('get-product', '18-00X')
            const result19 = await ipcRenderer.invoke('get-product', '19-00X')
            const result20 = await ipcRenderer.invoke('get-product', '20-00X')
            const result21 = await ipcRenderer.invoke('get-product', '21-00X')
            const result22 = await ipcRenderer.invoke('get-product', '22-00X')
            const result23 = await ipcRenderer.invoke('get-product', '23-00X')
            const result24 = await ipcRenderer.invoke('get-product', '24-00X')
            const result25 = await ipcRenderer.invoke('get-product', '25-00X')
            const result26 = await ipcRenderer.invoke('get-product', '26-00X')
            const result27 = await ipcRenderer.invoke('get-product', '27-00X')
            const result28 = await ipcRenderer.invoke('get-product', '28-00X')
            const result29 = await ipcRenderer.invoke('get-product', '29-00X')
            const result30 = await ipcRenderer.invoke('get-product', '30-00X')
            const result31 = await ipcRenderer.invoke('get-product', '31-00X')
            const result32 = await ipcRenderer.invoke('get-product', '32-00X')
            const result33 = await ipcRenderer.invoke('get-product', '33-00X')
            const result34 = await ipcRenderer.invoke('get-product', '34-00X')
            const result35 = await ipcRenderer.invoke('get-product', '35-00X')
            const result36 = await ipcRenderer.invoke('get-product', '36-00X')
            const result37 = await ipcRenderer.invoke('get-product', '37-00X')
            const result38 = await ipcRenderer.invoke('get-product', '38-00X')
            const result39 = await ipcRenderer.invoke('get-product', '39-00X')
            const result40 = await ipcRenderer.invoke('get-product', '40-00X')
            const result41 = await ipcRenderer.invoke('get-product', '41-00X')
            const result42 = await ipcRenderer.invoke('get-product', '42-00X')
            const result43 = await ipcRenderer.invoke('get-product', '43-00X')
            const result44 = await ipcRenderer.invoke('get-product', '44-00X')
            const result45 = await ipcRenderer.invoke('get-product', '45-00X')
            const result46 = await ipcRenderer.invoke('get-product', '46-00X')
            const result47 = await ipcRenderer.invoke('get-product', '47-00X')
            const result48 = await ipcRenderer.invoke('get-product', '48-00X')
            setGetData1(JSON.parse(result1))
            setGetData2(JSON.parse(result2))
            setGetData3(JSON.parse(result3))
            setGetData4(JSON.parse(result4))
            setGetData5(JSON.parse(result5))
            setGetData6(JSON.parse(result6))
            setGetData7(JSON.parse(result7))
            setGetData8(JSON.parse(result8))
            setGetData9(JSON.parse(result9))
            setGetData10(JSON.parse(result10))
            setGetData11(JSON.parse(result11))
            setGetData12(JSON.parse(result12))
            setGetData13(JSON.parse(result13))
            setGetData14(JSON.parse(result14))
            setGetData15(JSON.parse(result15))
            setGetData16(JSON.parse(result16))
            setGetData17(JSON.parse(result17))
            setGetData18(JSON.parse(result18))
            setGetData19(JSON.parse(result19))
            setGetData20(JSON.parse(result20))
            setGetData21(JSON.parse(result21))
            setGetData22(JSON.parse(result22))
            setGetData23(JSON.parse(result23))
            setGetData24(JSON.parse(result24))
            setGetData25(JSON.parse(result25))
            setGetData26(JSON.parse(result26))
            setGetData27(JSON.parse(result27))
            setGetData28(JSON.parse(result28))
            setGetData29(JSON.parse(result29))
            setGetData30(JSON.parse(result30))
            setGetData31(JSON.parse(result31))
            setGetData32(JSON.parse(result32))
            setGetData33(JSON.parse(result33))
            setGetData34(JSON.parse(result34))
            setGetData35(JSON.parse(result35))
            setGetData36(JSON.parse(result36))
            setGetData37(JSON.parse(result37))
            setGetData38(JSON.parse(result38))
            setGetData39(JSON.parse(result39))
            setGetData40(JSON.parse(result40))
            setGetData41(JSON.parse(result41))
            setGetData42(JSON.parse(result42))
            setGetData43(JSON.parse(result43))
            setGetData44(JSON.parse(result44))
            setGetData45(JSON.parse(result45))
            setGetData46(JSON.parse(result46))
            setGetData47(JSON.parse(result47))
            setGetData48(JSON.parse(result48))
        })()
        
    }, [])

    //---------------------------------------------------------------------
    const postSalidas = (e) => {
        e.preventDefault()

        ipcRenderer.send('salida-product', changeData)

        ipcRenderer.on('salida-product', (e, args) => {
            console.log(args)
            openModalRegister()
            document.getElementById('registerForm').reset()
            document.getElementById('registerForm').focus()
            // prod.focus()

            // window.location='/productsList'
        })
        // console.log(register)
    }
    //---------------------------------------------------------------------
    const openModalRegister = () => {
        setOpenModal(true)
    }
    const closeModalRegister = () => {
        setOpenModal(false)
    }
    //----------------------------------------------------

    const handleChange = (e) => {
        // console.log(e)
        var status = document.getElementById('opt')
        for (var i = 0; i < cantidadFor; i++) {
            var uno = '-00X'
            var num1 = i + 1
            var dos = i + 1
            dos = dos.toString()
            var tres = '0' + dos + uno
            if (status.value === tres) {
                var cuatro = 'option'
                for (var j = 0; j < cantidadFor; j++) {
                    var cinco = j + 1;
                    var num2 = j + 1;
                    cinco = cinco.toString()
                    var seis = cuatro + cinco
                    if (num1 === num2) {
                        document.getElementById(seis).style.display = 'block'
                    } else {
                        document.getElementById(seis).style.display = "none"
                    }
                }
                break;
            }
        }
        setChangeData({
            ...changeData,
            [e.target.name]: e.target.value,
        })
    }

    var data = [
        { cod: '0', material: 'select' },
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
    // console.log(changeData)
    return (
        <>
            <Container maxWidth={false}>
                <div style={{ paddingLeft: 240 }}>
                    <Typography style={{ paddingTop: '5rem', marginBottom: '5rem' }} variant='h4' align='center'>Salida de Materiales</Typography>
                    <form id='registerForm' onSubmit={postSalidas}>
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <select
                                        id='opt'
                                        name='typeMat'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        style={{ padding: '10px 45px 10px 10px' }}
                                        value={changeData.typeMat}
                                    >
                                        {data.map(d => (
                                            <option key={d.cod} value={d.cod}>{d.material}</option>
                                        ))}
                                    </select>
                                    <select
                                        name='description'
                                        id='option1'
                                        style={{ display: 'none', padding: '10px 267px 10px 10px' }}
                                        value={changeData.description}
                                        className={classes.spacingBot}
                                        onChange={handleChange}

                                    >
                                        <option>select</option>
                                        {getData1.map(m1 => (
                                            <option key={m1._id} value={m1.description}>{m1.description}</option>
                                        ))}
                                    </select>
                                    <select
                                        name='description'
                                        id='option2'
                                        className={classes.spacingBot}
                                        style={{ display: 'none', padding: '10px 267px 10px 10px' }}
                                        value={changeData.description}
                                        onChange={handleChange}
                                    >
                                        <option placeholder='Seleccionar'></option>
                                        {getData2.map(m1 => (
                                            <option key={m1._id} value={m1.description}>{m1.description}</option>
                                        ))}
                                    </select>
                                    <select id='option3' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData3.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option4' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData4.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option5' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData5.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option6' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData6.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option7' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData7.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option8' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData8.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option9' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData9.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option10' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData10.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option11' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData11.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option12' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData12.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option13' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData13.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option14' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData14.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option15' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData15.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option16' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData16.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option17' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData17.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option18' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData18.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option19' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData19.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option20' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData20.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option21' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData21.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option22' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData22.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option23' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData23.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option24' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData24.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option25' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData25.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option26' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData26.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option27' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData27.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option28' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData28.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option29' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData29.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option30' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData30.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option31' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData31.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option32' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData32.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option33' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData33.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option34' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData34.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option35' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData35.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option36' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData36.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option37' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData37.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option38' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData38.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option39' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData39.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option40' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData40.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option41' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData41.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option42' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData42.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option43' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData43.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option44' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData44.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option45' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData45.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option46' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData46.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option47' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData47.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <select id='option48' name='description' className={classes.spacingBot} style={{ display: 'none', padding: '10px 267px 10px 10px' }} value={changeData.description} onChange={handleChange}>
                                        <option>select</option>
                                        {getData48.map(m1 => (<option key={m1._id} value={m1.description}>{m1.description}</option>))}
                                    </select>
                                    <TextField
                                        name='destino'
                                        label='Destino'
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        style={{background:'white',borderRadius:5}}
                                    />
                                    <TextField
                                        name='registerDate'
                                        label='Fecha'
                                        variant='outlined'
                                        type='date'
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        style={{background:'white',borderRadius:5}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='cantSalida'
                                        label='Cantidad'
                                        type='number'
                                        inputProps={{step:'any'}}
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        style={{background:'white',borderRadius:5}}
                                    />
                                    <TextField
                                        name='priceSalida'
                                        label='Valor $us'
                                        variant='outlined'
                                        fullWidth
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        style={{background:'white',borderRadius:5}}
                                    />
                                    <TextField
                                        name='unidadMedida'
                                        label='Unidad de Medida'
                                        variant='outlined'
                                        fullWidth
                                        select
                                        size='small'
                                        className={classes.spacingBot}
                                        onChange={handleChange}
                                        value={changeData.unidadMedida}
                                        style={{background:'white',borderRadius:5}}
                                    >
                                        {dataMedida.map((m,index)=>(
                                            <MenuItem key={index} value={m.unidad}>{m.unidad}</MenuItem>
                                        ))}
                                    </TextField>
                                    
                                </Grid>
                            </Grid>
                        </Container>
                        <div align='center' style={{ marginTop: '4rem' }}>
                            <Button variant='contained' color='primary' type='submit' >Registrar Salida</Button>
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
                        <Typography>Salida Registrada</Typography>
                        <Button onClick={closeModalRegister} variant='contained' size='small' color='primary'>aceptar</Button>
                    </div>
                </Paper>
            </Dialog>
        </>
    )
}

export default SalidaMat
