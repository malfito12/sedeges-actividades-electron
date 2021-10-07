import { Button, Container, Grid,InputAdornment,TextField, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import sello from '../../images/sello.png'
const ipcRenderer = window.require('electron').ipcRenderer

const useStyles = makeStyles((theme) => ({
    styleTablehead: {
        color: 'white',
        backgroundColor: "black",
        align: 'center'
    }
}))

const TargetaExis = (props) => {
    const classes = useStyles()
    const [changeData, setChangeData] = useState([])
    const [almacen, setAlmacen] = useState([])
    var a = props.location.pathname
    a = a.split('/')
    // console.log(a)
    var array=[]
    var dos;
    useEffect(() => {
        (async () => {

            ipcRenderer.send('get-tarjeta-existencia', a[3])
            ipcRenderer.on('get-tarjeta-existencia', (e, args) => {
                const targeta = JSON.parse(args)
                setChangeData(targeta)

            })
            ipcRenderer.send('get-almacen-description',a[3])
            ipcRenderer.on('get-almacen-description',(e,args)=>{
                const product=JSON.parse(args)
                setAlmacen(product)
            })
        })()
    }, [])
//-----------------------------------------------------------
    var tres=0;
    for(var i=0;i<changeData.length;i++){
        if(changeData[i].typeRegister==='entrada'){
            dos={...changeData[i],...almacen[tres]}
            array.push(dos)
            tres++;
        }else{
            const cuatro={numIngreso:" "}
            const cinco={...changeData[i],...cuatro}
            array.push(cinco)
        }
    }

//-----------------------------------------------------------
    var image=sello
    const pdfGenerate =()=>{
        const doc= new jsPDF()
        doc.setFontSize(13)
        doc.text(`Tabla de Existencia`,80,20)
        doc.addImage(image,20,10,30,15)
        doc.text(`Kadex N°:   ${a[5]}`,15,35)
        doc.text(`Unidad:   ${a[7]}`,120,35)
        doc.text(`Articulo:   ${a[3]}`,15,42)
        doc.text(`Stock Minimo :   ${a[6]}`,50,49)
        doc.autoTable({html:"#id-table", styles: { halign: 'center' }, margin:{top:55}})
        window.open(doc.output('bloburi'))
    }
//------------------------BUSCADOR------------------------------
const [buscador, setBuscador] = useState("")
const buscarMaterial = (buscador) => {
    try {
        return function (x) {
            return x.registerDate.includes(buscador) ||
                x.numIngreso.toLowerCase().includes(buscador) ||
                !buscador
        }
    } catch (error) {
        
    }
}

//-----------------------------------------------------------
    // console.log(changeData)
    // console.log(almacen)
    console.log(array)
    return (
        <Container maxWidth={false}>
            <div style={{ paddingLeft: 240 }}>
                <Typography style={{ paddingTop: '5rem',marginBottom:'1rem' }} variant='h4' align='center'>Tarjeta de Existencia</Typography>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6}>
                        <Typography>Kardex N°: {a[5]}</Typography>
                        <Typography>Articulo: {a[3]}</Typography>
                        <Typography>Stock Minino: {a[6]} "saldo inicio"</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography >Unidad: {a[7]}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{marginBottom:'0.5rem'}}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid container item xs={12} sm={6} justifyContent='flex-end'>
                        <Button variant='contained' color='primary' size='small' onClick={pdfGenerate}>imprimir</Button>
                    </Grid>
                </Grid>
                <Paper>
                    <TableContainer>
                        <Table id='id-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.styleTablehead}>Fecha</TableCell>
                                    <TableCell className={classes.styleTablehead}>Pedido de Vale N°</TableCell>
                                    <TableCell className={classes.styleTablehead}>Ingreso N°</TableCell>
                                    <TableCell className={classes.styleTablehead}>Seccion</TableCell>
                                    <TableCell className={classes.styleTablehead}>Entradas</TableCell>
                                    <TableCell className={classes.styleTablehead}>Salidas</TableCell>
                                    <TableCell className={classes.styleTablehead}>Saldo en Existecia</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {array&&array.filter(buscarMaterial(buscador)).map((d, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{d.registerDate}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{d.numIngreso}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{d.cantEntrada}</TableCell>
                                        <TableCell>{d.cantSalida}</TableCell>
                                        <TableCell >{d.saldoExistencia}</TableCell>
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

export default TargetaExis
