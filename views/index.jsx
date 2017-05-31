import React, { Component } from 'react'
import api from 'marvel-api'
import { Button, Icon, Card, Row, Col } from 'react-materialize'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      items : [],
      comics: [],
      search : ''
    }
    this.searchSuper = this.searchSuper.bind(this)
    this.paginationNumber = this.paginationNumber.bind(this)
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
    marvel.characters.findAll(10)
      .then((result) => {
        this.setState({
          items: result.data
        })
      })
      .fail(console.error)
      .done()

      marvel.comics.findAll(5)
        .then((result) => {
          this.setState({
            comics : result.data
          })
        })
        .fail(console.error)
        .done();
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

  paginationNumber(event){

    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })

    console.log(this)


    marvel.characters.findNameStartsWith('B')
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
            comics={this.state.comics}
            onClick={this.paginationNumber}
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
              <form style={{ backgroundColor: 'rgb(45,39,39)' }}>
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
            contentTitle={CONTENT}
            />

          <Favorites
            comics={this.props.comics}
            contentTitle={CONTENT}
          />
          <Pagination
            onClick={this.props.onClick}
          />
        </Row>
      </section>
    )
  }
}

class Characters extends Component{
  render(){
    let myCharacter = [], contentTitle = this.props.contentTitle[1], comicsSimilarA, comicsSimilarB, comicsSimilarC, comicsSimilarD
    this.props.items.forEach((character) => {

      if(character.comics.items.length > 4){
          comicsSimilarA = character.comics.items[0].name
          comicsSimilarB = character.comics.items[1].name
          comicsSimilarC = character.comics.items[2].name
          comicsSimilarD = character.comics.items[3].name
      }else{
        comicsSimilarA = 'Related comic name'
        comicsSimilarB = 'Related comic name'
        comicsSimilarC = 'Related comic name'
        comicsSimilarD = 'Related comic name'
      }

      myCharacter.push(
        <Character
          key={character.id}
          id={character.id}
          name={character.name}
          description={character.description}
          thumbnail={character.thumbnail.path + "/standard_amazing." + character.thumbnail.extension}
          comicB={comicsSimilarA}
          comicC={comicsSimilarB}
          comicA={comicsSimilarC}
          comicD={comicsSimilarD}
        />
      )

    })

    return(
      <div>
        <Col s={12} m={9} style={style.header} className="grey lighten-5">
          <TitleSection
            img={contentTitle.titleImg}
            alt={contentTitle.titleAlt}
            title={contentTitle.titleText}
          />
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
    this.state = {
      mySelected : false,
      mySelectId : '',
      mySelectImg: '',
      mySelectName: '',
      mySelectDescription: ''
    }
    this.showCharacter = this.showCharacter.bind(this)
  }
  componentDidMount(){
    $('.modal').modal()
  }
  showCharacter(event){
    event.preventDefault();
    this.setState(
      {
        mySelected : true,
        mySelectId : this.props.id,
        mySelectImg: this.props.thumbnail,
        mySelectName: this.props.name,
        mySelectDescription: this.props.description
      }
    )
  }
  render(){
    let selectCharacterModal
    if(this.state.mySelected){
      selectCharacterModal = <SelectCharacter
                                id={this.props.id}
                                img={this.state.mySelectImg}
                                name={this.state.mySelectName}
                                description={this.state.mySelectDescription}
                              />
    }else{
      selectCharacterModal = <SelectCharacter
                                id="no id"
                                img="no img"
                                name="no text"
                                description="no description"
                              />
    }
  return(
    <li id={this.props.id} className="card col s12 m12 l5" style={{ margin: '20px' , borderTopLeftRadius: '30%'}} >

      <div style={style.cardHeight} className="col s12 m6 valign-wrapper">
        <img style={{ marginLeft: '-30px', width: '300px', boxShadow: '4px 4px 8px #888888'}} className="circle" src={this.props.thumbnail} alt="" />
      </div>

      <div style={style.cardHeight} className="col s12 m6">
        <h3 className="card-title">{this.props.name}</h3>
        <p style={style.heightText}>{this.props.description}</p>
        <a
          className="modal-trigger waves-effect waves-light btn red"
          href="#modal1"
          onClick={this.showCharacter}
        >
          View More
        </a>
      </div>
      {selectCharacterModal}
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

function TitleSection(props){
  // <Col s={3}>
  //   <a className='dropdown-button btn white black-text' href='#' data-activates='dropdown1'>Sort by</a>
  //
  //   <ul id='dropdown1' className='dropdown-content black-text'>
  //     <li><a href="#!">Alphabet</a></li>
  //     <li><a href="#!">Relevant</a></li>
  //   </ul>
  //
  // </Col>
  return(
    <div className="container">
      <Row className="valign-wrapper">
        <Col s={1}>
          <img style={{ height : '50px' }} src={props.img} alt={props.alt} />
        </Col>
        <Col style={{ marginLeft: '50px' }} s={11}>
          <h3 style={{ fontSize: '2em' }}>{props.title}</h3>
        </Col>

      </Row>
    </div>
  )
}

class SelectCharacter extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>{this.props.name}</h4>
          <img src={this.props.img} />
          <p>{this.props.description}</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    )
  }
}

class Pagination extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="container">
        <Row>
          <ul className="col s12 pagination center">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            <li className="active"><a href="#!">1</a></li>
            <li className="waves-effect" onClick={this.props.onClick}><a href="#!">2</a></li>
            <li className="waves-effect"><a href="#!">3</a></li>
            <li className="waves-effect"><a href="#!">4</a></li>
            <li className="waves-effect"><a href="#!">5</a></li>
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        </Row>
      </div>
    )
  }
}
class Favorites extends Component{
  constructor(props){
    super(props)
    this.state = {
      isDeleted : false
    }
    this.deleteFavorite = this.deleteFavorite.bind(this)
  }
  deleteFavorite(event){
    this.setState({
      isDeleted : true
    })
  }
  render(){
    let contentTitle = this.props.contentTitle[2], myFavorite = []

    this.props.comics.forEach((favorite) => {
        myFavorite.push(
          <Favorite
            key={favorite.id}
            id={favorite.id}
            title={favorite.title}
            thumbnail={favorite.thumbnail.path + "/portrait_incredible." + favorite.thumbnail.extension}
            onClick={this.deleteFavorite}
          />
        )
      })
    return(
      <div>
        <Col s={12} m={3} style={style.header} className="grey lighten-3">
          <TitleSection
            img={contentTitle.titleImg}
            alt={contentTitle.titleAlt}
            title={contentTitle.titleText}
          />
          <ul className="container">
            {myFavorite}
          </ul>
        </Col>
      </div>
    )
  }
}
class Favorite extends Component{
  constructor(props){
    super(props)
  }

