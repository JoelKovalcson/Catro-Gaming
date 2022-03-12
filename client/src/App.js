import React from 'react'
import { Router, Switch } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'


function App() {
  return (
    <Router>
      <Header></Header>
      <Switch></Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;