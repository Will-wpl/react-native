import React, { Component } from 'react'
import {
  Text,AsyncStorage,
  View,Alert,
  ScrollView
} from 'react-native'
import Login from '../pages/login'
import Toast from 'react-native-root-toast';
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import UserProfile from './UserProfile'
import ConfirmDialog from '../component/confirm'
//FontAwesome
export default class Setting extends Component {
  constructor(props){
      super(props)
      this.state={
        modalVisibility:false
      }
  }
  back(){
    this.props.navigator.pop()
  }
  goProfile(){
    this.props.navigator.push({
        component: UserProfile,
        args: {}
    });
  }
  goLogin(){
    this.props.navigator.push({
      component: Login,
      args: {}
  });
  }
  doClear(){
    AsyncStorage.clear(function (error) {
        if (error) {
          Toast.show("清理内存失败");
        }else {
          Toast.show("清理内存成功");
          this.goLogin();
        }
    })
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="设置"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          <Item name="账户安全" first={true} onPress={this.goProfile.bind(this)}/>
          <Item name="清除缓存" onPress={this.doClear.bind(this)}/>
          <Item name="关于我们" first={true}/>
          <Item.Button name="退出登录"  first={true}  onPress={()=>{this.setState({modalVisibility:true})}}/>
        </ScrollView>
        <ConfirmDialog title="确认信息" message={"确认退出登录吗？"} ref="_customModal" visibility={this.state.modalVisibility}
            buttonLeftName="取消" buttonRightName="确认"
            onLeftPress={() => {
              this.setState({modalVisibility:false})
            }}
            onRightPress={() => {
              Toast.show("已退出登录！")
              this.setState({modalVisibility:false});
              AsyncStorage.clear();
              this.goLogin();
            }}
          />
      </View>
    )
  }
}
