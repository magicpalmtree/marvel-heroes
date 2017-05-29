import React, { Component } from 'react'
import api from 'marvel-api'
import { Button, Icon, Card, Row, Col } from 'react-materialize'


export default class Main extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
          <Header contentHeader={CONTENT}/>
          <Body />
          <Footer />
      </div>
    )
  }
}

// Main.propTypes = {
//     title: React.PropTypes.number.isRequired
// };


class Header extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let contentHeader = this.props.contentHeader[0]
    return(
      <nav className="purple darken-4">
        <div className="container">
          <Row style={style.row}>
            <Col s={12} m={3} style={style.header} >
              <img src={contentHeader.Logoimg} alt={contentHeader.Logoalt} style={style.imgHeader} /> 
            </Col>
            <Col s={12} m={9} style={style.header}>
              swdsa
            </Col>          
          </Row>
        </div>
      </nav>
    )
  }
}

class Body extends Component{
  render(){
    return(
      <section>
        <Row style={style.row}>
          <Characters />
          <Favorite />   
        </Row>        
      </section>
    )
  }
}

class Characters extends Component{
  render(){
    return(
      <div>
        <Col s={12} m={9} style={style.header} className="grey lighten-1">
          <div className="container">
            hi
          </div>
        </Col>
      </div>    
    )
  }
}

class Favorite extends Component{
  render(){
    return(
      <div>
        <Col s={12} m={3} style={style.header} className="grey lighten-3">
          <div className="container">
            hi
          </div>
        </Col>
      </div>
    )
  }
}

class Footer extends Component{
  render(){
    return(
      <footer>
        <Row style={style.row}>
          <Col s={12} style={style.header} className="blue-grey lighten-5">
            defsd
          </Col>
        </Row>
      </footer>
    )
  }
}

let style = {
  row:{
    marginBottom: 0,
  },
  header:{
    height: 'auto'
  },
  imgHeader:{
    height: '50px'
  }
}

const CONTENT = [
  // HEADER
  {
    Logoimg: 'http://camiloarguello.co/img/icons/Marvel-logo.png',
    Logoalt: 'Logo de Marvel' 
  }
]