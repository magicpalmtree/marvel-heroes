import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import Header from './Header/Header.jsx'
import Body from './Body/Body.jsx'
import MyFooter from './Footer/Footer.jsx'
import { CSSTransitionGroup } from 'react-transition-group'
import { bounce, fadeIn } from 'react-animations'
import Radium from 'radium'

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
          <MyFooter />
      </div>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


const style = {
  body:{
    flex: '1 0 auto',
    backgroundColor: '#eee'
  }
}



const CONTENT = [
  // HEADER
  {
    Logoimg: 'http://camiloarguello.co/img/icons/Marvel-logo.png',
    Logoalt: 'Marvel logo'
  }
]
