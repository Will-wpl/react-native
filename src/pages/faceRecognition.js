import React, { Component } from 'react'
import {
  Text, AsyncStorage,
  View, Alert, StyleSheet, Platform,
  ScrollView, TouchableWithoutFeedback,
  Dimensions, Image
} from 'react-native'
import Toast from 'react-native-root-toast';
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import UserProfile from './UserProfile'
import Button from '../component/Button'
import ConfirmDialog from '../component/confirm'
import LocalImg from '../images'
import Login from './login'
const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS == "ios"
//FontAwesome
export default class FaceRecognition extends Component {
  constructor(props) {
    super(props)
    this.state={
      modalVisibility:false
    }
  }
  back() {
    this.props.navigator.pop()
  }
  upload() {

  }
  goLogin(){
    this.props.navigator.push({
        component: Login,
        args: {}
    });
  }
  doAlert() {
    this.setState({
      modalVisibility:true
    })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        <NavBar
          title="人脸识别"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Text style={styles.title}>{"拍摄时请保持人脸边贴合相框"}</Text>
          <TouchableWithoutFeedback>
            <View style={{ flex: 1, padding: 15, backgroundColor: "#fff", overflow: "hidden" }}>
              <Image source={LocalImg.rlsb} style={{ width: "100%", resizeMode: 'cover' }} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Button style={{ marginTop: 20,marginBottom: 20, marginHorizontal: 16, borderRadius: 6, overflow: "hidden" }} onPress={this.doAlert.bind(this)}>
              <View style={{ flex: 1, height: 40, backgroundColor: "#56d176", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff" }}>{"开始"}</Text>
              </View>
            </Button>
          </TouchableWithoutFeedback>
          <ConfirmDialog title="确认信息" message={this.props.list?this.props.list:[]} ref="_customModal" visibility={this.state.modalVisibility}
            buttonLeftName="重新上传" buttonRightName="确认"
            onLeftPress={() => {
              this.setState({modalVisibility:false})
            }}
            onRightPress={() => {
              Toast.show("注册成功！")
              this.setState({modalVisibility:false})
              this.goLogin();
            }}
          />
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#666"
  }
})