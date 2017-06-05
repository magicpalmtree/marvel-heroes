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
      idSearch: '',
      idFav: [],
      isToggleOn: false
    }
    this.searchSuper = this.searchSuper.bind(this)
    this.paginationNumber = this.paginationNumber.bind(this)
    this.clickComic = this.clickComic.bind(this)
    this.deleteFavorite = this.deleteFavorite.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
    this.resetComponentComic = this.resetComponentComic.bind(this)
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
    console.log()
    
    marvel.characters.findAll(10)
      .then((result) => {
        this.setState({
          items: result.data
        })
      })
      .fail(console.error)
      .done()
    
    let myLocalStorage = reactLocalStorage.getObject('comicsFavoritos').comic

      if(myLocalStorage.length > 0 ){
        
        for( let i=0; i<myLocalStorage.length; i++ ){
          console.log("localstorage " + myLocalStorage[i])
          marvel.comics.find(myLocalStorage[i])
            .then((result) => {
              this.setState({
                comics : result.data
              })
            }
            )
            .fail(console.error)
            .done();
        }
        
      }else{
        console.log("normal")
        marvel.comics.findAll(5, getRandomInt(20,50))
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
  componentDidUpdate(prevProps, prevState){
    console.log(prevState.idFav)  
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
      idSearch: event._targetInst._hostNode.id
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

  addFavorite(event){
    event.preventDefault()
    let myComicsCollection = this.state.idFav.slice()
    myComicsCollection.push(this.state.idSearch)

    this.setState({
      isToggleOn: true,
      idFav: myComicsCollection
    })

    reactLocalStorage.set('comicsFavoritos', true)
    reactLocalStorage.setObject('comicsFavoritos', {'comic': this.state.idFav })       

    let marvel = api.createClient({
      publicKey: this.props.data[0].a,
      privateKey: this.props.data[0].b
    })

    console.log(this.state.idFav)

    // for(let i=0; i<this.state.idFav.length; i++){
    //   console.log("idFav: " + this.state.idFav[i])

    //   reactLocalStorage.set('comicsFavoritos', true)
    //   reactLocalStorage.setObject('comicsFavoritos', {'comic': this.state.idFav[i] })

    //   marvel.comics.find(this.state.idFav[i])
    //     .then((result) => {
    //       this.setState({
    //         comics : result.data
    //       })
    //     }
    //     )
    //     .fail(console.error)
    //     .done();      

    // }

  }  
  deleteFavorite(event){
    let myDelete = event._targetInst._currentElement._owner._renderedComponent._hostNode
    myDelete.style.display = 'none';
  }
  resetComponentComic(event){
    this.setState({
      isToggleOn: false
    })
  }
  
  render(){
    let myBody
    if(!this.state.items){
      myBody = <div><h1>Hola</h1></div>
    }else{
      myBody = <Body
                  items={this.state.items}
                  comics={this.state.comics}
                  paginationN={this.paginationNumber}
                  deleteFavorite={this.deleteFavorite}
                  clickComic={this.clickComic}
                  selectComic={this.state.selectComic[0]}
                  isToggleOn={this.state.isToggleOn}
                  addFavorite={this.addFavorite}
                  resetComponentComic={this.resetComponentComic}
                /> 
    }
    return(
      <div style={style.body}>
          <Header
            contentHeader={CONTENT}
            onChange={this.searchSuper}
            search={this.state.search}
            />
            {myBody}
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
