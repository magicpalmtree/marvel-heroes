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
    marvel.characters.findByName('spider-man')
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
      <nav style={style.colorHeader}>
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
          thumbnail={character.thumbnail.path + "/standard_amazing." + character.thumbnail.extension} 
        />
      )
    })
    return(
      <div>
        <Col s={12} m={10} style={style.header} className="grey lighten-5">
          <ul className="container">
            {myCharacter}
          </ul>
        </Col>
      </div>    
    )
  }
}

class Character extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    let cDid = $('#character_description_id')
    cDid.text(cDid.text().substring(0,250) + '...')        
  }
  render(){
  return(
    <li className="card col s12 l5">
      <div className="col s6">
        <img className="circle" src={this.props.thumbnail} alt=""/>
      </div>

      <div className="col s6">
        <h3 className="card-title">{this.props.name}</h3>
        <p id="character_description_id">{this.props.description}</p>
        <Button className="red darken-1" waves='light'>View More</Button>    
      </div>

      <div className="col s12">
        <p>Related Comics</p>
      </div>
        
    </li>
  )
  }
}

class Favorite extends Component{
  render(){
    return(
      <div>
        <Col s={12} m={2} style={style.header} className="grey lighten-3">
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
  colorHeader:{
    backgroundColor: 'rgb(45,39,39)',
  },
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