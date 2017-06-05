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
  componentWillUpdate(prevProps, prevState){
    console.log("will update " , prevProps)
  }
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
          style={style.closeModal}
          onClick={this.props.resetComponentComic}
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
        <div className="modal-footer" style={style.modalFooter}>
          <div className="row center" style={style.rowModalFooter}>
            <Col s={12} m={6} className="grey lighten-2 btn-large waves-effect waves-light">
              <Col s={2} className="valign-wrapper" style={style.contImgModal}>
                <img src="http://camiloarguello.co/img/icons/shopping-cart-primary.png" />
              </Col>
              <Col s={10}>
                <p style={style.btnBuyModal}>Buy for $3,99</p>
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
