import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CSSTransitionGroup } from 'react-transition-group'

export default class Paginations extends Component{
  render(){
    return(
      <div className="container">
        <Row>
          <ul className="col s12 pagination center">
            <Pagination items={5} activePage={1} maxButtons={5} onSelect={this.props.onClick} />
          </ul>
        </Row>
      </div>
    )
  }
}
