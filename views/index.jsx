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
      .then((result) => {
        this.setState({
          items: result.data
        })
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
          <Body
            items={this.state.items}
            />
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
    return(
      <section>
        <Row style={style.row}>
          <Characters
            items={this.props.items}
            />
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
      if(character.comics.items.length > 4){
        myCharacter.push(
          <Character
            key={character.id}
            name={character.name}
            description={character.description}
            thumbnail={character.thumbnail.path + "/standard_amazing." + character.thumbnail.extension}
            comicA={character.comics.items[0].name}
            comicB={character.comics.items[1].name}
            comicC={character.comics.items[2].name}
            comicD={character.comics.items[3].name}
          />
        )
      }else{
        myCharacter.push(
          <Character
            key={character.id}
            name={character.name}
            description={character.description}
            thumbnail={character.thumbnail.path + "/standard_amazing." + character.thumbnail.extension}
            comicA={'Related comic name'}
            comicB={'Related comic name'}
            comicC={'Related comic name'}
            comicD={'Related comic name'}
          />
        )
      }
    })
    return(
      <div>
        <Col s={12} m={10} style={style.header} className="grey lighten-5">
          <ul className="container">
            {myCharacter}
          </ul>
          <Pagination />
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

      <div style={style.footerCardHeight} className="col s12">
        <p><b>Related Comics</b></p>
        <ul className="col s6">
          <li>{this.props.comicA}</li>
          <li style={style.liFooterCard}>{this.props.comicB}</li>
        </ul>
        <ul className="col s6">
          <li>{this.props.comicC}</li>
          <li style={style.liFooterCard}>{this.props.comicD}</li>
        </ul>
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


class Pagination extends Component{
  render(){
    return(
      <ul className="pagination">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li>
        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
    )
  }
}

class Footer extends Component{
  render(){
    return(
      <footer className="page-footer" style={style.colorHeader}>
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
        <div className="footer-copyright grey darken-4" >
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
  footerCardHeight:{
    height: '200px'
  },
  liFooterCard:{
    marginTop: '20px'
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
