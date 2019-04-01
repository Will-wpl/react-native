import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Login from '../pages/login'
import TabView from './TabView'
//import Events from './util/event'

export default class Navigation extends Component{
    constructor(props){
      super(props)
    }
    render(){

        return Platform.OS == "ios"?(
          <Navigator
            initialRoute={{component:this.props.logined?TabView:Login}}
            configureScene={() => Navigator.SceneConfigs.FloatFromRight}
            renderScene={(route, navigator) => {
                  return <route.component navigator={navigator} {...route.args}/>
                }
            }
          />
        ):(
          <View style={{flex: 1}}>
            <StatusBar
             backgroundColor="#0398ff"
             barStyle="light-content"
           />
            <Navigator
              initialRoute={{component:this.props.logined?TabView:Login}}
              configureScene={() => Navigator.SceneConfigs.FloatFromRight}
              renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args}/>
                  }
              }
            />
          </View>
        )
    }
}
