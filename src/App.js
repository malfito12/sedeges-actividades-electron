import React from 'react'
import './index.css'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import DrawerPrincipal from './Components/Organismsm/DrawerPrincipal';
import Home from './Components/Pages/Home';
import IngresoMat from './Components/Pages/IngresoMat';
import KardexVal from './Components/Pages/KardexVal';
import Register from './Components/Pages/Register';
import SalidaMat from './Components/Pages/SalidaMat';
import TargetaExis from './Components/Pages/TargetaExis';
import ViewProducts from './Components/Pages/ViewProducts';
import Pag_mats_all from './Components/PagesMats/Pag_mats_all';
import P_01_00X from './Components/PagesMats/P_01_00X';
import './index.css'
import IngresosAlmacen from './Components/Pages/IngresosAlmacen';
import Images from './Components/Pages/Images';
import RegisterProduct from './Components/Pages2/Registros/RegisterMaterial';
import ListaProduct from './Components/Pages2/Vistas/ListaProduct';
import ListaSubmateriales from './Components/Pages2/Vistas/ListaSubmateriales';
import IngresoMateriales from './Components/Pages2/Registros/IngresoMateriales';
import SalidaMateriales from './Components/Pages2/Registros/SalidaMateriales';
import TarjetaExistencia from './Components/Pages2/Vistas/TarjetaExistencia';
import KardexValorado from './Components/Pages2/Vistas/KardexValorado';
import ListaAlmacen from './Components/Pages2/Almacen/ListaAlmacen';
import ListaIngresoAlmacen from './Components/Pages2/Almacen/ListaIngresoAlmacen';
import ListaSalidaAlmacen from './Components/Pages2/Almacen/ListaSalidaAlmacen';
import HojaCostos from './Components/Pages2/Costos/HojaCostos';

function App() {
  return (
    <div id="main">
      <Router>
        <DrawerPrincipal />
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/register' component={Register} />
          <Route path='/productsList' component={ViewProducts} />
          <Route path='/ingresomat' component={IngresoMat} />
          <Route path='/salidamat' component={SalidaMat} />

          <Route path='/targetaexis' component={TargetaExis} />
          <Route path='/targetaexis/:id' component={TargetaExis} />

          <Route path='/kardexval' component={KardexVal} />
          <Route path='/kardexval/:id' component={KardexVal} />


          <Route path='/pagmatsall' component={Pag_mats_all} />
          <Route path='/pagmatsall/:id' component={Pag_mats_all} />
          
          <Route path='/ingresosalmacen' component={IngresosAlmacen} />

          <Route path='/P_01_00X' component={P_01_00X} />

          <Route path='/imagenes' component={Images} /> */}

          {/*--------------------------------------NUEVAS PAGINAS--------------------------------*/}
          <Route path='/listaProduct' component={ListaProduct} />
          <Route path='/listaSubmateriales/:id' component={ListaSubmateriales} />
          <Route path='/ingresoMateriales' component={IngresoMateriales} />
          <Route path='/salidaMateriales' component={SalidaMateriales} />
          <Route path='/tarjetaExistencia/:id' component={TarjetaExistencia} />
          <Route path='/kardexValorado/:id' component={KardexValorado} />
          <Route path='/listaAlmacen' component={ListaAlmacen} />
          <Route path='/listaIngresoAlmacen' component={ListaIngresoAlmacen} />
          <Route path='/listaSalidaAlmacen' component={ListaSalidaAlmacen} />
          <Route path='/hojaCostos' component={HojaCostos} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
