import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput
} from 'react-native'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast';
import UploadIdcard from './uploadIdcard'
import Login from './login'
//FontAwesome
export default class ForgetPassWord extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      password: "",
      tel: "",
      idCard: "",
      codeword: ""
    }
  }
  componentDidMount() {

  }
  submit() {
    if (this.state.tel == "") {
      Toast.show("手机号不能为空");
      return;
    }
    if (this.state.tel.length < 11) {
      Toast.show("请输入11位手机号码");
      return;
    }
    if (this.state.codeword == "") {
      Toast.show("验证码不能为空");
      return;
    }
    if (this.state.password == "") {
      Toast.show("新密码不能为空");
      return;
    }
    this.goLogin();
  }

  back() {
    this.props.navigator.pop()
  }
  goLogin() {
    Toast.show("密码重置成功，请重新登录");
    this.props.navigator.push({
      component: Login,
      args: {}
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        <NavBar
          title={this.props.title}
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <View style={{ marginTop: 10, backgroundColor: "#fff", paddingLeft: 16 }}>
            <View style={styles.item}>
              <Text style={styles.label}>{"手机号"}</Text>
              <View style={{ flex: 1 }}>
                <TextInput underlineColorAndroid="transparent" maxLength={11} keyboardType={"numeric"} onChangeText={(tel) => this.setState({ tel })}
                  value={this.state.tel} autoCapitalize={"none"} ref={"tel"}
                  style={styles.textInput} placeholder="请输入手机号" placeholderTextColor="#aaa" />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{"验证码"}</Text>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}><TextInput underlineColorAndroid="transparent" onChangeText={(codeword) => this.setState({ codeword })}
                  value={this.state.codeword} ref={"codeword"} style={styles.textInput} placeholder="请输入手机验证码" placeholderTextColor="#aaa" />
                  <Button style={{ marginRight: 10 }} onPress={() => { }}>
                    <Text style={[styles.radio, styles.active]}>{"获取验证码"}</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{"新密码"}</Text>
              <View style={{ flex: 1 }}>
                <TextInput underlineColorAndroid="transparent" keyboardType={"numeric"} onChangeText={(password) => this.setState({ password })}
                  value={this.state.password} autoCapitalize={"none"} ref={"password"}
                  style={styles.textInput} placeholder="请输入新密码" placeholderTextColor="#aaa" />
              </View>
            </View>
          </View>
          <Button style={{ marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow: "hidden" }} onPress={this.submit.bind(this)}>
            <View style={{ flex: 1, height: 40, backgroundColor: "#0096ff", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff" }}>{"确认"}</Text>
            </View>
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
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
    color: "#222",
    paddingTop: 5
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    height: 30,
    fontSize: 13,
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
