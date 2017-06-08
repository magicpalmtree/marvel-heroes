import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import api from 'marvel-api'
import { Pagination,Button, Icon, Card, Row, Col, Footer } from 'react-materialize'
import { reactLocalStorage } from 'reactjs-localstorage'
import TitleSection from '../TitleSection.jsx'
import Character from './Character.jsx'
import SelectComic from './SelectComic.jsx'
import SelectCharacter from './SelectCharacter.jsx'
import { CSSTransitionGroup } from 'react-transition-group'
import { bounce, fadeIn } from 'react-animations'
import Radium from 'radium'

let doneonce

export default class Characters extends Component{
  constructor(props){
    super(props)
    this.state = {
      c_name: '',
      c_desc : '',
      c_img: ''
    }
    this.loadCharactersAnimated = this.loadCharactersAnimated.bind(this)
    this.selectChar = this.selectChar.bind(this)
  }
  selectChar(event){
    let myCSelect = event._targetInst._currentElement._owner._currentElement.props
    this.setState({
      c_name: myCSelect.name,
      c_desc: myCSelect.description,
      c_img: myCSelect.thumbnail
    })
  }
  loadCharactersAnimated(){
    if(!doneonce){
      doneonce = true
      Materialize.showStaggeredList('#characters-id')
    }
  }
  render(){

    let myCharacter = [], myComicSearchIdA, myComicSearchIdB, myComicSearchIdC, myComicSearchIdD, contentTitle = this.props.contentTitle[1], comicsSimilarA, comicsSimilarB, comicsSimilarC, comicsSimilarD
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
          selectChar={this.selectChar}
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
                         resetComponentComic={this.props.resetComponentComic}
                       />
    }else{
      mySelectedComic = <SelectComic
                         id=""
                         img=""
                         name=""
                         description=""
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

          <ul className="container" id="characters-id" >
            {myCharacter}
          </ul>
          {mySelectedComic}
          <SelectCharacter
            name={this.state.c_name}
            description={this.state.c_desc.length > 0 ? this.state.c_desc : NODESCRIPTION[0].text}
            img={this.state.c_img}
          />
        </Col>
      </div>
    )
  }
}

const NODESCRIPTION = [
    {text : 'Cras quis null commodo aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Cras quis nulla commodo, aliquam lectus sed, blandit augue.'}
]

const style = {
  header:{
    height: 'auto',
  }
}
