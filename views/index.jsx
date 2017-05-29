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

// Main.propTypes = {
//     title: React.PropTypes.number.isRequired
// };


class Header extends Component{
  render(){
    return(
    <Row>
      <Col s={12} style={style.tableContent} className='grid-example'>1</Col>
    </Row>
    )
  }
}

let style = {
  tableContent:{
    height: '20px',
    backgroundColor: 'red'
  }
}