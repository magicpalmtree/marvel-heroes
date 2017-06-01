import React, { Component } from 'react'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col } from 'react-materialize'
// import Pagination from '../components/Pagination'

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
    this.clickComic = this.clickComic.bind(this)
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
    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })
    marvel.comics.find('4110')
      .then(console.log)
      .fail(console.error)
      .done();
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
            clickComic={this.clickComic}
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
            contentTitle={CONTENT}
            />

          <Favorites
            comics={this.props.comics}
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
    this.state = {
      mySelected : false,
      mySelectId : '',
      mySelectImg: '',
      mySelectName: '',
      mySelectDescription: ''
    }
    this.showCharacter = this.showCharacter.bind(this)
  }
  showCharacter(event){
    event.preventDefault();
    let mySelection = event._targetInst._currentElement._owner._instance.props
    this.setState(
      {
        mySelected : true,
        mySelectId : mySelection.id,
        mySelectImg: mySelection.thumbnail,
        mySelectName: mySelection.name,
        mySelectDescription: mySelection.description
      }
    )

    // console.log(event._targetInst._currentElement._owner._instance.props)
  }
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
          showCharacter={this.showCharacter}
          onClick={this.props.clickComic}
          comicB={comicsSimilarA}
          comicC={comicsSimilarB}
          comicA={comicsSimilarC}
          comicD={comicsSimilarD}
        />
      )
    })

    let selectComicModal

    if(this.state.mySelected){
      selectComicModal = <SelectComic
                                id={this.state.mySelectId}
                                img={this.state.mySelectImg}
                                name={this.state.mySelectName}
                                description={this.state.mySelectDescription}
                              />
    }else{
      selectComicModal = <SelectComic
                                id="noid"
                                img="noimg"
                                name="notext"
                                description="nodescription"
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
          {selectComicModal}
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
          onClick={this.props.showCharacter}
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
              className="modal-trigger"
              onClick={this.props.onClick}
            >
              {this.props.comicA}
            </a>
          </li>
          <li style={style.liFooterCard}>
            <a
              href="#modal1"
              className="modal-trigger"
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
              className="modal-trigger"
              onClick={this.props.onClick}
            >
              {this.props.comicC}
            </a>
          </li>
          <li style={style.liFooterCard}>
            <a
              href="#modal1"
              className="modal-trigger"
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

class Paginations extends Component{
  constructor(props){
    super(props)
  }
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
  constructor(props){
    super(props)
    this.deleteFavorite = this.deleteFavorite.bind(this)
  }
  deleteFavorite(event){
    let myDelete = event._targetInst._currentElement._owner._renderedComponent._hostNode
    myDelete.style.display = 'none';
  }
  render(){
    let contentTitle = this.props.contentTitle[2], myFavorite = []

    this.props.comics.forEach((favorite) => {
        myFavorite.push(
          <Favorite
            key={favorite.id}
            id={favorite.id}
            title={favorite.title}
            thumbnail={favorite.thumbnail.path + "/portrait_fantastic." + favorite.thumbnail.extension}
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
