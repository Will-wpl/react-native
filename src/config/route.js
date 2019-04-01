
import React, { Component } from 'react'
import Navigation from './app'
import Login from '../pages/login'
import { View, Platform,AsyncStorage } from 'react-native'

export default class rootApp extends Component {
    constructor(props){
      super(props)
      this.state = {
        show:false,
        logined:false
      }
      AsyncStorage.getItem("token").then((value) => {
        if(value == "logined"){
          this.setState({logined:true})
        }
      });
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        show:true
      })
    },0)
  }
  _renderDom(){
    if(this.state.show){
      return (
        <Navigation logined={this.state.logined}/>
      )
    }
  }
  render() {
    return (
      <View style={{backgroundColor: Platform.OS == "ios"?"#000":"#0398ff", flex: 1}}>
        {this._renderDom()}
      </View>
    )
  }
}
