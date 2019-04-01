import React, { Component } from 'react'
import {
  Text,Alert,AsyncStorage,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput
} from 'react-native'
import Toast from 'react-native-root-toast';
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import TabView from '../config/TabView'
import Register from './register'
import ForgetPassWord from './forgetpw'
import SplashScreen from 'react-native-splash-screen'

//FontAwesome
export default class Login extends Component {
  constructor(props){
      super(props)
      this.state = {
        tel: "",
        password: "",
        codeword:"",
        gender:1
      }
  }
  componentDidMount(){
    SplashScreen.hide();
    let _this = this;
    AsyncStorage.getItem('token', function (error, result) {
      if (error) {
      }else {
        if(result=="logined"){
          _this.goHomePage();
        }
      }
    })
    //this.refs.tel.focus()
  }
  goHomePage(){
    this.props.navigator.push({
        component: TabView,
        args: {}
    });
  }
  goRegister(){
    this.props.navigator.push({
        component: Register,
        args: {}
    });
  }
  doAlert(text,func){
    Alert.alert(
      '提示',
      text,
      [
        {text: '确定', onPress: () => {func?func():null}}
      ],
      { cancelable: false }
    )
  }
  submit(){
    if(this.state.tel==""){
      Toast.show("电话号不能为空");
      return;
    }
    if(this.state.tel.length<11){
      Toast.show("请输入11位手机号码");
      return;
    }
    if(this.state.gender===1 && this.state.password==""){
      Toast.show("密码不能为空");
      return;
    }
    if(this.state.gender===0 && this.state.codeword==""){
      Toast.show("验证码不能为空");
      return;
    }
    AsyncStorage.setItem("token","logined",function(error){
      if (error) {
        Toast.show("登录失败");
      }else {
        Toast.show("登录成功");
      }
    });
    this.goHomePage();
  }
  goForget(){
    this.props.navigator.push({
      component: ForgetPassWord,
      args: {}
  });
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar title={"用户登录"}/>
        <ScrollView>
          <View style={{marginTop: 10,backgroundColor:"#fff",paddingLeft: 16}}>
            <View style={styles.item}>
              <Text style={styles.label}>{"手机号"}</Text>
              <View style={{flex: 1}}>
                <TextInput underlineColorAndroid="transparent" maxLength={11} onChangeText={(tel) => this.setState({tel})}
        value={this.state.tel} keyboardType={"numeric"} autoCapitalize={"none"} ref={"tel"} style={styles.textInput} placeholder="请输入手机号" placeholderTextColor="#aaa"/>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{this.state.gender===0?"验证码":"密码"}</Text>
              <View style={{flex: 1}}>
                {
                  this.state.gender===0?
                  <View style={{flexDirection:"row"}}><TextInput underlineColorAndroid="transparent" onChangeText={(codeword) => this.setState({codeword})}
                          value={this.state.codeword} ref={"codeword"} style={styles.textInput} placeholder="请输入手机验证码" placeholderTextColor="#aaa"/>
                          <Button style={{marginRight: 10}} onPress={()=>{}}>
                            <Text style={[styles.radio, styles.active]}>{"获取验证码"}</Text>
                          </Button>
                  </View>:
                  <TextInput underlineColorAndroid="transparent" onChangeText={(password) => this.setState({password})}
                  value={this.state.password} ref={"password"} style={styles.textInput} placeholder="请输入6-10位数字或字母" placeholderTextColor="#aaa"/>
                }
                <View style={{paddingTop: 10, marginTop: 10, flexDirection:"row", borderTopWidth: 1, borderTopColor: "#f8f8f8"}}>
                  {this.state.gender===0?<Button style={{marginLeft: 10}} onPress={()=>{this.setState({gender:1})}}>
                    <Text style={[styles.radio, styles.active]}>{"密码登录"}</Text>
                  </Button>:<Button style={{marginLeft: 10}} onPress={()=>{this.setState({gender:0})}}>
                    <Text style={[styles.radio, styles.active]}>{"短信登录"}</Text>
                  </Button>}
                  <Button style={{marginLeft: 10}} onPress={this.goForget.bind(this)}>
                    <Text style={[styles.radio, styles.active]}>{"忘记密码？"}</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
          <Button style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow:"hidden"}} onPress={this.submit.bind(this)}>
            <View style={{flex: 1, height: 40, backgroundColor: "#56d176", alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: "#fff"}}>{"登录"}</Text>
            </View>
          </Button>
          <Button style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow:"hidden"}} onPress={this.goRegister.bind(this)}>
            <View style={{flex: 1, height: 40, backgroundColor: "#0096ff", alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: "#fff"}}>{"注册"}</Text>
            </View>
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  active: {
    borderColor: "#81c2ff",
    color: "#0096ff"
  },
  label: {
    minWidth: 45,
    fontSize: px2dp(13),
    color:"#222",
    paddingTop: 5
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    height: 30,
    lineHeight:30,
    fontSize: px2dp(13),
    paddingHorizontal: 10
  },
  radio: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#666",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: px2dp(13),
    backgroundColor: "#fff"
  }
})
