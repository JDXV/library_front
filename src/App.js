import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Login from './sections/Login/Login';
import { BooksAdmin, BooksClient } from './sections/Books/Books';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // asigna el parametro rol al estado rol
      rol: window.location.search.split("rol=")[1],
      //por defecto carga la vista de cliente
      books: BooksClient
    }
  }
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/Books' component={BooksClient} />
            <Route path='/admin' component={BooksAdmin} />
          </Switch>
      </Router>
      //<div className="App">
      //  <header className="App-header">
      //    <img src={logo} className="App-logo" alt="logo" />
      //    <h1 className="App-title">Welcome to React</h1>
      //  </header>
      //  <p className="App-intro">
      //    To get started, edit <code>src/App.js</code> and save to reload.
      //  </p>
      //</div>
    );
  }
  componentDidMount(){
    // Si el estado de rol es igual a admin cambia el estado books a la vista de Admin
    if(this.state.rol==="admin"){
      this.setState({
        books: BooksAdmin
      })
    }
  }
}

export default App;
