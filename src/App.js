import React, { Component } from 'react';
import './App.css';

import { Navbar, Nav, NavItem, Modal, Button } from 'react-bootstrap';

import TopicsComponent from "./TopicsComponent.js";

import AccountsComponent from "./AccountsComponent.js";

class App extends Component {

  constructor(props){
    super(props);
    this.navBarFunction1 = this.navBarFunction1.bind(this);
    this.navBarFunction2 = this.navBarFunction2.bind(this);
    this.navBarFunction3 = this.navBarFunction3.bind(this);
    this.navBarFunction4 = this.navBarFunction4.bind(this);
    this.tweetSeleccionado = this.tweetSeleccionado.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      itemPulsado: 1,
      show: false,
      source: null
    };
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  navBarFunction1() {
    this.setState({itemPulsado:1});
  }
  navBarFunction2() {
    this.setState({itemPulsado:2});
  }
  navBarFunction3() {
    this.setState({itemPulsado:3});
  }
  navBarFunction4() {
    this.setState({itemPulsado:4});
  }
  tweetSeleccionado(source){
    console.log(source);
    this.setState({source: source});
    this.handleShow();
  }

  render() {
    const itemPulsado = this.state.itemPulsado;
    let itemGeneral = null;

    if (itemPulsado === 1) {
      itemGeneral = <p>Tweets</p>;
    } else if (itemPulsado === 2){
      itemGeneral = <AccountsComponent/>;
    }else if (itemPulsado === 3){
      itemGeneral = <p>Interacciones</p>;
    }else if (itemPulsado === 4){
      itemGeneral = <TopicsComponent tweetSeleccionado={this.tweetSeleccionado}/>;
    }else {
      itemGeneral = <p>Debes loggearte</p>;
    }

    let nombreUsuario = "";
    let tweet = "";
    let numFollowers = 0;
    let numFriends = 0;
    let urlFoto = "";
    let screen_name = "";

    if(this.state.source != null){
      nombreUsuario = this.state.source.user.name
      tweet = this.state.source.text
      numFriends = this.state.source.user.friends_count
      numFollowers = this.state.source.user.followers_count
      urlFoto = this.state.source.user.profile_image_url_https
      screen_name = this.state.source.user.screen_name
    }

    return (
      <div className="App">
      <Navbar inverse collapseOnSelect>

          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={this.navBarFunction1} eventKey={1} href="#">
                Tweets
              </NavItem>
              <NavItem onClick={this.navBarFunction2} eventKey={2} href="#">
                Cuentas
              </NavItem>
              <NavItem onClick={this.navBarFunction3} eventKey={3} href="#">
                Interacciones
              </NavItem>
              <NavItem onClick={this.navBarFunction4} eventKey={4} href="#">
                Topics
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Login
              </NavItem>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      {itemGeneral}

      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tweet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><img src={urlFoto}/>  {nombreUsuario}    @{screen_name}</h4>
            <p><strong>Seguidos</strong> {numFriends}  <strong>Followers</strong> {numFollowers}</p>
            <p>{tweet}</p>


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

    </div>
    );

  }
}

export default App;
