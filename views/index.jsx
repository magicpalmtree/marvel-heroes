import React, { Component } from 'react'
import api from 'marvel-api'
import { Button, Icon, Card, Row, Col } from 'react-materialize'


export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      items : []
    }
  }
  componentDidMount(){
    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })
    marvel.characters.findAll()
      .then(result => {
        this.setState({items: result.data})
      })
      .fail(console.error)
      .done()
  }
  render(){
    return(
      <div>
          <Header contentHeader={CONTENT}/>
          <Body items={this.state.items}/>
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
            <Col s={12} m={9} style={style.header} className="input-field">
              <input type="text" id="search_bar"/>
              <label htmlFor="search_bar">Search</label>      
            </Col>          
          </Row>
        </div>
      </nav>
    )
  }
}

class Body extends Component{
  render(){
    console.log(this.props)
    return(
      <section>
        <Row style={style.row}>
          <Characters items={this.props.items}/>
          <Favorite />   
        </Row>        
      </section>
    )
  }
}

class Characters extends Component{
  render(){
    let myCharacter = []
    this.props.items.forEach((character) => {
      myCharacter.push(
        <Character
          key={character.id}
          name={character.name}
          description={character.description}
          thumbnail={character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension} 
        />
      )
    })
    return(
      <div>
        <Col s={12} m={9} style={style.header} className="grey lighten-1">
          <div className="container">
            {myCharacter}
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

function Character(props){
  return(
    <div>
      <h3>{props.name}</h3>
      <img src={props.thumbnail}/>
      <p>{props.description}</p>
    </div>
  )
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