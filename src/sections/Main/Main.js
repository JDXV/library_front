import React, { Component } from 'react';
import { BooksClient } from '../Books/Books';
import Modal from '../../components/Modal';
import './Main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="main">
        <BooksClient modalBody={this.renderModal} />
      </div>
    );
  }
}

export default App;