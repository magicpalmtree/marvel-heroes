import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CSSTransitionGroup } from 'react-transition-group'
import { bounce, fadeIn } from 'react-animations'
import Radium from 'radium'

export default class SelectComic extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id="modal2" className="modal">
        <div className="modal-content">
        <a
          className="modal-action modal-close btn-floating btn-large waves-effect waves-light black"
          style={style.closeModal}
        >
          <i style={style.iconCloseModal} className="fa fa-times" aria-hidden="true"></i>
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
      </div>
    )
  }
}

const style = {
  closeModal:{
    position: 'absolute',
    width: 30,
    height: 30,
    top: '20px',
    right: '20px'
  },
  iconCloseModal:{
    lineHeight: '30px'
  },
  modalFooter:{
    padding: '0',
    height: 'auto'
  },
  rowModalFooter:{
    marginBottom: '0px'
  },
  contImgModal:{
    height: '55px'
  },btnBuyModal:{
    lineHeight: '1em',
    fontSize: '1.2em',
    color: 'black'
  }
}
