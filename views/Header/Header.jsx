import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CSSTransitionGroup } from 'react-transition-group'


export default class Header extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let contentHeader = this.props.contentHeader[0]
    return(
      <nav style={style.colorHeader}>
        <div className="container">
          <Row style={style.row}>
            <Col s={12} m={3} style={style.header} >
              <a href="/">
                <img src={contentHeader.Logoimg} alt={contentHeader.Logoalt} style={style.imgHeader} />
              </a>
            </Col>
            <Col s={12} m={9} className="nav-wrapper">
              <form style={{ backgroundColor: 'rgb(45,39,39)' }}>
                <div className="input-field">
                  <input id="search" placeholder="Search character..." type="search" value={this.props.search} onChange={this.props.onChange}/>
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
                <p style={{ position: 'absolute', zIndex: 100 }}>{this.props.search}</p>
              </form>
            </Col>
          </Row>
        </div>
      </nav>
    )
  }
}


const style = {
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
  }
}
