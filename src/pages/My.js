import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native'
import LocalImg from '../images'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import Setting from './Setting'
import UserProfile from './UserProfile'
import px2dp from '../util'
import ForgetPassWord from './editpw'
import Icon from 'react-native-vector-icons/Ionicons'
let {width, height} = Dimensions.get('window')

export default class My extends Component {
  constructor(props){
      super(props)
      this.state = {
        isRefreshing: false
      }
      this.config = [
        {icon:"ios-person", name:"个人信息", onPress:this.goPage.bind(this, "userProfile")},
        {icon:"md-construct", name:"修改密码", color:"#09f",onPress:this.goPage.bind(this, "changePassWord")},
        {icon:"ios-key", name:"开锁记录",color:"#fc7b53",onPress:this.goPage.bind(this, "openKey")}
      ]
  }
  goPage(key, data = {}){
    let pages = {
      "userProfile": UserProfile,
      "changePassWord":ForgetPassWord,
      // "openKey":ChangePassWord
    }
    if(pages[key]){
      this.props.navigator.push({
          component: pages[key],
          args: { data }
      })
    }
  }
  leftPress(){
    this.props.navigator.pop()
  }
  rightPress(){
    this.props.navigator.push({
        component: Setting,
        args: {}
    });
  }
  goProfile(){
    this.props.navigator.push({
        component: UserProfile,
        args: {}
    });
  }
  componentDidMount(){
    this._onRefresh()
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500)
  }
  _renderListItem(){
    return this.config.map((item, i) => {
      if(i%3==0){
        item.first = true
      }
      return (<Item key={i} {...item}/>)
    })
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="我的"
          leftIcon="ios-arrow-back"
          leftPress={this.leftPress.bind(this)}
          rightIcon="ios-settings"
          rightPress={this.rightPress.bind(this)}
        />
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#fff"
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
            <TouchableWithoutFeedback onPress={this.goProfile.bind(this)}>
              <View style={styles.userHead}>
                <View style={{flex: 1,flexDirection: "row"}}>
                  <Image source={LocalImg.avatar} style={{width: px2dp(60), height: px2dp(60), borderRadius: px2dp(30)}}/>
                  <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                    <Text style={{color: "#fff", fontSize: px2dp(18)}}>丁小龙</Text>
                    <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                      <Icon name="ios-phone-portrait" size={px2dp(14)} color="#fff" />
                      <Text style={{color: "#fff", fontSize: 13, paddingLeft: 5}}>135****0418</Text>
                    </View>
                  </View>
                </View>
                <Icon name="ios-arrow-forward" size={px2dp(22)} color="#fff" />
              </View>
            </TouchableWithoutFeedback>
            <View>
              {this._renderListItem()}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: px2dp(46),
    backgroundColor: "#0398ff"
  },
  userHead: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#0398ff"
  },
  numbers: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 74
  },
  numItem: {
    flex: 1,
    height: 74,
    justifyContent: "center",
    alignItems: "center"
  }
})
