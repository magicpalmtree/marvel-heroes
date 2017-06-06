import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer, Preloader } from 'react-materialize'
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
      isReady: false,
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
    marvel.characters.findAll(10)
      .then((result) => {
        this.setState({
          items: result.data
        })
      })
      .fail(console.error)
      .done(
        this.setState({
          isReady: true
        })
      )

      if(reactLocalStorage.getObject('comicsFavoritos').comic){

        let myLocalStorage = reactLocalStorage.getObject('comicsFavoritos').comic

        for( let i=0; i<myLocalStorage.length; i++ ){
          // console.log("localstorage " + myLocalStorage[i])
          marvel.comics.find(myLocalStorage[i])
            .then((result) => {

              let myComicsLocal = this.state.comics.slice()
              myComicsLocal.push(result)
              // console.log(myComicsLocal)
              // console.log(result)
              this.setState({
                comics : result.data
              })
            }
            )
            .fail(console.error)
            .done();
        }

      }else{
        // console.log("normal")
        marvel.comics.findAll(5, getRandomInt(120,250))
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
    // console.log(prevState.idFav)
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
      .then(result => {
        this.setState({selectComic: result.data})
      })
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
    if(!this.state.isReady){
      return(
        <div style={style.body}>
            <Header
              contentHeader={CONTENT}
              onChange={this.searchSuper}
              search={this.state.search}
              />
              <div style={{ height: '90vh'}} className="valign-wrapper center">
                <Row>
                  <Col s={12}>
                    <Preloader size='big' flashing/>
                  </Col>
                </Row>
              </div>
            <MyFooter style={style.footerPosA}/>
        </div>
      )
    }else{
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
                resetComponentComic={this.resetComponentComic}
              />
            <MyFooter style={style.footerPosB}/>
        </div>
      )
    }
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
  },
  footerPosB:{
    position: 'relative',
    bottom: 0,
    backgroundColor: 'rgb(45,39,39)'
  },
  footerPosA:{
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgb(45,39,39)'
  }
}

const CONTENT = [
  // HEADER
  {
    Logoimg: 'http://camiloarguello.co/img/icons/Marvel-logo.png',
    Logoalt: 'Marvel logo'
  }
]
