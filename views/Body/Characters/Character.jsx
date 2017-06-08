import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CSSTransitionGroup } from 'react-transition-group'
import { bounce, fadeIn } from 'react-animations'
import Radium from 'radium'

export default class Character extends Component{
  constructor(props){
    super(props)
    this.state = {
      isMobile: false,
      myHeightCard: 'auto'
    }
    this._mouseHover = this._mouseHover.bind(this)
    this._mouseLeave = this._mouseLeave.bind(this)
  }
  componentDidMount(){
    $('.modal').modal()
    if (matchMedia) {
      var mq = window.matchMedia("(min-width: 500px)");
      mq.addListener(WidthChange);
      WidthChange(mq);
    }
    function WidthChange(mq) {
      if (mq.matches) {
        myHeightCard: '400px'
      } else {
        myHeightCard: 'auto'
      }
    }
  }

  _mouseHover(e){
    e.preventDefault()
    e.target.style.color = 'red'
  }
  _mouseLeave(e){
    e.preventDefault()
    e.target.style.color = '#786e6d'
  }
  
  render(){
      let myDescription, itHasdescription = this.props.description.length

      if(itHasdescription > 0){
          myDescription = <p className="myIdTest" style={style.heightText}>{this.props.description}</p>
      }else{
          myDescription = <p style={style.heightText}>{NODESCRIPTION[0].text}</p>
      }
  return(
    <li style={{ margin: '20px', height: this.state.myHeightCard }}  id={this.props.id}  className="card col s12 m12 l5" >
      <div className="col s12 m6 valign-wrapper">
        <img style={style.imgCard} className="circle" src={this.props.thumbnail} alt="" />
      </div>
      <div style={style.cardBody} className="col s12 m6 sidebar-box">
        <h3 style={style.h3Card} className="card-title"><b>{this.props.name}</b></h3>

        <div style={style.descriptionCard}>
            {myDescription}
        </div>

        <div style={style.butonContCard}>
            <a
            style={style.butonCard}
            className="waves-effect waves-light btn red">
                View More
            </a>
        </div>
      </div>
      <div
        style={style.footerCardHeight}
        className="col s12">
        <p><b>Related Comics</b></p>
        <ul className="col s6">
          <li>
            <a
              href="#modal1"
              id={this.props.comicAid}
              className="modal-trigger"
              onClick={this.props.onClick}
              style={style.aCardFooter}
              onMouseEnter={this._mouseHover}
              onMouseLeave={this._mouseLeave}
            >
              {this.props.comicA}
            </a>
          </li>
          <li
            style={style.liFooterCard}>
            <a
              href="#modal1"
              id={this.props.comicBid}
              className="modal-trigger"
              onClick={this.props.onClick}
              style={style.aCardFooter}
              onMouseEnter={this._mouseHover}
              onMouseLeave={this._mouseLeave}
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
              className="modal-trigger"
              onClick={this.props.onClick}
              style={style.aCardFooter}
              onMouseEnter={this._mouseHover}
              onMouseLeave={this._mouseLeave}
            >
              {this.props.comicC}
            </a>
          </li>
          <li
            style={style.liFooterCard}>
            <a
              href="#modal1"
              id={this.props.comicDid}
              className="modal-trigger"
              onClick={this.props.onClick}
              style={style.aCardFooter}
              onMouseEnter={this._mouseHover}
              onMouseLeave={this._mouseLeave}
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

const NODESCRIPTION = [
    {text : 'Cras quis null commodo aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Cras quis nulla commodo, aliquam lectus sed, blandit augue.'}
]


const style = {
  descriptionCard:{
    maxHeight: '100px',
    overflow: 'hidden'
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
    fontSize: '20px',
    textTransform: 'uppercase'
  },
  butonContCard:{
      margin: '20px 0'
  },
  butonCard: {
    fontSize: '0.8em',
  },
  aCardFooter:{
    fontSize: '0.8em',
    color: '#786e6d'
  },
  readMore:{
    textAlign: 'center',
  },
  footerCardHeight:{
    padding: '10px 10px'
  },
  liFooterCard:{
    marginTop: '10px'
  },
  heightText:{
    fontSize: '0.8em',
    color: '#786e6d'
  }
}
