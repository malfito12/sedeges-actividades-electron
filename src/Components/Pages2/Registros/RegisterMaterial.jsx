import { Button, Dialog, Paper, Box, Typography, TextField, makeStyles, Grid } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

const ipcRenderer = window.require('electron').ipcRenderer
const useStyles = makeStyles((theme) => ({
    spacingBot: {
        marginBottom: '1rem'
    }
}))

const RegisterMaterial = (props) => {
    const classes = useStyles()
    const [openRegister, setOpenRegister] = useState(false)
    const [changeData,setChangeData]=useState({
        nameMaterial:''
    })

    //---------------POST PRODUCTOS---------------------
    const openModalRegister = () => {
        setOpenRegister(true)
    }
    const closeModalRegister = () => {
        setOpenRegister(false)
    }

    const postMaterial=async(e)=>{
        e.preventDefault()
        // console.log(changeData)
        // ipcRenderer.send('post-material',changeData)
        // ipcRenderer.on('post-material',(e,args)=>{
        //     console.log(args)
        // })
        const result= await ipcRenderer.invoke('post-material',changeData)
        console.log(result)
        closeModalRegister()
        props.uno()
        // console.log(result)

    }
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------------------------------------------
    //----------------------------------------------------
    const handleChange=(e)=>{
        setChangeData({
            ...changeData,
            [e.target.name]:e.target.value
        })
    }
    // console.log(changeData)
    
    return (
        <>
            <Button size='small' className={classes.spacingBot} variant='contained' color='primary' onClick={openModalRegister}>registrar</Button>
            <Dialog
                open={openRegister}
                onClose={closeModalRegister}
                maxWidth='md'
                style={{ paddingLeft: 240 }}
            >
                <Paper component={Box} p={2}>
                    <div style={{marginLeft:'10rem',marginRight:'10rem'}}></div>
                    <Typography variant='subtitle1' align='center' className={classes.spacingBot}>Registrar producto</Typography>
                    <form onSubmit={postMaterial}>
                        <TextField
                            name='nameMaterial'
                            label='Nombre'
                            variant='outlined'
                            className={classes.spacingBot}
                            fullWidth
                            onChange={handleChange}
                            required
                        />
                        <Grid container justifyContent='space-evenly'>
                            <Button size='small' variant='contained' color='primary' type='submit'>aceptar</Button>
                            <Button size='small' variant='contained' color='secondary' onClick={closeModalRegister}>cancelar</Button>
                        </Grid>
                    </form>
                </Paper>
            </Dialog>
        </>
    )
}

export default RegisterMaterial
