import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'

import { CSSTransitionGroup } from 'react-transition-group'
import { bounce, fadeIn } from 'react-animations'
import Radium from 'radium'

export default class TitleSection extends Component{
  render(){
    return(
      <div className="container">
        <Row className="valign-wrapper">
          <Col s={1}>
            <img style={{ height : '50px' }} src={this.props.img} alt={this.props.alt} />
          </Col>
          <Col style={{ marginLeft: '50px' }} s={11}>
            <h3 style={{ fontSize: '2em' }}>{this.props.title}</h3>
          </Col>
        </Row>
      </div>
    )
  }
}
