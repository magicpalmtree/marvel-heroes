import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import Paginations from './Paginations/Paginations.jsx'
import Characters from './Characters/Characters.jsx'
import TitleSection from './TitleSection.jsx'
import Favorites from './Favorites/Favorites.jsx'
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

const style = {
  row:{
    marginBottom: 0,
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
