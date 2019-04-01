import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  AlertIOS,
  Dimensions,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
let {width, height} = Dimensions.get('window')
const isAndroid = Platform.OS == "android"

export default class LbsModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      address: [
        {
          name: "锁1",
          info: "貌似不好用了，删了吧",
          tag: "工作异常",
          color: "#ff6000",
          address: "剩余电量90%"
        },
        {
          name: "锁2",
          info: "正常运行中",
          tag: "工作正常",
          color: "green",
          address: "剩余电量95%"
        },
        {
          name: "锁3",
          info: "正常运行中",
          tag: "工作正常",
          color: "green",
          address: "剩余电量25%"
        },
        {
          name: "锁4",
          info: "貌似不好用了，删了吧",
          tag: "工作异常",
          color: "#ff6000",
          address: "剩余电量35%"
        },
        {
          name: "锁5",
          info: "貌似不好用了，删了吧",
          tag: "工作异常",
          color: "#ff6000",
          address: "剩余电量5%"
        }
      ],
    }
  }
  closeModal(){
    this.props.closeModal()
  }
  getLocation(){
    if(this.state.loading){
      return
    }
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
      this.props.setLocation("中关村")
    }, 1200)
    /*
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        console.log("title",initialPosition)
        this.setState({initialPosition});
      },
      (error) => AlertIOS.alert("title",JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )*/
  }
  add(){

  }
  render(){
    return (
      <Modal
        style={styles.wrap}
        animationType={'slide'}
        onRequestClose={() => {}}
        visible={this.props.modalVisible}
      >
        <NavBar
          title={this.props.type=="add"?"添加设备":"删除设备"}
          leftIcon="ios-close"
          leftPress={this.closeModal.bind(this)}
        />
        {/* <View style={styles.searchView}>
          <TextInput ref="search" style={styles.textInput} underlineColorAndroid="transparent" placeholder="请输入地址" placeholderTextColor="#666"/>
        </View> */}
        <ScrollView style={styles.scrollView}>
          {this.props.type=="add"?<View>
            <Text style={styles.title}>{"添加设备"}</Text>
            <View style={styles.searchView}>
              <TextInput ref="search" style={styles.textInput} underlineColorAndroid="transparent" placeholder="请输入设备编号" placeholderTextColor="#666"/>
            </View>
            <Button style={{flex: 1}} onPress={this.closeModal.bind(this)}>
              <View style={{height: px2dp(45),flexDirection:"row", backgroundColor: "#fff", flex: 1, alignItems:"center", justifyContent: "center"}}>
                <Icon name="ios-close" size={18} color="red" />
                <Text style={{color: "red", fontSize: px2dp(14), marginLeft: 8}}>{"取消"}</Text>
              </View>
            </Button>
            <View style={{height:1,borderColor:"#ddd"}}></View>
            <Button style={{flex: 1}} onPress={this.add.bind(this)}>
              <View style={{height: px2dp(45),flexDirection:"row", backgroundColor: "#fff", flex: 1, alignItems:"center", justifyContent: "center"}}>
                <Icon name="ios-add-circle" size={18} color="#0096ff" />
                <Text style={{color: "#0096ff", fontSize: px2dp(14), marginLeft: 8}}>{"添加设备"}</Text>
              </View>
            </Button>
          </View>:
          <View>
          <Text style={styles.title}>{"删除设备"}</Text>
          {
            this.state.address.map((item, i) => {
              return (
                <Button key={i} onPress={()=>{}}>
                  <View style={styles.address1}>
                    <Text style={{color: "#333", fontSize: px2dp(14)}}>{item.name+" "+item.info}</Text>
                    <View style={styles.ads1List}>
                      <Text style={[styles.tag, {backgroundColor: item.color || "#0096ff", }]}>{item.tag}</Text>
                      <Text style={{color: "#bbb", fontSize: px2dp(13)}}>{item.address}</Text>
                    </View>
                  </View>
                </Button>
              )
            })
          }
          </View>
          }
        </ScrollView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 13,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    color: "#666"
  },
  scrollView: {
    backgroundColor: "#f3f3f3"
  },
  tag: {
    color: "#fff",
    fontSize: px2dp(12),
    minWidth: px2dp(30),
    textAlign: "center",
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginRight: 5
  },
  ads1List: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5
  },
  searchView: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#eee"
  },
  textInput: {
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 0,
    height: px2dp(28),
    borderRadius: px2dp(6),
    backgroundColor: "#fff"
  },
  address: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    height: px2dp(45),
    backgroundColor: "#fff"
  },
  address1: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 12
  }
})
