import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CSSTransitionGroup } from 'react-transition-group'

export default class MyFooter extends Component{
  render(){
    return(
      <Footer style={this.props.style} copyrights="© 2017 Camilo Arguello"
        moreLinks={
          <a className="grey-text text-lighten-4 right" href="http://camiloarguello.co">camiloarguello.co</a>
        }
        links={
          <ul>
            <li><a className="grey-text text-lighten-3" target="_blank" href="https://www.linkedin.com/in/kmiloarguello/"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
            <li><a className="grey-text text-lighten-3" target="_blank" href="https://github.com/kmiloarguello"><i className="fa fa-github" aria-hidden="true"></i></a></li>
            <li><a className="grey-text text-lighten-3" target="_blank" href="https://www.instagram.com/kmilo_arguello/"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
          </ul>
        }
        className='myFooter'
      >
          <h5 className="white-text">Marvel Character</h5>
          <p className="grey-text text-lighten-4">This website is only created for educational pursposes.</p>
      </Footer>
    )
  }
}

const style = {
  liFooterCard:{
    marginTop: '20px'
  },
  footerPos:{
    position: 'relative',
    bottom: 0,
    backgroundColor: 'rgb(45,39,39)'
  }
}
