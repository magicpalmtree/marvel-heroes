import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import TitleSection from '../TitleSection.jsx'
import { CSSTransitionGroup } from 'react-transition-group'
import { bounce, fadeIn } from 'react-animations'
import Radium from 'radium'

export default class Characters extends Component{
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
        comicsSimilarA = 'Related comic name two lines'
        comicsSimilarB = 'Related comic name two lines'
        comicsSimilarC = 'Related comic name two lines'
        comicsSimilarD = 'Related comic name two lines'
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
    <li style={style.liCard}  id={this.props.id} className="card col s12 m12 l5" >

      <div style={style.cardHeight} className="col s12 m6 valign-wrapper">
        <img style={style.imgCard} className="circle" src={this.props.thumbnail} alt="" />
      </div>

      <div style={style.cardBody} className="col s12 m6 sidebar-box">
        <h3 style={style.h3Card} className="card-title"><b>{this.props.name}</b></h3>
        <p className="myIdTest" style={style.heightText}>{this.props.description}</p>
        <a
          style={{ fontSize: '0.8em' }}
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
              style={style.aCardFooter}
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
              style={style.aCardFooter}
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
              style={style.aCardFooter}
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
              style={style.aCardFooter}
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

const style = {
  header:{
    height: 'auto',
  },
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
  liCard:{
    margin: '20px'
  },
  imgHeader:{
    height: '50px'
  },
  imgCard:{
    marginLeft: '-30px',
    width: '300px',
    boxShadow: '4px 4px 8px #888888'
  },
  cardHeight:{
    height: '250px'
  },
  h3Card:{
    margin: '0.5rem',
    textTransform: 'uppercase'
  },
  aCardFooter:{
    fontSize: '1.1em'
  },
  readMore:{
    textAlign: 'center',
  },
  footerCardHeight:{
    padding: '30px 10px'
  },
  liFooterCard:{
    marginTop: '20px'
  },
  heightText:{
    fontSize: '0.8em'
  }
}
