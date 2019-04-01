import React, { Component } from 'react'
import {
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator'
import px2dp from '../util/index'
let {width, height} = Dimensions.get('window')
import HomePage from '../pages/home'
import KeyPage from '../pages/key'
import LocationPage from '../pages/location'
import WarningPage from '../pages/warning'
export default class TabView extends Component {
  constructor(props){
    super(props)
    this.state = {
        currentTab: 'HomePage',
        hideTabBar: false
    }
    this.tabNames = [
      ["首页", "ios-home", "HomePage", <HomePage {...this.props}/>],
      ["警告", "ios-alert", "Warning", <WarningPage {...this.props}/>],
      ["钥匙", "ios-key", "Key", <KeyPage {...this.props}/>],
      ["位置", "ios-pin", "Location", <LocationPage {...this.props}/>]
    ]
    TabView.hideTabBar = TabView.hideTabBar.bind(this)
    TabView.showTabBar = TabView.showTabBar.bind(this)
  }
  static showTabBar(time){
    this.setState({hideTabBar: false})
  }
  static hideTabBar(time){
    this.setState({hideTabBar: true})
  }
  render(){
    return (
      <TabNavigator
        hidesTabTouch={true}
        tabBarStyle={[styles.tabbar,
          (this.state.hideTabBar?styles.hide:{})
        ]}
        sceneStyle={{ paddingBottom: styles.tabbar.height }}>
          {
            this.tabNames.map((item, i) => {
              return (
                <TabNavigator.Item
                    key={i}
                    tabStyle={styles.tabStyle}
                    title={item[0]}
                    selected={this.state.currentTab === item[2]}
                    selectedTitleStyle={{color: "#3496f0"}}
                    renderIcon={() => <Icon name={item[1]} size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name={item[1].replace(/\-outline$/, "")} size={px2dp(22)} color="#3496f0" />}
                    onPress={() => this.setState({ currentTab: item[2] })}>
                    {item[3]}
                </TabNavigator.Item>
              )
            })
          }
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
    tabbar: {
      height: px2dp(50),
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    hide: {
      transform: [
        {translateX:width}
      ]
    },
    tabStyle:{
      padding: px2dp(4)
    }
})
