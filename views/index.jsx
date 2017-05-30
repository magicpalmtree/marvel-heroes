import React, { Component } from 'react'
import api from 'marvel-api'
import { Button, Icon, Card, Row, Col } from 'react-materialize'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      items : [],
      search : ''
    }
    this.searchSuper = this.searchSuper.bind(this)
  }
  componentDidMount(){
    let myBody = document.getElementById("app")
    myBody.style.display = 'flex'
    myBody.style.minHeight = '100vh'
    myBody.style.flexDirection = 'column'

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
  searchSuper(event){
    this.setState({
      search : event.target.value
    })
    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })
    marvel.characters.findNameStartsWith(this.state.search)
      .then(result => {
        this.setState({items: result.data})
      })
      .fail(console.error)
      .done()
  }

  render(){
    return(
      <div style={style.body}>
          <Header
            contentHeader={CONTENT}
            onChange={this.searchSuper}
            search={this.state.search}
            />
          <Body items={this.state.items}/>
          <Footer />
      </div>
    )
  }
}
//
// Header.propTypes = {
//     title: React.PropTypes.string.isRequired
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
            <Col s={12} m={9} style={style.header} className="nav-wrapper">
              <form>
                <div className="input-field">
                  <input id="search" type="search" value={this.props.search} onChange={this.props.onChange}/>
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
                <p style={{ position: 'absolute', zIndex: 100 }}>{this.props.search}</p>
              </form>
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
          <Favorites />
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
    <li className="card col s12 m12 l5">

      <div style={style.cardHeight} className="col s6 valign-wrapper">
        <img className="circle" src={this.props.thumbnail} alt=""/>
      </div>

      <div style={style.cardHeight} className="col s6">
        <h3 className="card-title">{this.props.name}</h3>
        <p style={style.heightText} id="character_description_id">{this.props.description}</p>
        <Button className="red darken-1" waves='light'>View More</Button>
      </div>

      <div className="col s12">
        <p>Related Comics</p>
      </div>

    </li>
  )
  }
}

class Favorites extends Component{
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
      <footer className="page-footer">
        <div className="container">
          <Row style={style.row}>
            <Col s={12} l={6} style={style.header}>
              <h5 className="white-text">Marvel Character</h5>
              <p className="grey-text text-lighten-4">This website is only created for educational purposes.</p>
            </Col>
            <Col s={12} l={14} offset='l2'>
              <h5 className="white-text">About Camilo</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Facebook</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Instagram</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Github</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Linkedin</a></li>
              </ul>
            </Col>
          </Row>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2017 Camilo Arguello
            <a className="grey-text text-lighten-4 right" href="#!">camiloarguello.co</a>
          </div>
        </div>
      </footer>
    )
  }
}

let style = {
  body:{
    flex: '1 0 auto'
  },
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
  },
  cardHeight:{
    height: '250px'
  },
  heightText:{
    fontSize: '0.8em'
  }
}

const CONTENT = [
  // HEADER
  {
    Logoimg: 'http://camiloarguello.co/img/icons/Marvel-logo.png',
    Logoalt: 'Logo de Marvel'
  }
]
