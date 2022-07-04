import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Component/Pages/Home'
import ViewHorario from './Component/Pages/ViewHorario'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Vista-Horario' component={ViewHorario} />
      </Switch>
    </Router>
  )
}

export default App