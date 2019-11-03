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
  getColor(qoe){
    if(qoe){
      const color = qoe=="HIGH"?'green':(qoe=="MIDDLE"?'orange':(qoe=="LOW"?'red':'gray'));
      return color
    }
  }
  render(){
    //console.log(this.props.data)
    const { id, lockCode, macaddress, suitcode, coordinatej, coordinatew,qoe,updatetime,state } = this.props
    let render = (
      <View style={styles.item}>
        <Image source={state?LocalImg[state]:LocalImg["nodata"]} style={styles.logo} />
        <View style={styles.info}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{fontSize: px2dp(14), color:"#333"}}>锁编号：{lockCode}</Text>
            {/* <Text style={[{fontSize: px2dp(12), padding:5, borderRadius:5, color:"#fff"},state==1?styles.green:(state==2?styles.orange:styles.red)]}>{state==1?"工作正常":(state==2?"工作异常":"工作中")}</Text> */}
          </View>
          <View style={{paddingBottom: 8,borderBottomWidth: 1,borderBottomColor: "#ddd"}}>
            <Text style={{fontSize: px2dp(14), color:"#333",marginTop: 5}}>更新时间：{updatetime}</Text>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 10}}>
            {/* <Text style={{fontSize: px2dp(14), color:"#333"}}>{info?info:''}</Text> */}
            <Text style={{fontSize: px2dp(14), color:"#fff",backgroundColor:this.getColor(qoe),borderRadius:5,paddingLeft:8,paddingRight:8}}>{qoe.indexOf("%")>0?"错误数据":qoe}</Text>
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
    console.log(this.props.data)
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
  gray:{backgroundColor:"gray"},
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#f5f5f5"
  },
  info: {
    paddingRight: 16,
    flex: 1
  }
})
