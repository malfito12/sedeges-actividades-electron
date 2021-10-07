const { BrowserWindow, app, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { v4 } = require('uuid')
const momet = require('moment')
// const nativeImage=require('electron').nativeImage
// require('../src/database')
// const Product= require('../src/models/Products')


const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/cachitambodb', {
mongoose.connect('mongodb://localhost/electrondb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(db => console.log("Base de Datos Conectada"))
  .catch(err => console.log(err));


//----------------------------NUEVA BASE DE DATOS----------------------------------
//----------------------------REGISTRO MATERIALES----------------------------------
const MATERIALSCHEMA = {
  nameMaterial: String,
  codMaterial: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
}
const MATERIAL = mongoose.model('material', MATERIALSCHEMA)
//------------------------------REGISTRO SUB-MATERIALES----------------------------
const SUBMATERIALSCHEMA = {
  nameSubMaterial: String,
  nameMaterial: String,
  codMaterial: String,
  codSubMaterial: String,
  unidadMedida: String,
  image: String
}
const SUBMATERIAL = mongoose.model('submaterial', SUBMATERIALSCHEMA)
//-------------------------REGISTRAR UNIDAD DE MEDIDA-----------------------------------
const UNIDADMEDIDASCHEMA = {
  nameUnidadMedida: String,
  simbolo: String
}
const UNIDADMEDIDA = mongoose.model('unidadmedida', UNIDADMEDIDASCHEMA)
//-------------------------------REGISTRO DE ENTRADAS Y SALIDAS----------------------------------
const ENTRADASSALIDASSCHEMA = {
  typeRegister: String,
  numFactura: String,
  nameMaterial: String,
  codMaterial: String,
  nameSubMaterial: String,
  codSubMaterial: String,
  cantidadF: String,
  cantidadR: String,
  deDonde: String,
  unidadMedida: String,
  precio: String,
  precioUnitario: String,
  procedenciaDestino: String,
  registerDate: String,
  numeroIngreso: String,

  numVale:String,
  cantidadS: String,
  precioS: String,

}
const ENTRADASSALIDAS = mongoose.model('entradassalidas', ENTRADASSALIDASSCHEMA)
//-------------------------------REGISTRO DE TARJETA DE EXISTENCIA--------------------------------

//-------------------------REGISTROS ALMACEN---------------------------------------

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

//---------------REGISTRAR ENTRADAS Y SALIDAS--------------------

//---------------REGISTRAR INGRESO ALMACEN--------------------

//----------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------

// const {createConnection,getConnection}=require('../src/database')
// import createConnection from '../src/database.js'

// const low = require('lowdb')
// // const FileAsync = require('lowdb/adapters/FileSync')
// const FileAsync = require('lowdb/adapters/FileAsync')

// let db;
// const createConnection = async() => {
//   const adapter = new FileAsync('data.json')
//   db = await low(adapter);
//   db.defaults({ productos: [] }).write()
// }
// createConnection()
let win

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      plugins: true,
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  )
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



//-------------------------------OBTENER COD DE PRODUCT-------------------------------------
// ipcMain.handle('get-cod-product',async(e,args)=>{

// })



//-------------------------------GET NUMERO DE INGRESO------------------------------------------
//-------------------------------REGISTER ENTRADAS Y SALIDAS------------------------------------------

//----------------SALIDA DE PRODUCTOS---------------------------------------------

//--------------------------REGISTRO INGRESO DE MATERIALES AL ALMACEN------------------------------------------

//-------------------------- GET MATERIALES AL ALMACEN------------------------------------------

//-------------------------- GET MATERIALES AL ALMACEN DESCRIPTION------------------------------


//-------------------------GET DATA TAJETA DE EXISTENCIA SALDO ACTUAL----------------------------

//-------------------------GET DATA TAJETA DE EXISTENCIA----------------------------

//-------------------------GET DATA KARDEX VALORADO----------------------------




//----------------------------POST MATERIAL---------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// ipcMain.on('post-material',async(e,args)=>{
//   // const result= args
//   console.log(args)
//   // e.reply('post-material', 'material registrado')
//   // e.reply('post-material', JSON.stringify(result))
//   // return JSON.stringify(result)
// })
ipcMain.handle('post-material', async (e, args) => {
  const result = args
  const cont = await MATERIAL.find().countDocuments()
  var data = {}
  if (cont < 9) {
    var aux = (cont + 1).toString()
    aux = '0' + aux + '-00X'
    data = {
      nameMaterial: result.nameMaterial,
      codMaterial: aux
    }
  } else if (cont >= 9) {
    var aux = (cont + 1).toString()
    aux = aux + '-00X'
    data = {
      nameMaterial: result.nameMaterial,
      codMaterial: aux
    }
  }
  const newMaterial = new MATERIAL(data)
  const materialSaved = await newMaterial.save()
  return JSON.stringify(materialSaved)
})

//----------------GET MATERIALES--------------------------
ipcMain.handle('get-material', async (e, args) => {
  const material = await MATERIAL.find().sort({ codMaterial: 1 })
  return JSON.stringify(material)
})
//-------------EDIT MATERIALES------------------------------
ipcMain.handle('edit-material', async (e, args) => {
  const result = args
  // console.log(typeof result.codMaterial)
  // console.log(typeof result.nameMaterial)

  try {
    const material = await MATERIAL.findById({ _id: result._id })
    await MATERIAL.findByIdAndUpdate({ _id: result._id }, result)
    await SUBMATERIAL.updateMany({ nameMaterial: material.nameMaterial, codMaterial: material.codMaterial }, { $set: { nameMaterial: result.nameMaterial, codMaterial: result.codMaterial } })
    await ENTRADASSALIDAS.updateMany({ codMaterial: material.codMaterial, nameMaterial: material.nameMaterial }, { $set: { codMaterial: result.codMaterial, nameMaterial: result.nameMaterial } })
    return JSON.stringify({ message: 'Material actualizado' })
  } catch (error) {
    console.log(error)
  }
})
//--------------DELETE MATERIALES---------------------------
ipcMain.handle("delete-material", async (e, args) => {
  const result = args
  try {
    const material = await MATERIAL.findById({ _id: result._id })
    await MATERIAL.findByIdAndDelete({ _id: result._id })
    await SUBMATERIAL.deleteMany({ codMaterial: material.codMaterial, nameMaterial: material.nameMaterial })
    await ENTRADASSALIDAS.deleteMany({ codMaterial: material.codMaterial, nameMaterial: material.nameMaterial })
    return JSON.stringify({ message: 'Material Eliminado' })
  } catch (error) {
    console.log(error)
  }
})
//----------------POST SUB-MATERIALES--------------------------
ipcMain.handle('post-subMaterial', async (e, args) => {
  const result = args
  // console.log(result)
  if (result.image == null) {
    var aux = result.codMaterial
    aux = aux.split("-")
    const cont = await SUBMATERIAL.find({ codMaterial: result.codMaterial }).countDocuments()
    var data = {}
    if (cont < 9) {
      var aux2 = (cont + 1).toString()
      aux2 = aux[0] + "-" + "00" + aux2
      data = {
        nameSubMaterial: result.nameSubMaterial,
        nameMaterial: result.nameMaterial,
        codMaterial: result.codMaterial,
        codSubMaterial: aux2,
        unidadMedida: result.unidadMedida,
      }
    } else if (cont >= 9) {
      var aux2 = (cont + 1).toString()
      aux2 = aux[0] + "-" + "0" + aux2
      data = {
        nameSubMaterial: result.nameSubMaterial,
        nameMaterial: result.nameMaterial,
        codMaterial: result.codMaterial,
        codSubMaterial: aux2,
        unidadMedida: result.unidadMedida,
      }
    }
    const newSubMaterial = new SUBMATERIAL(data)
    const submaterialSaved = await newSubMaterial.save()

  }else{
    var aux = result.codMaterial
    aux = aux.split("-")
    const cont = await SUBMATERIAL.find({ codMaterial: result.codMaterial }).countDocuments()
    var data = {}
    if (cont < 9) {
      var aux2 = (cont + 1).toString()
      aux2 = aux[0] + "-" + "00" + aux2
      data = {
        nameSubMaterial: result.nameSubMaterial,
        nameMaterial: result.nameMaterial,
        codMaterial: result.codMaterial,
        codSubMaterial: aux2,
        unidadMedida: result.unidadMedida,
        image: result.image
      }
    } else if (cont >= 9) {
      var aux2 = (cont + 1).toString()
      aux2 = aux[0] + "-" + "0" + aux2
      data = {
        nameSubMaterial: result.nameSubMaterial,
        nameMaterial: result.nameMaterial,
        codMaterial: result.codMaterial,
        codSubMaterial: aux2,
        unidadMedida: result.unidadMedida,
        image: result.image
      }
    }
    const newSubMaterial = new SUBMATERIAL(data)
    const submaterialSaved = await newSubMaterial.save()
  }
  return JSON.stringify('sub-material registrado')

})

//---------------GET SUB-MATERIAL---------------------------------
ipcMain.handle('get-submaterial', async (e, args) => {
  const code = args
  try {
    const result = await SUBMATERIAL.find({ codMaterial: code }).sort({ codSubMaterial: 1 })
    return JSON.stringify(result)
  } catch (error) {
    console.log(error)
  }

})

//------------EDIT SUB MATERIALES---------------------
ipcMain.handle("edit-submaterial", async (e, args) => {
  const result = args
  // console.log(result)
  try {
    const subMaterial = await SUBMATERIAL.findById({ _id: result._id })
    await SUBMATERIAL.findByIdAndUpdate({ _id: result._id }, result)
    await ENTRADASSALIDAS.updateMany({ codSubMaterial: subMaterial.codSubMaterial, nameSubMaterial: subMaterial.nameSubMaterial }, {
      $set: {
        codSubMaterial: result.codSubMaterial,
        nameSubMaterial: result.nameSubMaterial,
        unidadMedida: result.unidadMedida,
      }
    })
    return JSON.stringify('Sub-Material actualizado')
  } catch (error) {
    console.log(error)
  }
})

//----------DELETE SUB-MATERIAL-----------------------------
ipcMain.handle("delete-submaterial", async (e, args) => {
  const result = args
  try {
    const subMaterial = await SUBMATERIAL.findById({ _id: result._id })
    await SUBMATERIAL.findByIdAndDelete({ _id: result._id })
    await ENTRADASSALIDAS.deleteMany({ codSubMaterial: subMaterial.codSubMaterial, nameSubMaterial: subMaterial.nameSubMaterial })
    return JSON.stringify('sub-material eliminado')
  } catch (error) {
    console.log(error)
  }
})

//---------------POST UNIDAD DE MEDIDA-----------------------------
ipcMain.handle('post-unidadMedida', async (e, args) => {
  try {
    const unidadMedida = new UNIDADMEDIDA(args)
    const unidadMedidaSaved = await unidadMedida.save()
    return JSON.stringify('Unidad de Medida Registrada')
  } catch (error) {
    console.log(error)
  }
})

//---------------GET UNIDAD DE MEDIDA-----------------------------

ipcMain.handle('get-unidadMedida', async (e, args) => {
  try {
    const unidadMedida = await UNIDADMEDIDA.find()
    return JSON.stringify(unidadMedida)
  } catch (error) {
    console.log(error)
  }
})

//-------------POST ENTRADAS DE MATERIAL--------------------
ipcMain.handle('post-entradas', async (e, args) => {
  const result = args
  const aux = result.length
  var array = []
  var quebrado = new Date()
  quebrado = quebrado.toString()
  quebrado = quebrado.split("")
  try {
    if (aux > 1) {
      var array = []
      const consulta = await ENTRADASSALIDAS.find({ typeRegister: 'entrada' }).sort({ $natural: -1 }).limit(1)
      const cont = consulta.length

      if (cont != 0) {
        var uno = consulta[0].numeroIngreso
        uno = uno.split("-")
        uno = parseInt(uno[1])
        uno = (uno + 1).toString()
        uno = "IAC-" + uno + " /" + quebrado[13] + quebrado[14]
        var dos = { numeroIngreso: uno }
        for (var i = 0; i < aux; i++) {
          var data = { ...result[i], ...dos }
          array.push(data)
        }
        // const entradasalida= new ENTRADASSALIDAS(data)
        // const entradasalidaSaved= await entradasalida.save()
        // console.log('si')
      } else {
        var uno = "IAC-1" + "/ " + quebrado[13] + quebrado[14]
        var dos = { numeroIngreso: uno }
        for (var i = 0; i < aux; i++) {
          var data = { ...result[i], ...dos }
          array.push(data)
          // const entradasalida= new ENTRADASSALIDAS(data)
          // const entradasalidaSaved= await entradasalida.save()
        }
      }
      const num = array.length
      for (var i = 0; i < num; i++) {
        const entradasalida = new ENTRADASSALIDAS(array[i])
        const entradasalidaSaved = await entradasalida.save()
      }
    } else {
      const consulta = await ENTRADASSALIDAS.find({ typeRegister: 'entrada' }).sort({ $natural: -1 }).limit(1)
      const cont = consulta.length
      if (cont != 0) {
        var uno = consulta[0].numeroIngreso
        uno = uno.split("-")
        uno = parseInt(uno[1])
        uno = (uno + 1).toString()
        uno = "IAC-" + uno + "/ " + quebrado[13] + quebrado[14]
        var dos = { numeroIngreso: uno }
        var data = { ...result[0], ...dos }
        const entradasalida = new ENTRADASSALIDAS(data)
        const entradasalidaSaved = await entradasalida.save()
        // console.log('si')
      } else {
        var uno = { numeroIngreso: "IAC-1" + "/ " + quebrado[13] + quebrado[14] }
        var data = { ...result[0], ...uno }
        const entradasalida = new ENTRADASSALIDAS(data)
        const entradasalidaSaved = await entradasalida.save()
        // console.log(data)
        // console.log('no')
      }
    }
    // for(var i=0;i<aux;i++){
    // const entradasalida= new ENTRADASSALIDAS(result[i])
    // const entradasalidaSaved= await entradasalida.save()
    // const tarjeta=await TARJETAEXISTENCIA.find({"$and":[{typeRegister:result[i].typeRegister},{codSubMaterial:result[i].codSubMaterial}]})
    // var uno=tarjeta.length
    // if(uno===0){
    //   uno=(uno+1).toString()
    //   var numeroIngreso="N-"+uno
    //   array.push({
    //     typeRegister:result[i].typeRegister,
    //     numFactura: result[i].numFactura,
    //     nameMaterial: result[i].nameMaterial,
    //     codMaterial:result[i].codMaterial,
    //     nameSubMaterial: result[i].nameSubMaterial,
    //     codSubMaterial:result[i].codSubMaterial,
    //     cantidadF: result[i].cantidadF,
    //     cantidadR: result[i].cantidadR,
    //     deDonde: result[i].deDonde,
    //     unidadMedida: result[i].unidadMedida,
    //     precioEntrada: result[i].precioEntrada,
    //     procedenciaDestino: result[i].procedenciaDestino,
    //     fechaIngreso: result[i].fechaIngreso,

    //     // fechaSalida: String,

    //     numIngreso:numeroIngreso,
    //     cantidadEntrada:result[i].cantidadF,
    //     // cantidadSalida:String,
    //     saldoExistencia:result[i].cantidadF,
    //   })
    //   const newTarjeta= new TARJETAEXISTENCIA(array[i])
    //   await newTarjeta.save()
    // }else{
    //   var tarjeta2= await TARJETAEXISTENCIA.find({"$and":[{typeRegister:result[i].typeRegister},{codSubMaterial:result[i].codSubMaterial}]}).sort({$natural:-1}).limit(1)
    //   var saldo=await TARJETAEXISTENCIA.find({"$and":[{codSubMaterial:result[i].codSubMaterial}]}).sort({$natural:-1}).limit(2)
    //   if(saldo[0].typeRegister==='entrada'){
    //     var sum=parseFloat(saldo[0].saldoExistencia)
    //     var sum2=parseFloat(result[i].cantidadF)
    //     sum=sum+sum2
    //     var dos=tarjeta2[0].numIngreso
    //     dos=dos.split("-")
    //     dos=parseInt(dos[1])
    //     var numeroIngreso=(dos+1).toString()
    //     numeroIngreso="N-"+numeroIngreso
    //     array.push({
    //       typeRegister:result[i].typeRegister,
    //       numFactura: result[i].numFactura,
    //       nameMaterial: result[i].nameMaterial,
    //       codMaterial:result[i].codMaterial,
    //       nameSubMaterial: result[i].nameSubMaterial,
    //       codSubMaterial:result[i].codSubMaterial,
    //       cantidadF: result[i].cantidadF,
    //       cantidadR: result[i].cantidadR,
    //       deDonde: result[i].deDonde,
    //       unidadMedida: result[i].unidadMedida,
    //       precioEntrada: result[i].precioEntrada,
    //       procedenciaDestino: result[i].procedenciaDestino,
    //       fechaIngreso: result[i].fechaIngreso,

    //       // fechaSalida: String,

    //       numIngreso:numeroIngreso,
    //       cantidadEntrada:result[i].cantidadF,
    //       // cantidadSalida:String,
    //       saldoExistencia:sum.toFixed(2)
    //     })
    //     const newTarjeta= new TARJETAEXISTENCIA(array[i])
    //     await newTarjeta.save()

    //   }else{
    //     var sum=parseFloat(saldo[0].saldoExistencia)
    //     var sum2=parseFloat(result[i].cantidadF)
    //     sum=sum-sum2
    //     var tres=tarjeta2[0].numIngreso
    //     tres=tres.split("-")
    //     tres=parseInt(tres[1])
    //     var numeroIngreso=(tres+1).toString()
    //     numeroIngreso="N-"+numeroIngreso
    //     array.push({
    //       typeRegister:result[i].typeRegister,
    //       numFactura: result[i].numFactura,
    //       nameMaterial: result[i].nameMaterial,
    //       codMaterial:result[i].codMaterial,
    //       nameSubMaterial: result[i].nameSubMaterial,
    //       codSubMaterial:result[i].codSubMaterial,
    //       cantidadF: result[i].cantidadF,
    //       cantidadR: result[i].cantidadR,
    //       deDonde: result[i].deDonde,
    //       unidadMedida: result[i].unidadMedida,
    //       precioEntrada: result[i].precioEntrada,
    //       procedenciaDestino: result[i].procedenciaDestino,
    //       fechaIngreso: result[i].fechaIngreso,

    //       // fechaSalida: result[i].fechaSalida,

    //       numIngreso:numeroIngreso,
    //       // cantidadSalida:result[i].cantidadF,
    //       // cantidadSalida:String,
    //       saldoExistencia:sum.toFixed(2)
    //     })
    //     const newTarjeta= new TARJETAEXISTENCIA(array[i])
    //     await newTarjeta.save()
    //   }

    // }
    // const tarjetaExistencia= new TARJETAEXISTENCIA()

    // }
    return JSON.stringify('entrada registrada')

  } catch (error) {
    console.log(error)
  }
})
//-------------POST SALIDA DE MATERIAL--------------------
ipcMain.handle(`post-salidas`, async (e, args) => {
  const result = args
  try {
    const salidaMaterial = new ENTRADASSALIDAS(result)
    await salidaMaterial.save()
    return JSON.stringify('salida de material registrada')
  } catch (error) {
    console.log(error)
  }
})


//-------------GET TARJETA EXISTENCIA-----------------------
ipcMain.handle(`get-tarjetaExistencia`, async (e, args) => {
  const getData = await ENTRADASSALIDAS.find({ codSubMaterial: args }).sort({ registerDate: 1 })
  const cantidad = getData.length
  var array = []
  var sum = 0;
  var rest = 0;
  for (var i = 0; i < cantidad; i++) {
    if (getData[i].typeRegister === 'entrada') {
      const n = parseFloat(getData[i].cantidadF)
      sum = sum + n
      array.push({
        typeRegister: getData[i].typeRegister,
        codMaterial: getData[i].codMaterial,
        nameMaterial: getData[i].nameMaterial,
        codSubMaterial: getData[i].codSubMaterial,
        nameSubMaterial: getData[i].nameSubMaterial,
        cantidadF: getData[i].cantidadF,
        cantidadR: getData[i].cantidadR,
        precio: getData[i].precio,
        precioUnitario: getData[i].precioUnitario,
        procedenciaDestino: getData[i].procedenciaDestino,
        unidadMedida: getData[i].unidadMedida,
        registerDate: getData[i].registerDate,
        numFactura: getData[i].numFactura,
        numeroIngreso: getData[i].numeroIngreso,
        deDonde: getData[i].deDonde,
        saldoExistencia: sum.toFixed(2)
      })
    } else if (getData[i].typeRegister === 'salida') {
      const m = parseFloat(getData[i].cantidadS)
      rest = sum - m;
      array.push({
        typeRegister: getData[i].typeRegister,
        codMaterial: getData[i].codMaterial,
        nameMaterial: getData[i].nameMaterial,
        codSubMaterial: getData[i].codSubMaterial,
        nameSubMaterial: getData[i].nameSubMaterial,
        cantidadS: getData[i].cantidadS,
        // cantidadR:getData[i].cantidadR,
        precioS: getData[i].precioS,
        precioUnitario: getData[i].precioUnitario,
        procedenciaDestino: getData[i].procedenciaDestino,
        unidadMedida: getData[i].unidadMedida,
        registerDate: getData[i].registerDate,
        numeroIngreso: getData[i].numeroIngreso,
        // numFactura:getData[i].numFactura,
        // deDonde:getData[i].deDonde,
        numVale:getData[i].numVale,
        saldoExistencia: rest.toFixed(2)
      })
      sum = rest
    }
  }
  return JSON.stringify(array)
})

//---------------GET KARDEX DE EXISTENCIA VALORADO-------------------------
ipcMain.handle('get-kardexValorado', async (e, args) => {
  const getData = await ENTRADASSALIDAS.find({ codSubMaterial: args }).sort({ registerDate: 1 })
  // console.log(getData)
  const cantidad = getData.length
  var array = []
  var totalCantidad = 0;
  var totalValor = 0;
  for (var i = 0; i < cantidad; i++) {
    if (getData[i].typeRegister === 'entrada') {
      const n = parseFloat(getData[i].cantidadF)
      totalCantidad = totalCantidad + n;
      const valor = parseFloat(getData[i].precio)
      totalValor = totalValor + valor;
      array.push({
        typeRegister: getData[i].typeRegister,
        registerDate: getData[i].registerDate,
        procedenciaDestino: getData[i].procedenciaDestino,
        cantidadF: getData[i].cantidadF,
        precio: getData[i].precio,
        totalCantidad: totalCantidad.toFixed(2),
        totalValor: totalValor.toFixed(2),
        precioUnitario: getData[i].precioUnitario
      })
    } else {
      const n = parseFloat(getData[i].cantidadS)
      const valor = parseFloat(getData[i].precioS)
      totalCantidad = totalCantidad - n;
      totalValor = totalValor - valor;
      array.push({
        typeRegister: getData[i].typeRegister,
        registerDate: getData[i].registerDate,
        procedenciaDestino: getData[i].procedenciaDestino,
        cantidadS: getData[i].cantidadS,
        precioS: getData[i].precioS,
        totalCantidad: totalCantidad.toFixed(2),
        totalValor: totalValor.toFixed(2),
        precioUnitario: getData[i].precioUnitario
      })
    }
  }
  return JSON.stringify(array)
})

//-------------GET SUB-MATERIAL TOTAL-----------------------
ipcMain.handle("get-subMaterial-total", async (e, args) => {
  const result = args
  const consulta = await SUBMATERIAL.find({ codMaterial: args }).sort({ codSubMaterial: 1 })
  const cantidad = consulta.length
  // console.log(consulta)
  var array = []
  for (var i = 0; i < cantidad; i++) {
    var cod = consulta[i].codSubMaterial
    var subMaterial = await ENTRADASSALIDAS.find({ codSubMaterial: cod }).sort({ registerDate: 1 })
    const cantidad2 = subMaterial.length
    var totalCantidad = 0;
    var totalValor = 0;
    var saldoInicial = 0;
    var precioUnitario = 0;
    var unidadMedida = "";
    for (var j = 0; j < cantidad2; j++) {
      if (subMaterial[j].typeRegister === 'entrada') {
        saldoInicial = subMaterial[0].cantidadF
        const n = parseFloat(subMaterial[j].cantidadF)
        const valor = parseFloat(subMaterial[j].precio)
        totalCantidad = totalCantidad + n;
        totalValor = totalValor + valor
        precioUnitario = subMaterial[j].precioUnitario
        unidadMedida = subMaterial[0].unidadMedida
      } else {
        const m = parseFloat(subMaterial[j].cantidadS)
        const valor = parseFloat(subMaterial[j].precioS)
        totalCantidad = totalCantidad - m
        totalValor = totalValor - valor
      }
    }
    totalValor = new Intl.NumberFormat('es-BO').format(totalValor)
    array.push({
      unidadMedida: unidadMedida,
      saldoInicial: saldoInicial,
      saldoActual: totalCantidad.toFixed(2),
      // precioTotal:totalValor.toFixed(2),
      precioTotal: totalValor,
      precioUnitario: precioUnitario
    })
  }
  // console.log()
  return JSON.stringify(array)
})
//--------------------GET ALAMACEN--------------------
ipcMain.handle("get-almacen-all", async (e, args) => {
  const result = await ENTRADASSALIDAS.find({}).sort({ registerDate: 1 })
  const contador = result.length
  var array = []
  for (var i = 0; i < contador; i++) {
    if (result[i].typeRegister === 'entrada') {
      array.push({
        _id: result[i]._id,
        cantidad: result[i].cantidadF,
        cantidadR: result[i].cantidadR,
        codMaterial: result[i].codMaterial,
        codSubMaterial: result[i].codSubMaterial,
        deDonde: result[i].deDonde,
        nameMaterial: result[i].nameMaterial,
        nameSubMaterial: result[i].nameSubMaterial,
        numFactura: result[i].numFactura,
        numeroIngreso: result[i].numeroIngreso,
        precio: result[i].precio,
        precioUnitario: result[i].precioUnitario,
        procedenciaDestino: result[i].procedenciaDestino,
        registerDate: result[i].registerDate,
        typeRegister: result[i].typeRegister,
        unidadMedida: result[i].unidadMedida,
      })
    } else {
      array.push({
        _id: result[i]._id,
        cantidad: result[i].cantidadS,
        codMaterial: result[i].codMaterial,
        codSubMaterial: result[i].codSubMaterial,
        nameMaterial: result[i].nameMaterial,
        nameSubMaterial: result[i].nameSubMaterial,
        precio: result[i].precioS,
        precioUnitario: result[i].precioUnitario,
        procedenciaDestino: result[i].procedenciaDestino,
        registerDate: result[i].registerDate,
        typeRegister: result[i].typeRegister,
        unidadMedida: result[i].unidadMedida,
      })
    }
  }
  return JSON.stringify(array)
})

//------------------GET INGRESO ALMACEN----------------------
ipcMain.handle("get-ingresoAlmacen", async (e, args) => {
  const result = await ENTRADASSALIDAS.find({ typeRegister: 'entrada' }).sort({ registerDate: 1 })
  return JSON.stringify(result)
})
//------------------GET SALIDA ALMACEN------------------------
ipcMain.handle('get-salidaAlmacen', async (e, args) => {
  const result = await ENTRADASSALIDAS.find({ typeRegister: 'salida' }).sort({ registerDate: 1 })
  return JSON.stringify(result)
})
//------------------GET NUMERO DE INGRESO-----------------------
ipcMain.handle("get-numeroIngreso", async (e, args) => {
  const result = await ENTRADASSALIDAS.find({ typeRegister: 'entrada' }).sort({ $natural: -1 }).limit(1)
  return JSON.stringify(result)
})

//------------------EDIT REGISTROS ENTRADAS SALIDAS-----------------------------
ipcMain.handle("edit-entradas-salidas", async (e, args) => {
  const id = args._id
  const typeRegister = args.typeRegister
  console.log(id)
  if (typeRegister === 'entrada') {
    const editar = await ENTRADASSALIDAS.findOneAndUpdate({ _id: id }, {
      cantidad: args.cantidad,
      nameMaterial: args.nameMaterial,
      nameSubMaterial: args.nameSubMaterial,
      precio: args.precio,
      precioUnitario: args.precioUnitario,
      procedenciaDestino: args.procedenciaDestino,
      registerDate: args.registerDate,
      unidadMedida: args.unidadMedida,
    })
  } else {
    await ENTRADASSALIDAS.findOneAndUpdate({ _id: id }, {
      cantidadS: args.cantidad,
      nameMaterial: args.nameMaterial,
      nameSubMaterial: args.nameSubMaterial,
      precioS: args.precio,
      precioUnitario: args.precioUnitario,
      procedenciaDestino: args.procedenciaDestino,
      registerDate: args.registerDate,
      unidadMedida: args.unidadMedida,
    })
  }
  return JSON.stringify('registro editado')
})
//---------------GET SALDO TOTAL MATERIAL--------------------------
ipcMain.handle("get-saldoTotalMaterial", async (e, args) => {
  const result = await MATERIAL.find().sort({ codMaterial: 1 })
  const contador = result.length
  var array = []
  for (var i = 0; i < contador; i++) {
    var sum = 0;
    const codMaterial = result[i].codMaterial
    const subMaterial = await ENTRADASSALIDAS.find({ codMaterial: codMaterial }).sort({ registerDate: 1 })
    const contSubMaterial = subMaterial.length
    for (var j = 0; j < contSubMaterial; j++) {
      if (subMaterial[j].typeRegister === 'entrada') {
        var num = parseFloat(subMaterial[j].precio)
        sum = sum + num
        // consoe.log(sum)
      } else {
        var num = parseFloat(subMaterial[j].precioS)
        sum = sum - num
        // console.log(sum)
      }
    }
    sum = new Intl.NumberFormat('es-BO').format(sum)
    array.push({
      codMaterial: codMaterial,
      // nameSubMaterial:subMaterial[i].nameSubMaterial,
      saldoTotal: sum
    })
  }
  return JSON.stringify(array)
})
