import React, { Component } from 'react'
import api from 'marvel-api'
import { Button, Icon, Card, Row, Col } from 'react-materialize'


export default class Main extends Component {
  render(){
    console.log("hisss")
    return(
      <div>
          <Header />
          <Body />
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
      <Col s={12} style={style.header} className="purple darken-4">

      </Col>
    </Row>
    )
  }
}

class Body extends Component{
  render(){
    return(
    <Row>
      <Col s={8} style={style.header} className="grey lighten-5">
        hi
      </Col>
    </Row>
    )
  }
}

class Favorite extends Component{
  render(){
    return(
    <Row>
      <Col s={2} style={style.header} className="grey lighten-2">
        again
      </Col>
    </Row>
    )
  }
}

class Footer extends Component{
  render(){
    return(
    <Row>
      <Col s={12} style={style.header} className="blue-grey lighten-5">

      </Col>
    </Row>
    )
  }
}

let style = {
  header:{
    height: '80px'
  }
}