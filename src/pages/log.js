import React, { Component } from "react";
import { Image, FlatList, StyleSheet,Dimensions, Text, View, Modal, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import LocalImg from '../images'
import NavBar from '../component/NavBar'
import MenuBar from '../component/MenuBar'
import px2dp from '../util'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import SideMenu from 'react-native-side-menu'
import Button from '../component/Button'
import HttpUtil from '../server/server'
let {width,height} = Dimensions.get('window');
export default class LogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: [],
      loaded: false,
      modalVisible: false,
      logData:[
          {
            "id":1,
            "datatime":"2019-05-23 12:53:44.0",
            "usercode":"10110",
            "msg":"success",
            "actType":"openlock"
          },
          {
            "id":2,
            "datatime":"2019-05-21 11:53:44.0",
            "usercode":"10111",
            "msg":"success",
            "actType":"linklock"
          },
        ]
    };
  }
  componentDidMount() {
    HttpUtil.get(`/SL_Record`).then((result) => {
    this.setState({logData:result});
    }).catch(error => console.error(error))
  }
  showFlter() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  filterData(type,data){
    console.log(type);
  }
  getColor(type){
    if(type == "openlock"){
      return "green"
    }else{
      return "#0098FF"
    }
  }
  render() {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", overflow: "hidden" }}>
          <NavBar
            title="操作日志"
          />
          <ScrollView style={styles.scrollView}>
          {
            this.state.logData.map((item, i) => {
              return (
                <Button key={i}>
                  <View style={styles.address1}>
                    <Text style={{color: "#333", fontSize: px2dp(14)}}>操作用户：{item.usercode}</Text>
                    <View style={styles.ads1List}>
                      <Text style={[styles.tag,{color:"#666"}]}>更新时间：{item.datatime}</Text>
                      <Text style={[styles.tag, {backgroundColor:this.getColor(item.actType)}]}>操作类型：{item.actType=='openlock'?'开锁':'蓝牙连接'}</Text>
                    </View>
                    <View style={styles.ads1List}>
                      <Text style={[styles.tag,{color:"#666"}]}>信息：{item.msg}</Text>
                    </View>
                  </View>
                </Button>
              )
            })
          }
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f3f3f3"
  },
  address1: {
    position:"relative",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 12
  },
  ads1List: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5
  },
  tag: {
    color: "#fff",
    fontSize: px2dp(12),
    minWidth: px2dp(30),
    textAlign: "center",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5
  },
})
