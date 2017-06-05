import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import TitleSection from '../TitleSection.jsx'
import { CSSTransitionGroup } from 'react-transition-group'
import { bounce, fadeIn } from 'react-animations'
import Radium from 'radium'

export default class Favorites extends Component{
  render(){
    console.log(this.props.comics)
    let contentTitle = this.props.contentTitle[2], myFavorite = []

    this.props.comics.forEach((favorite) => {
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
  header:{
    height: 'auto',
  }
}
