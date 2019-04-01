import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  AlertIOS,
  RefreshControl,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'

import px2dp from '../util/index'
import LocalImg from '../images'

class Item extends Component {
  constructor(props){
      super(props)
  }
  render(){
    const { title, logo, state, time, info, price } = this.props
    let render = (
      <View style={styles.item}>
        <Image source={LocalImg[logo]} style={styles.logo} />
        <View style={styles.info}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{fontSize: px2dp(14), color:"#333"}}>{title}</Text>
            <Text style={[{fontSize: px2dp(12), padding:5, borderRadius:5, color:"#fff"},state==1?styles.green:(state==2?styles.orange:styles.red)]}>{state==1?"工作正常":(state==2?"工作异常":"严重异常")}</Text>
          </View>
          <View style={{paddingBottom: 8,borderBottomWidth: 1,borderBottomColor: "#f9f9f9"}}>
            <Text style={{fontSize: px2dp(14), color:"#333",marginTop: 5}}>{time}</Text>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 16}}>
            <Text style={{fontSize: px2dp(14), color:"#333"}}>{info}</Text>
            <Text style={{fontSize: px2dp(14), color:"#333"}}>{price}</Text>
          </View>
        </View>
      </View>
    )
    return (
      Platform.OS === 'ios'?(
        <TouchableHighlight style={{marginBottom: 10}} onPress={() => {}}>{render}</TouchableHighlight>
      ):(
        <View style={{marginBottom: 10}}><TouchableNativeFeedback onPress={() => {}}>{render}</TouchableNativeFeedback></View>
      )
    )
  }
}
export default class ShowList extends Component {
  constructor(props){
      super(props)
      this.state = {
        data: [],
        isRefreshing: false
      }
  }
  componentDidMount(){
    this._onRefresh()
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    this.setState({
      data: this.props.data,
      isRefreshing: false
    })
  }
  render(){
    return (
      <ScrollView>
        {
          this.state.data.map((item, i) => {
            return <Item key={i} {...item} />
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 16
  },
  green:{backgroundColor:"#56d176"},
  orange:{backgroundColor:"orange"},
  red:{backgroundColor:"red"},
  logo: {
    width: 37,
    height: 37,
    marginRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f5f5f5"
  },
  info: {
    paddingRight: 16,
    flex: 1
  }
})
