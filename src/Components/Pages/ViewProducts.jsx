import { Button, Container, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import TableChartIcon from '@material-ui/icons/TableChart';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const ViewProducts = (props) => {
    const { history } = props
    const [buscador, setBuscador] = useState("")
    let data = [
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
    const getTableColor = (e) => {
        // console.log(e)
        if (e % 2 !== 0) {
            return { backgroundColor: '#e1f5fe' }
        }
    }
    const goMaterials = (e) => {
        const code = e.cod
        const nameMaterial = e.material
        history.push('/pagmatsall/' + code + "/" + nameMaterial)
    }
    //------------------------BUSCADOR--------------------------------
    
    const buscarMaterial = (buscador) => {
        return function (x) {
            return x.cod.includes(buscador) ||
                x.material.toLowerCase().includes(buscador) ||
                x.material.includes(buscador) ||
                !buscador

        }
    }
    //----------------------------------------------------------------
    const pdfGenerate = () => {
        const doc = new jsPDF()
        // document.getElementById('desaparecer').style.display='none'
        document.getElementById('desaparecer2').style.display = 'none'
        doc.text(`Tabla de Materiales`, 85, 20)
        // var columns=['codigo','Material']
        // // var values=data.map(e=>([e.cod,e.material]))
        // const ss=document.getElementById('#id-body')
        // doc.autoTable(columns,ss)
        doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 25 } })
        document.getElementById('desaparecer2').style.display = 'revert'
        window.open(doc.output('bloburi'))
        // doc.save('ListaMateriales.pdf')

    }
    //----------------------------------------------------------------

    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom: '2rem' }} variant='h4' align='center'>Lista de Productos</Typography>
                <Grid container spacing={3} style={{ marginBottom: '0.5rem' }}>
                    <Grid item xs={12} sm={6} >
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
                    <Grid container item xs={12} sm={6} justifyContent='flex-end' alignItems='center'>
                        <Button size='small' variant='contained' color='primary' onClick={pdfGenerate}>imprimir</Button>
                        {/* <Button size='small' variant='contained' color='primary' onClick={pdfGenerate}>pdf</Button> */}
                    </Grid>
                </Grid>
                <Paper style={{marginBottom:'2rem'}}>
                    <TableContainer >
                        <Table id='id-table' >
                            <TableHead >
                                <TableRow >
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }} >N°</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }} >Codigo</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }} align='center'>Material</TableCell>
                                    <TableCell id='desaparecer2' style={{ color: 'white', backgroundColor: "black" }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id='id-body'>
                                {data &&
                                    data.filter(buscarMaterial(buscador)).map((d, index) => (
                                        <TableRow hover={true} key={d.cod} style={getTableColor(index)}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{d.cod}</TableCell>
                                            <TableCell>{d.material}</TableCell>
                                            <TableCell id='desaparecer'>
                                                {/* <IconButton component={Link} to={d.pag} size='small'> */}
                                                <IconButton onClick={() => goMaterials(d)} size='small'>
                                                    <TableChartIcon />
                                                </IconButton>
                                            </TableCell>
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

export default withRouter(ViewProducts)
