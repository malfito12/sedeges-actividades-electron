import { Container, Box, makeStyles, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Grid, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../../images/sello.png'

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))
const HojaCostos = () => {
    const classes = useStyles()
    const [material, setMaterial] = useState([])
    const [saldoTotalMaterial,setSaldoTotalMaterial]=useState([])

    useEffect(() => {
        getMateriales()
        getSaldoTotalMaterial()
    }, [])
    //----------------GET MATERIALES--------------------------------
    const getMateriales = async () => {
        const result = await ipcRenderer.invoke("get-material")
        setMaterial(JSON.parse(result))
    }
    //-------------------GET SALTO TOTAL MATERIAL-----------------------------
    const getSaldoTotalMaterial=async()=>{
        const result=await ipcRenderer.invoke("get-saldoTotalMaterial")
        setSaldoTotalMaterial(JSON.parse(result))
    }
    //----------------------------------------------------------
    const contador=material.length
    var array=[]
    var dos;
    for(var i=0;i<contador;i++){
        dos={...material[i],...saldoTotalMaterial[i]}
        array.push(dos)
    }
    //--------------------PDF GENERATE----------------------------
    var image = sello
    const pdfGenerate = () => {
        const doc = new jsPDF()
        // document.getElementById('desaparecer').style.display = 'none'
        doc.text("HOJA DE COSTOS ALMACEN I. CACHITAMBO", 50, 40)
        doc.addImage(image, 20, 10, 35, 20)
        doc.autoTable({ html: "#id-table", styles: { halign: 'center' }, margin: { top: 50 } })
        // document.getElementById('desaparecer').style.display = 'revert'
        window.open(doc.output('bloburi'))
    }
    //----------------------------------------------------------
    //----------------------------------------------------------
    // console.log(material)
    console.log(array)
    // console.log(saldoTotalMaterial)
    // var ss=123345666.677
    // console.log(new Intl.NumberFormat('es-MX').format(ss))
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem', marginBottom: '2rem' }} variant='h5' align='center'>HOJA DE COSTOS ALMACEN CACHITAMBO</Typography>
                <Grid className={classes.spacingBot} container justifyContent='flex-end'>
                    <Button size='small' variant='contained' style={{background:'green', color:'white'}} onClick={pdfGenerate}>imprimir</Button>
                </Grid>
                <Paper component={Box} p={1}>
                    <TableContainer>
                        <Table id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>N°</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Codigo</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Material</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Total Saldo Bs</TableCell>
                                    <TableCell style={{ color: 'white', backgroundColor: "black" }}>Total Saldo $us</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {array.length > 0 ? (
                                    array.map((m, index) => (
                                        <TableRow key={m._id}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{m.codMaterial}</TableCell>
                                            <TableCell>{m.nameMaterial}</TableCell>
                                            <TableCell>{m.saldoTotal}</TableCell>
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
            </div>
        </Container>
    )
}

export default HojaCostos
