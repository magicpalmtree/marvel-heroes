import React, { Component } from 'react'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      items : [],
      comics: [],
      selectComic: [],
      search : '',
      idFav: '',
      isToggleOn: false
    }
    this.searchSuper = this.searchSuper.bind(this)
    this.paginationNumber = this.paginationNumber.bind(this)
    this.clickComic = this.clickComic.bind(this)
    this.deleteFavorite = this.deleteFavorite.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
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

      marvel.comics.findAll(5, getRandomInt(20,50) )
        .then((result) => {
          this.setState({
            comics : result.data
          })
        }
        )
        .fail(console.error)
        .done();

      if(reactLocalStorage.getObject('comicsFavoritos')){
        marvel.comics.find(reactLocalStorage.getObject('comicsFavoritos').comic)
          .then((result) => {
            this.setState({
              comics : result.data
            })
          }
          )
          .fail(console.error)
          .done();

      }
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
    if(event == 1){
      marvel.characters.findNameStartsWith('A')
        .then(result => {
            this.setState({items: result.data})
        })
        .fail(console.error)
        .done()
    }else if(event == 2){
      marvel.characters.findNameStartsWith('B')
        .then(result => {
            this.setState({items: result.data})
        })
        .fail(console.error)
        .done()
    }else if(event == 3){
      marvel.characters.findNameStartsWith('C')
        .then(result => {
            this.setState({items: result.data})
        })
        .fail(console.error)
        .done()
    }else if(event == 4){
      marvel.characters.findNameStartsWith('D')
        .then(result => {
            this.setState({items: result.data})
        })
        .fail(console.error)
        .done()
    }else{
      marvel.characters.findNameStartsWith('E')
        .then(result => {
            this.setState({items: result.data})
        })
        .fail(console.error)
        .done()
    }
  }
  clickComic(event){
    this.setState({
      idFav: event._targetInst._hostNode.id
    })
    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })
    marvel.comics.find(event._targetInst._hostNode.id)
      .then(result => { this.setState({selectComic: result.data}) })
      .fail(console.error)
      .done();
  }
  deleteFavorite(event){
    let myDelete = event._targetInst._currentElement._owner._renderedComponent._hostNode
    myDelete.style.display = 'none';
  }
  addFavorite(event){
    event.preventDefault()
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })
    if(!this.state.isToggleOn){
      marvel.comics.find(this.state.idFav)
        .then((result) => {
          this.setState({
            comics : result.data
          })
        }
        )
        .fail(console.error)
        .done();
    }
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
            paginationN={this.paginationNumber}
            deleteFavorite={this.deleteFavorite}
            clickComic={this.clickComic}
            selectComic={this.state.selectComic[0]}
            isToggleOn={this.state.isToggleOn}
            addFavorite={this.addFavorite}
            />
          <Footer />
      </div>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


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
                  <input id="search" placeholder="Search character..." type="search" value={this.props.search} onChange={this.props.onChange}/>
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
            comics={this.props.comics}
            clickComic={this.props.clickComic}
            selectComic={this.props.selectComic}
            isToggleOn={this.props.isToggleOn}
            addFavorite={this.props.addFavorite}
            contentTitle={CONTENT}
            />

          <Favorites
            deleteFavorite={this.props.deleteFavorite}
            comics={this.props.comics}
            selectComic={this.props.selectComic}
            contentTitle={CONTENT}
          />
          <Paginations
            onClick={this.props.paginationN}
          />
        </Row>
      </section>
    )
  }
}