  render(){

    return(
      <li
        id={this.props.id}
        onClick={this.props.onClick}
        className="center"
        style={{ marginTop: '100px' }}
      >
        <a
          className="btn-floating btn-large waves-effect waves-light black"
          style={{ position: 'absolute', margin: '-20px 190px' }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </a>
        <img src={this.props.thumbnail} />
        <h5><b>{this.props.title}</b></h5>
      </li>
    )
  }
}
class Footer extends Component{
  render(){
    return(
      <footer className="page-footer" style={style.footerPos}>
        <div className="container">
          <Row style={style.row}>
            <Col s={12} l={6} style={style.header}>
              <h5 className="white-text">Marvel Character</h5>
              <p className="grey-text text-lighten-4">This website is only created for educational pursposes and for a job application at Grability.</p>
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
    flex: '1 0 auto',
    backgroundColor: '#eee'
  },
  colorHeader:{
    backgroundColor: 'rgb(45,39,39)',
    zIndex: 10,
    position: 'relative'
  },
  row:{
    marginBottom: 0,
  },
  header:{
    height: 'auto',
  },
  imgHeader:{
    height: '50px'
  },
  cardHeight:{
    height: '250px'
  },
  footerCardHeight:{
    height: '300px'
  },
  liFooterCard:{
    marginTop: '20px'
  },
  heightText:{
    fontSize: '0.8em'
  },
  footerPos:{
    position: 'relative',
    bottom: 0,
    backgroundColor: 'rgb(45,39,39)'
  }
}

const CONTENT = [
  // HEADER
  {
    Logoimg: 'http://camiloarguello.co/img/icons/Marvel-logo.png',
    Logoalt: 'Marvel logo'
  },
  // TITLE CHARACTERS
  {
    titleImg: 'http://camiloarguello.co/img/icons/characters.png',
    titleAlt: 'Characters logo',
    titleText: 'Characters'
  },
  // TITLE FAVORITES
  {
    titleImg: 'http://camiloarguello.co/img/icons/favourites.png',
    titleAlt: 'favourites logo',
    titleText: 'My favorites'
  }
]
