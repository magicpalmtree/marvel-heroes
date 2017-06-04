import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import Paginations from './Paginations/Paginations.jsx'
import Characters from './Characters/Characters.jsx'
import TitleSection from './Characters/TitleSection.jsx'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CSSTransitionGroup } from 'react-transition-group'


export default class Body extends Component{
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
  }
  render(){
    return(
      <li
        id={this.props.id}
        className="center"
        style={style.bounce}
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




const style = {
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
  cardBody:{
    position: 'relativa',
    overflow: 'hidden',
  },
  readMore:{
    textAlign: 'center',
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