class Characters extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let myCharacter = [],
        myComicSearchIdA,
        myComicSearchIdB,
        myComicSearchIdC,
        myComicSearchIdD,
        contentTitle = this.props.contentTitle[1],
        comicsSimilarA,
        comicsSimilarB,
        comicsSimilarC,
        comicsSimilarD
    this.props.items.forEach((character) => {
      if(character.comics.items.length > 4){
          myComicSearchIdA = character.comics.items[0].resourceURI.match(/([^\/]*)\/*$/)[1]
          myComicSearchIdB = character.comics.items[1].resourceURI.match(/([^\/]*)\/*$/)[1]
          myComicSearchIdC = character.comics.items[2].resourceURI.match(/([^\/]*)\/*$/)[1]
          myComicSearchIdD = character.comics.items[3].resourceURI.match(/([^\/]*)\/*$/)[1]

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
          onClick={this.props.clickComic}
          comicAid={myComicSearchIdA}
          comicA={comicsSimilarA}
          comicBid={myComicSearchIdB}
          comicB={comicsSimilarB}
          comicCid={myComicSearchIdC}
          comicC={comicsSimilarC}
          comicDid={myComicSearchIdD}
          comicD={comicsSimilarD}
        />
      )
    })
    let mySelectedComic

    if(this.props.selectComic){
      mySelectedComic = <SelectComic
                         id={this.props.selectComic.id}
                         img={this.props.selectComic.thumbnail.path + "/portrait_fantastic." + this.props.selectComic.thumbnail.extension}
                         name={this.props.selectComic.title}
                         description={this.props.selectComic.description}
                         isToggleOn={this.props.isToggleOn}
                         addFavorite={this.props.addFavorite}
                       />
    }else{
      mySelectedComic = <SelectComic
                         id="noid"
                         img="no_image"
                         name="no title"
                         description="no description"
                       />
    }

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
          {mySelectedComic}
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
    $('.modal').modal()
  }
  render(){
  return(
    <li id={this.props.id} className="card col s12 m12 l5" style={{ margin: '20px' , borderTopLeftRadius: '30%'}} >

      <div style={style.cardHeight} className="col s12 m6 valign-wrapper">
        <img style={{ marginLeft: '-30px', width: '300px', boxShadow: '4px 4px 8px #888888'}} className="circle" src={this.props.thumbnail} alt="" />
      </div>

      <div style={style.cardHeight} className="col s12 m6">
        <h3 className="card-title">{this.props.name}</h3>
        <p style={style.heightText}>{this.props.description}</p>
        <a
          className="waves-effect waves-light btn red"
        >
          View More
        </a>
      </div>

      <div style={style.footerCardHeight} className="col s12">
        <p><b>Related Comics</b></p>
        <ul className="col s6">
          <li>
            <a
              href="#modal1"
              id={this.props.comicAid}
              className="modal-trigger black-text"
              onClick={this.props.onClick}
            >
              {this.props.comicA}
            </a>
          </li>
          <li style={style.liFooterCard}>
            <a
              href="#modal1"
              id={this.props.comicBid}
              className="modal-trigger black-text"
              onClick={this.props.onClick}
            >
              {this.props.comicB}
            </a>
          </li>
        </ul>
        <ul className="col s6">
          <li>
            <a
              href="#modal1"
              id={this.props.comicCid}
              className="modal-trigger black-text"
              onClick={this.props.onClick}
            >
              {this.props.comicC}
            </a>
          </li>
          <li style={style.liFooterCard}>
            <a
              href="#modal1"
              id={this.props.comicDid}
              className="modal-trigger black-text"
              onClick={this.props.onClick}
            >
              {this.props.comicD}
            </a>
          </li>
        </ul>
      </div>

    </li>
  )
  }
}

class Paginations extends Component{
  render(){
    return(
      <div className="container">
        <Row>
          <ul className="col s12 pagination center">
            <Pagination items={5} activePage={1} maxButtons={5} onSelect={this.props.onClick} />
          </ul>
        </Row>
      </div>
    )
  }
}

class Favorites extends Component{
  render(){
    let contentTitle = this.props.contentTitle[2], myFavorite = []

    this.props.comics.forEach((favorite) => {
      reactLocalStorage.set('comicsFavoritos', true)
      reactLocalStorage.get('comicsFavoritos',true)
      reactLocalStorage.setObject('comicsFavoritos', {'comic': favorite.id })
      reactLocalStorage.getObject('comicsFavoritos')
        myFavorite.push(
          <Favorite
            key={favorite.id}
            id={favorite.id}
            title={favorite.title}
            thumbnail={favorite.thumbnail.path + "/portrait_fantastic." + favorite.thumbnail.extension}
            onClick={this.props.deleteFavorite}
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
    this.onHover = this.onHover.bind(this)
  }
  render(){
    return(
      <li
        id={this.props.id}
        className="center"
        style={{ marginTop: '100px' }}
      >
        <a
          onClick={this.props.onClick}
          className="btn-floating btn-large waves-effect waves-light black"
          style={{ position: 'absolute', margin: '-20px 190px' }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </a>
        <img style={{ width: '230px' }} src={this.props.thumbnail} />
        <h5><b>{this.props.title}</b></h5>
      </li>
    )
  }
}

class SelectComic extends Component{
  render(){
    let myFavoriteOn = <div>
                          <Col s={2} className="valign-wrapper" style={{ height: '55px' }}>
                            <img src="http://camiloarguello.co/img/icons/btn-favourites-default.png" />
                          </Col>
                          <Col s={10}>
                            <p style={{ lineHeight: '1em', fontSize: '1.2em', color: 'black' }}>Add to Favorites</p>
                          </Col>
                        </div>
    let myFavoriteOff = <div>
                          <Col s={2} className="valign-wrapper" style={{ height: '55px' }}>
                            <img src="http://camiloarguello.co/img/icons/btn-favourites-primary.png" />
                          </Col>
                          <Col s={10}>
                            <p style={{ lineHeight: '1em', fontSize: '1.2em', color: 'red' }}>Added to Favorites</p>
                          </Col>
                        </div>

    return(
      <div id="modal1" className="modal">
        <div className="modal-content">
        <a
          className="modal-action modal-close btn-floating btn-large waves-effect waves-light black"
          style={{ position: 'absolute', position: 'absolute', width: 30, height: 30, top: '20px' , right: '20px' }}
        >
          <i style={{ lineHeight: '30px' }} className="fa fa-times" aria-hidden="true"></i>
        </a>
          <Row>
            <Col s={12} m={4}>
              <img src={this.props.img} />
            </Col>
            <Col s={12} m={8}>
              <h4>{this.props.name}</h4>
              <p>{this.props.description}</p>
            </Col>
          </Row>
        </div>
        <div className="modal-footer" style={{ padding: '0', height: 'auto' }}>
          <div className="row center" style={{ marginBottom: '0px' }}>
            <Col s={12} m={6} className="grey lighten-2 btn-large waves-effect waves-light">
              <Col s={2} className="valign-wrapper" style={{ height: '55px' }}>
                <img src="http://camiloarguello.co/img/icons/shopping-cart-primary.png" />
              </Col>
              <Col s={10}>
                <p style={{ lineHeight: '1em', fontSize: '1.2em', color: 'black' }}>Buy for $3,99</p>
              </Col>
            </Col>
            <Col s={12} m={6} className="grey lighten-3 btn-large waves-effect waves-light" onClick={this.props.addFavorite}>
              { this.props.isToggleOn ? myFavoriteOff : myFavoriteOn }
            </Col>
          </div>
        </div>
      </div>
    )
  }
}

function TitleSection(props){
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
