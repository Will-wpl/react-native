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
import FaceRecognition from './faceRecognition'

const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS == "ios"
//FontAwesome
export default class UploadIdcard extends Component {
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
  goFaceRecognition(){
    this.props.navigator.push({
        component: FaceRecognition,
        args: {
          list:this.props.list
        }
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
          title="上传身份证"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Text style={styles.title}>{"拍摄时请保持身份证边框完整，字迹清晰，亮度均匀"}</Text>
          <TouchableWithoutFeedback>
            <View style={{ flex: 1, padding: 15, backgroundColor: "#fff", overflow: "hidden" }}>
              <Image source={LocalImg.zm} style={{ width: "100%", resizeMode: 'cover' }} />
              <Button style={{ marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow: "hidden" }} onPress={this.upload.bind(this, "zm")}>
                <View style={{ flex: 1, height: 40, backgroundColor: "#0096ff", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#fff" }}>{"上传身份证正面"}</Text>
                </View>
              </Button>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={{ flex: 1, padding: 15, marginTop: 15, backgroundColor: "#fff", overflow: "hidden" }}>
              <Image source={LocalImg.bm} style={{ width: "100%", resizeMode: 'cover' }} />
              <Button style={{ marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow: "hidden" }} onPress={this.upload.bind(this, "zm")}>
                <View style={{ flex: 1, height: 40, backgroundColor: "#0096ff", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#fff" }}>{"上传身份证背面"}</Text>
                </View>
              </Button>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Button style={{ marginTop: 20,marginBottom: 20, marginHorizontal: 16, borderRadius: 6, overflow: "hidden" }} onPress={this.doAlert.bind(this)}>
              <View style={{ flex: 1, height: 40, backgroundColor: "#56d176", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff" }}>{"保存"}</Text>
              </View>
            </Button>
          </TouchableWithoutFeedback>
          <ConfirmDialog title="确认信息" message={this.props.list?this.props.list:[]} ref="_customModal" visibility={this.state.modalVisibility}
            buttonLeftName="取消" buttonRightName="确定"
            onLeftPress={() => {
              this.setState({modalVisibility:false})
            }}
            onRightPress={() => {
              this.setState({modalVisibility:false})
              this.goFaceRecognition();
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