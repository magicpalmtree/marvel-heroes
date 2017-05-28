import React, { Component } from 'react'
import api from 'marvel-api'
import { Button, Icon, Card, Row, Col } from 'react-materialize'


export default class Main extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })
    marvel.characters.findAll(10)
      .then(console.log)
      .fail(console.error)
      .done()
  }
  render(){
    return(
      <div>
        <Header />
        <h1>Hola</h1>
      </div>
    )
  }
}


class Header extends Component{
  render(){
    return(
      <Button waves='light'>EDIT ME<Icon left>save</Icon></Button>
    )
  }
}