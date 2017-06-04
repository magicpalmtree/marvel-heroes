import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import { CSSTransitionGroup } from 'react-transition-group'

export default class MyFooter extends Component{
  render(){
    return(
      <Footer style={style.footerPos} copyrights="© 2017 Camilo Arguello"
        moreLinks={
          <a className="grey-text text-lighten-4 right" href="#!">camiloarguello.co</a>
        }
        links={
          <ul>
            <li><a className="grey-text text-lighten-3" href="#!"></a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
          </ul>
        }
        className='myFooter'
      >
          <h5 className="white-text">Marvel Character</h5>
          <p className="grey-text text-lighten-4">This website is only created for educational pursposes and for a job application at Grability.</p>
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
