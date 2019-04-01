import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import UploadIdcard from './uploadIdcard'
import FaceRecognition from './faceRecognition'
import LocalImg from '../images'
//FontAwesome
export default class UserProfile extends Component {
  constructor(props){
      super(props)
  }
  back(){
    this.props.navigator.pop()
  }
  goPage(key){
    let pages = {
      "idCard": UploadIdcard,
      "faceRecognition":FaceRecognition,
    }
    if(pages[key]){
      this.props.navigator.push({
          component: pages[key],
          args: {}
      })
    }
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="账户信息"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Item name="头像" avatar={LocalImg.avatar} first={true} disable/>
          <Item name="姓名" disable={true} subName="丁小龙"/>
          <Item name="性别" disable={true} subName="男"/>
          <Item name="手机" font="FontAwesome" icon="mobile" subName="135****0418" disable/>
          <Text style={styles.title}>{"账户绑定"}</Text>
          <Item name="证件类型" subName="身份证" disable/>
          <Item name="身份证" color="#1bce4a" iconSize={15} font="FontAwesome" subName="已上传" onPress={this.goPage.bind(this, "idCard")}/>
          <Item name="人脸识别" color="#ce3c1b" iconSize={15} font="FontAwesome" subName="已上传" onPress={this.goPage.bind(this, "faceRecognition")}/>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#666"
  }
})
