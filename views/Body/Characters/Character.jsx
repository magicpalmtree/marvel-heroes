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
  }
  componentDidMount(){
    $('.modal').modal()
  }
  render(){
      let myDescription, itHasdescription = this.props.description.length

      if(itHasdescription > 0){
          myDescription = <p className="myIdTest" style={style.heightText}>{this.props.description}</p>
      }else{
          myDescription = <p style={style.heightText}>{NODESCRIPTION[0].text}</p>
      }
  return(
    <li style={style.liCard}  id={this.props.id} className="card col s12 m12 l5" >

      <div style={style.cardHeight} className="col s12 m6 valign-wrapper">
        <img style={style.imgCard} className="circle" src={this.props.thumbnail} alt="" />
      </div>

      <div style={style.cardBody} className="col s12 m6 sidebar-box">
        <h3 style={style.h3Card} className="card-title"><b>{this.props.name}</b></h3>
        <div style={{ maxHeight: '100px', overflow: 'hidden' }}>
            {myDescription}
        </div>
        
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

const NODESCRIPTION = [
    {text : 'Cras quis null commodo aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Cras quis nulla commodo, aliquam lectus sed, blandit augue.'}
]

const style = {
  liCard:{
    margin: '20px'
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
    fontSize: '0.8em',
    color: '#786e6d'
  }
}
